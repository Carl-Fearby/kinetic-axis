import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const refs=new Set();
function walk(dir,fn){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full,fn);else fn(full);}}
for(const base of ['app','src']) walk(base,file=>{if(!/\.(?:ts|tsx|js|mjs|css|json)$/.test(file))return;const text=fs.readFileSync(file,'utf8');for(const match of text.matchAll(/\/assets\/[A-Za-z0-9_./-]+/g))refs.add(match[0]);});
walk('public/page-css',file=>{if(!file.endsWith('.css'))return;const text=fs.readFileSync(file,'utf8');for(const match of text.matchAll(/url\(\s*['"]?(\/assets\/[A-Za-z0-9_./-]+)['"]?\s*\)/g))refs.add(match[1]);});
const missing=[];for(const ref of refs){const file=path.join(root,'public',ref.replace(/^\//,''));if(!fs.existsSync(file))missing.push(ref);}
if(missing.length)throw new Error(`Missing referenced assets:\n${missing.join('\n')}`);
console.log(`PASS: ${refs.size} live app/CSS asset references resolve to files.`);
