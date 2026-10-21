import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Services",
    "href": "/services"
  },
  "kicker": "INTEGRATIONS / HUBSPOT",
  "title": "HubSpot CRM",
  "accent": "integration.",
  "lead": "Connect HubSpot to your product, website and back-office tools so leads, deals and customer context stay accurate without manual updates or duplicate records.",
  "artClass": "mkt-hero-art--v10",
  "artLabel": "HUBSPOT / CRM INTEGRATION",
  "artHeading": "Keep the commercial context in the CRM. Keep the operation in the product.",
  "artFooter": "Leads · Deals · Contacts · Data quality",
  "introKicker": "WHY CRM INTEGRATIONS DRIFT",
  "introTitle": "Most CRM problems are ownership problems wearing a data problem's clothes.",
  "introCopy": [
    "A CRM only stays useful when the people using it trust what they see. That breaks down when the website, the product and the finance system each hold a slightly different version of the same customer and nobody knows which record is current.",
    "We connect HubSpot around explicit rules: which system creates a contact, which one changes lifecycle stage, which one owns deal value and what happens when two edits arrive at once. The result is a CRM that reflects the operation instead of lagging behind it."
  ],
  "capabilityKicker": "WHAT WE CONNECT",
  "capabilityTitle": "The commercial events worth keeping in sync.",
  "capabilityIntro": "Start with the handoffs that cost the most time or create the most mistrust, then extend the integration as the workflow settles.",
  "cards": [
    {
      "title": "Lead capture & routing",
      "text": "Send website enquiries, quote requests and campaign responses into HubSpot with the source, consent and context needed to act on them."
    },
    {
      "title": "Deals & pipeline",
      "text": "Keep deal stage, value and owner aligned with what is actually happening in the product or delivery process."
    },
    {
      "title": "Custom objects & operations",
      "text": "Model the records HubSpot does not hold natively — projects, sites, orders or subscriptions — without forcing them into a poor fit."
    },
    {
      "title": "Deduplication & hygiene",
      "text": "Apply matching rules, normalise values and prevent the slow accumulation of duplicate companies, contacts and stale properties."
    }
  ],
  "useKicker": "WHERE THE CRM STOPS REFLECTING REALITY",
  "useTitle": "When the team keeps a second list, the integration is already failing.",
  "useIntro": "These are the patterns where a HubSpot connection usually removes meaningful manual work.",
  "useCases": [
    {
      "title": "Enquiries and quotes",
      "text": "Form submissions arrive by email, get copied into the CRM later, and lose the campaign or product context that made them useful."
    },
    {
      "title": "Product usage signals",
      "text": "Account activity that predicts renewal or expansion sits in the application while the CRM only knows what was last typed into it."
    },
    {
      "title": "Sales-to-delivery handoff",
      "text": "The deal closes, then the same information is re-entered into project, finance or support systems with slight differences."
    },
    {
      "title": "Multi-system customer view",
      "text": "Support, finance and sales each hold part of the relationship, and nobody can see the whole account without asking around."
    }
  ],
  "process": [
    {
      "title": "Define the objects",
      "text": "Agree which HubSpot objects and properties carry real operational meaning, and which are noise that should not be synced."
    },
    {
      "title": "Set ownership per field",
      "text": "Decide which system is authoritative for each value, including lifecycle stage, owner, deal value and consent."
    },
    {
      "title": "Handle identity carefully",
      "text": "Match on stable identifiers, not email addresses alone, and design for merges, renames and companies with several contacts."
    },
    {
      "title": "Monitor and correct",
      "text": "Track sync failures, surface conflicts and make it straightforward to fix a record without a developer or a data export."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React data-rich operational interfaces",
      "eyebrow": "DATA-RICH INTERFACES",
      "title": "OPUS React",
      "text": "Reusable patterns for forms, tables, validation and the interfaces that sit around customer and operational records."
    },
    {
      "href": "/projects/ebuygum",
      "image": "/assets/project-ebuygum.jpg",
      "alt": "eBuyGum marketplace account journeys",
      "eyebrow": "ACCOUNT JOURNEYS",
      "title": "eBuyGum",
      "text": "Marketplace discovery, account structure and responsive journeys built around how people browse and register."
    }
  ],
  "related": [
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "The core integration capability behind CRM, finance and operational connections."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Connect the steps around a lead, quote, approval or handoff so they stop relying on memory."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Give customers a controlled place to manage their own account and information."
    }
  ],
  "faqs": [
    {
      "q": "Are you replacing HubSpot or integrating with it?",
      "a": "Integrating. HubSpot is good at commercial context and pipeline visibility. The work is making sure the rest of the operation feeds it accurately rather than asking the sales team to maintain it by hand."
    },
    {
      "q": "Should we build a private app or a marketplace app?",
      "a": "A private app is usually the right starting point for one organisation's workflow. A marketplace listing only makes sense if the integration is a product you intend to support for other companies, with the review and support obligations that follow."
    },
    {
      "q": "How do you stop two systems overwriting each other?",
      "a": "By assigning ownership per field and treating the other system's value as read-only. Where two-way editing is genuinely needed, we add conflict detection and a visible resolution step rather than letting the last write win silently."
    },
    {
      "q": "Can historical data be imported?",
      "a": "Yes, but it should be reviewed first. Importing years of duplicates and inconsistent stages into a clean CRM tends to recreate the problem the integration is meant to solve."
    },
    {
      "q": "What about marketing consent?",
      "a": "Consent and subscription status need to travel with the contact, not be inferred from a form submission. We keep the lawful basis and opt-in state explicit in the data model and respect it when syncing."
    }
  ],
  "contactService": "API and systems integration",
  "ctaTitle": "Is the CRM drifting away from how the business actually works?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the integration"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
