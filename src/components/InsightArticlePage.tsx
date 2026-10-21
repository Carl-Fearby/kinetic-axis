import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { BrandArtwork } from './BrandArtwork';
import { ConversationCTA } from './ConversationCTA';
import { commercialLinkFor } from '../content/commercial-links';
import { INSIGHT_BY_SLUG, relatedInsights } from '../content/insights-registry';

type Section = {title:string; paragraphs:string[]; bullets?:string[]; table?:{caption:string; columns:string[]; rows:string[][]}};
type Related = {href:string; title:string; text:string};
type Band = {label:string; title:string; text:string};
type FAQ = {q:string; a:string};

export type InsightArticleData = {
  slug:string;
  kicker:string;
  title:string;
  lead:string;
  artClass:string;
  artLabel:string;
  artHeading:string;
  artFooter:string;
  answer:string[];
  bands:Band[];
  sections:Section[];
  related:Related[];
  faqs?:FAQ[];
  updated:string;
  bandKicker?:string;
  bandTitle?:string;
  bandIntro?:string;
  ctaKicker?:string;
  ctaTitle?:string;
  ctaText?:string;
  contactService?:string;
};

function faqStructuredData(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function Arrow(){
  return <svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21}
    stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
    viewBox="0 0 24 24" width={21}><path d="M5 19 19 5M8 5h11v11"/></svg>;
}

export function InsightArticlePage({data}:{data:InsightArticleData}){
  const commercial=commercialLinkFor(data.contactService);
  const registryEntry=INSIGHT_BY_SLUG.get(data.slug);
  const moreInsights=relatedInsights(data.slug,3);
  const articleUrl=`https://kineticaxisdigital.com/insights/${data.slug}`;
  const linkedInShare=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const emailShare=`mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(`Worth a read: ${articleUrl}`)}`;
  return <main className="mkt-page seo-page insight-page" id="main-content" tabIndex={-1}>
    <section className="mkt-hero"><div className="mkt-wrap mkt-hero-grid"><div>
      <Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'Insights',href:'/insights'},{label:data.title}]}/>
      <div className="mkt-kicker">{data.kicker}</div>
      <h1>{data.title}</h1>
      <p className="mkt-lead">{data.lead}</p>
      <div className="insight-meta"><span>{registryEntry?.topic || 'Buyer guide'}</span><span>By <Link href="/studio">Carl Fearby</Link></span><span>30+ years in web &amp; software</span><span>Updated {data.updated}</span></div>
      <nav className="insight-share" aria-label="Share this guide"><span>Share</span><a href={linkedInShare} target="_blank" rel="noopener noreferrer" data-ka-track="insight-share-linkedin">LinkedIn ↗</a><a href={emailShare} data-ka-track="insight-share-email">Email ↗</a></nav>
    </div><BrandArtwork className={`mkt-hero-art ${data.artClass}`} label={data.artLabel}
      heading={data.artHeading} mode="plain" footer={data.artFooter}
      ariaLabel={`${data.title} guide illustration`}/></div></section>

    <section className="mkt-section">
      <div className="mkt-wrap insight-layout">
        <aside className="insight-answer">
          <div className="mkt-kicker">THE SHORT ANSWER</div>
          {data.answer.map(p=><p key={p}>{p}</p>)}
        </aside>
        <article className="insight-prose">
          {data.sections.map((section,i)=><section key={section.title}>
            <span className="insight-section-number">0{i+1}</span>
            <h2>{section.title}</h2>
            {section.paragraphs.map(p=><p key={p}>{p}</p>)}
            {section.table ? <div className="insight-table-wrap"><table className="insight-table"><caption>{section.table.caption}</caption><thead><tr>{section.table.columns.map(column=><th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{section.table.rows.map(row=><tr key={row.join('|')}>{row.map((cell,index)=>index===0?<th key={cell} scope="row">{cell}</th>:<td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div> : null}
            {section.bullets?.length ? <ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul> : null}
          </section>)}
        </article>
      </div>
    </section>

    {data.faqs?.length ? <section className="mkt-section insight-faq"><div className="mkt-wrap">
      <div className="mkt-sectionhead"><div><div className="mkt-kicker">COMMON QUESTIONS</div><h2>What people usually ask next.</h2></div><p>Short answers to the questions that tend to follow this decision.</p></div>
      <div className="mkt-faq">{data.faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqStructuredData(data.faqs)).replace(/</g,'\\u003c')}}/>
    </div></section> : null}

    {moreInsights.length ? <section className="mkt-section insight-related-reading"><div className="mkt-wrap">
      <div className="mkt-sectionhead"><div><div className="mkt-kicker">RELATED THINKING</div><h2>Keep exploring the decision.</h2></div><p>More practical guides selected from the same product, platform and delivery themes.</p></div>
      <div className="mkt-grid">{moreInsights.map(item=><Link href={item.href} className="mkt-card insight-related-card" key={item.href}><span className="mkt-num">{item.topic.toUpperCase()}</span><h3>{item.title}</h3><p>{item.description}</p><span className="mkt-textlink">Read the guide <Arrow/></span></Link>)}</div>
      {registryEntry?.relatedCaseStudies?.length ? <div className="insight-practice-links"><strong>See the thinking in practice</strong>{registryEntry.relatedCaseStudies.map(item=><Link href={item.href} key={item.href}>{item.title} <span aria-hidden="true">↗</span></Link>)}</div> : null}
    </div></section> : null}

    <section className="mkt-section mkt-section--dark">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div><div className="mkt-kicker">{data.bandKicker || 'PLANNING BANDS'}</div>
          <h2>{data.bandTitle || 'Think in levels of complexity, not a single average price.'}</h2></div>
          <p>{data.bandIntro || 'These are deliberately broad planning bands rather than quotes. Scope, integrations, risk and product maturity change the work significantly.'}</p>
        </div>
        <div className="mkt-grid">
          {data.bands.map(item=><article className="seo-dark-card" key={item.label}>
            <span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="mkt-section mkt-section--tint"><div className="mkt-wrap">
      <div className="mkt-sectionhead"><div><div className="mkt-kicker">NEXT STEPS</div><h2>Go deeper into the right part of the problem.</h2></div>
        <p>Related services and solutions for planning, scoping and building the product.</p></div>
      <div className="mkt-grid">{data.related.map(item=><Link href={item.href} className="mkt-card" key={item.href}>
        <span className="mkt-num">RELATED</span><h3>{item.title}</h3><p>{item.text}</p>
        <span className="mkt-textlink">Explore <Arrow/></span>
      </Link>)}</div>
    </div></section>

    {commercial ? <section className="ka-insight-bridge"><div className="ka-insight-bridge__inner">
      <div><span>FROM RESEARCH TO DELIVERY</span><h2>If this guide describes the problem, here is the service behind it.</h2>
      <p>Use the guide to understand the decisions, then explore the delivery capability that connects those decisions to a real product.</p></div>
      <Link href={commercial.href} className="mkt-btn mkt-btn--outline" data-ka-track="insight-service-bridge">
        <span className="kad-cta-label">Explore {commercial.title}</span><Arrow/>
      </Link>
    </div></section> : null}

    <ConversationCTA service={data.contactService || 'Digital product development'} guide title={data.ctaTitle} text={data.ctaText} kicker={data.ctaKicker}/>
  </main>;
}
