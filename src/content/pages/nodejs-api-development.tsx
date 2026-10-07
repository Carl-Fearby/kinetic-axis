import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "NODE.JS API DEVELOPMENT",
  "title": "APIs and backend services that",
  "accent": "hold products together.",
  "lead": "Build Node.js backend services around clear domain rules, integrations, authentication and operational failure handling — not just a collection of endpoints.",
  "artClass": "mkt-hero-art--phase3-node-api",
  "artLabel": "NODE.JS / API LAYER",
  "artHeading": "Reliable behaviour behind the interface.",
  "artFooter": "APIs · Auth · Data · Webhooks · Integrations",
  "introKicker": "BACKEND PRODUCT THINKING",
  "introTitle": "The API is where workflows, data and external systems meet.",
  "introCopy": [
    "Backend services carry the rules that interfaces depend on: permissions, validation, state changes, integrations and the recovery paths for when external systems fail.",
    "We design the service boundary around the product domain so the API remains understandable as features, clients and integrations expand."
  ],
  "capabilityKicker": "NODE.JS BACKEND CAPABILITIES",
  "capabilityTitle": "Build for behaviour, observability and change.",
  "capabilityIntro": "A useful API needs clear contracts and reliable operational behaviour, not just successful happy-path requests.",
  "cards": [
    {
      "title": "REST API design",
      "text": "Clear resources, validation and response behaviour shaped around real client and workflow needs."
    },
    {
      "title": "Authentication & permissions",
      "text": "Session, token and role rules designed around who can do what rather than bolted on after the API grows."
    },
    {
      "title": "Third-party integrations",
      "text": "Connect external services with explicit mapping, retries, idempotency and failure handling."
    },
    {
      "title": "Background workflows",
      "text": "Move asynchronous work, notifications and integration tasks out of request paths where reliability requires it."
    }
  ],
  "useKicker": "BACKEND USE CASES",
  "useTitle": "One service layer can support several product surfaces.",
  "useIntro": "A well-designed backend can coordinate web, mobile, admin and integration clients without duplicating business rules.",
  "useCases": [
    {
      "title": "Mobile app backends",
      "text": "Accounts, product data, booking, rewards and notification workflows behind native or cross-platform apps."
    },
    {
      "title": "Web application APIs",
      "text": "Shared backend behaviour for portals, dashboards and browser-based products."
    },
    {
      "title": "Integration gateways",
      "text": "Translate data and lifecycle events between your product and external platforms."
    },
    {
      "title": "Operational services",
      "text": "Centralise business rules that are currently distributed across spreadsheets, scripts or several disconnected tools."
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
      "alt": "Pace Venues connected platform project",
      "eyebrow": "CONNECTED PRODUCT BACKEND",
      "title": "Pace Venues",
      "text": "A multi-surface hospitality product with mobile, operational and integration needs sharing backend behaviour."
    }
  ],
  "related": [
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect third-party systems and data around the wider business workflow."
    },
    {
      "href": "/nextjs-development",
      "title": "Next.js development",
      "text": "Build the web product layer that consumes modern backend services."
    },
    {
      "href": "/payment-integration-development",
      "title": "Payment integration development",
      "text": "Handle transaction state and provider integration as part of a dependable backend workflow."
    }
  ],
  "faqs": [
    {
      "q": "Can you build an API for an existing application?",
      "a": "Yes. We can introduce or extend a service layer around an existing product where the data and architecture allow it."
    },
    {
      "q": "Do you work with PostgreSQL and relational data?",
      "a": "Yes. Relational databases are often a good fit for products with structured workflows and connected business data, though the final choice depends on the problem."
    },
    {
      "q": "How do you handle third-party API failures?",
      "a": "We plan for retries, idempotency, timeouts, logging and operational recovery according to the behaviour of the external service and the importance of the workflow."
    },
    {
      "q": "Can one API support both web and mobile apps?",
      "a": "Yes. Shared business rules can sit behind multiple clients while client-specific presentation remains in the web or mobile application."
    }
  ],
  "contactService": "API and systems integration",
  "ctaTitle": "Need a backend service that several parts of the product can depend on?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
