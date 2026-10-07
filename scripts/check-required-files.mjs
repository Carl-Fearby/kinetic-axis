import fs from 'node:fs';

const required = [
  'src/components/PageView.tsx',
  'src/components/RouteTransitions.tsx',
  'src/content/page-meta.ts',
  'src/components/ClientLogoMarquee.tsx',
  'src/components/SearchClusterLinks.tsx',
  'src/components/CaseStudyDepth.tsx',
  'src/components/ClientConfidence.tsx',
  'src/components/ConversationCTA.tsx',
  'src/content/commercial-links.ts',
  'src/content/commercial-faqs.ts',
  'scripts/check-conversion-authority.mjs',
  'app/not-found.tsx',
  'src/content/search-clusters.json',
  'scripts/check-search-architecture.mjs',
  'scripts/check-image-seo.mjs',
  'app/layout.tsx',
  'app/insights/page.tsx',
  'app/studio/page.tsx',
  'tsconfig.json',
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing required project files:');
  missing.forEach((file) => console.error(` - ${file}`));
  process.exit(1);
}
console.log(`PASS: ${required.length} required project files present.`);
