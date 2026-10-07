import fs from 'node:fs';
import path from 'node:path';
const roots=['src/content/pages','src/components'];
const files=[]; const errors=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.tsx$/.test(e.name))files.push(p);}}
roots.forEach(walk);
let images=0;
for(const file of files){
  const src=fs.readFileSync(file,'utf8');
  for(const m of src.matchAll(/<img\b[\s\S]*?\/>/g)){
    images++;
    const tag=m[0];
    if(!/\balt=/.test(tag)) errors.push(`${file}: img missing alt`);
    if(!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) errors.push(`${file}: img missing intrinsic width/height`);
  }
}
if(errors.length){console.error('IMAGE SEO CHECK FAILED');errors.forEach(e=>console.error(`- ${e}`));process.exit(1);}
console.log(`PASS: ${images} JSX images have alt text and intrinsic dimensions.`);
