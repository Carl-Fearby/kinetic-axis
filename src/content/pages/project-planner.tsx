import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProjectPlanner } from '../../components/ProjectPlanner';
import { BrandArtwork } from '../../components/BrandArtwork';

export default function PageContent(){
  return <main className="mkt-page ka-planner-page" id="main-content" tabIndex={-1}>
    <section className="mkt-hero ka-planner-hero">
      <div className="mkt-wrap mkt-hero-grid">
        <div>
          <Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'Project planner'}]}/>
          <div className="mkt-kicker">FREE PROJECT PLANNER</div>
          <h1>Turn the idea into a <em>better first brief.</em></h1>
          <p className="mkt-lead">A short planning tool for websites, apps, software and integrations. Work through the people, outcomes, systems and constraints before anyone starts estimating screens.</p>
          <div className="mkt-actions">
            <a href="#planner" className="mkt-btn">Build your brief</a>
            <Link href="/approach" className="mkt-btn mkt-btn--outline">See how projects start</Link>
          </div>
        </div>
        <BrandArtwork
          className="mkt-hero-art mkt-hero-art--project-planner"
          label="KINETIC AXIS / DIGITAL"
          heading="Project Planner"
          mode="steps"
          footer="People Workflow Systems Scope"
          ariaLabel="Project Planner — people, workflow, systems, outcomes and scope."
        />
      </div>
    </section>

    <section className="mkt-section">
      <div className="mkt-wrap mkt-introgrid">
        <div><div className="mkt-kicker">WHY USE IT?</div><h2>Useful scope starts before the feature list.</h2></div>
        <div className="mkt-article"><p>Early project conversations are more productive when they begin with users, outcomes, existing systems and operational constraints. The planner gives you a compact brief you can keep, share internally or bring into a conversation with us.</p><p>It is deliberately not an automated quote. A realistic scope depends on workflow, data, integrations, quality expectations and what the first release needs to prove.</p></div>
      </div>
    </section>

    <section className="ka-planner-shell" id="planner">
      <div className="mkt-wrap"><ProjectPlanner/></div>
    </section>

    <section className="mkt-section mkt-section--dark">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead">
          <div><div className="mkt-kicker">AFTER THE BRIEF</div><h2>Three questions worth taking into discovery.</h2></div>
          <p>The output is a starting point, not a specification. The next useful step is testing the assumptions underneath it.</p>
        </div>
        <div className="mkt-grid mkt-grid--three seo-dark-cards">
          <article className="seo-dark-card"><span>01</span><h3>What job matters most?</h3><p>Identify the user outcome that makes the product worth building before expanding the feature list.</p></article>
          <article className="seo-dark-card"><span>02</span><h3>Where does the truth live?</h3><p>Understand the systems, data ownership and operational dependencies behind the visible interface.</p></article>
          <article className="seo-dark-card"><span>03</span><h3>What proves value first?</h3><p>Shape the first release around a useful product loop rather than trying to deliver the final platform immediately.</p></article>
        </div>
      </div>
    </section>

    <section className="mkt-cta"><div className="mkt-wrap mkt-cta-inner">
      <div><div className="mkt-kicker">READY TO TALK?</div><h2>Bring the brief. We’ll bring the questions.</h2><p>Share the problem, the people and the constraints. We can help decide what should happen next.</p></div>
      <Link href="/contact?from=planner#enquiry-form" className="mkt-btn" data-ka-track="planner-bottom-contact"><span className="kad-cta-label">Discuss your project</span><span aria-hidden="true">↗</span></Link>
    </div></section>
  </main>;
}
