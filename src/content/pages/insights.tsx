import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BrandArtwork } from '../../components/BrandArtwork';
import { INSIGHTS } from '../insights-registry';

function Arrow(){return <svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={21}><path d="M5 19 19 5M8 5h11v11"/></svg>}

const guides=INSIGHTS;

export default function PageContent(){return <main className="mkt-page seo-page" id="main-content" tabIndex={-1}>
  <section className="mkt-hero"><div className="mkt-wrap mkt-hero-grid"><div>
    <Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'Insights'}]}/>
    <div className="mkt-kicker">INSIGHTS</div><h1>Useful thinking for <em>digital product decisions.</em></h1>
    <p className="mkt-lead">Practical guides for people planning websites, software, apps and digital products — written around the decisions that affect scope, cost, risk and long-term value.</p>
  </div><BrandArtwork className="mkt-hero-art mkt-hero-art--v07 mkt-hero-art--insights" label="INSIGHTS / BUYER GUIDES" heading="Understand the decision before committing to the build." mode="plain" footer="Scope · Cost · Product · Architecture · Delivery" ariaLabel="Kinetic Axis insights"/></div></section>

  <section className="mkt-section"><div className="mkt-wrap mkt-introgrid"><div><div className="mkt-kicker">WHY THIS EXISTS</div><h2>Better projects start with better questions.</h2></div><div className="mkt-article"><p>Software decisions are difficult to compare when every proposal starts from a different understanding of the problem. These guides explain the factors we look at when scoping work: users, workflows, data, integrations, operational risk and what the first useful release actually needs to prove.</p><p>The aim is not to turn every reader into a developer. It is to make the commercial and product decisions around development easier to understand before money is committed.</p></div></div></section>

  <section className="mkt-section mkt-section--tint"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">BUYER GUIDES</div><h2>Start with scope and value.</h2></div><p>Cost guides, architecture explainers and practical planning articles connect early research questions with the right services, solutions and real project experience.</p></div><div className="mkt-grid mkt-grid--two">{guides.map((guide,i)=><Link href={guide.href} className="mkt-card insight-card" key={guide.href}><span className="mkt-num">0{i+1} / {guide.topic.toUpperCase()}</span><h3>{guide.title}</h3><p>{guide.description}</p><span className="mkt-textlink">Read the guide <Arrow/></span></Link>)}</div></div></section>

  <section className="mkt-section mkt-section--dark"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">WHAT WE WRITE ABOUT</div><h2>Commercial questions, product choices and technical trade-offs.</h2></div><p>The library focuses on real buying and planning questions rather than generic technology news, with each guide connected to deeper solution and service pages.</p></div><div className="mkt-grid mkt-grid--four seo-dark-cards"><article className="seo-dark-card"><span>01</span><h3>Software</h3><p>Bespoke systems, workflows, modernisation and operational platforms.</p></article><article className="seo-dark-card"><span>02</span><h3>Web applications</h3><p>Portals, booking systems, SaaS products and browser-based tools.</p></article><article className="seo-dark-card"><span>03</span><h3>Mobile products</h3><p>App strategy, white-label models and repeat-use customer experiences.</p></article><article className="seo-dark-card"><span>04</span><h3>Product decisions</h3><p>Scope, MVP choices, integration trade-offs and designing for change.</p></article></div></div></section>

  <section className="mkt-cta"><div className="mkt-wrap mkt-cta-inner"><div><div className="mkt-kicker">HAVE A PROJECT IN MIND?</div><h2>Turn the question into a useful first scope.</h2><p>Tell us what the product needs to achieve and we can help work out what belongs in the first release.</p></div><Link href="/contact" className="mkt-btn"><span className="kad-cta-label">Discuss your project</span><Arrow/></Link></div></section>
</main>}
