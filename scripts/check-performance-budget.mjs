import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const walk=dir=>fs.existsSync(dir)?fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const full=path.join(dir,entry.name);return entry.isDirectory()?walk(full):[full];
}):[];
const assets=walk(path.join(root,'public/assets'));
const css=walk(path.join(root,'public/page-css')).filter(file=>file.endsWith('.css'));
const bytes=file=>fs.statSync(file).size;
const totalAssets=assets.reduce((sum,file)=>sum+bytes(file),0);
if(totalAssets>18*1024*1024)errors.push(`public/assets is ${(totalAssets/1048576).toFixed(1)} MB; release budget is 18 MB.`);
for(const file of css){
  if(bytes(file)>80*1024)errors.push(`${path.relative(root,file)} is ${Math.round(bytes(file)/1024)} KB; route CSS budget is 80 KB.`);
}
const heroFiles=[
  'public/assets/studio-hero-3d.webp','public/assets/approach-process-3d.webp','public/assets/contact-hero-3d.webp',
  'public/assets/hero-k.jpg','public/assets/pace-hero-proof-art.jpg','public/assets/vx27-hero-rendered.webp',
  'public/assets/veyra-hero-rendered.webp','public/assets/opus-hero-rendered.webp','public/assets/emberlyn-hero-rendered.webp','public/assets/ebuygum-hero-art.jpg'
];
for(const rel of heroFiles){
  const full=path.join(root,rel);if(!fs.existsSync(full)){errors.push(`${rel} is missing.`);continue;}
  if(bytes(full)>600*1024)errors.push(`${rel} is ${Math.round(bytes(full)/1024)} KB; primary hero budget is 600 KB.`);
}
const source=walk(path.join(root,'src')).filter(file=>file.endsWith('.tsx')).map(file=>fs.readFileSync(file,'utf8')).join('\n');
for(const rel of ['brand-opus.png','brand-ebuygum.png','emberlyn-transparent-logo.png','vx27-transparent-logo.png','pace-official-white.png']){
  if(source.includes(rel))errors.push(`${rel} still referenced; optimized WebP replacement expected.`);
}
if(errors.length){console.error('PERFORMANCE BUDGET CHECK FAILED');for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log(`PASS: performance budgets — assets ${(totalAssets/1048576).toFixed(1)} MB, ${css.length} route stylesheets <=80 KB, primary hero files <=600 KB, optimized case-study logos in use.`);
