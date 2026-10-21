import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BrandArtwork } from '../../components/BrandArtwork';
import { optimizedImage } from '../../lib/optimized-images';

// Responsive variants for the relevant-work cards (mkt-grid--three sizing).
const workcardSizes='(max-width:560px) 90vw, (max-width:800px) 50vw, 32vw';
const wImg={
  pace:optimizedImage('/assets/project-pace.jpg',workcardSizes),
  opus:optimizedImage('/assets/project-opus.jpg',workcardSizes),
  ebuygum:optimizedImage('/assets/project-ebuygum.jpg',workcardSizes),
};

const solutionLinks = [
  ['/business-software-development','Business Software Development','Purpose-built operational software shaped around real workflows, roles and data.'],
  ['/booking-system-development','Booking System Development','Availability, capacity, customer journeys and operational booking rules designed together.'],
  ['/customer-portal-development','Customer Portal Development','Secure self-service for accounts, bookings, documents, status and repeat customer tasks.'],
  ['/admin-dashboard-development','Admin Dashboard Development','Practical back-office interfaces for operations, data, reporting and exceptions.'],
  ['/white-label-app-development','White-Label App Development','One shared product foundation with controlled branding, configuration and tenancy.'],
  ['/legacy-system-modernisation','Legacy System Modernisation','A staged route from difficult-to-change software toward a safer, maintainable product.'],
  ['/replace-access-database','Replace Microsoft Access','Move a business-critical Access database into a maintainable web application without disrupting operations.'],
  ['/replace-airtable','Replace Airtable','Move a business-critical base into software with clearer permissions, ownership and cost.'],
  ['/excel-to-database','Excel to Database','Move a business-critical workbook into a database-backed application with controlled access and reliable reporting.'],
  ['/workflow-automation-software','Workflow Automation Software','Reduce repeated admin, make hand-offs visible and connect systems around the process.'],
  ['/saas-product-development','SaaS Product Development','Define, design and engineer subscription and multi-tenant products that can evolve.'],
  ['/internal-business-systems','Internal Business Systems','Operational tools shaped around roles, workflow, data and reporting.'],
  ['/marketplace-development','Marketplace Development','Buyer, seller and operator experiences designed as one connected platform.'],
  ['/loyalty-app-development','Loyalty App Development','Rewards, QR interactions and repeat customer value across mobile experiences.'],
  ['/payment-integration-development','Payment Integration Development','Connect checkout, transaction state, refunds and operational workflows.'],
  ['/xero-integration-development','Xero Integration Development','Keep invoices, contacts, payments and reconciliation aligned with the workflow that creates them.'],
  ['/hubspot-crm-integration','HubSpot CRM Integration','Keep leads, deals and customer context aligned between HubSpot and the systems around it.'],
  ['/construction-software-development','Construction Software Development','Job costing, variations, site records and compliance connected to existing tools.'],
  ['/manufacturing-software-development','Manufacturing Software Development','Production planning, shop-floor capture, quality and traceability around the ERP.'],
  ['/logistics-software-development','Logistics Software Development','Consignments, routing, proof of delivery and customer tracking in one operation.'],
 ] as const;

const engineeringLinks = [
  ['/design-system-development','Design System Development','Reusable foundations, components, states and documentation for growing product teams.'],
  ['/react-component-library-development','React Component Library Development','Implementation-ready reusable UI for complex React products.'],
  ['/enterprise-ui-development','Enterprise UI Development','Dense operational interfaces shaped around data, roles and repeat workflow.'],
  ['/nextjs-development','Next.js Development','Modern React applications with deliberate rendering, routing and integration architecture.'],
  ['/nodejs-api-development','Node.js API Development','Backend services, APIs and integrations that keep product behaviour dependable.'],
] as const;

const industryLinks = [
  ['/hospitality-software-development','Hospitality Software Development','Connected guest and venue experiences across bookings, loyalty, content and operations.'],
  ['/restaurant-app-development','Restaurant App Development','Branded mobile experiences for bookings, menus, rewards and repeat guest relationships.'],
  ['/ecommerce-marketplace-development','Ecommerce & Marketplace Development','Discovery, listings, accounts and operational tooling for buying and selling products.'],
  ['/saas-technology-development','SaaS & Technology Products','Multi-tenant products, onboarding, product UI and operational foundations built to evolve.'],
  ['/membership-loyalty-platforms','Membership & Loyalty Platforms','Accounts, benefits, rewards and repeat engagement across web and mobile.'],
  ['/professional-services-software','Professional Services Software','Client, case, document and approval workflows for service-led organisations.'],
  ['/sme-digital-transformation','SME Digital Transformation','Focused workflow, integration and software improvements for growing businesses.'],
] as const;

function Arrow(){return <svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={21}><path d="M5 19 19 5M8 5h11v11"/></svg>}

