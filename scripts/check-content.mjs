import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'src/content/page-meta.json'),'utf8'));
const check=(truth, message)=>{if (!truth)throw Error(message);};
const keys=Object.keys(data);
check(keys.length>=86,`Expected at least 86 indexed pages including high-intent search routes, local area landing pages (Coventry, Birmingham and the Rugby, Warwick, Leamington Spa, Nuneaton and Solihull town pages), the Project Planner, Project Estimator and Experience page; found ${keys.length}`);
let countAssets=0, countLinks=0, jsonLd=0;
const liveRoutes=new Set(keys.map(key=>key==='index'?'/':'/'+key));
const validateHref=(dest,key)=>{
  if(!dest.startsWith('/') || dest.startsWith('//'))return;
  const pathname=dest.split(/[?#]/)[0].replace(/\/$/,'')||'/';
  check(!pathname.endsWith('.html'),`Legacy HTML link ${dest} in ${key}`);
  if(pathname.match(/\.(?:png|jpe?g|svg|webp|ico|pdf|webmanifest|xml|txt)$/)){
    check(fs.existsSync(path.join(root,'public',pathname.slice(1))),`Missing linked file ${dest} in ${key}`);
    return;
  }
  check(liveRoutes.has(pathname),`Missing Next route for ${dest} in ${key}`);
  ++countLinks;
};
for (const key of keys) {
  const page=data[key];
  const name=key.replaceAll('/','--');
  const pagePath=path.join(root,'src/content/pages',name+'.tsx');
  const cssPath=path.join(root,'public/page-css',name+'.css');
  const route=path.join(root,'app',key==='index'?'':key,'page.tsx');
  check(fs.existsSync(pagePath),`Missing content for ${key}`);
  check(fs.existsSync(cssPath),`Missing stylesheet for ${key}`);
  check(fs.existsSync(route),`Missing Next route ${key}`);
  check(page.title && page.description && page.canonical && page.image,`Missing metadata ${key}`);
  if(page.image.startsWith('https://kineticaxisdigital.com/')){
    const imagePath=new URL(page.image).pathname;
    check(fs.existsSync(path.join(root,'public',imagePath.slice(1))),`Missing metadata image ${imagePath} in ${key}`);
  }
  const tsx=fs.readFileSync(pagePath,'utf8');
  check((tsx.includes('<main') && tsx.includes('main-content')) || tsx.includes('CapabilityServicePage') || tsx.includes('SeoLandingPage') || tsx.includes('InsightArticlePage') || tsx.includes('NewsStory') || tsx.includes('NewsCategoryPage'),`Missing main landmark ${key}`);
  for (const match of tsx.matchAll(/\bsrc=\{"(\/[^"}]+)"\}/g)) {
    const source=match[1].split(/[?#]/)[0];
    if (source.startsWith('/_next')) continue;
    check(fs.existsSync(path.join(root,'public',source.slice(1))),`Missing image ${source} in ${key}`);
    ++countAssets;
  }
  check(!/\bas=\{/.test(tsx),`Legacy Next as prop remains in ${key}`);
  for(const match of tsx.matchAll(/\bhref=\{"([^"]+)"\}/g)) validateHref(match[1],key);
  const css=fs.readFileSync(cssPath,'utf8');
  for (const match of css.matchAll(/url\(['"]?(\/assets\/[^)'" ]+)/g)) {
    check(fs.existsSync(path.join(root,'public',match[1].slice(1))),`Missing stylesheet image ${match[1]} in ${key}`);
  }
  check(Array.isArray(page.jsonLd) && page.jsonLd.length>0,`Missing schema ${key}`);
  jsonLd+=page.jsonLd.length;
}
for(const file of ['src/components/SiteHeader.tsx','src/components/SiteFooter.tsx','src/components/Breadcrumbs.tsx']){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  check(!/\bas=\{/.test(source) && !/as=\"\/[^\"]+\.html/.test(source),`Legacy link alias in ${file}`);
}
for(const key of keys){
  const meta=data[key];
  check(!meta.canonical.endsWith('.html'),`Legacy canonical on ${key}`);
}
check(!fs.readFileSync(path.join(root,'public/sitemap.xml'),'utf8').includes('.html'), 'Legacy URL in sitemap');
for(const asset of ['/favicon.ico','/assets/favicon.svg','/apple-touch-icon.png','/site.webmanifest','/robots.txt','/sitemap.xml']){
  check(fs.existsSync(path.join(root,'public',asset.slice(1))),`Missing public asset ${asset}`);
}
const contactSource=fs.readFileSync(path.join(root,'src/content/pages/contact.tsx'),'utf8');
check(contactSource.includes('wa.me/447971639927'),'WhatsApp link missing');
const contactApiSource=fs.readFileSync(path.join(root,'contact-api/server.mjs'),'utf8');
const formProjectTypes=[...contactSource.matchAll(/<option value=\{"([^"]+)"\}/g)].map(match=>match[1]).filter(Boolean);
for(const projectType of formProjectTypes){
  check(contactApiSource.includes(`'${projectType}'`),`Contact API rejects form project type: ${projectType}`);
}
check(fs.readFileSync(path.join(root,'src/content/pages/studio.tsx'),'utf8').includes('ka-studio-scene'),'Approved studio illustration missing');

const projectLiveUrls={
  "projects/pace":"https://pacevenues.com",
  "projects/ebuygum":"https://www.ebuygumm.co.uk/",
  "projects/opus":"https://project-opus.netlify.app/documentation/components",
  "projects/vx27":"https://vx-27.com",
  "projects/veyra":"https://veyrastudio.uk",
  "projects/emberlyn":"https://emberlynband.com",
};
for(const [key,url] of Object.entries(projectLiveUrls)){
  const source=fs.readFileSync(path.join(root,'src/content/pages',key.replaceAll('/','--')+'.tsx'),'utf8');
  check(source.includes('Visit live solution'),`Missing live-solution CTA on ${key}`);
  check(source.includes(`href={"${url}"}`),`Wrong or missing live-solution URL on ${key}`);
  check(source.includes('target={"_blank"}') && source.includes('rel={"noopener noreferrer"}'),`Live-solution CTA must open safely in a new tab on ${key}`);
}

const clientLogoAssets=[
  'virgin-media.png','o2.png','giffgaff.png','tesco-mobile.png','virgin-mobile.png',
  'compusoft.png','cyncly.png','open-university.png','easyfundraising.png','carrentals.png','veyra.webp','emberlyn.webp',
];
const homeSource=fs.readFileSync(path.join(root,'src/content/pages/index.tsx'),'utf8');
check(homeSource.includes('ClientLogoMarquee'), 'Homepage client marquee missing');
for(const logo of clientLogoAssets){
  check(fs.existsSync(path.join(root,'public/assets/client-logos',logo)),`Missing client logo asset ${logo}`);
}
const marqueeSource=fs.readFileSync(path.join(root,'src/components/ClientLogoMarquee.tsx'),'utf8');
const homeCss=fs.readFileSync(path.join(root,'public/page-css/index.css'),'utf8');
check(!marqueeSource.includes('preload(client.src'),'Client logos must not be head-preloaded: logo preloads crowd out the LCP hero');
check(marqueeSource.includes('loading="eager"') && !marqueeSource.includes('loading="lazy"'),'Client marquee logos must load eagerly');
check((marqueeSource.match(/<LogoGroup duplicate \/>/g)||[]).length===2,'Client marquee must keep two duplicate groups for seamless wide-screen looping');
check(homeCss.includes('animation:ka-client-marquee 68s linear infinite'),'Client marquee speed regression');
check(homeCss.includes('translate3d(-33.333333%,0,0)'),'Client marquee loop distance regression');
check(homeCss.includes('.client-marquee__item{') && homeCss.includes('width:auto;'),'Client logos must use natural item widths');
check(!/\.client-marquee__[^{}]*(?:hover|focus-within)[^{}]*\{[^}]*animation-play-state\s*:\s*paused/i.test(homeCss),'Client logo marquee should not pause until logo links are introduced');

const runtimeSource=fs.readFileSync(path.join(root,'src/components/SiteRuntime.tsx'),'utf8');
const globalCss=fs.readFileSync(path.join(root,'app/globals.css'),'utf8');
const faqDetailCount=[...fs.readdirSync(path.join(root,'src/content/pages'))]
  .filter(name=>name.endsWith('.tsx'))
  .reduce((count,name)=>count+(fs.readFileSync(path.join(root,'src/content/pages',name),'utf8').match(/<details/g)||[]).length,0)
  +(fs.readFileSync(path.join(root,'src/components/CapabilityServicePage.tsx'),'utf8').match(/<details/g)||[]).length
  +(fs.readFileSync(path.join(root,'src/components/SeoLandingPage.tsx'),'utf8').match(/<details/g)||[]).length;
check(faqDetailCount>=16,`Expected site FAQ accordions; found ${faqDetailCount}`);
check(runtimeSource.includes("document.querySelectorAll<HTMLDetailsElement>('.mkt-faq > details')"),'Site FAQ animation runtime missing');
check(runtimeSource.includes('event.preventDefault()') && runtimeSource.includes('detail.animate('),'FAQ details must animate instead of using the snapping native toggle');
check(runtimeSource.includes("prefers-reduced-motion: reduce"),'FAQ animation must respect reduced-motion preferences');
check(globalCss.includes('.mkt-faq > details.ka-faq-animating'),'FAQ animation overflow guard missing');


const phaseOneRoutes=[
  'solutions','insights','business-software-development','booking-system-development',
  'customer-portal-development','admin-dashboard-development','white-label-app-development',
  'legacy-system-modernisation','workflow-automation-software','saas-product-development',
  'hospitality-software-development','restaurant-app-development',
  'insights/custom-web-app-cost-uk','insights/bespoke-software-development-cost',
];
for(const key of phaseOneRoutes) check(keys.includes(key),`Phase 1 SEO route missing: ${key}`);
const phaseTwoRoutes=[
  'internal-business-systems','marketplace-development','loyalty-app-development','payment-integration-development',
  'ecommerce-marketplace-development','saas-technology-development','membership-loyalty-platforms',
  'insights/web-app-vs-mobile-app','insights/off-the-shelf-vs-bespoke-software',
  'insights/booking-system-development-guide','insights/white-label-mobile-apps',
  'insights/replacing-spreadsheets-with-custom-software','insights/api-integration-guide',
  'insights/mobile-app-development-cost-uk',
];
for(const key of phaseTwoRoutes) check(keys.includes(key),`Phase 2 SEO route missing: ${key}`);
const phaseThreeRoutes=[
  'design-system-development','react-component-library-development','enterprise-ui-development',
  'nextjs-development','nodejs-api-development','professional-services-software','sme-digital-transformation',
  'software-web-app-development-warwickshire','insights/design-system-development-guide',
  'insights/react-component-library-guide','insights/customer-portal-development-guide',
  'insights/legacy-system-modernisation-guide','insights/how-to-build-a-saas-mvp',
  'insights/when-to-build-an-internal-business-system',
];
for(const key of phaseThreeRoutes) check(keys.includes(key),`Phase 3 SEO route missing: ${key}`);


const phaseEightRoutes=['project-planner'];
for(const key of phaseEightRoutes) check(keys.includes(key),`Phase 8 route missing: ${key}`);

const headerSource=fs.readFileSync(path.join(root,'src/components/SiteHeader.tsx'),'utf8');
check(headerSource.includes('to="/solutions"') && headerSource.includes('to="/insights"'),'Solutions/Insights primary navigation missing');
for(const key of ['projects--pace.tsx','projects--opus.tsx','projects--ebuygum.tsx']){
  const source=fs.readFileSync(path.join(root,'src/content/pages',key),'utf8');
  check(source.includes('ka-seo-case__inner'),`Expanded SEO case-study section missing from ${key}`);
}
check(new Set(keys.map(key=>data[key].canonical)).size===keys.length,'Duplicate canonical URLs found');

const opusSource=fs.readFileSync(path.join(root,'src/content/pages/projects--opus.tsx'),'utf8');
for(const route of ['/design-system-development','/react-component-library-development','/enterprise-ui-development']){
  check(opusSource.includes(route),`OPUS Phase 3 cluster link missing: ${route}`);
}


console.log(`PASS: ${keys.length} Next page sources; ${countAssets} local image references; ${countLinks} internal page links; ${jsonLd} JSON-LD blocks; icon pack, contact, studio content and project live-solution CTAs.`);
