import Link from 'next/link';
import type { ReactNode } from 'react';

const serviceLinks = [
  ['/web-design', 'Web Design'],
  ['/bespoke-software-development', 'Bespoke Software Development'],
  ['/web-app-development', 'Web App Development'],
  ['/mobile-app-development', 'Mobile App Development'],
  ['/ui-ux-design-systems', 'UI/UX & Design Systems'],
  ['/digital-product-development', 'Digital Product Development'],
  ['/platforms-back-office-systems', 'Platforms & Back-Office Systems'],
  ['/api-systems-integration', 'API & Systems Integration'],
] as const;

const solutionLinks = [
  '/business-software-development',
  '/booking-system-development',
  '/customer-portal-development',
  '/admin-dashboard-development',
  '/white-label-app-development',
  '/legacy-system-modernisation',
  '/workflow-automation-software',
  '/saas-product-development',
  '/hospitality-software-development',
  '/restaurant-app-development',
  '/internal-business-systems',
  '/marketplace-development',
  '/loyalty-app-development',
  '/payment-integration-development',
  '/ecommerce-marketplace-development',
  '/saas-technology-development',
  '/membership-loyalty-platforms',
  '/design-system-development',
  '/react-component-library-development',
  '/enterprise-ui-development',
  '/nextjs-development',
  '/nodejs-api-development',
  '/professional-services-software',
  '/sme-digital-transformation',
  '/software-web-app-development-warwickshire',
] as const;

function NavLink({ to, children, active, className }: {
  to: string; children: ReactNode; active?: boolean; className?: string;
}) {
  return <Link href={to} className={className} aria-current={active ? 'page' : undefined}>{children}</Link>;
}

function Arrow({size=21}:{size?:number}) {
  return <svg aria-hidden="true" className="ka-heavy-arrow" fill="none" stroke="currentColor"
    strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M5 19 19 5M8 5h11v11" /></svg>;
}


function PhoneIcon({size=16}:{size?:number}) {
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
    strokeWidth={2} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
  </svg>;
}

function ContactStrip() {
  return <div className="ka-contact-strip">
    <div className="ka-contact-strip__inner">
      <span className="ka-contact-strip__strapline">Strategic web design, development and digital products for ambitious businesses.</span>
      <a className="ka-contact-strip__phone" href="tel:+442477920471" aria-label="Call Kinetic Axis on 024 7792 0471">
        <PhoneIcon/><span>024 7792 0471</span>
      </a>
    </div>
  </div>;
}

function ServiceMenu({ selected = false, current = false }: { selected?: boolean; current?: boolean }) {
  return <div className={`services-nav-item${selected ? ' is-current' : ''}`} data-services-menu="">
    <div className="services-nav-head">
      <NavLink to="/services" className="services-nav-overview" active={current}>Services</NavLink>
      <button aria-controls="services-dropdown" aria-expanded="false"
        aria-haspopup="true" aria-label="Show Services submenu" className="services-nav-toggle" type="button">
        <svg aria-hidden="true" className="services-nav-chevron ka-heavy-arrow" fill="none"
          height={16} stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"
          strokeWidth={3} viewBox="0 0 24 24" width={16}><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>
    <div className="services-dropdown" id="services-dropdown">
      <span className="services-dropdown-label">WHAT WE DO</span>
      <NavLink to="/services" className="services-dropdown-link services-dropdown-all">All services
        <span aria-hidden="true" className="services-dropdown-small-arrow">
          <svg aria-hidden="true" className="ka-heavy-arrow ka-heavy-arrow--right" fill="none"
            height={20} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter"
            strokeWidth={3} viewBox="0 0 24 24" width={20}><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
        </span>
      </NavLink>
      {serviceLinks.map(([to, title]) => <NavLink key={to} to={to} className="services-dropdown-link">{title}</NavLink>)}
    </div>
  </div>;
}

