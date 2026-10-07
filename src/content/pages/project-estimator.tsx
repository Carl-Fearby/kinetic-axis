import Link from 'next/link';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {ProjectEstimator} from '../../components/ProjectEstimator';

export default function PageContent(){
  return <main className="mkt-page ka-estimator-page" id="main-content" tabIndex={-1}>
    <section className="mkt-hero ka-estimator-hero"><div className="mkt-wrap mkt-hero-grid">
      <div><Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'Project cost estimator'}]}/><div className="mkt-kicker">FREE PROJECT ESTIMATOR</div><h1>Get a useful <em>starting range.</em></h1><p className="mkt-lead">A quick, no-email estimate for the likely scale of a website, app, software product or integration. It is deliberately broad — enough to decide whether the next conversation makes sense.</p><div className="mkt-actions"><a href="#estimator" className="mkt-btn">Estimate your project</a><Link href="/project-planner" className="mkt-btn mkt-btn--outline">Build a detailed brief</Link></div></div>
      <div className="ka-estimator-hero__visual" aria-hidden="true"><div className="ka-estimator-hero__card"><span>PROJECT RANGE</span><strong>Scope before certainty.</strong><p>Format · workflows · integrations · release quality</p></div><div className="ka-estimator-hero__metric"><b>01</b><span>Choose the project</span></div><div className="ka-estimator-hero__metric"><b>02</b><span>Mark likely complexity</span></div><div className="ka-estimator-hero__metric"><b>03</b><span>See an indicative range</span></div></div>
    </div></section>
    <section className="mkt-section"><div className="mkt-wrap mkt-introgrid"><div><div className="mkt-kicker">WHAT THIS IS</div><h2>A commercial sense-check, not a fake instant quote.</h2></div><div className="mkt-article"><p>Digital projects are shaped by workflows, users, data, integrations and release expectations. A single fixed price before those things are understood is usually misleading.</p><p>This estimator uses broad complexity bands to give you a realistic conversation starter. You can then use the Project Planner to capture the detail behind it.</p></div></div></section>
    <section className="ka-estimator-shell" id="estimator"><div className="mkt-wrap"><ProjectEstimator/></div></section>
    <section className="mkt-cta"><div className="mkt-wrap mkt-cta-inner"><div><div className="mkt-kicker">NEED MORE DETAIL?</div><h2>Turn the range into a better brief.</h2><p>The Project Planner captures the people, outcomes, systems, migration and constraints that make a scope meaningful.</p></div><Link href="/project-planner" className="mkt-btn">Open the Project Planner <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
