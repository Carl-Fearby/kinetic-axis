import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const meta=JSON.parse(fs.readFileSync(path.join(root,'src/content/page-meta.json'),'utf8'));
const clusters=JSON.parse(fs.readFileSync(path.join(root,'src/content/search-clusters.json'),'utf8'));
const pages=['web-app-development-birmingham','software-development-coventry','mobile-app-development-midlands','bespoke-software-development-warwickshire','replace-spreadsheets-with-bespoke-software'];
const failures=[];
for(const key of pages){
  const entry=meta[key];
  if(!entry) failures.push(`${key}: missing metadata`);
  if(!fs.existsSync(path.join(root,'app',key,'page.tsx'))) failures.push(`${key}: missing App Router route`);
  if(!fs.existsSync(path.join(root,'src/content/pages',key+'.tsx'))) failures.push(`${key}: missing content`);
  if(!fs.existsSync(path.join(root,'public/page-css',key+'.css'))) failures.push(`${key}: missing route stylesheet`);
  if(entry && (!entry.title.includes('Kinetic Axis') || entry.description.length<90)) failures.push(`${key}: weak title/description`);
  const inCluster=Object.values(clusters).some(cluster=>cluster.members.includes(key));
  if(!inCluster) failures.push(`${key}: missing search-cluster membership`);
}
const solutions=fs.readFileSync(path.join(root,'src/content/pages/solutions.tsx'),'utf8');
for(const key of pages){ if(!solutions.includes('/'+key)) failures.push(`${key}: not linked from Solutions hub`); }
const component=fs.readFileSync(path.join(root,'src/components/SeoLandingPage.tsx'),'utf8');
if(!component.includes('high-intent-planning-cta')) failures.push('planning CTA tracking hook missing');
if(failures.length){ console.error(failures.join('\n')); process.exit(1); }
console.log(`High-intent search checks passed for ${pages.length} focused landing pages.`);
