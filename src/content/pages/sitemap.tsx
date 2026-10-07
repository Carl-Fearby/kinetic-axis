import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const services = [
  ['/web-design', 'Web Design', 'Websites with clarity, character and purpose.'],
  ['/bespoke-software-development', 'Bespoke Software Development', 'Software shaped around the way your organisation works.'],
  ['/web-app-development', 'Web App Development', 'Useful browser-based products and working tools.'],
  ['/mobile-app-development', 'Mobile App Development', 'Purposeful mobile experiences built for real use.'],
  ['/ui-ux-design-systems', 'UI/UX & Design Systems', 'Interfaces and reusable systems that stay coherent.'],
  ['/digital-product-development', 'Digital Product Development', 'From an idea to a connected product that can evolve.'],
  ['/platforms-back-office-systems', 'Platforms & Back-Office Systems', 'Operational software, dashboards and admin tools.'],
  ['/api-systems-integration', 'API & Systems Integration', 'Connect products, platforms and data reliably.'],
] as const;

const solutions = [
  ['/solutions', 'All Solutions', 'Browse focused software and product solutions by business need.'],
  ['/business-software-development', 'Business Software Development', 'Purpose-built systems around workflows, roles and data.'],
  ['/booking-system-development', 'Booking System Development', 'Availability, capacity and customer booking journeys.'],
  ['/customer-portal-development', 'Customer Portal Development', 'Secure self-service for accounts, bookings and documents.'],
  ['/admin-dashboard-development', 'Admin Dashboard Development', 'Operational interfaces for data, actions and reporting.'],
  ['/white-label-app-development', 'White-Label App Development', 'One product foundation across distinct brands or organisations.'],
  ['/legacy-system-modernisation', 'Legacy System Modernisation', 'A staged route away from difficult-to-change software.'],
  ['/workflow-automation-software', 'Workflow Automation Software', 'Reduce repeated admin and make hand-offs visible.'],
  ['/saas-product-development', 'SaaS Product Development', 'MVPs, multi-tenant platforms and evolving software products.'],
  ['/hospitality-software-development', 'Hospitality Software Development', 'Bookings, loyalty, guest experiences and venue operations.'],
  ['/restaurant-app-development', 'Restaurant App Development', 'Mobile guest experiences for bookings, menus and rewards.'],
  ['/internal-business-systems', 'Internal Business Systems', 'Operational software around roles, data and workflow.'],
  ['/marketplace-development', 'Marketplace Development', 'Buyer, seller and operator workflows on one platform.'],
  ['/loyalty-app-development', 'Loyalty App Development', 'Rewards and repeat customer engagement across mobile.'],
  ['/payment-integration-development', 'Payment Integration Development', 'Payments, transaction state and operational workflows.'],
  ['/ecommerce-marketplace-development', 'Ecommerce & Marketplace Development', 'Discovery, listings and connected commerce experiences.'],
  ['/saas-technology-development', 'SaaS & Technology Products', 'Product foundations for subscription and multi-tenant software.'],
  ['/membership-loyalty-platforms', 'Membership & Loyalty Platforms', 'Accounts, benefits, rewards and repeat engagement.'],
  ['/design-system-development', 'Design System Development', 'Reusable foundations, components, states and product UI rules.'],
  ['/react-component-library-development', 'React Component Library Development', 'Reusable React implementation for growing products.'],
  ['/enterprise-ui-development', 'Enterprise UI Development', 'Information-rich interfaces for operational software.'],
  ['/nextjs-development', 'Next.js Development', 'Modern React web products with deliberate rendering and routing.'],
  ['/nodejs-api-development', 'Node.js API Development', 'Backend services and APIs for connected digital products.'],
  ['/professional-services-software', 'Professional Services Software', 'Client, case, document and workflow systems.'],
  ['/sme-digital-transformation', 'SME Digital Transformation', 'Focused workflow, integration and software improvements.'],
  ['/software-web-app-development-warwickshire', 'Software & Web App Development Warwickshire', 'Regional overview for Warwickshire organisations.'],
] as const;

