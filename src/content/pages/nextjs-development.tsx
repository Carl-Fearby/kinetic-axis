import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "NEXT.JS DEVELOPMENT",
  "title": "Next.js products built for",
  "accent": "speed and longevity.",
  "lead": "Design and engineer production Next.js applications with clean routing, strong rendering choices, reusable UI and integrations that fit the wider product architecture.",
  "artClass": "mkt-hero-art--phase3-nextjs",
  "artLabel": "NEXT.JS / WEB PRODUCT",
  "artHeading": "Modern web delivery without framework theatre.",
  "artFooter": "App Router · Rendering · UX · Integrations · Deployment",
  "introKicker": "FRAMEWORK WITH A PURPOSE",
  "introTitle": "Choose Next.js because it fits the product, not because it is fashionable.",
  "introCopy": [
    "Next.js can support marketing sites, customer portals, SaaS products and operational applications, but the right architecture depends on what needs to be rendered, cached, personalised or integrated.",
    "We focus on the product behaviour first, then use the framework features that make delivery simpler, faster and easier to maintain."
  ],
  "capabilityKicker": "NEXT.JS CAPABILITIES",
  "capabilityTitle": "Build the application around rendering, data and user journeys.",
  "capabilityIntro": "The framework gives options; the architecture should choose deliberately between them.",
  "cards": [
    {
      "title": "App Router architecture",
      "text": "Clear route and layout structure for products that need shared shells, nested experiences and maintainable page ownership."
    },
    {
      "title": "Rendering strategy",
      "text": "Choose static, server-rendered or client behaviour according to data freshness, SEO and interaction requirements."
    },
    {
      "title": "API & service integration",
      "text": "Connect application experiences to internal services, third-party APIs and backend workflows cleanly."
    },
    {
      "title": "Production deployment",
      "text": "Build deployment, environment and monitoring decisions around the real hosting and operational model."
    }
  ],
  "useKicker": "GOOD NEXT.JS FITS",
  "useTitle": "Useful across content-heavy and application-heavy products.",
  "useIntro": "Next.js is strongest when the product benefits from React, route-level composition and flexible rendering choices.",
  "useCases": [
    {
      "title": "Web applications",
      "text": "Interactive products that need strong routing, reusable UI and server/client boundaries."
    },
    {
      "title": "Customer portals",
      "text": "Authenticated experiences combining account data, self-service workflows and content."
    },
    {
      "title": "Product websites",
      "text": "Content-rich sites where SEO, performance and application-style interaction need to coexist."
    },
    {
      "title": "SaaS frontends",
      "text": "Structured product shells for onboarding, accounts, dashboards and feature workflows."
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
      "alt": "Pace Venues digital product project",
      "eyebrow": "CONNECTED WEB PLATFORM",
      "title": "Pace Venues",
      "text": "A connected product spanning customer journeys, venue operations and supporting web experiences."
    }
  ],
  "related": [
    {
      "href": "/web-app-development",
      "title": "Web app development",
      "text": "Broader product and engineering support for browser-based applications."
    },
    {
      "href": "/nodejs-api-development",
      "title": "Node.js API development",
      "text": "Build the service and integration layer behind modern web products."
    },
    {
      "href": "/react-component-library-development",
      "title": "React component library development",
      "text": "Create reusable UI foundations for growing React products."
    }
  ],
  "faqs": [
    {
      "q": "Do you only build greenfield Next.js projects?",
      "a": "No. We can work on existing Next.js products, migrations or focused feature and architecture improvements."
    },
    {
      "q": "Do all pages need server rendering?",
      "a": "No. Rendering should match the page and data requirements. Some routes benefit from static output, others need server data, and highly interactive parts may belong on the client."
    },
    {
      "q": "Can Next.js work with an existing backend?",
      "a": "Yes. A Next.js frontend can sit in front of existing APIs and services, provided the integration and authentication model are appropriate."
    },
    {
      "q": "Can you deploy Next.js to our existing infrastructure?",
      "a": "Often, yes. The deployment model depends on whether the product is statically exported, server-rendered or requires Node runtime features."
    }
  ],
  "contactService": "Web application development",
  "ctaTitle": "Planning a Next.js application or modernising an existing one?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
