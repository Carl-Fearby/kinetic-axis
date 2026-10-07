import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ConversationCTA } from '../../components/ConversationCTA';

const areas = [
  { href: '/web-design-coventry', label: 'COVENTRY', title: 'Web design', text: 'Websites for Coventry businesses, practices and organisations — structure, design and build in one team.' },
  { href: '/software-development-coventry', label: 'COVENTRY', title: 'Bespoke software', text: 'Operational software, portals and integration for Coventry teams replacing spreadsheets and ageing systems.' },
  { href: '/web-design-birmingham', label: 'BIRMINGHAM', title: 'Web design', text: 'Custom websites for Birmingham organisations competing at second-city scale.' },
  { href: '/web-app-development-birmingham', label: 'BIRMINGHAM', title: 'Web application development', text: 'Portals, dashboards and connected browser products for Birmingham businesses and their customers.' },
  { href: '/software-web-app-development-warwickshire', label: 'WARWICKSHIRE', title: 'Software & web apps', text: 'The regional route across web applications, software, mobile and integration.' },
  { href: '/bespoke-software-development-warwickshire', label: 'WARWICKSHIRE', title: 'Bespoke software', text: 'Purpose-built systems for organisations across Warwickshire and the county towns.' },
  { href: '/mobile-app-development-midlands', label: 'MIDLANDS', title: 'Mobile app development', text: 'iOS and Android products for customer, loyalty and workforce journeys across the Midlands.' },
  { href: '/web-design-software-rugby', label: 'RUGBY', title: 'Web design & software', text: 'Websites, web apps and bespoke software for Rugby organisations across the M45 corridor.' },
  { href: '/web-design-software-warwick', label: 'WARWICK', title: 'Web design & software', text: 'Websites, portals and systems for the county town’s practices, venues and independents.' },
  { href: '/web-design-software-leamington-spa', label: 'LEAMINGTON SPA', title: 'Web design & software', text: 'Design-literate websites and products for Silicon Spa studios and Leamington businesses.' },
  { href: '/web-design-software-nuneaton', label: 'NUNEATON', title: 'Web design & software', text: 'Websites, portals and operational software for Nuneaton manufacturers and suppliers.' },
  { href: '/web-design-software-solihull', label: 'SOLIHULL', title: 'Web design & software', text: 'Websites and systems for Solihull organisations between Birmingham and Warwickshire.' },
  { href: '/contact', label: 'ACROSS THE UK', title: 'Start a conversation', text: 'Based in Warwickshire, working with organisations locally and across the UK — remote-first, on-site when it helps.' },
];

const surroundings = [
  { title: 'Kenilworth', text: 'Small businesses and established firms who want senior people close to the work.' },
  { title: 'Redditch', text: 'Manufacturing, retail and B2B suppliers serving national markets from a local base.' },
  { title: 'Elsewhere in the Midlands', text: 'Regular remote delivery with on-site workshops wherever a project genuinely needs them.' },
];

const faqs = [
  { q: 'Are you a local Coventry and Birmingham agency?', a: 'Kinetic Axis is an independent studio based in Warwickshire, working across Coventry, Birmingham and the wider Midlands. Being local means workshops, discovery sessions and stakeholder meetings can happen in person when that is useful — while day-to-day delivery runs efficiently online.' },
  { q: 'Do you travel for project workshops?', a: 'Yes. Kick-off, discovery and review sessions can run at your offices anywhere in the Midlands. Most of the remaining delivery happens remotely with scheduled checkpoints, so you get senior attention without paying for travel time.' },
  { q: 'Which services do you provide across these areas?', a: 'The same full capability everywhere: web design, bespoke software, web applications, mobile apps, design systems and integration work — with local context applied to how each organisation buys and adopts digital products.' },
  { q: 'Can you support the site or product after launch?', a: 'Yes. Ongoing development, hosting, support and iterative improvement are available for everything we build, with handover documentation if your team prefers to take it in-house.' },
];

