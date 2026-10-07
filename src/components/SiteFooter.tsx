import Link from 'next/link';

const workLinks = [
  ['/work', 'Case studies'],
  ['/projects/pace', 'Pace Venues'],
  ['/projects/ebuygum', 'eBuyGum'],
  ['/projects/opus', 'OPUS React'],
  ['/projects/vx27', 'VX-27'],
] as const;

const serviceLinks = [
  ['/web-design', 'Web design'],
  ['/bespoke-software-development', 'Bespoke development'],
  ['/web-app-development', 'Web app development'],
  ['/mobile-app-development', 'Mobile app development'],
  ['/ui-ux-design-systems', 'UI/UX & design systems'],
  ['/digital-product-development', 'Digital product development'],
  ['/platforms-back-office-systems', 'Platforms & back-office'],
  ['/api-systems-integration', 'API & integrations'],
] as const;

const companyLinks = [
  ['/solutions', 'Solutions'],
  ['/insights', 'Insights'],
  ['/approach', 'Our approach'],
  ['/project-planner', 'Project planner'],
  ['/project-estimator', 'Project estimator'],
  ['/studio', 'The studio'],
  ['/experience', 'Experience'],
  ['/experiments', 'Experiments'],
  ['/contact', 'Contact'],
  ['/privacy', 'Privacy policy'],
  ['/terms', 'Terms & conditions'],
] as const;

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19 19 5M10 5h9v9"/></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 5.5h17v13h-17zM4.5 7l7.5 6 7.5-6"/></svg>;
}

function PhoneIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7.1 3.7 4.3 5.1c-.9.5-1.3 1.6-.9 2.5 2.2 5.5 7.5 10.8 13 13 .9.4 2 0 2.5-.9l1.4-2.8-4.5-2.3-1.5 2.1c-3.2-1.5-5.5-3.8-7-7l2.1-1.5z"/></svg>;
}

function FacebookIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13.8 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2H8v3h2.6v8z"/></svg>;
}

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.4" cy="6.8" r="1" className="ka-social-dot"/></svg>;
}

function LinkedInIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.2 8.4V19M6.2 5.2v.1M10.3 19v-6.1c0-2.6 4.9-3.2 4.9.2V19M15.2 19v-5.7"/></svg>;
}

function YouTubeIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3.8 8.2c.2-1.4 1.1-2.4 2.5-2.6 3.8-.5 7.6-.5 11.4 0 1.4.2 2.3 1.2 2.5 2.6.3 2.5.3 5.1 0 7.6-.2 1.4-1.1 2.4-2.5 2.6-3.8.5-7.6.5-11.4 0-1.4-.2-2.3-1.2-2.5-2.6-.3-2.5-.3-5.1 0-7.6Z"/><path d="m10 9 5 3-5 3Z"/></svg>;
}

function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return <nav className="ka-footer-v1__column" aria-label={title}>
    <h2>{title}</h2>
    <div className="ka-footer-v1__links">
      {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
    </div>
  </nav>;
}

export function SiteFooter() {
  return <footer className="kad-footer ka-footer-v1" id="site-footer">
    <div className="ka-footer-v1__accent" aria-hidden="true">
      <span className="ka-footer-v1__beam ka-footer-v1__beam--one" />
      <span className="ka-footer-v1__beam ka-footer-v1__beam--two" />
      <span className="ka-footer-v1__beam ka-footer-v1__beam--three" />
    </div>
    <div className="ka-footer-v1__wrap">
      <div className="ka-footer-v1__grid">
        <div className="ka-footer-v1__brand">
          <Link href="/" className="ka-footer-v1__wordmark" aria-label="Kinetic Axis home">
            <img
              className="ka-footer-v1__logo"
              src="/assets/wordmark-footer.png"
              alt="Kinetic Axis"
              width={643}
              height={178}
            />
          </Link>
          <p>Independent digital studio. Websites, applications and purposeful digital experiences — designed and built.</p>

          <div className="ka-footer-v1__contact">
            <a href="mailto:hello@kineticaxisdigital.co.uk"><span className="ka-footer-v1__contact-icon"><MailIcon /></span><span>hello@kineticaxisdigital.co.uk</span></a>
            <a href="tel:+447940147138"><span className="ka-footer-v1__contact-icon"><PhoneIcon /></span><span>07940 147 138</span></a>
          </div>

          <div className="ka-footer-v1__socials" aria-label="Social media">
            <a className="ka-footer-v1__social-live" href="https://www.facebook.com/profile.php?id=61594691471404" target="_blank" rel="noreferrer" aria-label="Kinetic Axis on Facebook"><FacebookIcon /></a>
            <div className="ka-footer-v1__social-coming" aria-label="More social channels coming soon">
              <span className="ka-footer-v1__social-disabled" aria-label="Instagram — coming soon"><InstagramIcon /></span>
              <span className="ka-footer-v1__social-disabled" aria-label="LinkedIn — coming soon"><LinkedInIcon /></span>
              <span className="ka-footer-v1__social-disabled" aria-label="YouTube — coming soon"><YouTubeIcon /></span>
              <span className="ka-footer-v1__coming-label">Coming soon</span>
            </div>
          </div>
        </div>

        <FooterColumn title="Our work" links={workLinks} />
        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Company" links={companyLinks} />

        <div className="ka-footer-v1__cta">
          <h2>Let’s create<br/>something brilliant.</h2>
          <p>Tell us what you need to improve or create. Senior product and technical thinking starts with the first conversation.</p>
          <Link href="/contact" className="ka-footer-v1__cta-button"><span>Let’s talk</span><ArrowIcon /></Link>
        </div>
      </div>

      <div className="ka-footer-v1__bottom">
        <span>© 2026 Kinetic Axis. All rights reserved.</span>
        <nav aria-label="Footer legal links">
          <Link href="/privacy">Privacy policy</Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms">Terms &amp; conditions</Link>
          <span aria-hidden="true">|</span>
          <Link href="/cookies">Cookies</Link>
          <span aria-hidden="true">|</span>
          <Link href="/sitemap">Sitemap</Link>
          <span aria-hidden="true">|</span>
          <a href="/feed.xml" type="application/rss+xml">RSS</a>
        </nav>
      </div>
    </div>
  </footer>;
}
