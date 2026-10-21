import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "ACCESS DATABASES / MODERNISATION",
  "title": "Replace Microsoft Access",
  "accent": "with a modern web application.",
  "lead": "Move a business-critical Access database into a maintainable web application — migrating the forms, reports, users and data without stopping the operation that depends on it.",
  "artClass": "mkt-hero-art--phase3-insight-legacy",
  "artLabel": "ACCESS / MODERNISATION",
  "artHeading": "The database did its job. The job has outgrown the database.",
  "artFooter": "Data · Forms · Reports · Users · Migration",
  "introKicker": "WHEN ACCESS STOPS BEING THE RIGHT TOOL",
  "introTitle": "Access was a sensible answer to the original problem. The problem has changed.",
  "introCopy": [
    "A well-built Access database can run a process for years. The trouble usually appears gradually: more users, remote working, larger data, several versions of the file, and a growing dependence on one person who understands the macros.",
    "Replacing it is not a matter of recreating every screen. The useful work is separating the data model from the interface, deciding which reports and rules still matter, and moving the important workflow to something that can be supported, backed up and accessed safely."
  ],
  "capabilityKicker": "WHAT A REPLACEMENT CAN IMPROVE",
  "capabilityTitle": "Keep the workflow people know. Remove the fragility underneath.",
  "capabilityIntro": "A staged replacement can run alongside the existing database while confidence and coverage grow.",
  "cards": [
    {
      "title": "Data model & migration",
      "text": "Review tables, relationships and legacy inconsistencies, then migrate the data with a clear validation and reconciliation step."
    },
    {
      "title": "Forms & workflow",
      "text": "Rebuild the screens around the actual tasks people perform, with validation, roles and status rather than hidden form logic."
    },
    {
      "title": "Reports & exports",
      "text": "Recreate the reports the business relies on, and make the underlying data available for analysis without another manual export."
    },
    {
      "title": "Access, roles & hosting",
      "text": "Replace shared-file access with proper authentication, permissions, backups and remote-friendly hosting."
    }
  ],
  "useKicker": "SIGNS THE DATABASE HAS BECOME A SINGLE POINT OF FAILURE",
  "useTitle": "The strongest case for replacing Access is usually operational, not cosmetic.",
  "useIntro": "These signals suggest the current database is carrying more risk than the team can see day to day.",
  "useCases": [
    {
      "title": "Several people need it at once",
      "text": "Shared files, VPN access and record locking turn a routine process into a coordination problem."
    },
    {
      "title": "Only one person can change it",
      "text": "VBA, macros and undocumented rules concentrate knowledge in one person and make every change a risk."
    },
    {
      "title": "Data is growing or fragmenting",
      "text": "Copies, archives and manual merges make it unclear which version represents the current position."
    },
    {
      "title": "Reporting takes manual effort",
      "text": "The information exists, but assembling it for management or compliance consumes hours every month."
    }
  ],
  "process": [
    {
      "title": "Inventory the database",
      "text": "Document tables, queries, forms, reports, macros and the manual work happening around the edges."
    },
    {
      "title": "Agree what must survive",
      "text": "Separate essential workflow and reporting from historical habits, then prioritise the first release."
    },
    {
      "title": "Migrate in stages",
      "text": "Move the core dataset and highest-value workflow first, with validation and a route back if something is wrong."
    },
    {
      "title": "Run in parallel, then retire",
      "text": "Keep the old database available for a controlled period, reconcile both, and only switch off when the new system is trusted."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React operational forms and data interfaces",
      "eyebrow": "OPERATIONAL SOFTWARE",
      "title": "OPUS React",
      "text": "Reusable patterns for forms, validation, data tables and the interfaces around business-critical records."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues multi-venue operations platform",
      "eyebrow": "MULTI-SITE OPERATIONS",
      "title": "Pace Venues",
      "text": "Operational journeys brought together around a shared platform rather than disconnected tools."
    }
  ],
  "related": [
    {
      "href": "/legacy-system-modernisation",
      "title": "Legacy system modernisation",
      "text": "A staged route from difficult-to-change software toward safer, maintainable foundations."
    },
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Purpose-built tools for roles, approvals, operational data and reporting."
    },
    {
      "href": "/insights/replacing-spreadsheets-with-custom-software",
      "title": "Replacing spreadsheets guide",
      "text": "The same decision process applied to workbook-based operations."
    }
  ],
  "faqs": [
    {
      "q": "Can you keep Access as the front end?",
      "a": "Sometimes, as an interim step while the data moves to a more robust backend. It is rarely a good long-term answer because the interface and deployment limitations that caused the problem remain."
    },
    {
      "q": "Will all our existing data move across?",
      "a": "The operational data usually does. Historical records are reviewed separately, because old duplicates, inconsistent codes and unused tables should not be carried forward without a decision."
    },
    {
      "q": "Can the new system run alongside Access?",
      "a": "Yes. A controlled parallel period is often the safest approach, particularly where the database supports finance, compliance or customer commitments. We reconcile the two before the old system is retired."
    },
    {
      "q": "What happens to our reports?",
      "a": "The reports that are genuinely used are rebuilt around the new data model. Reports that exist only because of historical curiosity are usually better handled as an export or a one-off analysis."
    },
    {
      "q": "Is this a straight rewrite?",
      "a": "No. A straight rewrite tends to reproduce old compromises. We use the migration as a chance to simplify the data model and clarify the workflow, while keeping the parts people depend on."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Is an Access database still running a critical part of the business?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the replacement"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
