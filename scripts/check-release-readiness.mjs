import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message);};
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

const scanRoots=['app','src','public','shared','contact-api','deploy'];
const textFiles=[];
const walk=dir=>{
  if(!fs.existsSync(dir)) return;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(full);
    else if(/\.(?:ts|tsx|js|mjs|json|txt|xml|webmanifest|css|conf|service)$/.test(entry.name)) textFiles.push(full);
  }
};
for(const dir of scanRoots) walk(path.join(root,dir));

for(const file of textFiles){
  const text=fs.readFileSync(file,'utf8');
  const rel=path.relative(root,file);
  if(/Kinetic Axis Digital/i.test(text)) errors.push(`${rel}: obsolete brand phrase "Kinetic Axis Digital" remains.`);
  if(/[A-Za-z0-9._%+-]+@kineticaxisdigital\.com/i.test(text)) errors.push(`${rel}: obsolete .com email address remains.`);
}

check(!fs.existsSync(path.join(root,'docs')),'/docs must not be packaged.');
check(!fs.existsSync(path.join(root,'LOCAL_SETUP.md')),'LOCAL_SETUP.md must not be packaged.');
const tsconfig=JSON.parse(read('tsconfig.json'));
check(tsconfig?.compilerOptions?.jsx==='react-jsx','tsconfig jsx must remain react-jsx.');

const footer=read('src/components/SiteFooter.tsx');
check(footer.includes('/assets/wordmark-footer.png'),'Footer must use the approved Kinetic Axis wordmark asset, not reconstructed text.');
check(footer.includes('hello@kineticaxisdigital.co.uk'),'Footer email must use the working .co.uk mail domain.');

const runtime=read('src/components/SiteRuntime.tsx');
check(runtime.includes("messageCount.dataset.state=count>=1350?'warning':''"),'Contact counter warning threshold is stale.');
check(runtime.includes("emit('ka_contact_success',{source:enquirySource,originPage,projectTypes:projectTypesLabel})"),'Contact success event must distinguish planner/direct source, origin page and project categories.');
check(runtime.includes("emit('ka_page_view')"),'Every route must emit a first-party page-view event.');
const analyticsClient=read('src/lib/analytics-client.ts');
check(analyticsClient.includes('win.dataLayer ?? (win.dataLayer=[])'),'Events must remain available in dataLayer.');
check(analyticsClient.includes("fetch('/api/events'"),'First-party conversion events must use the dedicated same-origin /api/events endpoint.');
check(analyticsClient.includes("hostname==='localhost'")&&analyticsClient.includes("process.env.NODE_ENV!=='production'"),'Local development must not POST analytics events over the network.');

const layout=read('app/layout.tsx');
check(layout.includes('data-scroll-behavior="smooth"'),'Root layout must declare intentional smooth scrolling for Next.js route transitions.');

const planner=read('src/components/ProjectPlanner.tsx');
for(const eventName of ['ka_project_planner_start','ka_project_planner_complete','ka_project_planner_contact']){
  check(planner.includes(eventName),`Planner conversion event ${eventName} is missing.`);
}
check(planner.includes('data-nosnippet=""'),'Planner should protect generated brief content from search snippets.');

const contactApi=read('contact-api/server.mjs');
check(contactApi.includes('content=norm(data.message,1500)') && contactApi.includes('content.length>1500'),'Contact API must enforce the 1,500-character message limit.');
check(contactApi.includes('normTypes(data.projectType)'),'Contact API must accept validated multi-project categories.');
check(contactApi.includes('ANALYTICS_EVENTS') && contactApi.includes("requestUrl.pathname==='/api/events'"),'Analytics API must accept only allowlisted first-party events on /api/events.');
check(!contactApi.includes('data.analyticsEvent'),'Contact submissions and analytics events must remain separate payloads.');
check(contactApi.includes('/var/lib/kineticaxis/analytics/events.ndjson'),'Analytics must persist outside deploy/rollback directories.');
check(contactApi.includes('/var/lib/kineticaxis/analytics/leads.ndjson'),'Lead attribution must persist outside deploy/rollback directories.');
check(contactApi.includes("requestUrl.pathname==='/api/growth-summary'"),'Protected growth-summary endpoint is missing.');

const nginxTemplate=read('deploy/nginx-static-site.conf');
const nginxContactSnippet=read('contact-api/nginx-contact-location.conf');
check(nginxTemplate.includes('location = /api/events')&&nginxTemplate.includes('127.0.0.1:4319/api/events'),'Production Nginx template must proxy /api/events separately from /api/contact.');
check(nginxTemplate.includes('location = /api/growth-summary')&&nginxTemplate.includes('127.0.0.1:4319/api/growth-summary')&&nginxTemplate.includes('auth_basic_user_file /etc/kineticaxis/growth.htpasswd'),'Production Nginx template must protect and proxy the growth dashboard API.');
check(nginxTemplate.includes('location ^~ /admin/growth')&&nginxTemplate.includes('auth_basic "Kinetic Axis Growth"'),'Production Nginx template must protect the growth dashboard page.');
check(nginxContactSnippet.includes('location = /api/events')&&nginxContactSnippet.includes('127.0.0.1:4319/api/events'),'Contact API Nginx snippet must include the dedicated /api/events proxy.');

const heroDir=path.join(root,'public/assets/service-hero-pro');
if(fs.existsSync(heroDir)){
  for(const entry of fs.readdirSync(heroDir)){
    const full=path.join(heroDir,entry);
    if(!entry.endsWith('.webp')) continue;
    const bytes=fs.statSync(full).size;
    if(bytes>350*1024) errors.push(`public/assets/service-hero-pro/${entry}: ${Math.round(bytes/1024)} KB exceeds the 350 KB release target.`);
  }
}

for(const script of ['deploy.sh','deploy/server-deploy.sh','analytics.sh','growth-auth.sh']){
  const mode=fs.statSync(path.join(root,script)).mode & 0o777;
  check((mode & 0o111)!==0,`${script} must remain executable.`);
}


const notFound=read('app/not-found.tsx');
check(notFound.includes("pageStylesheetHref('/')"),'404 page must load the shared marketing shell stylesheet.');
check(notFound.includes('data-ka-page-stylesheet="404-shell"'),'404 page stylesheet marker is missing.');

const pkg=JSON.parse(read('package.json'));
check(/^\d+\.\d+\.\d+$/.test(String(pkg.version)),'Final release package version must be a stable semantic version.');
check(!String(pkg.version).includes('rc'),'Final release package must not be marked as an RC.');

if(errors.length){
  console.error('RELEASE READINESS CHECK FAILED');
  for(const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('PASS: final release guard covers brand/email consistency, packaging, first-party analytics, planner SEO, API limits, hero weights, versioning and deploy permissions.');
