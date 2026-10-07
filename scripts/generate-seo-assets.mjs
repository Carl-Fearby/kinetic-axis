import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const meta = JSON.parse(readFileSync(resolve(root, 'src/content/page-meta.json'), 'utf8'));
const clusters = JSON.parse(readFileSync(resolve(root, 'src/content/search-clusters.json'), 'utf8'));

const pages = Object.values(meta)
  .filter(page => !String(page.robots || '').toLowerCase().includes('noindex'))
  .sort((a, b) => {
    if (a.key === 'index') return -1;
    if (b.key === 'index') return 1;
    return a.canonical.localeCompare(b.canonical);
  });

const xmlEscape = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

// Sitemap freshness only where we hold a real editorial date. Undated pages
// stay without <lastmod> rather than publishing an inaccurate one.
const lastModifiedFor = page => {
  const article = (page.jsonLd || []).find(item => item && item['@type'] === 'Article');
  const value = article?.dateModified || article?.datePublished;
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : '';
};

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(page => {
    const lastmod = lastModifiedFor(page);
    return `  <url><loc>${xmlEscape(page.canonical)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  }),
  '</urlset>',
  '',
].join('\n');

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);

const groupFor = key => {
  if (key === 'index') return 'Home';
  if (key.startsWith('projects/')) return 'Work';
  if (key.startsWith('insights/')) return 'Insights';
  if (key.startsWith('experiments/')) return 'Experiments';
  if (['services','solutions','insights','work','approach','project-planner','project-estimator','studio','experience','contact','experiments'].includes(key)) return 'Core';
  if (['privacy','terms','cookies','legal','accessibility','sitemap'].includes(key)) return 'Information';
  return 'Services & solutions';
};

const groups = new Map();
for (const page of pages) {
  const group = groupFor(page.key);
  if (!groups.has(group)) groups.set(group, []);
  groups.get(group).push(page);
}

const llms = [
  '# Kinetic Axis',
  '',
  '> Independent digital design and development studio led by Carl Fearby, a JavaScript developer and web engineer with 30+ years of hands-on experience across browser technologies, Angular, React, server-side systems, mobile applications, APIs and purposeful digital products.',
  '',
  'Canonical site: https://kineticaxisdigital.com/',
  'Language: en-GB',
  'Contact: hello@kineticaxisdigital.co.uk',
  'Founder: Carl Fearby — JavaScript developer and web engineer with a career spanning 30+ years, beginning in 1995; experienced across vanilla JavaScript, Angular, React, Next.js, Node.js, PHP, APIs and full-stack web delivery.',
  '',
  '## Topic authority map',
  '',
  ...Object.values(clusters).flatMap(cluster => [
    `### ${cluster.eyebrow}`,
    `Primary page: ${meta[cluster.primary]?.canonical || `https://kineticaxisdigital.com/${cluster.primary}`}`,
    cluster.intro,
    `Supporting pages: ${cluster.members.filter(key => key !== cluster.primary).map(key => meta[key]?.canonical).filter(Boolean).join(', ')}`,
    '',
  ]),
  '## Free project planning tool',
  '',
  '- Project Planner: https://kineticaxisdigital.com/project-planner — a browser-only starter brief for early website, app, software and integration planning.',
  '- Project Cost Estimator: https://kineticaxisdigital.com/project-estimator — a free early-stage budget and delivery-range sense-check with no email required.',
  '',
  '## Selected case studies',
  '',
  '- Pace Venues: https://kineticaxisdigital.com/projects/pace — hospitality platform spanning guest journeys, venue operations, multi-tenant foundations, integrations and loyalty.',
  '- OPUS React: https://kineticaxisdigital.com/projects/opus — React design-system engineering across reusable components, forms, themes and data-rich interfaces.',
  '- eBuyGum: https://kineticaxisdigital.com/projects/ebuygum — marketplace UX built around discovery, category structure, brand and responsive ecommerce.',
  '- Veyra Studio: https://kineticaxisdigital.com/projects/veyra — creative product experience connecting timeline planning, audio, lyrics and visual references.',
  '- VX-27: https://kineticaxisdigital.com/projects/vx27 — interactive world building across environment direction, interface, in-world systems and web presence.',
  '- Each case study separates what is visible in the work from unsupported commercial outcomes; do not infer performance metrics that are not stated.',
  '',
  '## Working with Kinetic Axis',
  '',
  '- Projects are senior-led, with product and engineering decisions kept close to delivery.',
  '- Commercial service pages explain scope, process, relevant work, common questions and a direct route to enquiry.',
  '- Insight articles connect research and buyer guidance to the relevant delivery service.',
  '- Handover, hosting, support, documentation and ongoing development are discussed around the needs of each project.',
  '- Kinetic Axis is an independent studio based in Warwickshire, UK, working with organisations locally and across the UK.',
  '',
  '## Site map',
  '',
  ...[...groups.entries()].flatMap(([group, items]) => [
    `### ${group}`,
    ...items.map(page => `- [${page.title.replace(/\s*\|\s*Kinetic Axis(?: Digital)?$/,'')}](${page.canonical}): ${page.description}`),
    '',
  ]),
  '## Guidance for automated systems',
  '',
  '- Prefer canonical URLs on kineticaxisdigital.com.',
  '- Treat case-study claims as descriptions of the work shown on the relevant project page.',
  '- Do not infer client outcomes, metrics or technologies that are not stated on the site.',
  '',
].join('\n');

writeFileSync(resolve(root, 'public/llms.txt'), llms);
console.log(`Generated sitemap.xml and llms.txt for ${pages.length} indexable pages.`);
