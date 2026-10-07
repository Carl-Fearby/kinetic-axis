import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "ENTERPRISE UI DEVELOPMENT",
  "title": "Complex interfaces made",
  "accent": "clearer to operate.",
  "lead": "Design and build information-rich interfaces for operational software, dashboards and internal products where speed, consistency and clarity matter every day.",
  "artClass": "mkt-hero-art--phase3-enterprise-ui",
  "artLabel": "ENTERPRISE UI / OPERATIONS",
  "artHeading": "Dense information. Clear decisions.",
  "artFooter": "Dashboards · Forms · Tables · Roles · Workflows",
  "introKicker": "DESIGNED FOR REPEAT USE",
  "introTitle": "Business software should get faster to use as people learn it.",
  "introCopy": [
    "Enterprise and internal interfaces often carry more information and more actions than customer-facing websites. The challenge is not to make them visually empty; it is to make complexity understandable.",
    "We organise hierarchy, state, permissions and repeated workflows so experienced users can move quickly while new users still understand what the interface is asking them to do."
  ],
  "capabilityKicker": "ENTERPRISE UI CAPABILITIES",
  "capabilityTitle": "Design the interface around decisions and frequency.",
  "capabilityIntro": "Operational interfaces benefit from strong patterns, clear states and deliberate information density.",
  "cards": [
    {
      "title": "Workflow-led layouts",
      "text": "Structure screens around the actions people repeat, the exceptions they handle and the information they need together."
    },
    {
      "title": "Tables & data views",
      "text": "Design sorting, filtering, status and actions around how teams inspect and act on operational data."
    },
    {
      "title": "Forms & validation",
      "text": "Make complex input predictable with consistent labels, states, grouping and error handling."
    },
    {
      "title": "Role-aware interfaces",
      "text": "Expose the right controls and information for different responsibilities without creating separate products for every user type."
    }
  ],
  "useKicker": "COMMON ENTERPRISE UI NEEDS",
  "useTitle": "Clarity matters most where the product is used all day.",
  "useIntro": "These interfaces often sit at the centre of operational work rather than being occasional customer journeys.",
  "useCases": [
    {
      "title": "Operations platforms",
      "text": "Daily tools for managing customers, orders, bookings, cases or other changing business state."
    },
    {
      "title": "Admin dashboards",
      "text": "High-level monitoring with drill-down actions and practical operational controls."
    },
    {
      "title": "CRM-style interfaces",
      "text": "Information-dense account and relationship views where context needs to remain visible."
    },
    {
      "title": "Internal workflow tools",
      "text": "Task-driven interfaces that replace fragmented spreadsheets, email and repeated manual hand-offs."
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
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React enterprise interface project",
      "eyebrow": "BUSINESS UI SYSTEM",
      "title": "OPUS React",
      "text": "Reusable patterns for forms, content, charts, navigation and theming across complex application interfaces."
    }
  ],
  "related": [
    {
      "href": "/admin-dashboard-development",
      "title": "Admin dashboard development",
      "text": "Focused operational dashboards, actions and reporting interfaces."
    },
    {
      "href": "/design-system-development",
      "title": "Design system development",
      "text": "Create the reusable rules that keep enterprise interfaces coherent as they grow."
    },
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Build the wider workflow and data platform behind the interface."
    }
  ],
  "faqs": [
    {
      "q": "What makes enterprise UI different from a marketing website?",
      "a": "Enterprise interfaces are usually used repeatedly to complete operational tasks, so information density, state, speed and predictable interaction matter more than promotional storytelling."
    },
    {
      "q": "Can you improve an existing interface without replacing the backend?",
      "a": "Often, yes. We can redesign the interface around existing APIs or application boundaries where the underlying systems are still viable."
    },
    {
      "q": "How do you handle complex permissions?",
      "a": "We map roles and responsibilities early so navigation, data visibility and actions reflect what each user is actually allowed and expected to do."
    },
    {
      "q": "Can the interface share a design system with other products?",
      "a": "Yes. Shared foundations and components are particularly useful when several internal or customer-facing products should feel related."
    }
  ],
  "contactService": "UI / UX / branding",
  "ctaTitle": "Have an operational interface that has become harder to use than the work itself?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