function ExperimentMenu({ selected = false, current = false, fluidSelected = false }: { selected?: boolean; current?: boolean; fluidSelected?: boolean }) {
  return <div className={`services-nav-item${selected ? ' is-current' : ''}`} data-services-menu="">
    <div className="services-nav-head">
      <NavLink to="/experiments" className="services-nav-overview" active={current}>Experiments</NavLink>
      <button aria-controls="experiments-dropdown" aria-expanded="false"
        aria-haspopup="true" aria-label="Show Experiments submenu" className="services-nav-toggle" type="button">
        <svg aria-hidden="true" className="services-nav-chevron ka-heavy-arrow" fill="none"
          height={16} stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"
          strokeWidth={3} viewBox="0 0 24 24" width={16}><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>
    <div className="services-dropdown experiments-dropdown" id="experiments-dropdown">
      <span className="services-dropdown-label">EXPERIMENTS</span>
      <NavLink to="/experiments/fluid-dynamics" className="services-dropdown-link" active={fluidSelected}>
        Fluid Dynamics
        <span aria-hidden="true" className="services-dropdown-small-arrow">
          <svg aria-hidden="true" className="ka-heavy-arrow ka-heavy-arrow--right" fill="none"
            height={20} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter"
            strokeWidth={3} viewBox="0 0 24 24" width={20}><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
        </span>
      </NavLink>
    </div>
  </div>;
}

/** Both established headers share links + dropdown, retaining their existing CSS structure. */
export function SiteHeader({ pageKey, project = false }: {pageKey:string; project?:boolean}) {
  const servicesSelected = pageKey==='services' || serviceLinks.some(([path]) => path.slice(1)===pageKey);
  const solutionsSelected = pageKey==='solutions' || solutionLinks.some(path => path.slice(1)===pageKey);
  const insightsSelected = pageKey==='insights' || pageKey.startsWith('insights/');
  const experimentsSelected = pageKey==='experiments' || pageKey.startsWith('experiments/');
  const fluidSelected = pageKey==='experiments/fluid-dynamics';
  const nav = <>
    <NavLink to="/work" active={pageKey==='work'} className={project ? 'ka-section-current' : undefined}>Our work</NavLink>
    <ServiceMenu selected={servicesSelected} current={pageKey==='services'} />
    <NavLink to="/solutions" active={pageKey==='solutions'} className={solutionsSelected && pageKey!=='solutions' ? 'ka-section-current' : undefined}>Solutions</NavLink>
    <NavLink to="/insights" active={pageKey==='insights'} className={insightsSelected && pageKey!=='insights' ? 'ka-section-current' : undefined}>Insights</NavLink>
    <NavLink to="/approach" active={pageKey==='approach'}>Our approach</NavLink>
    <NavLink to="/studio" active={pageKey==='studio'} className={pageKey==='experience' ? 'ka-section-current' : undefined}>The studio</NavLink>
    <ExperimentMenu selected={experimentsSelected} current={pageKey==='experiments'} fluidSelected={fluidSelected} />
    <NavLink to="/contact" active={pageKey==='contact'}>Contact</NavLink>
  </>;
  if (project) return (<>
    <ContactStrip/>
    <header className="site-header"><div className="page-width header-inner">
      <Link href="/" className="header-logo" aria-label="Kinetic Axis home"><img alt="Kinetic Axis" height={57} src="/assets/wordmark.png" width={205}/></Link>
      <nav aria-label="Main navigation" className="header-nav" id="main-nav">{nav}</nav>
      <Link className="button header-cta" href="/contact">
        <span className="kad-cta-label">Let&apos;s talk</span><Arrow />
      </Link>
      <button aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation"
        className="menu-toggle" type="button">☰</button>
    </div></header>
  </>);
  return (<>
    <ContactStrip/>
    <header className="ka-header site-header"><div className="ka-nav">
      <Link href="/" className="ka-brand" aria-label="Kinetic Axis home">
        <img alt="Kinetic Axis" height={63} src="/assets/wordmark.png" width={228}/>
      </Link>
      <nav aria-label="Main navigation" className="ka-links" id="ka-navigation">{nav}</nav>
      <Link className="ka-talk" href="/contact">
        <span className="kad-cta-label">Let&apos;s talk</span><Arrow />
      </Link>
      <button aria-controls="ka-navigation" aria-expanded="false" aria-label="Toggle navigation"
        className="ka-toggle" type="button">☰</button>
    </div></header>
  </>);
}

