/**
 * Route-aware replacement for the original one-shot page-motion.js.
 * React re-mounts this on App Router page changes, so animation setup and
 * IntersectionObservers are not stranded on DOM nodes from the previous page.
 */
export function initPageMotion(): () => void {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  if (preference.matches || !('IntersectionObserver' in window)) {
    root.classList.remove('kad-motion-prep','kad-motion-ready');
    return () => {};
  }

  const targets: HTMLElement[] = [];
  const added = new WeakSet<Element>();
  let observer: IntersectionObserver | null = null;
  let runId = 0;
  const frames: number[] = [];
  const add = (selector: string, direction: string, stagger = 0, firstDelay = 0) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((node, index) => {
      if (added.has(node)) return;
      added.add(node);
      node.setAttribute('data-ka-reveal', direction);
      node.style.setProperty('--ka-delay', `${Math.min(firstDelay + index * stagger, 480)}ms`);
      targets.push(node);
    });
  };

  if (document.querySelector('.hero-content')) {
    add('.hero-content .eyebrow, .hero-content h1, .hero-content > p, .hero-actions', 'left',110);
    add('.hero-visual','right');
    add('.strip-label, .strip-items b','up',70);
    add('#services .section-top > div, #approach .section-top > div, #work .section-top > div, #studio .contact-inner > div, #contact .contact-inner > div','left');
    add('#services .section-top > p, #approach .section-top > p, #work .section-top > p, #studio .contact-inner > p, #contact .contact-inner > .button','right',100);
    add('.service, .portfolio-card, .step','up',95);
    add('.work-all','right',0,160);
  } else if (document.querySelector('.pace-hero')) {
    add('.hero-copy .back-link','left');
    add('.hero-copy .pace-mark, .hero-copy .case-mark','left',0,70);
    add('.hero-copy h1','left',0,140);
    add('.hero-copy > p','left',0,200);
    add('.hero-copy .chips','left',0,265);
    add('.hero-copy .actions','left',0,325);
    add('.hero-art','fade',0,110);
    add('.feature-strip .features > .feature','up',80);
    add('.feature-strip .feature-highlight','right',0,200);
    add('.story-layout > :first-child > .eyebrow','left');
    add('.story-layout > :first-child > h2','left',0,70);
    add('.story-layout > :first-child > p','left',90,135);
    add('.story-layout > :first-child > .button','left',0,280);
    add('.story .screens > .screen','up',120,90);
    add('.ka-pace-platform__card','up',85);
    add('.ka-pace-platform__flow','fade',0,160);
    add('.next-section .eyebrow','left');
    add('.next-section h2','left',0,75);
    add('.next-section .next-inner > .button','right',0,145);
  } else {
    add('.mkt-hero .mkt-kicker','left');
    add('.mkt-hero h1','left',0,100);
    add('.mkt-hero .mkt-lead','left',0,180);
    add('.mkt-hero .mkt-actions','left',0,245);
    add('.mkt-hero-art','fade',0,100);
    add('.mkt-sectionhead .mkt-kicker','left');
    add('.mkt-sectionhead h2','left',0,75);
    add('.mkt-sectionhead > p','right',0,100);
    add('.mkt-grid > .mkt-card, .mkt-grid > .mkt-workcard','up',65);
    add('.mkt-process > .mkt-phase','up',90);
    add('.mkt-faq > details','up',35);
    add('.mkt-cta .mkt-kicker','left');
    add('.mkt-cta h2','left',0,80);
    add('.mkt-cta .mkt-btn','right',0,100);
    add('.subhero .eyebrow','left');
    add('.subhero h1','left',0,100);
    add('.subhero p','left',0,195);
    add('.subhero .ka-feature-actions','left',0,275);
    add('.subhero .ka-feature-footnote','left',0,335);
    add('.subhero .ka-hero-scene','fade',0,140);
    add('.subsection .project-link','up',85);
    add('.subsection .mini-card, .subsection .service-detail','up',95);
    add('.subsection .case-grid .eyebrow','left');
    add('.subsection .case-grid h2','left',0,85);
    add('.subsection .case-grid p','left',95,135);
    add('.subsection .case-grid img, .subsection .case-image','right',85,120);
    add('.subsection .contact-panel .eyebrow','left');
    add('.subsection .contact-panel h2','left',0,80);
    add('.subsection .contact-panel p','left',80,135);
    add('.subsection .contact-panel a','up',75,190);
    add('.kad-contact-intro .eyebrow','left');
    add('.kad-contact-intro h2','left',0,75);
    add('.kad-contact-intro p','left',80,125);
    add('.kad-form','right',0,90);
    add('.kad-legal-article section','up',55);
    add('.subcta .eyebrow','left');
    add('.subcta h2','left',0,75);
    add('.subcta .button','right',0,145);
  }
  if (!targets.length) {
    root.classList.remove('kad-motion-prep','kad-motion-ready');
    return () => {};
  }
  function schedule(fn: FrameRequestCallback) {
    frames.push(requestAnimationFrame(fn));
  }
  function start(reset=false) {
    const id = ++runId;
    observer?.disconnect();
    if (reset) targets.forEach(node => node.classList.remove('ka-is-visible'));
    root.classList.remove('kad-motion-ready');
    root.classList.add('kad-motion-prep');
    void targets[0]?.getBoundingClientRect().width;
    schedule(() => {
      if (id!==runId) return;
      schedule(() => {
        if (id!==runId) return;
        root.classList.replace('kad-motion-prep','kad-motion-ready');
        schedule(() => {
          if (id!==runId) return;
          if (preference.matches) {
            root.classList.remove('kad-motion-ready'); return;
          }
          const active = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;
              (entry.target as HTMLElement).classList.add('ka-is-visible');
              active.unobserve(entry.target);
            });
          }, {threshold:0.07,rootMargin:'0px 0px -24px 0px'});
          observer=active;
          targets.forEach(node => {
            if (!node.classList.contains('ka-is-visible')) active.observe(node);
          });
        });
      });
    });
  }
  function onShow(event: PageTransitionEvent) {
    if (event.persisted && !preference.matches) start(true);
  }
  function onPreference(event: MediaQueryListEvent) {
    if (event.matches) {
      ++runId; observer?.disconnect();
      root.classList.remove('kad-motion-prep','kad-motion-ready');
      targets.forEach(node => node.classList.remove('ka-is-visible'));
    } else start(true);
  }
  window.addEventListener('pageshow',onShow);
  preference.addEventListener?.('change',onPreference);
  start();
  return () => {
    ++runId;
    frames.forEach(frame => cancelAnimationFrame(frame));
    observer?.disconnect();
    root.classList.remove('kad-motion-prep','kad-motion-ready');
    window.removeEventListener('pageshow',onShow);
    preference.removeEventListener?.('change',onPreference);
    targets.forEach(node => {
      node.classList.remove('ka-is-visible');
      node.removeAttribute('data-ka-reveal');
      node.style.removeProperty('--ka-delay');
    });
  };
}
