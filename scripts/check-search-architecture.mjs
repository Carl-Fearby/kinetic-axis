import fs from 'node:fs';
const meta=JSON.parse(fs.readFileSync('src/content/page-meta.json','utf8'));
const clusters=JSON.parse(fs.readFileSync('src/content/search-clusters.json','utf8'));
const errors=[];
const mapped=new Map();
for(const [id,cluster] of Object.entries(clusters)){
  if(!meta[cluster.primary]) errors.push(`${id}: missing primary page ${cluster.primary}`);
  if(!cluster.members.includes(cluster.primary)) errors.push(`${id}: primary is not a member`);
  if(cluster.links.length < 4) errors.push(`${id}: fewer than four contextual links`);
  for(const key of cluster.members){
    if(!meta[key]) errors.push(`${id}: unknown member ${key}`);
    if(mapped.has(key)) errors.push(`${key}: mapped to both ${mapped.get(key)} and ${id}`);
    else mapped.set(key,id);
  }
  for(const item of cluster.links){ if(!meta[item.key]) errors.push(`${id}: unknown link ${item.key}`); }
}
const priority=[
 'web-app-development','bespoke-software-development','business-software-development','internal-business-systems',
 'api-systems-integration','nodejs-api-development','ui-ux-design-systems','design-system-development',
 'react-component-library-development','hospitality-software-development','restaurant-app-development',
 'booking-system-development','mobile-app-development','marketplace-development','saas-product-development'
];
for(const key of priority){ if(!mapped.has(key)) errors.push(`${key}: priority commercial page has no search cluster`); }
if(errors.length){ console.error('SEARCH ARCHITECTURE CHECK FAILED'); errors.forEach(e=>console.error(`- ${e}`)); process.exit(1); }
console.log(`PASS: ${Object.keys(clusters).length} search clusters map ${mapped.size} pages with explicit primary intent and contextual links.`);
