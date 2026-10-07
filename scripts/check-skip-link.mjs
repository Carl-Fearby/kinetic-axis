import fs from 'node:fs';

const pageView = fs.readFileSync('src/components/PageView.tsx', 'utf8');
const css = fs.readFileSync('app/globals.css', 'utf8');

if (!pageView.includes('className="ka-skip-link"')) {
  throw new Error('Skip link markup is missing.');
}
if (!pageView.includes('href="#main-content"')) {
  throw new Error('Skip link does not target #main-content.');
}
if (!css.includes('.ka-skip-link:not(:focus):not(:focus-visible)')) {
  throw new Error('Skip link is not fully hidden while unfocused.');
}
if (!css.includes('clip-path: inset(50%) !important')) {
  throw new Error('Skip link clipping guard is missing.');
}
if (!css.includes('.ka-skip-link:focus')) {
  throw new Error('Skip link focus treatment is missing.');
}
console.log('PASS: skip link stays clipped during overscroll and is revealed on keyboard focus.');
