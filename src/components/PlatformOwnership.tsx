import Link from 'next/link';

export function PlatformOwnership() {
  return (
    <section className="mkt-section mkt-section--tint" aria-labelledby="ka-platform-ownership-title">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead">
          <div>
            <div className="mkt-kicker">BUILT, NOT RESOLD</div>
            <h2 id="ka-platform-ownership-title">Your solution should fit your business — not somebody else’s template.</h2>
          </div>
          <p>New Kinetic Axis work is designed and engineered around the brief. We do not repackage WordPress themes, page builders or boxed platforms and present them as bespoke software.</p>
        </div>
        <div className="mkt-grid mkt-grid--three">
          <article className="mkt-card">
            <span className="mkt-num">01 / PURPOSE-BUILT</span>
            <h3>Our own solutions</h3>
            <p>We create the interface, application logic, integrations and technical foundation around the product you actually need. Frameworks and services are implementation tools — not a product we simply resell.</p>
          </article>
          <article className="mkt-card">
            <span className="mkt-num">02 / EXISTING PLATFORMS</span>
            <h3>Already on WordPress? We can still help.</h3>
            <p>If an existing WordPress, WooCommerce or other CMS installation is doing useful work, we can maintain it, troubleshoot it, improve performance and UX, add integrations, and keep it dependable while you decide what comes next.</p>
          </article>
          <article className="mkt-card">
            <span className="mkt-num">03 / MIGRATION</span>
            <h3>Move when the economics make sense.</h3>
            <p>Where plugins, licensing, performance limits or platform constraints are becoming expensive, we can plan a staged and cost-conscious migration to a bespoke platform while preserving valuable content, data, URLs and workflows where practical.</p>
          </article>
        </div>
        <div className="mkt-linklist" style={{marginTop:'28px'}}>
          <Link href="/legacy-system-modernisation">Modernise an existing platform <span aria-hidden="true">→</span></Link>
          <Link href="/bespoke-software-development">Explore bespoke software <span aria-hidden="true">→</span></Link>
          <Link href="/contact">Discuss your current setup <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