const insights = [
  ['/insights', 'All Insights', 'Practical guides for software and digital product decisions.'],
  ['/insights/custom-web-app-cost-uk', 'Custom Web App Cost UK', 'What drives web application scope and budget.'],
  ['/insights/bespoke-software-development-cost', 'Bespoke Software Development Cost', 'How workflow complexity, data and integrations affect investment.'],
  ['/insights/mobile-app-development-cost-uk', 'Mobile App Development Cost UK', 'What drives mobile product scope and investment.'],
  ['/insights/web-app-vs-mobile-app', 'Web App vs Mobile App', 'Choose a platform around user context and product behaviour.'],
  ['/insights/off-the-shelf-vs-bespoke-software', 'Off-the-Shelf vs Bespoke Software', 'Compare buy, configure and build decisions.'],
  ['/insights/booking-system-development-guide', 'Booking System Development Guide', 'Plan availability, lifecycle and integrations.'],
  ['/insights/white-label-mobile-apps', 'White-Label Mobile Apps', 'Shared product architecture across distinct brands.'],
  ['/insights/replacing-spreadsheets-with-custom-software', 'Replacing Spreadsheets with Software', 'Know when an operational workflow has outgrown the sheet.'],
  ['/insights/api-integration-guide', 'API Integration Guide', 'Plan ownership, mapping, failure handling and recovery.'],
  ['/insights/design-system-development-guide', 'Design System Development Guide', 'Build a system around real reusable product decisions.'],
  ['/insights/react-component-library-guide', 'React Component Library Guide', 'Plan component boundaries, APIs and adoption.'],
  ['/insights/customer-portal-development-guide', 'Customer Portal Development Guide', 'Plan useful self-service around reliable operational data.'],
  ['/insights/legacy-system-modernisation-guide', 'Legacy System Modernisation Guide', 'Modernise in controlled stages around clear boundaries.'],
  ['/insights/how-to-build-a-saas-mvp', 'How to Build a SaaS MVP', 'Prove the core product loop before adding platform complexity.'],
  ['/insights/when-to-build-an-internal-business-system', 'When to Build an Internal Business System', 'Know when configuration or integration is no longer enough.'],
] as const;

const work = [
  ['/work', 'All Work', 'Selected case studies and digital projects.'],
  ['/projects/pace', 'Pace Venues', 'Restaurant app and connected venue platform.'],
  ['/projects/ebuygum', 'eBuyGum', 'Marketplace redesign and brand experience.'],
  ['/projects/opus', 'OPUS React', 'Reusable React design system.'],
  ['/projects/vx27', 'VX-27', 'Interactive 3D experience.'],
  ['/projects/veyra', 'Veyra', 'Concept-led product design.'],
  ['/projects/emberlyn', 'Emberlyn', 'Brand and digital experience.'],
] as const;

const studio = [
  ['/approach', 'Our Approach', 'How discovery, design and engineering come together.'],
  ['/studio', 'The Studio', 'The thinking, process and perspective behind the work.'],
  ['/experience', 'Experience', 'A concise founder timeline covering 30+ years in web, software and product engineering.'],
  ['/project-planner', 'Project Planner', 'Build a structured starter brief before discovery.'],
  ['/project-estimator', 'Project Cost Estimator', 'Get an indicative budget and delivery range without entering an email address.'],
  ['/contact', 'Contact', 'Start a conversation about your project.'],
] as const;

const experiments = [
  ['/experiments', 'Experiments Overview', 'Interactive ideas, visual systems and emerging technology.'],
  ['/experiments/fluid-dynamics', 'Fluid Dynamics', 'Interactive pointer-driven fluid simulation.'],
] as const;

const information = [
  ['/accessibility', 'Accessibility', 'Accessibility statement and support information.'],
  ['/privacy', 'Privacy Policy', 'How information is handled when you use the site.'],
  ['/terms', 'Terms & Conditions', 'Terms that apply to this website.'],
  ['/cookies', 'Cookie Policy', 'Cookies and related technologies.'],
  ['/legal', 'Information & Policies', 'Additional legal and company information.'],
] as const;

function Arrow() {
  return <svg aria-hidden="true" className="ka-heavy-arrow ka-heavy-arrow--right" fill="none"
    height={18} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter"
    strokeWidth={3} viewBox="0 0 24 24" width={18}><path d="M4 12h16m-7-7 7 7-7 7"/></svg>;
}

