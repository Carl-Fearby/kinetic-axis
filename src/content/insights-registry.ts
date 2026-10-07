import registry from './insights-registry.json';

export type InsightLink={href:string;title:string};
export type InsightRegistryEntry={
  slug:string;
  href:string;
  title:string;
  description:string;
  topic:string;
  updated:string;
  published:string;
  image:string;
  relatedServices:InsightLink[];
  relatedCaseStudies:InsightLink[];
};

export const INSIGHTS=registry as InsightRegistryEntry[];
export const INSIGHT_BY_SLUG=new Map(INSIGHTS.map(entry=>[entry.slug,entry]));

export function relatedInsights(slug:string,limit=3){
  const current=INSIGHT_BY_SLUG.get(slug);
  if(!current)return [];
  const serviceHrefs=new Set(current.relatedServices.map(item=>item.href));
  return INSIGHTS.filter(item=>item.slug!==slug)
    .map(item=>({item,score:(item.topic===current.topic?4:0)+item.relatedServices.reduce((sum,service)=>sum+(serviceHrefs.has(service.href)?2:0),0)}))
    .sort((a,b)=>b.score-a.score || b.item.updated.localeCompare(a.item.updated) || a.item.title.localeCompare(b.item.title))
    .slice(0,limit)
    .map(row=>row.item);
}
