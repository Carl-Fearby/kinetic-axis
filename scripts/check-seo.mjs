import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const meta = JSON.parse(readFileSync(resolve(root, 'src/content/page-meta.json'), 'utf8'));
const pages = Object.values(meta);
const errors = [];

const unique = field => {
  const seen = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    if (seen.has(value)) errors.push(`Duplicate ${field}: ${page.key} and ${seen.get(value)}`);
    else seen.set(value, page.key);
  }
};

unique('title');
unique('description');
unique('canonical');

for (const page of pages) {
  if (!page.title || page.title.length > 65) errors.push(`${page.key}: title is ${page.title?.length || 0} chars (max 65)`);
  if (!page.description || page.description.length > 165) errors.push(`${page.key}: description is ${page.description?.length || 0} chars (max 165)`);
  if (!page.canonical?.startsWith('https://kineticaxisdigital.com')) errors.push(`${page.key}: non-canonical domain`);
  if (/\\.html(?:$|[?#])/.test(page.canonical || '')) errors.push(`${page.key}: legacy .html canonical`);
  if (!page.image || !page.imageAlt) errors.push(`${page.key}: missing social image or alt text`);
  if (!Array.isArray(page.jsonLd) || page.jsonLd.length === 0) errors.push(`${page.key}: no structured data`);
}

const sitemapPath = resolve(root, 'public/sitemap.xml');
const robotsPath = resolve(root, 'public/robots.txt');
const llmsPath = resolve(root, 'public/llms.txt');

for (const p of [sitemapPath, robotsPath, llmsPath]) {
  if (!existsSync(p)) errors.push(`Missing ${p.replace(root + '/', '')}`);
}

if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const expected = pages.filter(page => !String(page.robots || '').toLowerCase().includes('noindex'));
  for (const page of expected) {
    if (!sitemap.includes(`<loc>${page.canonical}</loc>`)) errors.push(`${page.key}: missing from sitemap.xml`);
  }
  const count = (sitemap.match(/<url>/g) || []).length;
  if (count !== expected.length) errors.push(`sitemap.xml has ${count} URLs; expected ${expected.length}`);
}

if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!robots.includes('Sitemap: https://kineticaxisdigital.com/sitemap.xml')) errors.push('robots.txt has incorrect sitemap URL');
}

if (errors.length) {
  console.error('SEO CHECK FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS: ${pages.length} page metadata records; unique titles/descriptions/canonicals; sitemap, robots, social metadata and structured data checks.`);
