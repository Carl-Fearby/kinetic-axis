import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Services",
    "href": "/services"
  },
  "kicker": "INTEGRATIONS / XERO",
  "title": "Xero integration",
  "accent": "development.",
  "lead": "Connect your product, operations tool or back office to Xero so invoices, contacts and payments stay consistent without daily exports or spreadsheet reconciliation.",
  "artClass": "mkt-hero-art--phase3-node-api",
  "artLabel": "XERO / ACCOUNTING INTEGRATION",
  "artHeading": "Keep accounting in Xero. Keep the workflow in the product.",
  "artFooter": "Invoices · Contacts · Payments · Reconciliation",
  "introKicker": "WHY XERO INTEGRATION IS A WORKFLOW DECISION",
  "introTitle": "An integration is not just a data pipe. It is an agreement about which system owns which truth.",
  "introCopy": [
    "Most finance integration problems start before any code is written. Two systems both believe they own the customer, the invoice status or the payment date, and someone reconciles the difference by hand. Connecting the APIs does not fix that; deciding ownership does.",
    "We map the accounting events your operation actually creates, agree which system is authoritative for each one, then build the sync so it can be retried, audited and explained to whoever closes the month."
  ],
  "capabilityKicker": "WHAT WE CONNECT",
  "capabilityTitle": "The accounting events that usually need to move.",
  "capabilityIntro": "A focused integration can cover one direction and one object type. A fuller finance workflow connects several events with clear rules between them.",
  "cards": [
    {
      "title": "Invoices & credit notes",
      "text": "Raise invoices from the operational system, keep line detail intact and handle credits, voids and corrections without duplicate records."
    },
    {
      "title": "Contacts & payment terms",
      "text": "Keep customer and supplier records aligned, including the payment terms and tax treatment that affect when money is expected."
    },
    {
      "title": "Payments & allocation",
      "text": "Bring payment status back into the product so operations can see what has been paid, part-paid or is still outstanding."
    },
    {
      "title": "Reconciliation support",
      "text": "Expose the reference, timestamp and status needed to trace a transaction end to end when the month-end picture does not match."
    }
  ],
  "useKicker": "WHERE MANUAL RE-KEYING CREATES RISK",
  "useTitle": "If someone exports a CSV every morning, the integration is already missing.",
  "useIntro": "These are the operating patterns where a Xero connection usually earns its place.",
  "useCases": [
    {
      "title": "Quote-to-invoice handoff",
      "text": "Sales agrees the work in one system, finance re-enters it in another, and the difference surfaces as a query weeks later."
    },
    {
      "title": "Job or project billing",
      "text": "Time, materials and milestones sit in an operational tool while the invoice is assembled manually from several reports."
    },
    {
      "title": "Repeat or subscription billing",
      "text": "Recurring charges, pauses and credits need a reliable source of truth rather than a monthly checklist."
    },
    {
      "title": "Marketplace or multi-entity payouts",
      "text": "Several income streams or legal entities create allocation and reporting work that grows faster than the team."
    }
  ],
  "process": [
    {
      "title": "Map the finance events",
      "text": "Identify what creates an invoice, a payment, a credit or a contact change, and who currently owns each decision."
    },
    {
      "title": "Agree the contract",
      "text": "Define direction, identifiers, required fields, tax handling and what happens when a record is edited or deleted."
    },
    {
      "title": "Build for failure",
      "text": "Use idempotent writes, retries, queued events and visible error states so a timeout does not become a duplicate invoice."
    },
    {
      "title": "Reconcile in the open",
      "text": "Log the reference chain and provide a simple operational view so finance can trace any transaction without reading server logs."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React operational interface components",
      "eyebrow": "OPERATIONAL INTERFACES",
      "title": "OPUS React",
      "text": "Reusable patterns for data-heavy forms, tables, validation and the interfaces around business records."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues connected operations platform",
      "eyebrow": "CONNECTED OPERATIONS",
      "title": "Pace Venues",
      "text": "Guest journeys and venue operations brought together on a shared platform foundation."
    }
  ],
  "related": [
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "The core capability behind accounting, CRM and operational system connections."
    },
    {
      "href": "/nodejs-api-development",
      "title": "Node.js API development",
      "text": "Backend services, webhooks and integration layers built for reliable operation."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce the manual steps around approvals, notifications and finance handoffs."
    }
  ],
  "faqs": [
    {
      "q": "Do we need to be a Xero app partner to integrate?",
      "a": "It depends on the route. A private connection for one organisation is different from a public application listed in the Xero App Store, which carries review, security and ongoing support obligations. We work out which route fits before any build starts."
    },
    {
      "q": "Can data sync both ways?",
      "a": "Yes, but direction should be decided per field rather than assumed. Two-way sync needs a clear owner for each value and a rule for conflicts, otherwise corrections made in one system are silently overwritten by the other."
    },
    {
      "q": "What happens if Xero is unavailable?",
      "a": "Writes should be queued and retried rather than lost or duplicated. The integration needs idempotency keys, backoff and an operational view of failed items so someone can resolve exceptions without engineering involvement."
    },
    {
      "q": "Can you clean up existing Xero data first?",
      "a": "Often that is the sensible first step. Duplicate contacts, inconsistent tax treatment and unclear invoice states will otherwise be carried into the integration and make every later reconciliation harder."
    },
    {
      "q": "How long does a Xero integration take?",
      "a": "A focused invoice and contact sync is a much smaller piece of work than a multi-entity, two-way reconciliation product. We scope after mapping the objects, events and ownership rules rather than quoting from a feature list."
    }
  ],
  "contactService": "API and systems integration",
  "ctaTitle": "Need your operational workflow and Xero to agree on the numbers?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the integration"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
