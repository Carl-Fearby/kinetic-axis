import { PAGES } from '../content/page-registry';
import { pageData, type PageKey } from '../content/page-meta';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SiteRuntime } from './SiteRuntime';
import { pageStylesheetHref, PAGE_CSS_VERSION } from '../lib/page-css';
import { SearchClusterLinks } from './SearchClusterLinks';

/** One layout for all App Router routes, with their existing page-specific design CSS. */
export function PageView({pageKey}: {pageKey:PageKey}) {
  const page=pageData[pageKey];
  const Content=PAGES[pageKey];
  const cssName=pageKey.replaceAll('/','--');
  const cssHref=pageStylesheetHref(pageKey === 'index' ? '/' : `/${pageKey}`);
  return <div className={['site-root',...page.bodyClasses].join(' ')} data-ka-page={pageKey}>
    <link rel="stylesheet" href={cssHref} data-ka-page-stylesheet={cssName} />
    {/* Build-time optimised project-card artwork (root/only route CSS keeps the original JPGs). */}
    <link rel="stylesheet" href={`/page-css/optimized-images.css?v=${encodeURIComponent(PAGE_CSS_VERSION)}`} data-ka-page-stylesheet="optimized-images" />
    <a className="ka-skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader pageKey={pageKey} project={page.isProject}/>
    <Content/>
    <SearchClusterLinks pageKey={pageKey}/>
    <SiteFooter/>
    {/* Generated structured data remains valid and unchanged. */}
    {page.jsonLd.map((obj,i)=><script key={i} type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(obj).replace(/</g,'\\u003c')}}/>)}
    <SiteRuntime key={pageKey} pageKey={pageKey}/>
  </div>;
}
