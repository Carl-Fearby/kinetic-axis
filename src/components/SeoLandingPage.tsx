import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { BrandArtwork } from './BrandArtwork';
import { ExperienceAuthority } from './ExperienceAuthority';
import { ClientConfidence } from './ClientConfidence';
import { ConversationCTA } from './ConversationCTA';
import { mergeCommercialFaqs } from '../content/commercial-faqs';

type Card = {title:string; text:string};
type FAQ = {q:string; a:string};
type Project = {href:string; image:string; alt:string; eyebrow:string; title:string; text:string};
type Related = {href:string; title:string; text:string};

export type SeoLandingPageData = {
  parent:{label:string; href:string};
  kicker:string;
  title:string;
  accent?:string;
  lead:string;
  artClass:string;
  artLabel:string;
  artHeading:string;
  artFooter:string;
  introKicker:string;
  introTitle:string;
  introCopy:string[];
  capabilityKicker:string;
  capabilityTitle:string;
  capabilityIntro:string;
  cards:Card[];
  useKicker:string;
  useTitle:string;
  useIntro:string;
  useCases:Card[];
  process:Card[];
  projects:Project[];
  related:Related[];
  faqs:FAQ[];
  contactService:string;
  ctaTitle?:string;
  secondaryCta?:{href:string; label:string};
};

function faqStructuredData(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

function Arrow(){
  return <svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21}
    stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
    viewBox="0 0 24 24" width={21}><path d="M5 19 19 5M8 5h11v11"/></svg>;
}

export function SeoLandingPage({data}:{data:SeoLandingPageData}){
  const faqs=mergeCommercialFaqs(data.faqs);
  return <main className="mkt-page seo-page" id="main-content" tabIndex={-1}>
    <section className="mkt-hero"><div className="mkt-wrap mkt-hero-grid"><div>
      <Breadcrumbs className="ka-crumb" items={[
        {label:'Home',href:'/'},
        {label:data.parent.label,href:data.parent.href},
        {label:data.title},
      ]}/>
      <div className="mkt-kicker">{data.kicker}</div>
      <h1>{data.title}{data.accent ? <> <em>{data.accent}</em></> : null}</h1>
      <p className="mkt-lead">{data.lead}</p>
      <div className="mkt-actions">
        <Link href={`/contact?service=${encodeURIComponent(data.contactService)}`} className="mkt-btn">
          <span className="kad-cta-label">Discuss your project</span><Arrow/>
        </Link>
        <Link href={data.secondaryCta?.href || '/work'} className="mkt-btn mkt-btn--outline" data-ka-track={data.secondaryCta ? 'high-intent-planning-cta' : 'high-intent-work-cta'}>
          <span className="kad-cta-label">{data.secondaryCta?.label || 'See relevant work'}</span><Arrow/>
        </Link>
      </div>
    </div><BrandArtwork className={`mkt-hero-art ${data.artClass}`} label={data.artLabel}
      heading={data.artHeading} mode="plain" footer={data.artFooter}
      ariaLabel={`${data.title} illustration`}/></div></section>

    <section className="mkt-section">
      <div className="mkt-wrap mkt-introgrid">
        <div><div className="mkt-kicker">{data.introKicker}</div><h2>{data.introTitle}</h2></div>
        <div className="mkt-article">
          {data.introCopy.map(p=><p key={p}>{p}</p>)}
          <Link href="/approach" className="mkt-textlink">How we design and build <Arrow/></Link>
        </div>
      </div>
    </section>

    <ExperienceAuthority />

    <section className="mkt-section mkt-section--tint">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div>
          <div className="mkt-kicker">{data.capabilityKicker}</div><h2>{data.capabilityTitle}</h2>
        </div><p>{data.capabilityIntro}</p></div>
        <div className="mkt-grid mkt-grid--four">
          {data.cards.map((item,i)=><article className="mkt-card" key={item.title}>
            <span className="mkt-num">0{i+1} / CAPABILITY</span><h3>{item.title}</h3><p>{item.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="mkt-section mkt-section--dark">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div>
          <div className="mkt-kicker">{data.useKicker}</div><h2>{data.useTitle}</h2>
        </div><p>{data.useIntro}</p></div>
        <div className="mkt-grid mkt-grid--four seo-dark-cards">
          {data.useCases.map((item,i)=><article className="seo-dark-card" key={item.title}>
            <span>0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="mkt-section">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div>
          <div className="mkt-kicker">HOW WE APPROACH IT</div><h2>Make the workflow clear before the software gets complicated.</h2>
        </div><p>We start with users, operations and outcomes, then design the smallest coherent system that can grow with the business.</p></div>
        <div className="mkt-process">
          {data.process.map((item,i)=><article className="mkt-phase" key={item.title}>
            <span className="mkt-num">0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    {data.projects.length ? <section className="mkt-section mkt-section--tint">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div>
          <div className="mkt-kicker">RELEVANT WORK</div><h2>Experience behind the recommendation.</h2>
        </div><p>Selected work showing the same kind of product, workflow or platform thinking in practice.</p></div>
        <div className="mkt-grid mkt-grid--two">
          {data.projects.map(p=><Link href={p.href} className="mkt-workcard" key={p.href}>
            <span className="mkt-workcard__img"><img alt={p.alt} height={277} loading="lazy" decoding="async" src={p.image} width={450}/></span>
            <span className="mkt-workcard__body"><small>{p.eyebrow}</small><strong>{p.title}</strong><span>{p.text}</span></span>
          </Link>)}
        </div>
      </div>
    </section> : null}

    <section className="mkt-section">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div>
          <div className="mkt-kicker">RELATED EXPERTISE</div><h2>Connected problems usually need connected thinking.</h2>
        </div><p>These related capabilities often sit alongside the work on this page.</p></div>
        <div className="mkt-grid">
          {data.related.map(item=><Link href={item.href} className="mkt-card" key={item.href}>
            <span className="mkt-num">EXPLORE</span><h3>{item.title}</h3><p>{item.text}</p>
            <span className="mkt-textlink">View capability <Arrow/></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="mkt-section mkt-section--tint">
      <div className="mkt-wrap">
        <div className="mkt-sectionhead"><div>
          <div className="mkt-kicker">COMMON QUESTIONS</div><h2>Useful things to know.</h2>
        </div></div>
        <div className="mkt-faq">{faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </div>
    </section>

    <ClientConfidence />
    <ConversationCTA service={data.contactService} title={data.ctaTitle}/>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(faqStructuredData(faqs)).replace(/</g,'\\u003c')}}
    />
  </main>;
}
