/* Google Consent Mode v2.
 *
 * This file is loaded as a classic script immediately before the Google Tag
 * Manager bootstrap so that the consent default is on the dataLayer before
 * gtm.js evaluates any tags. Until a visitor explicitly opts in on the cookie
 * banner, every advertising/analytics storage region is denied, which makes
 * Google tags run in cookieless mode: no _ga or _ga_<id> cookie is written.
 */
window.dataLayer = window.dataLayer || [];
window.gtag = function () {
  window.dataLayer.push(arguments);
};

window.gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});

/* Recall a choice the visitor already made so returning visits do not have to
 * answer the banner again. A stored 'granted' only ever originates from an
 * explicit accept in ConsentBanner.tsx. */
try {
  if (window.localStorage.getItem('kineticaxis.consent.v1') === 'granted') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (error) {
  /* Storage can be blocked entirely; staying denied is the safe outcome. */
}
