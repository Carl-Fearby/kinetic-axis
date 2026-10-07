import type { Metadata } from 'next';
import data from './page-meta.json';

export type PageKey = keyof typeof data;
export const pageData = data;
const SITE_URL='https://kineticaxisdigital.com';

export function metadataFor(key: PageKey): Metadata {
  const page=pageData[key];
  const image=page.image;
  const jsonLd=page.jsonLd as readonly Record<string,unknown>[];
  const article=jsonLd.find(item=>item['@type']==='Article');
  const shared={siteName:'Kinetic Axis',locale:'en_GB' as const,title:page.title,description:page.description,url:page.canonical,images:[{url:image,width:1200,height:630,alt:page.imageAlt,type:'image/jpeg'}]};
  return {
    title: page.title,
    description: page.description,
    alternates:{canonical:page.canonical,types:{'application/rss+xml':'/feed.xml'}},
    robots:page.robots || 'index,follow,max-image-preview:large',
    openGraph:article?{
      ...shared,type:'article',
      publishedTime:typeof article.datePublished==='string'?article.datePublished:undefined,
      modifiedTime:typeof article.dateModified==='string'?article.dateModified:undefined,
      authors:['https://kineticaxisdigital.com/studio'],
    }:{...shared,type:'website'},
    twitter:{card:'summary_large_image',title:page.title,description:page.description,images:[image]},
  };
}
export { SITE_URL };
