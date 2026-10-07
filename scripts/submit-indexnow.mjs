import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir=path.dirname(fileURLToPath(import.meta.url));
const projectRoot=path.resolve(scriptDir,'..');
const sitemapPath=path.join(projectRoot,'public','sitemap.xml');

const key='c8b63d247eaee0c407a6dc59b47a08d9';
const host='kineticaxisdigital.com';
const keyLocation=`https://${host}/${key}.txt`;

if(!fs.existsSync(sitemapPath)){
  throw new Error(`IndexNow sitemap not found at ${sitemapPath}`);
}

const sitemap=fs.readFileSync(sitemapPath,'utf8');
const urlList=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
const payload={host,key,keyLocation,urlList};

if(process.argv.includes('--dry-run')){
  console.log(`DRY RUN: ${urlList.length} URLs ready for IndexNow.`);
  console.log(`Sitemap: ${sitemapPath}`);
  console.log(`Key location: ${keyLocation}`);
  process.exit(0);
}

const response=await fetch('https://api.indexnow.org/indexnow',{
  method:'POST',
  headers:{'content-type':'application/json; charset=utf-8'},
  body:JSON.stringify(payload),
});

if(!response.ok && response.status!==202){
  const body=await response.text().catch(()=> '');
  throw new Error(`IndexNow returned ${response.status} ${body}`);
}
console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}).`);