export default function PageContent() {
  return (
    <main className="mkt-page seo-page" id="main-content" tabIndex={-1}>
      <section className="mkt-hero">
        <div className="mkt-wrap mkt-hero-grid">
          <div>
            <Breadcrumbs className="ka-crumb" items={[
              { label: 'Home', href: '/' },
              { label: 'Areas we serve' },
            ]} />
            <div className="mkt-kicker">LOCAL DELIVERY / MIDLANDS</div>
            <h1>Areas we serve. <em>Coventry, Birmingham and Warwickshire.</em></h1>
            <p className="mkt-lead">An independent Warwickshire studio delivering web design, software and digital products for organisations across the Midlands — close enough to meet, experienced enough to deliver remotely.</p>
            <div className="mkt-actions">
              <Link href={'/contact?service=' + encodeURIComponent('Web design')} className="mkt-btn">
                <span className="kad-cta-label">Discuss your project</span>
              </Link>
              <Link href={'/project-planner'} className="mkt-btn mkt-btn--outline" data-ka-track="high-intent-planning-cta">
                <span className="kad-cta-label">Plan the project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-wrap mkt-introgrid">
          <div>
            <div className="mkt-kicker">WHERE WE WORK</div>
            <h2>Local context, senior delivery, no commuter overhead.</h2>
          </div>
          <div className="mkt-article">
            <p>Kinetic Axis is led by a developer and designer with more than 30 years of hands-on experience, based in Warwickshire and working with organisations across Coventry, Birmingham, the county towns and the wider Midlands.</p>
            <p>Local does not mean smaller. Projects run with the same senior people from first conversation to launch — the geography only changes where workshops and on-site sessions genuinely improve the outcome. Everything else runs remotely with clear checkpoints, shared previews and direct access to the person doing the work.</p>
            <Link href={'/studio'} className="mkt-textlink">About the studio</Link>
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section--tint">
        <div className="mkt-wrap">
          <div className="mkt-sectionhead">
            <div>
              <div className="mkt-kicker">DEDICATED AREA PAGES</div>
              <h2>Explore the service that matches your location and need.</h2>
            </div>
            <p>Each area page covers the specific services, buying considerations and delivery approach for that market.</p>
          </div>
          <div className="mkt-grid mkt-grid--four">
            {areas.map(area => (
              <Link href={area.href} className="mkt-card" key={area.href}>
                <span className="mkt-num">{area.label}</span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
                <span className="mkt-textlink">View page</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-wrap">
          <div className="mkt-sectionhead">
            <div>
              <div className="mkt-kicker">SURROUNDING AREAS</div>
              <h2>Also working across the surrounding towns and counties.</h2>
            </div>
            <p>Regular on-site and remote delivery for organisations throughout Warwickshire and the West Midlands.</p>
          </div>
          <div className="mkt-grid mkt-grid--four">
            {surroundings.map(item => (
              <article className="mkt-card" key={item.title}>
                <span className="mkt-num">MIDLANDS</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section--dark">
        <div className="mkt-wrap">
          <div className="mkt-sectionhead">
            <div>
              <div className="mkt-kicker">HOW LOCAL DELIVERY WORKS</div>
              <h2>Close when it counts, remote the rest of the time.</h2>
            </div>
            <p>A delivery model built around getting decisions made quickly, wherever the people involved happen to sit.</p>
          </div>
          <div className="mkt-grid mkt-grid--four seo-dark-cards">
            <article className="seo-dark-card"><span>01</span><h3>Meet in person</h3><p>Kick-off, discovery and key reviews can run at your offices across Coventry, Birmingham or the county towns.</p></article>
            <article className="seo-dark-card"><span>02</span><h3>Work in the open</h3><p>Shared previews, regular checkpoints and direct access to the person doing the work — no account-manager relay.</p></article>
            <article className="seo-dark-card"><span>03</span><h3>Decide with evidence</h3><p>Content, design and technical choices are tested against goals and analytics rather than internal preference.</p></article>
            <article className="seo-dark-card"><span>04</span><h3>Stay after launch</h3><p>Hosting, support and iterative improvement keep the site or product moving once it is live.</p></article>
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section--tint">
        <div className="mkt-wrap">
          <div className="mkt-sectionhead">
            <div>
              <div className="mkt-kicker">COMMON QUESTIONS</div>
              <h2>Useful things to know.</h2>
            </div>
          </div>
          <div className="mkt-faq">
            {faqs.map(f => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <ConversationCTA service="Web design" title="Working on something for the Midlands market?" />
    </main>
  );
}
