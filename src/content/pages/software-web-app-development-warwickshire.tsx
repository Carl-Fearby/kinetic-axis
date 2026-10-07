import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WARWICKSHIRE SOFTWARE & WEB APPS",
  "title": "Bespoke software and web apps for",
  "accent": "Warwickshire businesses.",
  "lead": "Product design, web application development and bespoke business software for organisations in Warwickshire — with the same delivery capability available to clients across the UK.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "WARWICKSHIRE / DIGITAL PRODUCTS",
  "artHeading": "Local context. Serious product engineering.",
  "artFooter": "Web Apps · Business Software · Portals · APIs · Mobile",
  "introKicker": "REGIONAL DELIVERY, FULL PRODUCT THINKING",
  "introTitle": "A nearby development partner without narrowing the technical ambition.",
  "introCopy": [
    "Businesses in Warwickshire face the same product and operational challenges as organisations anywhere else: disconnected systems, manual workflows, customer journeys that have outgrown the website, or software that no longer fits the business.",
    "Kinetic Axis can support those needs with product, UX and engineering work across web applications, mobile products, internal systems and integrations. This page remains the broad regional overview. Where a service has different buyer intent, focused pages go deeper into that specific need rather than repeating the same generic regional copy."
  ],
  "capabilityKicker": "WHAT WE CAN BUILD",
  "capabilityTitle": "From customer-facing products to the systems behind them.",
  "capabilityIntro": "The work is scoped around the business problem rather than a fixed package.",
  "cards": [
    {
      "title": "Web applications",
      "text": "Browser-based products, portals and tools built around real users and workflows."
    },
    {
      "title": "Bespoke business software",
      "text": "Internal systems that replace fragmented manual processes with clearer operational workflows."
    },
    {
      "title": "Mobile products",
      "text": "Customer and workforce applications connected to backend services and existing platforms."
    },
    {
      "title": "API & integration work",
      "text": "Connect the systems that need to share data, status or business events reliably."
    }
  ],
  "useKicker": "WHO THIS IS FOR",
  "useTitle": "Useful for organisations that need more than a brochure website.",
  "useIntro": "We are a fit where software, workflow and customer experience need to be considered together.",
  "useCases": [
    {
      "title": "Growing SMEs",
      "text": "Replace operational workarounds and create software that can support the next stage of growth."
    },
    {
      "title": "Established businesses",
      "text": "Modernise specific workflows or customer journeys without destabilising everything that already works."
    },
    {
      "title": "Digital product teams",
      "text": "Add product design and engineering capacity for a focused application, integration or interface problem."
    },
    {
      "title": "New product ventures",
      "text": "Shape an idea into a coherent first release with a clear technical and product foundation."
    }
  ],
  "process": [
    {
      "title": "Understand the workflow",
      "text": "Map users, decisions, data, hand-offs and exceptions before deciding what the software should look like."
    },
    {
      "title": "Define the product shape",
      "text": "Separate the core outcome from useful extras so the first release is coherent rather than over-scoped."
    },
    {
      "title": "Design and integrate",
      "text": "Build the interface, data model and integrations together so the product behaves as one system."
    },
    {
      "title": "Release and evolve",
      "text": "Use real operation and customer feedback to decide what should be improved, automated or expanded next."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues product platform project",
      "eyebrow": "CONNECTED PRODUCT",
      "title": "Pace Venues",
      "text": "A hospitality product bringing customer experience and venue operations together."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React design system project",
      "eyebrow": "DESIGN & ENGINEERING",
      "title": "OPUS React",
      "text": "A reusable interface system for complex product and business application experiences."
    }
  ],
  "related": [
    {
      "href": "/web-app-development",
      "title": "Web app development",
      "text": "Design and engineer browser-based products and tools."
    },
    {
      "href": "/bespoke-software-development",
      "title": "Bespoke software development",
      "text": "Create software around the way your organisation actually works."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect products and business systems reliably."
    }
  ],
  "faqs": [
    {
      "q": "Do you only work with businesses in Warwickshire?",
      "a": "No. Kinetic Axis works on digital products for organisations beyond Warwickshire as well; this page simply gives local businesses a direct route into the relevant services."
    },
    {
      "q": "Can you work remotely with our team?",
      "a": "Yes. Product discovery, design and engineering workflows can be run effectively with distributed teams, with in-person collaboration used where it adds value."
    },
    {
      "q": "Can you take over an existing application?",
      "a": "Yes, subject to an initial review of the codebase, infrastructure and product priorities. We can then recommend whether to improve, modernise or selectively rebuild."
    },
    {
      "q": "Do you build websites as well as software?",
      "a": "Yes. We build websites, web applications, mobile products and bespoke software, choosing the right product shape for the need."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Looking for a software or web application partner in Warwickshire?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
