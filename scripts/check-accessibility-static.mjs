import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message);};
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

const pageView=read('src/components/PageView.tsx');
const header=read('src/components/SiteHeader.tsx');
const runtime=read('src/components/SiteRuntime.tsx');
const globals=read('app/globals.css');
const planner=read('src/components/ProjectPlanner.tsx');
const contact=read('src/content/pages/contact.tsx');
const approach=read('src/content/pages/approach.tsx');
const studio=read('src/content/pages/studio.tsx');
const artwork=read('src/components/BrandArtwork.tsx');

check(pageView.includes('className="ka-skip-link"') && pageView.includes('href="#main-content"'),'Skip link must target #main-content.');
check(globals.includes(':where(a,button,input,select,textarea,summary,[tabindex]):focus-visible'),'Global focus-not-obscured support is missing.');
check(globals.includes('scroll-margin-block: 112px 32px'),'Focused controls do not have the release scroll margin.');
check(globals.includes('@media (forced-colors: active)'),'Forced-colours focus fallback is missing.');
check(globals.includes('min-inline-size: 24px') && globals.includes('min-block-size: 24px'),'WCAG 2.2 target-size baseline is missing.');
check(globals.includes('@media (prefers-reduced-motion: reduce)'),'Reduced-motion CSS is missing.');

check((header.match(/aria-expanded="false"/g)||[]).length>=4,'Navigation toggle/dropdown expanded states are missing.');
check((header.match(/aria-haspopup="true"/g)||[]).length>=2,'Dropdown buttons must expose popup semantics.');
check(runtime.includes("event.key==='Escape' && nav.classList.contains('open')"),'Mobile navigation must close on Escape.');
check(runtime.includes('onMobileOutside'),'Mobile navigation must close when pointer focus moves outside.');
check(runtime.includes("ev.key==='Escape' && menu.classList.contains('is-open')"),'Desktop dropdown menus must close on Escape.');

check(contact.includes('aria-describedby={"enquiry-message-help enquiry-message-count"}'),'Contact message field must expose helper/count text.');
check(contact.includes('aria-live={"polite"}') && contact.includes('aria-atomic={"true"}'),'Contact submission status must be announced.');
check(contact.includes('fieldset className={"kad-project-types"}'),'Project type choices must be grouped in a fieldset.');
check(runtime.includes("status.setAttribute('role','alert')"),'Contact errors must use an alert role.');

check(planner.includes('aria-pressed={state.projectTypes.includes(item)}'),'Planner multi-select project buttons must expose pressed state.');
check(planner.includes('role="group" aria-label="Project types"'),'Planner project choices must expose a named group.');
check(planner.includes('input type="checkbox" checked={state.goals.includes(goal)}'),'Planner goals must remain native checkboxes.');
check(planner.includes('data-nosnippet=""'),'Interactive planner output should be excluded from search snippets.');

check(contact.includes('ka-contact-scene--art"} aria-hidden={"true"}'),'Decorative contact 3D hero should be hidden from assistive technology.');
check(approach.includes('ka-process-scene"} aria-hidden={"true"}'),'Decorative approach 3D hero should be hidden from assistive technology.');
check(studio.includes('alt={""} aria-hidden={"true"}'),'Decorative studio 3D hero should be hidden from assistive technology.');
check(artwork.includes('mkt-hero-art--photo`}\n        aria-hidden="true"'),'Reusable service hero artwork should be hidden from assistive technology.');

// Guard target=_blank links. Each source occurrence must carry a safe rel nearby.
for (const dir of ['src','app']) {
  const walk=d=>{
    for(const entry of fs.readdirSync(d,{withFileTypes:true})){
      const full=path.join(d,entry.name);
      if(entry.isDirectory()) walk(full);
      else if(full.endsWith('.tsx')){
        const text=fs.readFileSync(full,'utf8');
        for(const match of text.matchAll(/target=\{"_blank"\}/g)){
          const around=text.slice(Math.max(0,match.index-350),Math.min(text.length,match.index+350));
          if(!/rel=\{"(?:noopener noreferrer|noreferrer noopener|noopener|noreferrer)"\}/.test(around)) errors.push(`${path.relative(root,full)}: target=_blank link missing rel protection.`);
        }
      }
    }
  };
  walk(path.join(root,dir));
}

if(errors.length){
  console.error('ACCESSIBILITY STATIC CHECK FAILED');
  for(const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('PASS: static WCAG 2.2 AA hardening checks cover navigation, focus, target size, forms, reduced motion, forced colours and decorative hero artwork.');
