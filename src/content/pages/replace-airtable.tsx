import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "AIRTABLE / PLATFORM EXIT",
  "title": "Replace Airtable",
  "accent": "with purpose-built software.",
  "lead": "Move a business-critical Airtable base into a maintainable application — migrating records, attachments, automations and permissions without losing the workflow the team relies on.",
  "artClass": "mkt-hero-art--phase3-insight-internal-system",
  "artLabel": "AIRTABLE / OPERATIONS",
  "artHeading": "Keep the flexibility that worked. Remove the limits that did not.",
  "artFooter": "Records · Automations · Permissions · Access",
  "introKicker": "WHEN A BASE BECOMES A BUSINESS SYSTEM",
  "introTitle": "Airtable is excellent at getting a process working. It is not always the right place for it to live.",
  "introCopy": [
    "Airtable earns its place when a team needs to model a workflow quickly. The problems appear when that base becomes the operational source of truth: more users, more records, customer access, complex permissions, automations that matter and a growing licence bill.",
    "Replacing it is not about recreating every view. The useful work is separating the data model from the interface, deciding which automations are genuine business rules, and moving the critical workflow somewhere that can be owned, supported and extended."
  ],
  "capabilityKicker": "WHAT A REPLACEMENT CAN IMPROVE",
  "capabilityTitle": "Turn a configured base into software with clearer rules and ownership.",
  "capabilityIntro": "A staged route can keep Airtable for the parts it still does well while the core workflow moves.",
  "cards": [
    {
      "title": "Bases, records & attachments",
      "text": "Migrate the useful data and files with validation, reconciliation and a clear decision about what should not be carried forward."
    },
    {
      "title": "Automations & business rules",
      "text": "Rebuild the automations that carry real logic as explicit, testable rules rather than hidden triggers."
    },
    {
      "title": "Permissions & external access",
      "text": "Replace broad base access with roles, field-level permissions and a controlled interface for customers or partners."
    },
    {
      "title": "Reporting & integrations",
      "text": "Connect the workflow to finance, CRM and operational systems so reporting does not depend on another export."
    }
  ],
  "useKicker": "SIGNS THE BASE HAS OUTGROWN THE PLATFORM",
  "useTitle": "The strongest case for replacing Airtable is usually operational, not aesthetic.",
  "useIntro": "These signals suggest the base is carrying more risk and cost than the team can see day to day.",
  "useCases": [
    {
      "title": "Licence costs scale with adoption",
      "text": "Per-seat pricing turns a successful internal tool into a recurring cost that grows every time someone new needs access."
    },
    {
      "title": "Plan limits shape the workflow",
      "text": "Record, automation and API limits start to dictate how the process is designed rather than the other way around."
    },
    {
      "title": "External access is awkward",
      "text": "Customers, suppliers or field teams need a controlled view without exposing the whole base or paying for full seats."
    },
    {
      "title": "Logic is spread across automations",
      "text": "Business rules live in triggers and formulas that are hard to test, explain and change safely."
    }
  ],
  "process": [
    {
      "title": "Audit the bases",
      "text": "Document tables, views, linked records, attachments, automations and the manual work happening around them."
    },
    {
      "title": "Separate core from ad-hoc",
      "text": "Identify the workflow that should be software and the analysis or experimentation that should stay flexible."
    },
    {
      "title": "Migrate in stages",
      "text": "Move the highest-value workflow and its data first, with validation and a controlled route back if something is wrong."
    },
    {
      "title": "Keep a hybrid where it helps",
      "text": "Leave genuinely exploratory work in Airtable if it still earns its place, with a clear boundary and data ownership."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React forms and operational data interfaces",
      "eyebrow": "OPERATIONAL SOFTWARE",
      "title": "OPUS React",
      "text": "Reusable patterns for forms, validation, data tables and the interfaces around business-critical records."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues operational platform",
      "eyebrow": "CONNECTED WORKFLOWS",
      "title": "Pace Venues",
      "text": "Customer and operational journeys brought together around a shared product foundation."
    }
  ],
  "related": [
    {
      "href": "/insights/custom-software-vs-low-code",
      "title": "Custom software vs low-code",
      "text": "Compare platform speed and limits against the total cost of owning the workflow."
    },
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Purpose-built tools for roles, approvals, operational data and reporting."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Turn repeated triggers and handoffs into explicit, maintainable automation."
    },
    {
      "href": "/legacy-system-modernisation",
      "title": "Legacy system modernisation",
      "text": "A staged route from tools that no longer fit toward maintainable foundations."
    }
  ],
  "faqs": [
    {
      "q": "Is this a complete Airtable replacement?",
      "a": "Only where that makes sense. Many organisations keep Airtable for exploratory or low-risk work and move the business-critical workflow into a system designed for it. The important thing is an explicit boundary rather than a slow, accidental split."
    },
    {
      "q": "Can we keep some bases in Airtable?",
      "a": "Yes. A hybrid model is often the most economical answer. Keep the bases that are genuinely flexible and internal, and build the parts that need stronger permissions, customer access, volume or integration."
    },
    {
      "q": "What happens to our records and attachments?",
      "a": "They can be migrated, but the data should be reviewed first. Linked records, inconsistent fields and unused tables are better resolved before migration than carried into a new model."
    },
    {
      "q": "What about our automations?",
      "a": "Automations that carry real business rules should become explicit, testable logic. Simple notifications can often be rebuilt quickly; complex chains are a good opportunity to simplify the process rather than reproduce it exactly."
    },
    {
      "q": "Why not just upgrade the Airtable plan?",
      "a": "Sometimes that is the right answer, particularly if the limitations are temporary or the workflow is not central. Custom software earns its cost when the workflow is core, needs to evolve, serves external users or must integrate with systems a platform cannot reach cleanly."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Has an Airtable base quietly become a business-critical system?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the replacement"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
