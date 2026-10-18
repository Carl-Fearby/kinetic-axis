'use client';

import { useEffect, useState } from 'react';

/**
 * Cookie consent for Google Analytics.
 *
 * Google Consent Mode already defaults every storage region to `denied` in
 * public/consent-mode.js, so nothing is written to the visitor's device until
 * they accept here. Declining simply leaves the default in place, and the
 * choice is remembered so the banner does not return on every visit.
 */

const STORAGE_KEY = 'kineticaxis.consent.v1';

type Choice = 'granted' | 'denied';

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

function readChoice(): Choice | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* Storage may be blocked; the banner simply reappears next visit. */
  }
}

function applyConsent(choice: Choice) {
  const win = window as ConsentWindow;
  const update = {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  };
  if (typeof win.gtag === 'function') {
    win.gtag('consent', 'update', update);
    return;
  }
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push(['consent', 'update', update]);
}

export function ConsentBanner() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setReady(true);
    if (stored) applyConsent(stored);
    else setOpen(true);
  }, []);

  const decide = (next: Choice) => {
    writeChoice(next);
    setChoice(next);
    applyConsent(next);
    setOpen(false);
  };

  if (!ready) return null;

  if (open) {
    return (
      <div className="ka-consent" role="region" aria-label="Cookie consent">
        <div className="ka-consent__inner">
          <div className="ka-consent__copy">
            <strong className="ka-consent__title">Cookies on this site</strong>
            <p className="ka-consent__text">
              We use Google Analytics to understand how the site is used. It only stores
              cookies on your device if you accept.{' '}
              <a className="ka-consent__link" href="/cookies">Cookie policy</a>
            </p>
          </div>
          <div className="ka-consent__actions">
            <button type="button" className="ka-consent__button ka-consent__button--quiet" onClick={() => decide('denied')}>
              Decline
            </button>
            <button type="button" className="ka-consent__button ka-consent__button--primary" onClick={() => decide('granted')}>
              Accept analytics
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!choice) return null;
  return null;
}

/** Inline withdraw / re-accept controls, rendered only on the /cookies policy page. */
export function CookieChoices() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setReady(true);
    if (stored) applyConsent(stored);
  }, []);

  const decide = (next: Choice) => { writeChoice(next); setChoice(next); applyConsent(next); };

  if (!ready) return null;
  return (
    <div className="ka-cookie-choices" role="group" aria-label="Cookie choices">
      <span className="ka-cookie-choices__label">
        {choice === 'granted' ? 'Analytics cookies are currently accepted.' : 'Analytics cookies are currently declined.'}
        {' '}Change it here at any time:
      </span>
      <button type="button" className={`ka-cookie-choices__option${choice === 'denied' ? ' ka-cookie-choices__option--active' : ''}`} onClick={() => decide('denied')}>Decline</button>
      <button type="button" className={`ka-cookie-choices__option${choice === 'granted' ? ' ka-cookie-choices__option--active' : ''}`} onClick={() => decide('granted')}>Accept analytics</button>
    </div>
  );
}
