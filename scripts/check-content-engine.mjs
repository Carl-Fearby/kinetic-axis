import fs from 'node:fs';
import path from 'node:path';
const read=file=>fs.readFileSync(file,'utf8');
const errors=[];const check=(ok,msg)=>{if(!ok)errors.push(msg)};
const registry=JSON.parse(read('src/content/insights-registry.json'));
const slugs=new Set(),hrefs=new Set();
check(registry.length>=15,'Insights registry should contain the existing buyer-guide library.');
for(const item of registry){
  check(item.slug&&item.href&&item.title&&item.description&&item.topic,`Incomplete insight registry entry: ${item.slug||item.href||'unknown'}`);
  check(!slugs.has(item.slug),`Duplicate insight slug: ${item.slug}`);slugs.add(item.slug);
  check(!hrefs.has(item.href),`Duplicate insight href: ${item.href}`);hrefs.add(item.href);
  check(Array.isArray(item.relatedServices)&&item.relatedServices.length>0,`${item.slug}: related services missing.`);
  check(Array.isArray(item.relatedCaseStudies)&&item.relatedCaseStudies.length>0,`${item.slug}: related case studies missing.`);
  check(fs.existsSync(path.join('app','insights',item.slug,'page.tsx')),`${item.slug}: App Router page missing.`);
  const contentFile=path.join('src','content','pages',`insights--${item.slug}.tsx`);
  check(fs.existsSync(contentFile),`${item.slug}: content file missing.`);
  if(fs.existsSync(contentFile))check(read(contentFile).includes(`slug:'${item.slug}'`),`${item.slug}: article data must declare its registry slug.`);
}
const overview=read('src/content/pages/insights.tsx');
check(overview.includes("INSIGHTS } from '../insights-registry'"),'Insights overview must render from the shared registry.');
const article=read('src/components/InsightArticlePage.tsx');
check(article.includes('relatedInsights(data.slug,3)'),'Insight articles must use automatic related-reading links.');
check(article.includes('insight-share'),'Insight articles must include distribution/share links.');
check(fs.existsSync('public/feed.xml'),'RSS feed missing.');
if(fs.existsSync('public/feed.xml')){
  const feed=read('public/feed.xml');
  for(const item of registry)check(feed.includes(`https://kineticaxisdigital.com${item.href}`),`RSS feed missing ${item.href}.`);
}
const meta=read('src/content/page-meta.ts');
check(meta.includes("'application/rss+xml':'/feed.xml'"),'Page metadata must advertise the RSS feed.');
if(errors.length){console.error('CONTENT ENGINE CHECK FAILED');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log(`PASS: structured Insights registry, automatic related content, share metadata and RSS cover ${registry.length} guides.`);
