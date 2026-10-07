import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "INTERNAL BUSINESS SYSTEMS",
  "title": "Internal software built around",
  "accent": "how the business actually works.",
  "lead": "Bring operational workflows, permissions, data and day-to-day actions into a system designed around the people doing the work — rather than forcing the work around a generic tool.",
  "artClass": "mkt-hero-art--v02",
  "artLabel": "OPERATIONS / INTERNAL SYSTEMS",
  "artHeading": "One operational view. Fewer disconnected tools.",
  "artFooter": "Workflows · Roles · Data · Reporting · Actions",
  "introKicker": "SOFTWARE FOR THE INSIDE OF THE BUSINESS",
  "introTitle": "Internal tools deserve the same product thinking as customer-facing software.",
  "introCopy": [
    "Spreadsheets, inboxes and disconnected SaaS products can carry a process surprisingly far. The friction appears when people need the same information, permissions become important or nobody can see the full state of a workflow.",
    "We design internal systems around the decisions staff make, the data they need and the exceptions they have to resolve. The result can be simpler than a large off-the-shelf platform because it only needs to solve the problem your organisation actually has."
  ],
  "capabilityKicker": "SYSTEM CAPABILITIES",
  "capabilityTitle": "The operational pieces that usually matter most.",
  "capabilityIntro": "The right internal system makes routine work easier without hiding the controls needed for unusual cases.",
  "cards": [
    {
      "title": "Roles & permissions",
      "text": "Give teams the actions and information they need without exposing every control to every user."
    },
    {
      "title": "Workflow & status",
      "text": "Make ownership, progress, hand-offs and exceptions visible instead of relying on inbox memory."
    },
    {
      "title": "Data & search",
      "text": "Keep operational records structured, searchable and connected to the actions people take."
    },
    {
      "title": "Reporting & oversight",
      "text": "Surface useful operational measures and queues without forcing teams to rebuild reports manually."
    }
  ],
  "useKicker": "WHEN IT FITS",
  "useTitle": "Good candidates for a purpose-built internal system.",
  "useIntro": "Custom internal software makes most sense where the workflow itself is important to how the business operates.",
  "useCases": [
    {
      "title": "Operations platforms",
      "text": "Coordinate repeat work across teams, locations or customer accounts with clear ownership and status."
    },
    {
      "title": "Case management",
      "text": "Keep records, communication, decisions and supporting information together around a case or request."
    },
    {
      "title": "Back-office administration",
      "text": "Manage customers, products, bookings, content, configuration or other data that powers customer experiences."
    },
    {
      "title": "Process replacement",
      "text": "Replace fragile spreadsheet-and-email processes with a controlled application and a clear source of truth."
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
      "alt": "Pace Venues hospitality platform project",
      "eyebrow": "HOSPITALITY PLATFORM",
      "title": "Pace Venues",
      "text": "Bookings, rewards, guest mobile experience and operational tooling built on one platform."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React design system project",
      "eyebrow": "DESIGN SYSTEM",
      "title": "OPUS React",
      "text": "Reusable React components and interaction patterns for complex product and business interfaces."
    }
  ],
  "related": [
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Automate repeat steps and hand-offs once the operational process is clear."
    },
    {
      "href": "/admin-dashboard-development",
      "title": "Admin dashboard development",
      "text": "Create focused operational views, controls and reporting."
    },
    {
      "href": "/business-software-development",
      "title": "Business software development",
      "text": "Design a broader bespoke software product around business requirements."
    }
  ],
  "faqs": [
    {
      "q": "When is custom internal software worth building?",
      "a": "It becomes compelling when an important workflow is repeatedly being adapted around spreadsheets, email or several disconnected tools, and the cost of that friction is meaningful."
    },
    {
      "q": "Can you replace one part of an existing system rather than everything?",
      "a": "Yes. A focused internal tool can sit alongside existing software and use integrations where replacing the whole platform would create unnecessary risk."
    },
    {
      "q": "Can the system support different staff roles?",
      "a": "Yes. Roles and permissions can be designed around who needs to view, create, approve, edit or administer different parts of the workflow."
    },
    {
      "q": "Can existing data be migrated?",
      "a": "Potentially. We first assess the quality, structure and ownership of the existing data, then plan migration and validation around what the new system genuinely needs."
    }
  ],
  "contactService": "Internal business systems",
  "ctaTitle": "Need one place for a workflow that currently lives everywhere?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
