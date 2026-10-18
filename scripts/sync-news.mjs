/* Sync news boilerplate from src/content/news.json.
   Creates (only when missing): app/ route files, content page wrappers,
   page-registry imports/entries, page-meta.json entries, per-page CSS copies —
   for every story and every category page that holds at least one story. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const news = JSON.parse(fs.readFileSync(path.join(root, 'src/content/news.json'), 'utf8'));

const BRAND = 'Kinetic Axis';
const CATEGORIES = {
  projects: 'Projects & Case Studies',
  engineering: 'Engineering & Technology',
  ai: 'AI & Innovation',
  strategy: 'Digital Strategy',
  company: 'Company News',
};
const SITE = 'https://kineticaxisdigital.com';

const created = [];
const ensure = (file, content) => {
  if (fs.existsSync(file)) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  created.push(path.relative(root, file));
};

const routeFile = key => `import { PageView } from '../../components/PageView';
import { metadataFor } from '../../content/page-meta';

export const metadata = metadataFor('${key}');
export default function Page(){ return <PageView pageKey="${key}" />; }`;

const storyWrapper = slug => `import { NewsStory } from '../../components/NewsStory';

export default function PageContent() {
  return <NewsStory slug="${slug}" />;
}`;

const storyRoute = key => `import { PageView } from '../../../src/components/PageView';
import { metadataFor } from '../../../src/content/page-meta';

export const metadata = metadataFor('${key}');
export default function Page(){ return <PageView pageKey="${key}" />; }`;

// --- Story pages -----------------------------------------------------------
for (const item of news.items) {
  const key = `news/${item.slug}`;
  ensure(path.join(root, 'app', 'news', item.slug, 'page.tsx'), storyRoute(key));
  ensure(path.join(root, 'src/content/pages', `${key.replaceAll('/', '--')}.tsx`), storyWrapper(item.slug));
}

// --- Category pages ----------------------------------------------------------
const categoriesHeld = [...new Set(news.items.map(item => item.category))];
for (const slug of categoriesHeld) {
  const key = `news/category/${slug}`;
  const name = CATEGORIES[slug];
  ensure(path.join(root, 'app', 'news', 'category', slug, 'page.tsx'), `import { PageView } from '../../../../src/components/PageView';
import { metadataFor } from '../../../../src/content/page-meta';

export const metadata = metadataFor('${key}');
export default function Page(){ return <PageView pageKey="${key}" />; }`);
  ensure(path.join(root, 'src/content/pages', `${key.replaceAll('/', '--')}.tsx`),
    `import NewsCategoryPage from '../../components/NewsCategoryPage';

export default function PageContent() {
  return <NewsCategoryPage category="${slug}" />;
}
`);
  ensure(path.join(root, 'public/page-css', `${key.replaceAll('/', '--')}.css`),
    fs.readFileSync(path.join(root, 'public/page-css/news.css'), 'utf8'));
}

// --- page-meta entries -------------------------------------------------------
const metaPath = path.join(root, 'src/content/page-meta.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const updated = [];
for (const item of news.items) {
  const key = `news/${item.slug}`;
  if (meta[key]) continue;
  const title = item.seoTitle;
  const description = item.seoDescription;
  if (!title || !description) throw new Error(`Missing SEO copy for ${key}`);
  meta[key] = {
    key,
    title,
    description,
    canonical: `${SITE}${key === 'index' ? '/' : `/${key}`}`,
    image: `${SITE}/assets/og-kinetic-axis-digital-v5.jpg`,
    imageAlt: `${BRAND} — ${item.title}`,
    robots: 'index,follow,max-image-preview:large',
    themeColor: '#101827',
    bodyClasses: ['subpage', 'news-story-page'],
    isProject: false,
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: item.title.replace(/[.。]$/, ''),
      description,
      url: `${SITE}/${key}`,
      datePublished: item.date,
      dateModified: item.date,
      inLanguage: 'en-GB',
      author: { '@id': `${SITE}/#carl-fearby` },
      publisher: { '@id': `${SITE}/#organisation` },
      image: `${SITE}/assets/og-kinetic-axis-digital-v5.jpg`,
    }],
  };
  updated.push(`story ${key}`);
}
for (const slug of categoriesHeld) {
  const key = `news/category/${slug}`;
  if (meta[key]) continue;
  const name = CATEGORIES[slug];
  const title = `${name} — News | ${BRAND}`;
  const description = `${name} news from ${BRAND}: delivered projects, engineering practice and consultancy thinking behind the studio's client work.`;
  meta[key] = {
    key,
    title,
    description,
    canonical: `${SITE}/${key}`,
    image: `${SITE}/assets/og-kinetic-axis-digital-v5.jpg`,
    imageAlt: `${BRAND} — ${name} news`,
    robots: 'index,follow,max-image-preview:large',
    themeColor: '#101827',
    bodyClasses: ['subpage'],
    isProject: false,
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url: `${SITE}/${key}`,
      inLanguage: 'en-GB',
    }],
  };
  updated.push(`category ${key}`);
}
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');

// --- page-registry patching (idempotent) -------------------------------------
const registryPath = path.join(root, 'src/content/page-registry.ts');
let registry = fs.readFileSync(registryPath, 'utf8');
for (const item of news.items) {
  const key = `news/${item.slug}`;
  const name = key.replaceAll('-', '_').split('/').map((part, index) => part === 'news' || index > 0 ? part.split('-').map(w => w[0] + w.slice(1)).join('') : part).join('_');
  // stable component name, e.g. news/pace-venues-... -> News_PaceVenues...
  const comp = 'Page_' + key.replaceAll('/', '_').replaceAll('-', '_').split('_').filter(Boolean).map(w => w[0] + w.slice(1)).join('_');
  const imp = `import ${comp} from "./pages/${key.replaceAll('/', '--')}";`;
  const entry = `  "${key}": ${comp},`;
  if (!registry.includes(entry) && !registry.includes(`"${key}"`)) {
    const anchor = '"news/seo-growth-plan-heart-of-england": Page_News_Hoe,';
    if (!registry.includes(anchor)) throw new Error('Registry anchor missing');
    registry = registry.replace(anchor, `${anchor}\n${entry}`);
    const impAnchor = 'import Page_News_Hoe from "./pages/news--seo-growth-plan-heart-of-england";';
    registry = registry.replace(impAnchor, `${impAnchor}\n${imp}`);
    updated.push(`registry ${key}`);
  }
}
for (const slug of categoriesHeld) {
  const key = `news/category/${slug}`;
  const comp = 'Page_News_Category_' + slug[0].toUpperCase() + slug.slice(1);
  const imp = `import ${comp} from "./pages/${key.replaceAll('/', '--')}";`;
  const entry = `  "${key}": ${comp},`;
  if (!registry.includes(entry)) {
    const anchor = '"news": Page_News,';
    if (!registry.includes(anchor)) throw new Error('Registry category anchor missing');
    registry = registry.replace(anchor, `${anchor}\n${entry}`);
    const impAnchor = 'import Page_News from "./pages/news";';
    registry = registry.replace(impAnchor, `${impAnchor}\n${imp}`);
    updated.push(`registry ${key}`);
  }
}
fs.writeFileSync(registryPath, registry);

// --- CSS copies for story pages (derived files — always overwrite) -----------
const cssSource = fs.readFileSync(path.join(root, 'public/page-css/news.css'), 'utf8');
for (const item of news.items) {
  fs.writeFileSync(path.join(root, 'public/page-css', `news--${item.slug}.css`), cssSource);
}
for (const slug of categoriesHeld) {
  fs.writeFileSync(path.join(root, 'public/page-css', `news--category--${slug}.css`), cssSource);
}

if (created.length || updated.length) {
  console.log(`news sync: created ${created.length} files, updated ${updated.length} entries`);
} else {
  console.log('news sync: everything already in place');
}