function Cards({items}:{items:readonly (readonly [string,string,string])[]}){
  return <div className="mkt-grid mkt-grid--four">{items.map(([href,title,text],i)=><Link href={href} className="mkt-card" key={href}>
    <span className="mkt-num">{String(i+1).padStart(2,'0')} / SOLUTION</span><h3>{title}</h3><p>{text}</p><span className="mkt-textlink">Explore <Arrow/></span>
  </Link>)}</div>;
}

export default function PageContent(){return <main className="mkt-page seo-page" id="main-content" tabIndex={-1}>
  <section className="mkt-hero"><div className="mkt-wrap mkt-hero-grid"><div>
    <Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'Solutions'}]}/>
    <div className="mkt-kicker">SOLUTIONS</div><h1>Start with the <em>problem to solve.</em></h1>
    <p className="mkt-lead">Specific digital products for specific operational and customer needs — from booking systems and customer portals to business software, workflow automation and white-label apps.</p>
    <div className="mkt-actions"><Link href="/contact" className="mkt-btn"><span className="kad-cta-label">Discuss your project</span><Arrow/></Link><Link href="/services" className="mkt-btn mkt-btn--outline"><span className="kad-cta-label">Explore our services</span><Arrow/></Link></div>
  </div><BrandArtwork className="mkt-hero-art mkt-hero-art--v06 mkt-hero-art--solutions" label="SOLUTIONS / OUTCOMES" heading="Start with the workflow. Build the right product." mode="plain" footer="Operations · Customers · Platforms · Apps" ariaLabel="Kinetic Axis solutions"/></div></section>

  <section className="mkt-section"><div className="mkt-wrap mkt-introgrid"><div><div className="mkt-kicker">A MORE USEFUL STARTING POINT</div><h2>Technology makes more sense when it is attached to an outcome.</h2></div><div className="mkt-article"><p>Our core services describe the disciplines we bring to a project: product thinking, UX, engineering, mobile, web, back-office systems and integration. These solution pages start somewhere different — with the thing the business needs to make work better.</p><p>That might be a booking journey, a customer self-service portal, an ageing internal system or a product that needs to serve several brands. The technology follows the problem rather than leading it.</p><p>We build our own solutions rather than reselling WordPress themes, page builders or boxed products as bespoke work. Where an existing WordPress or CMS estate is already useful, we can support and improve it — and when the economics are right, plan a staged migration to a platform designed around the business.</p><Link href="/approach" className="mkt-textlink">See how we work <Arrow/></Link></div></div></section>

  <section className="mkt-section mkt-section--tint"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">BUSINESS & PRODUCT SOLUTIONS</div><h2>Build around the workflow that matters.</h2></div><p>Focused routes into the kind of systems, products and operational problems we design and engineer.</p></div><Cards items={solutionLinks}/></div></section>

  <section className="mkt-section"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">SPECIALIST ENGINEERING</div><h2>Go deeper where the implementation itself matters.</h2></div><p>Focused engineering and interface capabilities for teams that already know the product problem and need a stronger technical foundation. JavaScript and web engineering come first; React, Next.js, Angular and Node.js are tools chosen around the product rather than the other way around.</p></div><Cards items={engineeringLinks}/></div></section>

  <section className="mkt-section mkt-section--dark"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">SECTOR EXPERIENCE</div><h2>Sector experience where product and operational workflows need to connect.</h2></div><p>Focused sector pages connect our product capabilities with real experience across hospitality, marketplaces, memberships and technology products.</p></div><div className="mkt-grid mkt-grid--two">{industryLinks.map(([href,title,text])=><Link href={href} className="seo-dark-card seo-dark-card--link" key={href}><span>INDUSTRY</span><h3>{title}</h3><p>{text}</p><span className="mkt-textlink">Explore <Arrow/></span></Link>)}</div></div></section>

  <section className="mkt-section mkt-section--tint"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">HIGH-INTENT ROUTES</div><h2>Start closer to the service, location or operational problem you already know.</h2></div><p>A small set of focused landing pages — each with distinct context and a direct route into planning, estimating or discussing the work.</p></div><div className="mkt-grid mkt-grid--three">
    <Link href="/software-web-app-development-warwickshire" className="mkt-card"><span className="mkt-num">REGIONAL OVERVIEW</span><h3>Software & web apps in Warwickshire</h3><p>The broader regional route across web applications, software, mobile and integration.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/bespoke-software-development-warwickshire" className="mkt-card"><span className="mkt-num">WARWICKSHIRE</span><h3>Bespoke software development</h3><p>Operational software for Warwickshire organisations replacing workarounds or ageing systems.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-app-development-birmingham" className="mkt-card"><span className="mkt-num">BIRMINGHAM</span><h3>Web application development</h3><p>Portals, dashboards and connected browser products for Birmingham organisations.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/software-development-coventry" className="mkt-card"><span className="mkt-num">COVENTRY</span><h3>Bespoke software development</h3><p>Purpose-built operational software for Coventry teams and organisations.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/mobile-app-development-midlands" className="mkt-card"><span className="mkt-num">MIDLANDS</span><h3>Mobile app development</h3><p>iOS and Android products for customer, loyalty and workforce journeys across the Midlands.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-coventry" className="mkt-card"><span className="mkt-num">COVENTRY</span><h3>Web design</h3><p>Research-led websites for Coventry organisations — structure, design and build in one senior team.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-birmingham" className="mkt-card"><span className="mkt-num">BIRMINGHAM</span><h3>Web design</h3><p>Custom websites for Birmingham businesses competing at second-city scale.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-software-rugby" className="mkt-card"><span className="mkt-num">RUGBY</span><h3>Web design &amp; software</h3><p>Websites, web apps and bespoke software for Rugby organisations across the M45 corridor.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-software-warwick" className="mkt-card"><span className="mkt-num">WARWICK</span><h3>Web design &amp; software</h3><p>Websites, portals and systems for the county town's practices, venues and independents.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-software-leamington-spa" className="mkt-card"><span className="mkt-num">LEAMINGTON SPA</span><h3>Web design &amp; software</h3><p>Design-literate websites and products for Silicon Spa studios and Leamington businesses.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-software-nuneaton" className="mkt-card"><span className="mkt-num">NUNEATON</span><h3>Web design &amp; software</h3><p>Websites, portals and operational software for Nuneaton manufacturers and suppliers.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/web-design-software-solihull" className="mkt-card"><span className="mkt-num">SOLIHULL</span><h3>Web design &amp; software</h3><p>Websites and systems for Solihull organisations between Birmingham and Warwickshire.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/areas-we-serve" className="mkt-card"><span className="mkt-num">AREAS WE SERVE</span><h3>Coventry, Birmingham & Warwickshire</h3><p>Every location page in one place, with the surrounding towns and counties we deliver across.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/replace-spreadsheets-with-bespoke-software" className="mkt-card"><span className="mkt-num">PROBLEM-LED</span><h3>Replace spreadsheet workflows</h3><p>Move business-critical operations out of fragile workbooks and into maintainable software.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
    <Link href="/excel-to-database" className="mkt-card"><span className="mkt-num">DATA MIGRATION</span><h3>Excel to database</h3><p>Turn a workbook that has become a business system into a database-backed application without losing the logic.</p><span className="mkt-textlink">Explore <Arrow/></span></Link>
  </div></div></section>

  <section className="mkt-section"><div className="mkt-wrap"><div className="mkt-sectionhead"><div><div className="mkt-kicker">EVIDENCE, NOT JUST CAPABILITY LISTS</div><h2>See the systems behind the words.</h2></div><p>Our case studies show how customer experiences, operational tools, APIs and design systems come together in real products.</p></div><div className="mkt-grid mkt-grid--three"><Link href="/projects/pace" className="mkt-workcard"><span className="mkt-workcard__img"><img src={wImg.pace.src} srcSet={wImg.pace.srcSet} sizes={wImg.pace.sizes} alt="Pace Venues project" width={450} height={277} loading="lazy"/></span><span className="mkt-workcard__body"><small>HOSPITALITY PLATFORM</small><strong>Pace Venues</strong><span>Bookings, rewards, menus, guest mobile experience and venue operations.</span></span></Link><Link href="/projects/opus" className="mkt-workcard"><span className="mkt-workcard__img"><img src={wImg.opus.src} srcSet={wImg.opus.srcSet} sizes={wImg.opus.sizes} alt="OPUS React project" width={450} height={277} loading="lazy"/></span><span className="mkt-workcard__body"><small>BUSINESS UI SYSTEM</small><strong>OPUS React</strong><span>Reusable patterns for forms, dashboards, theming and complex interfaces.</span></span></Link><Link href="/projects/ebuygum" className="mkt-workcard"><span className="mkt-workcard__img"><img src={wImg.ebuygum.src} srcSet={wImg.ebuygum.srcSet} sizes={wImg.ebuygum.sizes} alt="eBuyGum project" width={450} height={277} loading="lazy"/></span><span className="mkt-workcard__body"><small>DIGITAL MARKETPLACE</small><strong>eBuyGum</strong><span>Brand-led product discovery across marketplace journeys and responsive interfaces.</span></span></Link></div></div></section>

  <section className="mkt-cta"><div className="mkt-wrap mkt-cta-inner"><div><div className="mkt-kicker">START WITH THE PROBLEM</div><h2>Tell us what is slowing people down.</h2><p>We can help shape the right combination of product, design, engineering and integration around it.</p></div><Link href="/contact" className="mkt-btn"><span className="kad-cta-label">Start a conversation</span><Arrow/></Link></div></section>
</main>}
