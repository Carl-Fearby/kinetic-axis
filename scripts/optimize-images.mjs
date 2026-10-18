import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Static export: generate assets locally, with no runtime image service.
const output = 'public/assets/optimized';
await fs.mkdir(output, { recursive: true });
const logos = await fs.readFile('src/components/ClientLogoMarquee.tsx', 'utf8');
const newsItems = JSON.parse(await fs.readFile('src/content/news.json', 'utf8')).items;
const newsManifest = newsItems.flatMap(item => [
  item.image, item.logo,
  ...item.body.flatMap(section => section.media ? [section.media.src] : []),
]).filter(Boolean);
const sources = [...new Set([
  ...[...logos.matchAll(/src: '([^']+)'/g)].map(match => match[1]),
  ...newsManifest,
  ...(await fs.readdir('public/assets')).filter(name => /^project-.*\.(jpg|png|webp)$/.test(name)).map(name => `/assets/${name}`),
])].sort();
const manifest = {};
for (const src of sources) {
  let input = await fs.readFile(`public${src}`);
  let meta = await sharp(input).metadata();
  // News artwork never displays wider than a 900px banner, so cap its variant
  // set below the full-width ladder.
  const logo = src.includes('/client-logos/');
  const news = newsManifest.includes(src) && !logo;
  if (news && !meta.hasAlpha) {
    // Opaque news artwork often has baked-in whitespace; trim near-white
    // borders so the subject fills the tile. Guarded against over-trimming.
    try {
      const trimmed = await sharp(input).trim({ background: '#ffffff', threshold: 26 }).toBuffer();
      const trimmedMeta = await sharp(trimmed).metadata();
      if (trimmedMeta.width > 400) { input = trimmed; meta = trimmedMeta; }
    } catch { /* fall back to untrimmed source */ }
  }
  const widths = [...new Set((news ? [480, 960] : logo ? [160, 320, 480, 640] : [480, 960, 1440]).map(width => Math.min(width, meta.width)))];
  const hash = crypto.createHash('sha256').update(input).update('webp-q82-v1').digest('hex').slice(0, 12);
  const name = path.basename(src, path.extname(src));
  const variants = [];
  for (const width of widths) {
    const url = `/assets/optimized/${name}-${hash}-${width}.webp`;
    const file = `public${url}`;
    try { await fs.access(file); } catch {
      if (news) {
        // No baked crop: the full trimmed composition is preserved; CSS shows
        // it contained on the card's white background.
        await sharp(input).resize({ width, withoutEnlargement: false }).webp({ quality: 82, effort: 6 }).toFile(file);
      } else {
        await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(file);
      }
    }
    const result = await sharp(file).metadata();
    const bytes = (await fs.stat(file)).size;
    if (news ? result.width !== width : (result.width !== width || (meta.hasAlpha && !result.hasAlpha))) throw new Error(`Invalid dimensions/transparency: ${file}`);
    if (bytes > (logo ? 40 : 200) * 1024) throw new Error(`Image budget exceeded: ${file} (${bytes} bytes)`);
    variants.push({ src: url, width, bytes });
  }
  manifest[src] = { width: meta.width, height: meta.height, variants };
}
await fs.writeFile('src/content/optimized-images.json', JSON.stringify(manifest, null, 2) + '\n');
// Background artwork is decorative; media queries give mobile smaller downloads.
const projects = Object.entries(manifest).filter(([src]) => /\/project-/.test(src));
const css = projects.map(([src, entry]) => {
  const brand = path.basename(src).replace('project-', '').replace(/\.[^.]+$/, '');
  const selector = `.${brand === 'ebuygum' ? 'ebuy' : brand === 'vx27' ? 'vx' : brand}-card .portfolio-photo`;
  const choose = width => entry.variants.find(v => v.width >= width) || entry.variants.at(-1);
  return `${selector}{background-image:url('${choose(960).src}')}\n@media(max-width:600px){${selector}{background-image:url('${choose(480).src}')}}\n@media(min-resolution:2dppx){${selector}{background-image:url('${choose(1440).src}')}}\n@media(max-width:600px) and (min-resolution:2dppx){${selector}{background-image:url('${choose(960).src}')}}`;
}).join('\n');
await fs.writeFile('public/page-css/optimized-images.css', css + '\n');
console.log(`Optimized ${sources.length} images; dimensions, transparency and delivery budgets verified.`);
