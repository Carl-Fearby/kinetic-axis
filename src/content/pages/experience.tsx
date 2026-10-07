import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const Arrow = () => <svg aria-hidden="true" className="ka-heavy-arrow" fill="none" height={20}
  stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
  viewBox="0 0 24 24" width={20}><path d="M5 19 19 5M8 5h11v11"/></svg>;

const eras = [
  {
    years:'1995–2003',
    organisation:'Bluespheres',
    role:'Technical Manager',
    copy:'Early commercial web work, bespoke web systems and CMS development, alongside helping build and lead a small design and development team.',
    stack:'Perl / HTML / CSS / MySQL / JavaScript',
  },
  {
    years:'2003–2010',
    organisation:'Oceanworks UK',
    role:'Managing Director',
    copy:'Led a web and software studio that grew to ten developers and designers, while creating products including the Affinity GO CRM and Create CMS.',
    stack:'PHP / MySQL / Linux / JavaScript / Product delivery',
  },
  {
    years:'2010–2022',
    organisation:'EQ Software / Compusoft Group',
    role:'Senior Developer / Frontend Technical Lead',
    copy:'Commercial e-commerce, enterprise interfaces, cross-platform mobile applications, secure API integrations and CI/CD delivery across international product teams.',
    stack:'Angular / JavaScript / PHP / Cordova / APIs / Azure DevOps',
  },
  {
    years:'2022–2024',
    organisation:'The Open University',
    role:'Senior Developer / Full Stack Engineer — contract',
    copy:'Built and evolved full-stack systems for Quality Monitoring and Enhancement and Qualification Pathways, with delivery pipelines and product-team collaboration.',
    stack:'JavaScript / Angular / PHP / MySQL / CI/CD',
  },
  {
    years:'2022–present',
    organisation:'Virgin Media O2',
    role:'Senior Software Engineer / Technical Product Owner',
    copy:'Modern product engineering across customer-facing web experiences and internal agent knowledge tooling, combining hands-on engineering with product ownership.',
    stack:'JavaScript / TypeScript / React / Next.js / Content platforms / Product ownership',
  },
  {
    years:'Now',
    organisation:'Kinetic Axis',
    role:'Founder / Senior product & engineering lead',
    copy:'Independent studio work bringing product thinking, UX, engineering, APIs, infrastructure and delivery together without pushing senior decisions away from the build.',
    stack:'JavaScript / TypeScript / React / Angular / Node.js / APIs / Cloud / Delivery',
  },
] as const;

const products = [
  ['/projects/pace','Pace Venues','Hospitality app and connected venue platform.'],
  ['/projects/opus','OPUS React','Reusable React design system and component library.'],
  ['/projects/veyra','Veyra Studio','Creative product experience around planning, audio and visual references.'],
  ['/projects/ebuygum','eBuyGum','Marketplace redesign and responsive commerce experience.'],
  ['/projects/vx27','VX-27','Interactive 3D world, interface and web presence.'],
] as const;

