import {readFileSync} from 'node:fs';

const projects=['pace','opus','ebuygum','veyra','vx27'];
const component=readFileSync('src/components/CaseStudyDepth.tsx','utf8');
const meta=JSON.parse(readFileSync('src/content/page-meta.json','utf8'));
const errors=[];
for(const project of projects){
  const page=readFileSync(`src/content/pages/projects--${project}.tsx`,'utf8');
  if(!page.includes(`<CaseStudyDepth project="${project}"`)) errors.push(`${project}: CaseStudyDepth missing`);
  const creative=(meta[`projects/${project}`]?.jsonLd||[]).find(x=>x['@type']==='CreativeWork');
  if(!creative) errors.push(`${project}: CreativeWork schema missing`);
  else {
    if(!creative.mainEntityOfPage) errors.push(`${project}: mainEntityOfPage missing`);
    if(!creative.keywords) errors.push(`${project}: keywords missing`);
    if(!Array.isArray(creative.about)||creative.about.length<3) errors.push(`${project}: about topics missing`);
  }
}
for(const marker of ['CASE STUDY / FROM BRIEF TO OUTCOME','Related capabilities','RESULTING PRODUCT']){
  if(!component.includes(marker)) errors.push(`CaseStudyDepth missing marker: ${marker}`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Case-study authority checks passed for ${projects.length} flagship projects.`);
