import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN & SOFTWARE / NUNEATON",
  "title": "Websites and software for",
  "accent": "Nuneaton businesses.",
  "lead": "Research-led websites, web apps and bespoke software for Nuneaton manufacturers, suppliers, logistics firms and town-centre businesses — a clearer digital route to market for organisations that build things.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "NUNEATON / WEB DESIGN & SOFTWARE",
  "artHeading": "Make the digital side as dependable as the production line.",
  "artFooter": "Structure · Design · Build · Measure",
  "introKicker": "BUILT FOR OPERATORS",
  "introTitle": "Nuneaton is good at making things. The website should be as reliable as the line.",
  "introCopy": [
    "Warwickshire's largest town runs on manufacturing, engineering and distribution — automotive supply chains around the MIRA corridor, logistics along the A5 and M6, and generations of businesses supplying national customers from local units. These organisations rarely suffer from a lack of capability. They suffer from digital tools that were bolted on over the years: a website nobody can update, and admin that re-types the same order three times.",
    "Kinetic Axis designs and builds both sides for Nuneaton organisations — the website that wins the enquiry, and the operational software, portals and integrations that fulfil it — planned by one senior team so neither half ends up working against the other."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "The storefront and the engine room, planned together.",
  "capabilityIntro": "Every project is scoped against a job, an audience and a measurable outcome rather than a template.",
  "cards": [
    {
      "title": "Industrial & B2B websites",
      "text": "Clear capability pages, sector experience and product ranges structured so buyers and procurement teams find proof fast."
    },
    {
      "title": "Customer portals & web apps",
      "text": "Ordering, quotes, proofing and account areas that cut the phone calls and emails around every job."
    },
    {
      "title": "Bespoke operational software",
      "text": "Job tracking, stock, scheduling and reporting shaped around your process — replacing the spreadsheet that only one person understands."
    },
    {
      "title": "Integration & mobile",
      "text": "API work connecting ERP, finance and CRM systems, plus field and workforce apps where the work happens away from a desk."
    }
  ],
  "useKicker": "SIGNS IT IS TIME TO ACT",
  "useTitle": "When the admin costs more than the software would.",
  "useIntro": "The strongest cases are where the current setup quietly costs credibility or internal time every month.",
  "useCases": [
    {
      "title": "The website cannot explain the capability",
      "text": "Sectors served, accreditations, processes — buried or missing, so shortlists get decided without you in them."
    },
    {
      "title": "Orders are re-keyed between systems",
      "text": "Every copy-paste is a chance to transpose a number. Integration removes the step and the error together."
    },
    {
      "title": "One person holds the whole process",
      "text": "When the knowledge lives in someone's head and a private spreadsheet, growth and holiday cover both get risky."
    },
    {
      "title": "Quotes take days to leave the building",
      "text": "Pricing sits in email threads awaiting a lookup. A structured tool turns days into minutes."
    }
  ],
  "process": [
    {
      "title": "Discover",
      "text": "Understand the buyers, the real workflow and the systems already in use before anything gets designed."
    },
    {
      "title": "Structure",
      "text": "Plan pages, data flows and internal links so every service, sector and location has a clear, indexable home."
    },
    {
      "title": "Design",
      "text": "Design the interface around reading, comparison and action — built for the people using it every day."
    },
    {
      "title": "Build & measure",
      "text": "Ship in phases with analytics, consent mode and conversion tracking in place from day one."
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
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS design system interface",
      "eyebrow": "DESIGN SYSTEM",
      "title": "OPUS",
      "text": "A component library that keeps a growing product surface consistent as teams and screens multiply."
    }
  ],
  "related": [
    {
      "href": "/bespoke-software-development",
      "title": "Bespoke software",
      "text": "Purpose-built systems for the way the business actually runs — the route out of duplicated admin."
    },
    {
      "href": "/web-design",
      "title": "Web design",
      "text": "The core design capability: research, content structure, interface design and front-end build."
    },
    {
      "href": "/areas-we-serve",
      "title": "Areas we serve",
      "text": "Coventry, Birmingham, Warwickshire and the surrounding towns served from a local studio."
    }
  ],
  "faqs": [
    {
      "q": "Do you work on-site with Nuneaton businesses?",
      "a": "Yes. Discovery and process mapping sessions can run at your Nuneaton offices — often the fastest way to understand how work actually flows. Delivery after that is remote with scheduled checkpoints, so you get senior attention without paying for travel time."
    },
    {
      "q": "Can you integrate with our ERP or accounting system?",
      "a": "In most cases, yes. We start by mapping what the system is, where the data lives and what needs to move — then build the smallest reliable integration that removes the manual step. If a system has no API, we will say so and plan around it honestly."
    },
    {
      "q": "How long does software take to build?",
      "a": "A focused first release — one workflow, doing one job properly — is typically live within three months. Larger systems are phased so value lands early and each phase is judged on real use rather than a plan."
    },
    {
      "q": "Will our team be able to update the website?",
      "a": "Yes. Content and structure are planned so routine updates — products, sectors, case studies, accreditations — are straightforward, and we document the patterns your team will use most often."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Ready to fix the website or the workflow — or both?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
