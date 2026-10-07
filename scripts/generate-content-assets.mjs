import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const registry=JSON.parse(fs.readFileSync(path.join(root,'src/content/insights-registry.json'),'utf8'));
const esc=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const base='https://kineticaxisdigital.com';
const items=[...registry].sort((a,b)=>String(b.updated).localeCompare(String(a.updated))||a.title.localeCompare(b.title)).map(item=>`  <item>\n    <title>${esc(item.title)}</title>\n    <link>${base}${esc(item.href)}</link>\n    <guid isPermaLink="true">${base}${esc(item.href)}</guid>\n    <description>${esc(item.description)}</description>\n    <category>${esc(item.topic)}</category>\n    <pubDate>${new Date(item.updated+'T12:00:00Z').toUTCString()}</pubDate>\n  </item>`).join('\n');
const newest=registry.reduce((latest,item)=>item.updated>latest?item.updated:latest,'2026-10-01');
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>Kinetic Axis Insights</title>\n  <link>${base}/insights</link>\n  <description>Practical guides for planning websites, software, apps and digital products.</description>\n  <language>en-gb</language>\n  <lastBuildDate>${new Date(newest+'T12:00:00Z').toUTCString()}</lastBuildDate>\n  <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>\n${items}\n</channel>\n</rss>\n`;
fs.writeFileSync(path.join(root,'public/feed.xml'),xml);
console.log(`Generated RSS feed with ${registry.length} insight entries.`);
