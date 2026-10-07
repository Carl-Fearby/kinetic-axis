import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const meta=JSON.parse(fs.readFileSync(path.join(root,'src/content/page-meta.json'),'utf8'));
const sitemap=fs.readFileSync(path.join(root,'public/sitemap.xml'),'utf8');
const robots=fs.readFileSync(path.join(root,'public/robots.txt'),'utf8');
const llms=fs.readFileSync(path.join(root,'public/llms.txt'),'utf8');
const errors=[];
const seenTitles=new Map(),seenDescriptions=new Map(),seenCanonicals=new Map();
const check=(ok,msg)=>{if(!ok)errors.push(msg);};

for(const [key,page] of Object.entries(meta)){
  const title=String(page.title||'').trim();
  const description=String(page.description||'').trim();
  const canonical=String(page.canonical||'').trim();
  check(title.length>=20 && title.length<=70,`${key}: title length ${title.length} should be 20–70 characters.`);
  check(description.length>=70 && description.length<=175,`${key}: description length ${description.length} should be 70–175 characters.`);
  check(canonical.startsWith('https://kineticaxisdigital.com/'),`${key}: canonical must use the production .com domain.`);
  check(Array.isArray(page.jsonLd) && page.jsonLd.length>0,`${key}: structured data is missing.`);
  let imagePath='';
  try { imagePath=new URL(String(page.image),'https://kineticaxisdigital.com').pathname.replace(/^\//,''); } catch {}
  check(page.image && imagePath && fs.existsSync(path.join(root,'public',imagePath)),`${key}: social image is missing.`);
  for(const [value,map,label] of [[title,seenTitles,'title'],[description,seenDescriptions,'description'],[canonical,seenCanonicals,'canonical']]){
    if(map.has(value))errors.push(`${key}: duplicate ${label} also used by ${map.get(value)}.`); else map.set(value,key);
  }
  const noindex=String(page.robots||'').toLowerCase().includes('noindex');
  check(noindex || sitemap.includes(`<loc>${canonical}</loc>`),`${key}: indexable canonical missing from sitemap.`);
  if(key.startsWith('projects/')){
    const creative=page.jsonLd.find(item=>item['@type']==='CreativeWork');
    check(Boolean(creative),`${key}: CreativeWork schema missing.`);
    check(Boolean(creative?.description),`${key}: CreativeWork description missing.`);
    check(Boolean(creative?.image),`${key}: CreativeWork image missing.`);
    check(Boolean(creative?.isPartOf),`${key}: CreativeWork should identify the parent WebSite.`);
  }
}
check(/Sitemap:\s+https:\/\/kineticaxisdigital\.com\/sitemap\.xml/i.test(robots),'robots.txt must advertise the canonical sitemap.');
check(llms.includes('## Topic authority map') && llms.includes('## Free project planning tool'),'llms.txt is missing authority/project-planner context.');
const plannerSource=fs.readFileSync(path.join(root,'src/components/ProjectPlanner.tsx'),'utf8');
check(plannerSource.includes('data-nosnippet=""'),'Generated Project Planner summary must remain protected from search snippets.');

if(errors.length){
  console.error('PRODUCTION SEO CHECK FAILED');
  for(const error of errors)console.error(`- ${error}`);
  process.exit(1);
}
console.log(`PASS: production SEO audit covers ${Object.keys(meta).length} routes, metadata uniqueness, canonicals, sitemap, social assets, project schema and planner snippet safety.`);
