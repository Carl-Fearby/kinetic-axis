import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "SECTOR / CONSTRUCTION",
  "title": "Construction software",
  "accent": "development.",
  "lead": "Operational software for construction teams — job costing, variations, site records, subcontractors and compliance, connected to the estimating and accounting tools already in use.",
  "artClass": "mkt-hero-art--phase3-professional-services",
  "artLabel": "CONSTRUCTION / OPERATIONS",
  "artHeading": "Keep the site, the office and the numbers in step.",
  "artFooter": "Jobs · Variations · Site records · Costing",
  "introKicker": "CONSTRUCTION SOFTWARE SHOULD FOLLOW THE JOB",
  "introTitle": "The work moves between site, office, commercial and finance. Most systems only see one of them.",
  "introCopy": [
    "Construction businesses rarely suffer from a lack of software. They suffer from software that reflects one department's view of the job. The site records progress in one place, the QS tracks variations in another, and finance reconstructs the month from spreadsheets and emails.",
    "A purpose-built system connects those views around a single job record: what was planned, what changed, what was installed, what it cost and what is still outstanding. It does not need to replace estimating or accounting to be useful — it needs to sit between them honestly."
  ],
  "capabilityKicker": "WHERE A CUSTOM SYSTEM HELPS",
  "capabilityTitle": "The commercial and operational events that generic tools handle badly.",
  "capabilityIntro": "Start with the handoff creating the most leakage, dispute or repeated administration.",
  "cards": [
    {
      "title": "Job costing & valuations",
      "text": "Track committed and actual cost against the job, with a clear view of valuation, retention and what is still to be invoiced."
    },
    {
      "title": "Variations & change control",
      "text": "Record instructions and changes as they happen, with the approval, evidence and cost consequence attached to the right job."
    },
    {
      "title": "Site records & compliance",
      "text": "Capture progress, delays, inspections and evidence on site so the office is not reconstructing the week from messages and photos."
    },
    {
      "title": "Subcontractors & procurement",
      "text": "Keep orders, applications, certificates and payment status connected to the work they relate to."
    }
  ],
  "useKicker": "SIGNS THE CURRENT SETUP IS COSTING MORE THAN IT LOOKS",
  "useTitle": "The expensive part is rarely the software licence. It is the reconciliation.",
  "useIntro": "These are the patterns where a focused system tends to pay for itself.",
  "useCases": [
    {
      "title": "Job costing lives in spreadsheets",
      "text": "Several versions of the same cost sheet make it hard to know the current position before a valuation or a client conversation."
    },
    {
      "title": "Variations get agreed in conversation",
      "text": "Work is instructed on site but the commercial record lags behind, leaving margin exposed at final account."
    },
    {
      "title": "Site evidence is scattered",
      "text": "Photos, notes and inspection records sit on phones and in message threads rather than against the job they prove."
    },
    {
      "title": "Finance rebuilds the month",
      "text": "Applications, orders and invoices are re-keyed into accounting because the operational systems do not share a reference."
    }
  ],
  "process": [
    {
      "title": "Map the commercial workflow",
      "text": "Follow a job from enquiry and estimate through delivery, variation, valuation and final account."
    },
    {
      "title": "Agree the cost model",
      "text": "Define the job, cost codes, variations and commitments so reporting means the same thing to site and finance."
    },
    {
      "title": "Build around the site handoff",
      "text": "Keep data capture simple enough to be used on a phone, with the office view designed for checking and acting."
    },
    {
      "title": "Connect, don't duplicate",
      "text": "Integrate with estimating and accounting where they already work, rather than recreating their ledgers in another system."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues multi-site operational platform",
      "eyebrow": "MULTI-SITE OPERATIONS",
      "title": "Pace Venues",
      "text": "Operational and customer journeys across several venues, brought together on one platform foundation."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React enterprise interface components",
      "eyebrow": "OPERATIONAL INTERFACES",
      "title": "OPUS React",
      "text": "Dense, data-rich interfaces for teams working with records, forms, approvals and reporting."
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
      "text": "Reduce repeated administration around approvals, notifications and handoffs."
    },
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Purpose-built tools for the teams running day-to-day operations."
    },
    {
      "href": "/mobile-app-development",
      "title": "Mobile app development",
      "text": "When site or field teams need a dependable experience on a phone or tablet."
    }
  ],
  "faqs": [
    {
      "q": "Do you build estimating or accounting systems?",
      "a": "Usually the better route is to connect to the estimating and accounting tools already in use rather than replace them. A custom system earns its place in the operational gap between them: job records, variations, site evidence and cost tracking."
    },
    {
      "q": "Can it work on site with poor connectivity?",
      "a": "It can be designed for it, but offline behaviour has to be a deliberate part of the product rather than an afterthought. That means local capture, queued sync and clear conflict handling when a device reconnects."
    },
    {
      "q": "Can it integrate with Sage, Xero or our existing accounts package?",
      "a": "Yes, where the package exposes a usable API or import route. The integration should agree which system owns each record and how corrections flow, rather than syncing everything in both directions."
    },
    {
      "q": "Is this a full ERP replacement?",
      "a": "Not by default. Most useful first releases solve a specific operational gap well. Expanding into a wider platform only makes sense once the core workflow is reliable and the business case is clear."
    },
    {
      "q": "Do you work with construction firms outside the Midlands?",
      "a": "Yes. Discovery and delivery can run remotely, with on-site sessions where they add value. The studio is based in Warwickshire and works with organisations across the UK."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Where does the job record stop matching what happened on site?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
