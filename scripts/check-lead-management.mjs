import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve(new URL('..',import.meta.url).pathname);
const read=path=>readFileSync(resolve(root,path),'utf8');
const must=(condition,message)=>{if(!condition){console.error(`✗ ${message}`);process.exitCode=1}else console.log(`✓ ${message}`)};

for(const path of ['app/admin/leads/page.tsx','src/components/LeadDashboard.tsx','contact-api/lead-store.mjs','scripts/check-lead-management.mjs'])must(existsSync(resolve(root,path)),`${path} exists`);
const server=read('contact-api/server.mjs');
const store=read('contact-api/lead-store.mjs');
const deploy=read('deploy/server-deploy.sh');
const nginx=read('deploy/nginx-static-site.conf');
const privacy=read('src/content/pages/privacy.tsx');
const dashboard=read('src/components/LeadDashboard.tsx');
const growth=read('src/components/GrowthDashboard.tsx');
const adminHeader=read('src/components/AdminHeader.tsx');

must(server.includes("requestUrl.pathname==='/api/leads'"),'contact API exposes the private leads endpoint');
must(server.includes('createLead(LEAD_PIPELINE_LOG_PATH'),'successful enquiries create pipeline records');
must(store.includes("'New','Contacted','Qualified','Proposal','Won','Lost'"),'lead statuses are allowlisted');
must(store.includes("action==='note'")&&store.includes("action==='follow_up'")&&store.includes("action==='status'"),'lead status, notes and follow-up updates are supported');
must(dashboard.includes('Lead management.')&&dashboard.includes('Add a private note'),'lead admin UI includes pipeline and notes');
must(dashboard.includes('Follow-up')&&dashboard.includes('Project areas'),'lead detail exposes project and follow-up context');
must(adminHeader.includes('/admin/leads')&&growth.includes('summary.pipeline'),'shared admin navigation links Growth to Leads and Growth shows operational counts');
must(nginx.includes('location = /api/leads')&&nginx.includes('auth_basic_user_file /etc/kineticaxis/growth.htpasswd;'),'lead API is protected by server-side Basic Auth');
must(nginx.includes('location ^~ /admin/leads'),'lead admin page is protected by Nginx');
must(deploy.includes('/var/lib/kineticaxis/leads')&&deploy.includes('activity.ndjson'),'deploy preserves private lead data outside releases');
must(privacy.includes('private lead-management record')&&privacy.includes('follow-up dates'),'privacy notice covers lead-management processing');
must(!nginx.includes('password='),'Nginx config does not contain a hard-coded password');

if(process.exitCode)process.exit(process.exitCode);
console.log('Lead-management checks passed.');
