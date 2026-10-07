import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'out');
if(!fs.existsSync(out)){console.error('No /out folder yet. Run npm install && npm run build first.');process.exit(1)}
const pages=JSON.parse(fs.readFileSync(path.join(root,'src/content/page-meta.json'),'utf8'));
for(const key of Object.keys(pages)){
 const file=path.join(out,key+'.html');
 if(!fs.existsSync(file)){console.error('Missing exported route:',file);process.exit(1)}
 const html=fs.readFileSync(file,'utf8');
 if(!html.includes('<main') || !html.includes('main-content')){console.error('Missing page content:',key);process.exit(1)}
}

const notFoundFile=path.join(out,'404.html');
if(!fs.existsSync(notFoundFile)){console.error('Missing exported 404 page:',notFoundFile);process.exit(1)}
const notFoundHtml=fs.readFileSync(notFoundFile,'utf8');
if(!notFoundHtml.includes('404-shell') || !notFoundHtml.includes('/page-css/index.css')){
 console.error('Exported 404 page is missing the shared shell stylesheet.');process.exit(1)
}

for(const extra of ['contact/thank-you','admin/growth']){
 const file=path.join(out,extra+'.html');
 if(!fs.existsSync(file)){console.error('Missing exported utility route:',file);process.exit(1)}
 const html=fs.readFileSync(file,'utf8');
 if(!html.includes('<main')||!html.includes('main-content')){console.error('Missing utility page content:',extra);process.exit(1)}
}
for(const asset of ['assets/wordmark.png','favicon.ico','site.webmanifest','sitemap.xml','robots.txt','llms.txt']){
 if(!fs.existsSync(path.join(out,asset))){console.error('Missing exported asset:',asset);process.exit(1)}
}
console.log(`PASS: all ${Object.keys(pages).length} indexed static routes, utility routes and essential production assets are present in /out.`);
