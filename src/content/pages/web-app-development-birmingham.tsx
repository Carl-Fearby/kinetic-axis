import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Services",
    "href": "/services"
  },
  "kicker": "WEB APP DEVELOPMENT / BIRMINGHAM",
  "title": "Web application development for",
  "accent": "Birmingham businesses.",
  "lead": "Custom portals, dashboards and browser-based products for Birmingham organisations that need software shaped around real customer and operational workflows.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "BIRMINGHAM / WEB APPLICATIONS",
  "artHeading": "Turn a complex workflow into a product people can actually use.",
  "artFooter": "Portals · Dashboards · Workflows · APIs",
  "introKicker": "BUILT AROUND THE JOB TO BE DONE",
  "introTitle": "A web app should remove friction, not move it into another screen.",
  "introCopy": [
    "Teams often reach the point where websites, spreadsheets and disconnected tools can no longer support the workflow cleanly. A purpose-built web application can bring customer tasks, operational decisions and shared data into one coherent product.",
    "For Birmingham organisations, we can work from early discovery through UX, application engineering and integration. The location matters for collaboration; the product decisions still start with users, workflow, data and measurable outcomes."
  ],
  "capabilityKicker": "WHAT WE CAN DELIVER",
  "capabilityTitle": "A complete web application, not just the interface.",
  "capabilityIntro": "We join product thinking, UX and engineering so the browser experience and the systems behind it evolve together.",
  "cards": [
    {
      "title": "Customer portals",
      "text": "Secure self-service for accounts, documents, bookings, status and repeat customer tasks."
    },
    {
      "title": "Operational dashboards",
      "text": "Role-aware interfaces for teams managing data, exceptions, approvals and day-to-day work."
    },
    {
      "title": "Connected workflows",
      "text": "Replace fragmented hand-offs with clearer states, ownership and automation across the process."
    },
    {
      "title": "API-backed products",
      "text": "Connect the application to payments, CRM, booking, identity or existing internal services."
    }
  ],
  "useKicker": "WHEN A WEB APP MAKES SENSE",
  "useTitle": "Useful when the browser needs to do real work.",
  "useIntro": "A web app is a strong fit when users need more than content — they need to complete, manage or monitor a process.",
  "useCases": [
    {
      "title": "Customers need self-service",
      "text": "Give customers a clear place to complete repeat tasks without relying on email or manual support."
    },
    {
      "title": "Teams are working across tools",
      "text": "Bring important workflow and status into one product rather than several disconnected systems."
    },
    {
      "title": "A process needs rules",
      "text": "Model permissions, lifecycle, validation and exceptions in software instead of relying on memory."
    },
    {
      "title": "The product needs to evolve",
      "text": "Create a maintainable foundation that can add features without repeatedly rebuilding the core journey."
    }
  ],
  "process": [
    {
      "title": "Map the workflow",
      "text": "Understand users, decisions, data and exceptions before deciding what the interface needs."
    },
    {
      "title": "Define the first release",
      "text": "Prioritise the smallest coherent version that improves the workflow and proves the product shape."
    },
    {
      "title": "Design and engineer together",
      "text": "Build UX, data behaviour and integrations as one connected application."
    },
    {
      "title": "Release and learn",
      "text": "Use real usage and operational feedback to guide the next improvements."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues connected product platform",
      "eyebrow": "CONNECTED PLATFORM",
      "title": "Pace Venues",
      "text": "Customer journeys and venue operations designed as one connected product."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React design system",
      "eyebrow": "PRODUCT UI",
      "title": "OPUS React",
      "text": "Reusable interface foundations for complex web and business application experiences."
    }
  ],
  "related": [
    {
      "href": "/web-app-development",
      "title": "Web application development",
      "text": "Explore the core browser-product engineering service."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Go deeper into secure customer self-service."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect the application to the services it depends on."
    }
  ],
  "faqs": [
    {
      "q": "Do you only work with businesses in Birmingham?",
      "a": "No. Kinetic Axis works with organisations across the UK. This page provides a focused route for Birmingham teams looking for custom web application support."
    },
    {
      "q": "Can you replace an existing internal tool with a web app?",
      "a": "Yes. We can review the current workflow, data and technical constraints, then recommend whether to improve, integrate or rebuild the product."
    },
    {
      "q": "Can the web app connect to our existing systems?",
      "a": "Yes. Integration requirements are considered during discovery so the application, data flow and operational process are designed together."
    },
    {
      "q": "Can you help define an MVP?",
      "a": "Yes. We can separate the essential product loop from later enhancements so the first release is useful without being over-scoped."
    }
  ],
  "contactService": "Web application development",
  "ctaTitle": "Planning a web application in Birmingham?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate your project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
