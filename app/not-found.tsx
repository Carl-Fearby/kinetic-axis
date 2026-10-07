import Link from 'next/link';
import { SiteHeader } from '../src/components/SiteHeader';
import { SiteFooter } from '../src/components/SiteFooter';
import { SiteRuntime } from '../src/components/SiteRuntime';
import { pageStylesheetHref } from '../src/lib/page-css';

export default function NotFound() {
  const shellCssHref = pageStylesheetHref('/');
  const pageCssHref = pageStylesheetHref('/404');
  // Injected as markup rather than React <link> elements: the not-found tree is
  // embedded in every page's flight payload, so React/Next hoists these
  // stylesheets into each page's <head> as <link rel="preload" as="style">
  // tags that page never applies (measured on 83 of 84 exported pages, wasting
  // a 48 KB index.css fetch per view). Raw markup is not hoisted, so the preloads
  // disappear while the 404 page keeps exactly the same stylesheet links.
  const pageStylesheets = `<link rel="stylesheet" href="${shellCssHref}" data-ka-page-stylesheet="404-shell" /><link rel="stylesheet" href="${pageCssHref}" data-ka-page-stylesheet="404" />`;
  return <div className="site-root ka-not-found-page" data-ka-page="404">
    <div dangerouslySetInnerHTML={{ __html: pageStylesheets }} />
    <a className="ka-skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader pageKey="404"/>
    <main className="ka-not-found" id="main-content" tabIndex={-1}>
      <div className="ka-not-found__inner">
        <span>404 / WRONG AXIS</span>
        <h1>This route doesn&apos;t lead anywhere useful.</h1>
        <p>The page may have moved, the address may be incomplete, or Apple may have walked across the keyboard again.</p>
        <div className="ka-not-found__actions">
          <Link href="/" className="mkt-btn">Back to the homepage</Link>
          <Link href="/services" className="mkt-btn mkt-btn--outline">Explore services</Link>
          <Link href="/contact" className="mkt-btn mkt-btn--outline">Contact Kinetic Axis</Link>
        </div>
      </div>
    </main>
    <SiteFooter/>
    <SiteRuntime pageKey="404"/>
  </div>;
}
