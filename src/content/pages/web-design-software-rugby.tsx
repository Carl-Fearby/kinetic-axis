import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN & SOFTWARE / RUGBY",
  "title": "Websites and software for",
  "accent": "Rugby organisations.",
  "lead": "Research-led websites, web applications and bespoke software for Rugby businesses — from professional practices in the town centre to engineering, distribution and logistics teams working the M45 and rail corridors.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "RUGBY / WEB DESIGN & SOFTWARE",
  "artHeading": "A digital presence that keeps pace with the town.",
  "artFooter": "Structure · Design · Build · Measure",
  "introKicker": "BUILT FOR HOW RUGBY WORKS",
  "introTitle": "Most Rugby organisations do not need a bigger website. They need a clearer one.",
  "introCopy": [
    "Rugby grew on engineering and junctions — locomotive works, rail, and now distribution parks moving goods along the M45, M1 and A14. The organisations doing that work are practical, and their digital tools should be too: a website that answers questions in the first scroll, and software that removes the re-keying, chasing and spreadsheet handoffs that slow a working day down.",
    "Kinetic Axis designs and builds websites and software for Rugby businesses, practices, suppliers and venues — content planning, interface design and engineering handled by one senior team, so the site and the systems behind it are planned together rather than bolted together."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "One senior team for the website and the systems behind it.",
  "capabilityIntro": "Every project is scoped against a job, an audience and a measurable outcome — not a template.",
  "cards": [
    {
      "title": "Websites & e-commerce",
      "text": "Clear service architecture, confident typography and product or enquiry journeys built for speed on the phones most Rugby searches start on."
    },
    {
      "title": "Web applications & portals",
      "text": "Customer portals, quote requests, booking and account areas that let clients self-serve instead of waiting on a phone call."
    },
    {
      "title": "Bespoke operational software",
      "text": "Job sheets, stock, despatch and reporting tools shaped around how your team already works — replacing spreadsheets and duplicated entry."
    },
    {
      "title": "Mobile apps & integration",
      "text": "iOS and Android products, plus the API work that keeps finance, stock and CRM systems exchanging data reliably."
    }
  ],
  "useKicker": "SIGNS IT IS TIME TO ACT",
  "useTitle": "When the website or the workflow is now the constraint.",
  "useIntro": "The strongest cases are where the current setup quietly costs enquiries, credibility or internal time every month.",
  "useCases": [
    {
      "title": "The site looks older than the business",
      "text": "Buyers judge capability in seconds. After twenty years of engineering the company has moved on — the homepage has not."
    },
    {
      "title": "Admin runs on spreadsheets and email",
      "text": "Quotes, stock and job status live in different files, and only one person knows how they fit together. That is a software problem."
    },
    {
      "title": "Every edit needs a developer",
      "text": "Content that is slow to change gets left stale. Publishing a price or a new service should be routine, not a ticket."
    },
    {
      "title": "Systems never quite talk to each other",
      "text": "Orders, stock and finance data get re-typed between systems — slow, error-prone, and invisible until something misses a despatch."
    }
  ],
  "process": [
    {
      "title": "Discover",
      "text": "Understand the buyers, the enquiries that matter, who you compete with in the results and what the work has to prove."
    },
    {
      "title": "Structure",
      "text": "Plan pages, messaging order, data flows and internal links so every service and location has a clear, indexable home."
    },
    {
      "title": "Design",
      "text": "Design the interface and the workflows around reading, comparison and action — with accessibility built in, not bolted on."
    },
    {
      "title": "Build & measure",
      "text": "Ship fast, static-first front ends with analytics, consent mode and conversion tracking wired in from day one."
    }
  ],
  "projects": [
    {
      "href": "/projects/ebuygum",
      "image": "/assets/project-ebuygum.jpg",
      "alt": "eBuyGum marketplace design",
      "eyebrow": "MARKETPLACE DESIGN",
      "title": "eBuyGum",
      "text": "Discovery, category structure and responsive ecommerce UX built around how people actually browse."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues platform design",
      "eyebrow": "HOSPITALITY PLATFORM",
      "title": "Pace Venues",
      "text": "A guest-facing experience and operational platform designed as one connected product."
    }
  ],
  "related": [
    {
      "href": "/web-design",
      "title": "Web design",
      "text": "The core design capability: research, content structure, interface design and front-end build."
    },
    {
      "href": "/bespoke-software-development",
      "title": "Bespoke software",
      "text": "Operational software shaped around your process — the route out of spreadsheets and duplicated admin."
    },
    {
      "href": "/areas-we-serve",
      "title": "Areas we serve",
      "text": "Coventry, Birmingham, Warwickshire and the surrounding towns served from a local studio."
    }
  ],
  "faqs": [
    {
      "q": "Do you work on-site with Rugby businesses?",
      "a": "Yes. Discovery and workshops can run at your Rugby offices or online — whichever gets the right people in the room. Rugby is a short journey from Coventry and the M45/M6 corridors, so on-site sessions are easy to schedule when they genuinely help."
    },
    {
      "q": "How long does a project take?",
      "a": "Most brochure and marketing sites land in eight to twelve weeks depending on content readiness. Bespoke software and portal work is scoped in phases, so a useful first release is usually live well before the full roadmap is finished."
    },
    {
      "q": "Can you work with the systems we already run?",
      "a": "Usually, yes. Most Rugby teams rely on established accounting, stock or CRM packages — the practical route is to integrate with them rather than replace them, keeping the data where your finance and operational teams already know how to find it."
    },
    {
      "q": "Will we be able to edit the site ourselves?",
      "a": "Yes. Content and structure are planned so routine updates are straightforward — new services, prices, case studies — and we document the patterns your team will use most often."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Planning a website or system for your Rugby business?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