function DirectorySection({number,title,description,links}:{
  number:string; title:string; description:string;
  links:readonly (readonly [string,string,string])[];
}) {
  return <section className="ka-sitemap-section">
    <div className="ka-sitemap-section__intro"><span className="ka-sitemap-section__number">{number}</span><div><h2>{title}</h2><p>{description}</p></div></div>
    <div className="ka-sitemap-links">{links.map(([href,label,note])=><Link href={href} className="ka-sitemap-link" key={href}><span className="ka-sitemap-link__copy"><strong>{label}</strong><small>{note}</small></span><Arrow/></Link>)}</div>
  </section>;
}

export default function PageContent() {
  return <main className="mkt-page ka-sitemap-page" id="main-content" tabIndex={-1}>
    <section className="mkt-hero ka-sitemap-hero"><div className="mkt-wrap mkt-hero-grid"><div>
      <Breadcrumbs className="ka-crumb" items={[{label:'Home',href:'/'},{label:'Site map'}]}/>
      <div className="mkt-kicker">SITE MAP</div><h1>Everything in <em>one place.</em></h1>
      <p className="mkt-lead">A straightforward directory of Kinetic Axis — services, solutions, insights, case studies, studio pages, experiments and site information.</p>
      <div className="mkt-actions"><Link href="/contact" className="mkt-btn"><span className="kad-cta-label">Start a conversation</span><Arrow/></Link><Link href="/work" className="mkt-btn mkt-btn--outline"><span className="kad-cta-label">Explore our work</span><Arrow/></Link></div>
    </div><aside className="ka-sitemap-overview" aria-label="Site overview"><span className="ka-sitemap-overview__label">KINETIC AXIS / DIRECTORY</span><h2>Find your way around.</h2><p>Seven clear sections covering what we do, the problems we solve, what we have made and how to reach us.</p><ol className="ka-sitemap-overview__list"><li><span>01</span><strong>Services</strong></li><li><span>02</span><strong>Solutions</strong></li><li><span>03</span><strong>Insights</strong></li><li><span>04</span><strong>Work</strong></li><li><span>05</span><strong>Studio</strong></li><li><span>06</span><strong>Experiments</strong></li><li><span>07</span><strong>Information</strong></li></ol></aside></div></section>

    <section className="mkt-section ka-sitemap-directory-section"><div className="mkt-wrap"><div className="mkt-sectionhead ka-sitemap-heading"><div><div className="mkt-kicker">BROWSE THE SITE</div><h2>Choose where to go next.</h2></div><p>Every primary page is collected here in one simple, aligned directory.</p></div><div className="ka-sitemap-directory">
      <DirectorySection number="01" title="Services" description="Design, product and engineering capabilities." links={services}/>
      <DirectorySection number="02" title="Solutions" description="Focused routes into common software and product needs." links={solutions}/>
      <DirectorySection number="03" title="Insights" description="Practical guides for planning scope, cost and product decisions." links={insights}/>
      <DirectorySection number="04" title="Work" description="Selected products, brands and digital experiences." links={work}/>
      <DirectorySection number="05" title="Studio" description="How we work, who we are and how to get in touch." links={studio}/>
      <DirectorySection number="06" title="Experiments" description="Interactive ideas and technical explorations." links={experiments}/>
      <DirectorySection number="07" title="Information" description="Accessibility, privacy, terms and supporting policies." links={information}/>
    </div><div className="ka-sitemap-xml"><div><span className="ka-sitemap-xml__eyebrow">08 / SEARCH ENGINES</span><h2>Machine-readable sitemap</h2><p>The XML version of this directory is available for search engines and crawlers.</p></div><a href="/sitemap.xml" className="ka-sitemap-xml-link"><span>Open sitemap.xml</span><Arrow/></a></div></div></section>

    <section className="mkt-cta"><div className="mkt-wrap mkt-cta-inner"><div><div className="mkt-kicker">NOT SURE WHERE TO START?</div><h2>Tell us what you want to create.</h2><p>We can help work out the right combination of design, product and engineering.</p></div><Link href="/contact" className="mkt-btn"><span className="kad-cta-label">Get in touch</span><Arrow/></Link></div></section>
  </main>;
}
