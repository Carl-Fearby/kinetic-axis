import Link from 'next/link';
import type { PageKey } from '../content/page-meta';
import clusters from '../content/search-clusters.json';

type ClusterLink = {key:string; role:string; title:string; text:string};
type Cluster = {
  eyebrow:string;
  title:string;
  intro:string;
  primary:string;
  members:string[];
  links:ClusterLink[];
};

const clusterEntries = Object.entries(clusters as Record<string, Cluster>);

function Arrow(){
  return <svg aria-hidden="true" className="ka-heavy-arrow ka-heavy-arrow--right" fill="none" height={18}
    stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
    viewBox="0 0 24 24" width={18}><path d="M4 12h16m-7-7 7 7-7 7"/></svg>;
}

export function SearchClusterLinks({pageKey}:{pageKey:PageKey}){
  const found = clusterEntries.find(([,cluster]) => cluster.members.includes(pageKey));
  if (!found) return null;
  const [,cluster] = found;
  // Rotate the list from just after the current page so each member sees its
  // neighbouring cluster pages (e.g. sibling town pages) instead of always the
  // first four links in the cluster.
  const idx = cluster.links.findIndex(item => item.key === pageKey);
  const rotated = idx < 0 ? cluster.links : [...cluster.links.slice(idx + 1), ...cluster.links.slice(0, idx + 1)];
  const suggestions = rotated.filter(item => item.key !== pageKey).slice(0,4);
  return <nav className="ka-search-cluster" aria-label={`Related ${cluster.eyebrow.toLowerCase()} pages`}>
    <div className="ka-search-cluster__inner">
      <div className="ka-search-cluster__head">
        <div><span>{cluster.eyebrow} / EXPLORE THE TOPIC</span><h2>{cluster.title}</h2></div>
        <p>{cluster.intro}</p>
      </div>
      <div className="ka-search-cluster__grid">
        {suggestions.map(item => <Link href={`/${item.key}`} className="ka-search-cluster__card" key={item.key}>
          <small>{item.role}</small><strong>{item.title}</strong><span>{item.text}</span><b>Explore <Arrow/></b>
        </Link>)}
      </div>
    </div>
  </nav>;
}
