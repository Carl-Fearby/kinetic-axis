import fs from 'node:fs';
import path from 'node:path';

const required = [
  'src/components/PageView.tsx',
  'src/components/RouteTransitions.tsx',
  'src/content/page-meta.ts',
  'src/content/page-registry.ts',
  'app/layout.tsx',
  'app/studio/page.tsx',
  'app/insights/page.tsx',
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required module: ${file}`);
}

const roots = ['app', 'src'];
const offenders = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry.name)) {
      const source = fs.readFileSync(full, 'utf8');
      if (source.includes('@/')) offenders.push(full);
    }
  }
}

roots.forEach(walk);
if (offenders.length) {
  throw new Error(`Path-alias imports remain:\n${offenders.join('\n')}`);
}

console.log(`PASS: required modules exist and app/src contain no @/ path-alias imports.`);
