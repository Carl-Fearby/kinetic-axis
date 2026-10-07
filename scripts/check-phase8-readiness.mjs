import fs from 'node:fs';

const meta=JSON.parse(fs.readFileSync('src/content/page-meta.json','utf8'));
const required=[
  'src/components/ProjectPlanner.tsx',
  'src/content/pages/project-planner.tsx',
  'app/project-planner/page.tsx',
  'public/page-css/project-planner.css',
  'public/assets/og-project-planner-v1.jpg',
  'public/assets/service-hero-pro/project-planner.webp',
  'scripts/submit-indexnow.mjs',
  'public/c8b63d247eaee0c407a6dc59b47a08d9.txt',
];

for(const file of required){
  if(!fs.existsSync(file)) throw new Error(`Missing Phase 8 asset: ${file}`);
}
if(!meta['project-planner']) throw new Error('Project planner metadata is missing.');
if(meta['project-planner'].canonical!=='https://kineticaxisdigital.com/project-planner') throw new Error('Project planner canonical is incorrect.');
if(fs.readFileSync('public/c8b63d247eaee0c407a6dc59b47a08d9.txt','utf8').trim()!=='c8b63d247eaee0c407a6dc59b47a08d9') throw new Error('IndexNow key file is invalid.');
const layout=fs.readFileSync('app/layout.tsx','utf8');
if(!layout.includes('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION') || !layout.includes('NEXT_PUBLIC_BING_SITE_VERIFICATION')) throw new Error('Search verification hooks are missing.');
const plannerPage=fs.readFileSync('src/content/pages/project-planner.tsx','utf8');
if(!plannerPage.includes('mkt-hero-art--project-planner')) throw new Error('Project Planner professional hero artwork is not wired into the page.');
const planner=fs.readFileSync('src/components/ProjectPlanner.tsx','utf8');
if(!planner.includes('Nothing from the planner is sent') || !planner.includes('ka_project_planner_contact') || planner.includes('ka_project_planner_download')) throw new Error('Planner privacy/contact-action guard is missing or obsolete download actions remain.');
if(!planner.includes('projectTypes:string[]') || !planner.includes('toggleProjectType') || !planner.includes('aria-pressed={state.projectTypes.includes(item)}')) throw new Error('Planner project format is not multi-select.');
const runtime=fs.readFileSync('src/components/SiteRuntime.tsx','utf8');
const contactApi=fs.readFileSync('contact-api/server.mjs','utf8');
if(!runtime.includes("fields.projectType=formData.getAll('projectType')") || !runtime.includes('setProjectTypes(plannerSelections)') || !contactApi.includes('normTypes(data.projectType)') || !contactApi.includes('projectTypes.some(type=>!types.has(type))')) throw new Error('Planner multi-project API handoff is not protected by validation.');
const plannerCss=fs.readFileSync('public/page-css/project-planner.css','utf8');
for(const requiredCss of ['.ka-header', '.mkt-page', '.mkt-hero', '.mkt-btn', '.kad-footer', '.ka-planner']) {
  if(!plannerCss.includes(requiredCss)) throw new Error(`Project Planner standalone stylesheet is missing shared rule: ${requiredCss}`);
}
console.log('PASS: Phase 8 project planner, search verification hooks and IndexNow readiness are present.');
