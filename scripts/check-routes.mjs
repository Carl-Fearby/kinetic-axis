/* Route regression guard: works before installing any npm dependencies. */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const pages=JSON.parse(fs.readFileSync(path.join(root,'src/content/page-meta.json'),'utf8'));
const cleanRoutes=new Map(Object.keys(pages).map(key=>[key==='index'?'/':'/'+key,key]));
const errors=[];
const check=(result,msg)=>{if(!result)errors.push(msg);};
let internalLinks=0,crumbLinks=0;
const visit=(raw,where)=>{
 if(!raw.startsWith('/') || raw.startsWith('//'))return;
 const link=raw.split(/[?#]/)[0].replace(/\/$/,'')||'/';
 check(!link.endsWith('.html'),`${where} still uses ${raw}`);
 check(cleanRoutes.has(link),`${where} points to a missing route: ${raw}`);
 internalLinks++;
};
for(const [pathKey,meta] of Object.entries(pages)){
 const expected=pathKey==='index'?'/':'/'+pathKey;
 const file=path.join(root,'src/content/pages',pathKey.replaceAll('/','--')+'.tsx');
 check(fs.existsSync(path.join(root,'app',pathKey==='index'?'':pathKey,'page.tsx')),`Missing route ${pathKey}`);
 const src=fs.readFileSync(file,'utf8');
 check(!/\bas=\{?['"`]?\//.test(src),`Legacy Next Link 'as' alias in ${pathKey}`);
 for(const m of src.matchAll(/\bhref=\{"([^"]+)"\}/g))visit(m[1],pathKey);
 for(const m of src.matchAll(/"href"\s*:\s*"(\/[^"]+)"/g)){
  visit(m[1],pathKey+' breadcrumb');crumbLinks++;
 }
 for(const m of src.matchAll(/\bhref\s*:\s*['"](\/[^'"]+)['"]/g)) visit(m[1],pathKey+' data link');
 check(meta.canonical==='https://kineticaxisdigital.com'+expected,
   `Canonical mismatch ${pathKey}: ${meta.canonical}`);
 const json=JSON.stringify(meta.jsonLd);
 check(!/https:\/\/kineticaxisdigital\.com\/[^" ]+\.html/.test(json),
   `Legacy structured-data URL for ${pathKey}`);
}
for(const fname of ['SiteHeader.tsx','SiteFooter.tsx','Breadcrumbs.tsx']){
 const source=fs.readFileSync(path.join(root,'src/components',fname),'utf8');
 check(!/\bas=\{?['"`]?\//.test(source),`Legacy alias in ${fname}`);
}
const sitemap=fs.readFileSync(path.join(root,'public/sitemap.xml'),'utf8');
const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
check(locs.length===cleanRoutes.size,`Sitemap count ${locs.length}, expected ${cleanRoutes.size}`);
check(new Set(locs).size===locs.length,`Duplicate sitemap loc`);
for(const [url] of cleanRoutes){
 check(locs.includes('https://kineticaxisdigital.com'+url),`Sitemap missing ${url}`);
}
const layout=fs.readFileSync(path.join(root,'app/layout.tsx'),'utf8');
check(layout.includes('className="kad-motion-prep"'),`SSR initial motion class missing`);
// Allow the reviewed GTM bootstrap while retaining the legacy DOM mutation guard.
const gtmBootstrap=`<script dangerouslySetInnerHTML={{__html:\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS7QWSC5');\`}}/>`;
check(layout.includes(gtmBootstrap),`Expected GTM bootstrap missing from root layout`);
check(!layout.replace(gtmBootstrap,'').includes('dangerouslySetInnerHTML'),`Unexpected inline DOM mutation script in root layout`);
const nginx=fs.readFileSync(path.join(root,'deploy/nginx-static-site.conf'),'utf8');
// The template is a byte-for-byte copy of the production server file, so
// match production's directive: the clean-URL location must try the
// extensionless path first (`try_files $uri.html $uri $uri/index.html =404;`).
check(/location \/ \{[^}]*try_files \$uri\.html/.test(nginx),`Clean static URLs not configured`);
// The root location must serve index.html directly (no self-redirect). It may
// carry extra directives such as a Cache-Control header, so match the block.
check(/location = \/ \{[^}]*try_files \/index\.html =404;[^}]*\}/.test(nginx),`Root page may redirect to itself`);
check(nginx.includes('return 301 /$1$is_args$args;'),`Legacy redirects not configured`);
if(errors.length){console.error('FAIL:\n'+errors.join('\n'));process.exit(1)}
console.log(`PASS: ${cleanRoutes.size} clean App Router paths, ${internalLinks} page/breadcrumb links (${crumbLinks} breadcrumbs), ${locs.length} matching canonical + sitemap URLs, stable root hydration attributes, and Nginx clean/legacy handling.`);
