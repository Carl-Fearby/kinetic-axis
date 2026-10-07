import fs from 'node:fs';

const mustExist = [
  'src/components/ClientConfidence.tsx',
  'src/components/ConversationCTA.tsx',
  'src/content/commercial-links.ts',
  'src/content/commercial-faqs.ts',
  'app/not-found.tsx',
];
for (const file of mustExist) if (!fs.existsSync(file)) throw new Error(`Missing Phase 7 file: ${file}`);

const capability=fs.readFileSync('src/components/CapabilityServicePage.tsx','utf8');
const seo=fs.readFileSync('src/components/SeoLandingPage.tsx','utf8');
const insight=fs.readFileSync('src/components/InsightArticlePage.tsx','utf8');
const cases=fs.readFileSync('src/components/CaseStudyDepth.tsx','utf8');
const runtime=fs.readFileSync('src/components/SiteRuntime.tsx','utf8');
const analytics=fs.readFileSync('src/lib/analytics-client.ts','utf8');
const contact=fs.readFileSync('src/content/pages/contact.tsx','utf8');
const studio=fs.readFileSync('src/components/StudioExperience.tsx','utf8');

if (!capability.includes('<ClientConfidence') || !capability.includes('<ConversationCTA')) throw new Error('Capability pages are missing Phase 7 conversion blocks.');
if (!seo.includes('<ClientConfidence') || !seo.includes('<ConversationCTA')) throw new Error('SEO landing pages are missing Phase 7 conversion blocks.');
if (!insight.includes('ka-insight-bridge') || !insight.includes(' guide title={data.ctaTitle}')) throw new Error('Insight -> service conversion bridge is missing.');
if ((cases.match(/evidence:\[/g) || []).length !== 6) throw new Error('All six case studies must have evidence blocks.');
if ((cases.match(/journey:\[/g) || []).length < 5) throw new Error('The five priority case studies must include decision/process depth.');
if (!runtime.includes('ka_contact_success') || !runtime.includes("emit('ka_page_view')") || !analytics.includes('kineticaxis:event') || !analytics.includes("fetch('/api/events'")) throw new Error('First-party analytics event bridge is missing.');
if (!contact.includes('kad-next-steps')) throw new Error('Contact next-step expectations are missing.');
if (!studio.includes('Warwickshire, UK.')) throw new Error('Studio regional context is missing.');
console.log('PASS: Phase 7 conversion, evidence, analytics-ready events, contact expectations and regional authority are present.');
