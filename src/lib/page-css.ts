/**
 * Cache-busted route stylesheet URLs.
 *
 * Public files are not content-hashed by Next.js. Production deploys set
 * NEXT_PUBLIC_KA_ASSET_VERSION to the release timestamp so browsers cannot
 * reuse an older /page-css/*.css file after a deployment.
 */
export const PAGE_CSS_VERSION = process.env.NEXT_PUBLIC_KA_ASSET_VERSION || 'local-dev';

export function pageStylesheetHref(pathname: string) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  const key = clean ? clean.replaceAll('/', '--') : 'index';
  return `/page-css/${key}.css?v=${encodeURIComponent(PAGE_CSS_VERSION)}`;
}
