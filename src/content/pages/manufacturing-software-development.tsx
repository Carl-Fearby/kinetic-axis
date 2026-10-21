import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "SECTOR / MANUFACTURING",
  "title": "Manufacturing software",
  "accent": "development.",
  "lead": "Operational software for manufacturers — production planning, shop-floor recording, quality, stock and traceability, connected to the ERP and accounting tools already running the business.",
  "artClass": "mkt-hero-art--v02",
  "artLabel": "MANUFACTURING / OPERATIONS",
  "artHeading": "Connect the plan, the shop floor and the numbers.",
  "artFooter": "Planning · Production · Quality · Traceability",
  "introKicker": "WHERE MANUFACTURING SYSTEMS LEAVE GAPS",
  "introTitle": "An ERP records the business. It rarely reflects the way the shop floor actually works.",
  "introCopy": [
    "Most manufacturers already run an ERP or accounts package. The operational gap sits around it: planning still happens in spreadsheets, route cards are printed, quality checks live in folders, and the true status of a job is reconstructed by asking someone who walked the floor.",
    "A focused operational system can sit between the ERP and the shop floor, capturing the events the ERP cannot see and feeding back the ones finance needs. It does not need to replace the core system to remove a significant amount of chasing."
  ],
  "capabilityKicker": "WHERE A CUSTOM SYSTEM HELPS",
  "capabilityTitle": "The operational detail an ERP was not designed to capture.",
  "capabilityIntro": "Start with the constraint causing the most delay, rework or manual reconciliation.",
  "cards": [
    {
      "title": "Production planning & scheduling",
      "text": "Turn orders, capacity and material availability into a plan the team can see and update as conditions change."
    },
    {
      "title": "Shop-floor data capture",
      "text": "Record start, stop, quantity, scrap and downtime at the point of work, on a device that suits the environment."
    },
    {
      "title": "Quality & traceability",
      "text": "Attach checks, certificates, batches and non-conformances to the job so a recall or audit question has a defensible answer."
    },
    {
      "title": "Stock, purchasing & despatch",
      "text": "See what is committed, what is short and what is ready to ship without rebuilding the position in a spreadsheet."
    }
  ],
  "useKicker": "SIGNS THE OPERATIONAL LAYER IS UNDER STRAIN",
  "useTitle": "When the ERP is not wrong, but it is not where the work happens.",
  "useIntro": "These are the patterns where a focused system usually removes real friction.",
  "useCases": [
    {
      "title": "Planning lives in spreadsheets",
      "text": "Several versions of the schedule make it hard to know what is actually running, what changed and what is at risk."
    },
    {
      "title": "Job status is a conversation",
      "text": "Progress, delays and shortages are discovered by walking the floor rather than from a reliable operational view."
    },
    {
      "title": "Traceability is reconstructed",
      "text": "Batch, certificate and inspection records are scattered across paper and folders when an audit or customer query arrives."
    },
    {
      "title": "Finance waits for operations",
      "text": "Goods receipts, production completion and despatch are re-keyed into the ERP days after the event."
    }
  ],
  "process": [
    {
      "title": "Map the value stream",
      "text": "Follow an order from sales through planning, production, quality and despatch, including the exceptions that consume time."
    },
    {
      "title": "Agree the system boundary",
      "text": "Decide what stays in the ERP, what the operational system owns and which events need to flow between them."
    },
    {
      "title": "Design for the floor",
      "text": "Keep capture fast and forgiving on a tablet or handheld, with clear states for partial work, rework and downtime."
    },
    {
      "title": "Feed the business",
      "text": "Give planning, quality and finance the reports they need without another manual export."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React data-dense operational interfaces",
      "eyebrow": "OPERATIONAL INTERFACES",
      "title": "OPUS React",
      "text": "Reusable patterns for dense tables, forms, validation and the interfaces used in day-to-day operations."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues multi-site operational platform",
      "eyebrow": "MULTI-SITE OPERATIONS",
      "title": "Pace Venues",
      "text": "Operational and customer journeys brought together on a shared platform rather than disconnected tools."
    }
  ],
  "related": [
    {
      "href": "/business-software-development",
      "title": "Business software development",
      "text": "Operational software designed around real workflows, roles and data."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce repeated administration and make handoffs and exceptions visible."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect ERP, accounting and operational systems with clear ownership and failure handling."
    },
    {
      "href": "/legacy-system-modernisation",
      "title": "Legacy system modernisation",
      "text": "A staged route away from unsupported tools and fragile spreadsheets."
    }
  ],
  "faqs": [
    {
      "q": "Are you replacing our ERP?",
      "a": "Usually not. The ERP remains the system of record for finance and core transactions. A custom system earns its place in the operational detail around it — planning, shop-floor capture, quality and traceability — where the ERP is either too rigid or too slow to change."
    },
    {
      "q": "Can it integrate with our existing ERP or accounts package?",
      "a": "Where the system exposes a usable API, database view or import route, yes. The integration should define which system owns each record and how corrections flow, rather than attempting a full two-way sync of everything."
    },
    {
      "q": "Can it work on shop-floor tablets or handhelds?",
      "a": "Yes, but the interface has to be designed for the environment: large targets, minimal typing, clear states and resilience to interrupted connectivity. A desktop form moved onto a tablet is rarely good enough."
    },
    {
      "q": "What about traceability and audit requirements?",
      "a": "Traceability should be part of the data model, not a report bolted on later. Batch, material, operator, inspection and timestamps need to be captured at the event so a recall or audit question can be answered from records rather than memory."
    },
    {
      "q": "How do we start without disrupting production?",
      "a": "Pick one product line, cell or workflow and run the new system alongside the current process for a controlled period. Expand once the data and the operating rhythm are trusted."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Where does the ERP stop reflecting what is happening on the floor?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