export default function ExperiencePage() {
  return <main id="main-content" tabIndex={-1} className="ka-experience-page">
    <section className="ka-exp-hero">
      <div className="container">
        <Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'The studio',href:'/studio'},{label:'Experience'}]} />
        <div className="ka-exp-hero__grid">
          <div className="ka-exp-hero__copy">
            <div className="eyebrow">FOUNDER EXPERIENCE</div>
            <h1>JavaScript, web & software. <span>Three decades deep.</span></h1>
            <p>Kinetic Axis is led by Carl Fearby — a JavaScript developer and web engineer first. Since 1995, the work has moved from hand-built browser experiences and server-side web systems through Angular, mobile apps and enterprise interfaces to TypeScript, React, Next.js, Node.js, APIs and technical product ownership. The frameworks have changed; the web fundamentals have not.</p>
            <div className="ka-exp-actions">
              <Link href="/work" className="button"><span>Explore selected work</span><Arrow/></Link>
              <Link href="/contact" className="ka-exp-link"><span>Discuss a project</span><Arrow/></Link>
            </div>
          </div>
          <aside className="ka-exp-summary" aria-label="Experience summary">
            <span className="ka-exp-summary__kicker">1995 → TODAY</span>
            <strong>30+</strong>
            <h2>Years across product, design and engineering.</h2>
            <p>From browser code and interfaces to server-side systems, APIs, product direction, operations and delivery.</p>
            <div className="ka-exp-summary__facts">
              <div><span>01</span><b>Hands-on engineering</b></div>
              <div><span>02</span><b>Technical leadership</b></div>
              <div><span>03</span><b>Product ownership</b></div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section className="ka-exp-section ka-exp-section--timeline" aria-labelledby="experience-timeline-title">
      <div className="container">
        <div className="ka-exp-section__head">
          <div><div className="eyebrow">CAREER / COMPRESSED</div><h2 id="experience-timeline-title">The useful version of the CV.</h2></div>
          <p>Not every job title or project. Just the parts that explain the depth behind Kinetic Axis and the kind of decisions that stay close to the work.</p>
        </div>
        <div className="ka-exp-timeline">
          {eras.map((era,index)=><article className="ka-exp-era" key={era.organisation}>
            <div className="ka-exp-era__index">{String(index+1).padStart(2,'0')}</div>
            <div className="ka-exp-era__when"><span>{era.years}</span><strong>{era.organisation}</strong></div>
            <div className="ka-exp-era__body"><h3>{era.role}</h3><p>{era.copy}</p><small>{era.stack}</small></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="ka-exp-section ka-exp-section--capability" aria-labelledby="experience-capability-title">
      <div className="container">
        <div className="ka-exp-section__head">
          <div><div className="eyebrow">WHAT THE YEARS ADD UP TO</div><h2 id="experience-capability-title">Experience across the whole product.</h2></div>
          <p>The strongest advantage is not simply longevity. It is being able to connect product, interface, engineering and delivery decisions before they become separate problems.</p>
        </div>
        <div className="ka-exp-cap-grid">
          <article><span>PRODUCT</span><h3>Product & technical leadership</h3><p>Scoping, product ownership, technical direction, prioritisation and translating business goals into buildable work.</p></article>
          <article><span>JAVASCRIPT</span><h3>JavaScript & frontend engineering</h3><p>Vanilla JavaScript, TypeScript, Angular, React and Next.js — plus the browser fundamentals underneath them: HTML, CSS, accessibility, performance and complex application UI.</p></article>
          <article><span>FULL STACK</span><h3>Web systems beyond the frontend</h3><p>Node.js, PHP, MySQL, PostgreSQL, REST APIs, integrations, authentication, data modelling, multi-tenant foundations and operational back-office systems.</p></article>
          <article><span>DELIVERY</span><h3>Cloud, CI/CD & operations</h3><p>Docker, deployment pipelines, cloud platforms, Linux infrastructure, monitoring and the practical work of keeping products running.</p></article>
        </div>
        <div className="ka-exp-tech" aria-label="Selected technologies and disciplines">
          {['JavaScript','TypeScript','HTML','CSS','Angular','React','Next.js','Node.js','PHP','MySQL','PostgreSQL','REST APIs','Cordova','Linux','Docker','CI/CD','UX','Design systems'].map(item=><span key={item}>{item}</span>)}
        </div>
        <p className="ka-exp-framework-note"><strong>Frameworks are tools, not the identity.</strong> The core skill is understanding the web platform, JavaScript, interfaces, data and how the pieces fit together. React and Next.js are part of the current toolkit; Angular and years of framework-free JavaScript are part of the experience too.</p>
      </div>
    </section>

    <section className="ka-exp-section ka-exp-section--products" aria-labelledby="experience-products-title">
      <div className="container">
        <div className="ka-exp-section__head">
          <div><div className="eyebrow">SELECTED PRODUCTS</div><h2 id="experience-products-title">Still making things, not just talking about them.</h2></div>
          <p>Kinetic Axis is where that experience is applied directly to current products, interfaces, platforms and experiments.</p>
        </div>
        <div className="ka-exp-products">
          {products.map(([href,title,note],index)=><Link href={href} className="ka-exp-product" key={href}>
            <span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{note}</p></div><Arrow/>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="subcta ka-exp-cta"><div className="container subcta-inner"><div><div className="eyebrow">SENIOR THINKING / DIRECTLY INVOLVED</div><h2>Bring the experience into the project.</h2></div><Link href="/contact" className="button"><span>Start a conversation</span><Arrow/></Link></div></section>
  </main>;
}
