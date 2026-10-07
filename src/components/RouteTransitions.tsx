'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { pageStylesheetHref } from '../lib/page-css';

const FLUID_PATH = '/experiments/fluid-dynamics';
const EXIT_NAV_DELAY = 85;
const STYLE_REVEAL_TIMEOUT = 220;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function transitionSurface() {
  return document.getElementById('ka-route-shell');
}

function isFluidPage(pathname: string) {
  return pathname === FLUID_PATH || pathname.startsWith(`${FLUID_PATH}/`);
}

function absoluteHref(href: string) {
  return new URL(href, window.location.origin).href;
}

function stylesheetIsApplied(href: string) {
  const wanted = absoluteHref(href);
  return Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .some(link => link.href === wanted && Boolean(link.sheet));
}

/** Warm route CSS in the background. Never delay a click for this request. */
function preloadStylesheet(href: string) {
  const wanted = absoluteHref(href);
  const exists = Array.from(document.querySelectorAll<HTMLLinkElement>('link[href]'))
    .some(link => link.href === wanted && (link.rel === 'stylesheet' || (link.rel === 'preload' && link.as === 'style')));

  if (exists) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.dataset.kaPagePreload = 'true';
  document.head.appendChild(link);
}

/**
 * Give a committed route a very short chance to attach its page stylesheet while
 * the persistent shell is already faded out. The navigation itself is never held
 * up by this check, and the timeout is deliberately small to keep routing snappy.
 */
function waitForAppliedStylesheet(href: string) {
  if (stylesheetIsApplied(href)) return Promise.resolve();

  return new Promise<void>(resolve => {
    const started = performance.now();

    const check = () => {
      if (stylesheetIsApplied(href) || performance.now() - started >= STYLE_REVEAL_TIMEOUT) {
        requestAnimationFrame(() => resolve());
        return;
      }
      requestAnimationFrame(check);
    };

    check();
  });
}

function internalDestination(anchor: HTMLAnchorElement) {
  const rawHref = anchor.getAttribute('href');
  if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return null;

  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return url;
  } catch {
    return null;
  }
}

/**
 * Full-shell App Router transitions.
 *
 * The transition surface now lives in the persistent root layout, rather than
 * inside each PageView. That means the contact strip, header/navigation, page
 * content and footer all share one compositor layer and fade together in both
 * development and production.
 *
 * A click starts the exit fade immediately. Navigation begins 85ms later — enough
 * for the fade to be visible, but far shorter than a perceptible network wait.
 * Route/CSS prefetching happens independently and is never awaited before push().
 */
export function RouteTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const firstRender = useRef(true);
  const navigating = useRef(false);
  const waitingForRoute = useRef<string | null>(null);
  const warmRoutes = useRef(new Set<string>());
  const pushTimer = useRef<number | null>(null);

  const warmUrl = (url: URL, prefetchRoute = true) => {
    if (url.pathname === window.location.pathname) return;

    const destination = `${url.pathname}${url.search}`;
    if (!warmRoutes.current.has(destination)) {
      warmRoutes.current.add(destination);
      preloadStylesheet(pageStylesheetHref(url.pathname));
    }

    if (prefetchRoute) router.prefetch(destination);
  };

  // Fade the persistent shell back in only after the destination tree commits.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const surface = transitionSurface();
    if (!surface) return;

    const expected = waitingForRoute.current;

    // Browser back/forward or navigation initiated elsewhere. We cannot animate
    // the old route out first, but a restrained whole-shell settle keeps it smooth.
    if (!expected || expected !== pathname) {
      if (prefersReducedMotion() || isFluidPage(pathname)) return;

      const settle = surface.animate(
        [{ opacity: 0.88 }, { opacity: 1 }],
        { duration: 220, easing: 'cubic-bezier(.16,1,.3,1)' },
      );
      return () => settle.cancel();
    }

    let cancelled = false;
    const href = pageStylesheetHref(pathname);

    void waitForAppliedStylesheet(href).then(() => {
      if (cancelled || waitingForRoute.current !== pathname) return;

      waitingForRoute.current = null;

      // Two frames makes the zero-opacity state deterministic before the class is
      // removed, so the browser always has a real 0 -> 1 transition to animate.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          surface.classList.remove('ka-route-leaving');
          navigating.current = false;
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    const warmFromEvent = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.hasAttribute('download')) return;
      if (anchor.target && anchor.target.toLowerCase() !== '_self') return;

      const url = internalDestination(anchor);
      if (url) warmUrl(url, true);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.hasAttribute('download')) return;
      if (anchor.dataset.noPageTransition !== undefined) return;
      if (anchor.target && anchor.target.toLowerCase() !== '_self') return;

      const url = internalDestination(anchor);
      if (!url) return;

      const current = new URL(window.location.href);

      // Do not run the full-shell fade for a navigation that stays on the same
      // pathname (for example /contact?from=planner -> /contact, or a hash link).
      // usePathname() does not change for those navigations, so starting the exit
      // fade here would leave the persistent route shell at opacity: 0. Let Next
      // handle the query/hash update normally instead.
      if (url.pathname === current.pathname) {
        const surface = transitionSurface();
        surface?.classList.remove('ka-route-leaving');
        navigating.current = false;
        waitingForRoute.current = null;
        return;
      }

      if (navigating.current) {
        event.preventDefault();
        return;
      }

      const destination = `${url.pathname}${url.search}${url.hash}`;
      const animate = !prefersReducedMotion() && !isFluidPage(current.pathname) && !isFluidPage(url.pathname);

      // Fluid Dynamics deliberately opts out of shell transitions.
      if (!animate) return;

      event.preventDefault();
      event.stopPropagation();

      const surface = transitionSurface();
      if (!surface) {
        router.push(destination);
        return;
      }

      navigating.current = true;
      waitingForRoute.current = url.pathname;

      // Warm CSS and the RSC route immediately, but never await either one.
      warmUrl(url, true);

      // Because this wrapper is in RootLayout it cannot be replaced during the
      // route change, so the header/navigation now participate in the same fade.
      surface.classList.add('ka-route-leaving');

      if (pushTimer.current !== null) window.clearTimeout(pushTimer.current);
      pushTimer.current = window.setTimeout(() => {
        pushTimer.current = null;
        router.push(destination);
      }, EXIT_NAV_DELAY);
    };

    // Warm rendered destinations after the critical paint window. Pointer/focus
    // interactions still warm immediately, but bulk warming no longer competes
    // with the page hero, fonts and other LCP-critical resources.
    const warmTimer = window.setTimeout(() => {
      const seen = new Set<string>();
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(anchor => {
        if (anchor.hasAttribute('download')) return;
        if (anchor.target && anchor.target.toLowerCase() !== '_self') return;
        const url = internalDestination(anchor);
        if (!url) return;
        const key = `${url.pathname}${url.search}`;
        if (seen.has(key)) return;
        seen.add(key);
        warmUrl(url, false);
      });
    }, 1200);

    document.addEventListener('pointerover', warmFromEvent, true);
    document.addEventListener('pointerdown', warmFromEvent, true);
    document.addEventListener('focusin', warmFromEvent, true);
    document.addEventListener('click', onClick, true);

    return () => {
      window.clearTimeout(warmTimer);
      if (pushTimer.current !== null) window.clearTimeout(pushTimer.current);
      document.removeEventListener('pointerover', warmFromEvent, true);
      document.removeEventListener('pointerdown', warmFromEvent, true);
      document.removeEventListener('focusin', warmFromEvent, true);
      document.removeEventListener('click', onClick, true);
    };
  }, [router]);

  return null;
}
