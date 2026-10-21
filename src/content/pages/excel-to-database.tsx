import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "EXCEL / DATA MIGRATION",
  "title": "Excel to database",
  "accent": "without losing the work.",
  "lead": "Move a workbook that has become a business system into a proper database-backed application — normalised data, controlled access, reliable reporting and a migration that reconciles rather than guesses.",
  "artClass": "mkt-hero-art--phase3-insight-internal-system",
  "artLabel": "EXCEL / DATABASE",
  "artHeading": "Keep the familiar logic. Replace the fragile file.",
  "artFooter": "Model · Migrate · Validate · Report",
  "introKicker": "A WORKBOOK IS NOT A DATABASE",
  "introTitle": "Excel is excellent at analysis. It is a poor place for the only copy of operational data.",
  "introCopy": [
    "Most spreadsheet problems are not caused by Excel. They appear when a workbook becomes the place where several people record, change and report on the same operational data. Version conflicts, overwritten formulas and manual reconciliation are symptoms of using a file for a job it was never designed to do.",
    "A database-backed application separates the data from the interface and the rules. Records are stored once, access is controlled, calculations are consistent and reporting no longer depends on whoever last saved the file. The useful route is rarely a wholesale rebuild; it is identifying the data that needs a system and migrating it with evidence that nothing was lost."
  ],
  "capabilityKicker": "WHAT THE MOVE INVOLVES",
  "capabilityTitle": "The work is mostly data modelling and reconciliation, not screen design.",
  "capabilityIntro": "A reliable migration starts with the workbook's logic, not its layout.",
  "cards": [
    {
      "title": "Data model & normalisation",
      "text": "Turn repeated columns and sheets into entities and relationships, removing duplicate records and ambiguous fields before they reach the new system."
    },
    {
      "title": "Migration & reconciliation",
      "text": "Import the existing data with validation, counts and checks that prove the new database agrees with the workbook before it is retired."
    },
    {
      "title": "Forms, validation & permissions",
      "text": "Give each role the screen and access it needs, with rules enforced in one place rather than through protected cells and convention."
    },
    {
      "title": "Reporting & integrations",
      "text": "Keep the reports the business relies on, connect finance and operational systems, and leave analysis tools free to query clean data."
    }
  ],
  "useKicker": "SIGNS THE WORKBOOK HAS BECOME A SYSTEM",
  "useTitle": "When the spreadsheet is no longer a spreadsheet. It is the operation.",
  "useIntro": "These are the patterns where a database-backed application usually earns its cost.",
  "useCases": [
    {
      "title": "Several people edit the same file",
      "text": "Copies multiply, changes are overwritten and nobody can say which version is the real record."
    },
    {
      "title": "Formulas carry business rules",
      "text": "Critical calculations live in cells that can be edited, copied incorrectly or broken by a new row."
    },
    {
      "title": "Reporting is rebuilt every month",
      "text": "The same manual filters, pivots and copy-paste steps are repeated because the data has no stable shape."
    },
    {
      "title": "Access and history are unclear",
      "text": "There is no reliable record of who changed what, and sensitive rows are protected by hiding sheets rather than permissions."
    }
  ],
  "process": [
    {
      "title": "Inventory the workbook",
      "text": "Map sheets, formulas, macros, named ranges, external links and the manual steps that happen outside the file."
    },
    {
      "title": "Define the data model",
      "text": "Agree the entities, relationships and ownership rules, resolving duplicates and inconsistent fields before migration."
    },
    {
      "title": "Migrate and reconcile",
      "text": "Import in stages, compare counts and totals against the source, and keep a documented route back while confidence is built."
    },
    {
      "title": "Move the workflow",
      "text": "Build the forms, permissions and reports around the real roles, then retire the workbook deliberately rather than leaving two sources of truth."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React data-dense operational interfaces",
      "eyebrow": "DATA-DENSE INTERFACES",
      "title": "OPUS React",
      "text": "Reusable patterns for tables, forms, validation and the interfaces that replace manual spreadsheets."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues multi-site operational platform",
      "eyebrow": "MULTI-SITE OPERATIONS",
      "title": "Pace Venues",
      "text": "Operational and customer journeys brought together on a shared platform rather than disconnected files."
    }
  ],
  "related": [
    {
      "href": "/replace-spreadsheets-with-bespoke-software",
      "title": "Replace spreadsheet workflows",
      "text": "The wider decision: when a spreadsheet process should become software."
    },
    {
      "href": "/replace-access-database",
      "title": "Replace Microsoft Access",
      "text": "A staged route from an ageing desktop database into a maintainable web application."
    },
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Operational tools for roles, approvals, records and reporting."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect the new database to finance, CRM and operational systems."
    }
  ],
  "faqs": [
    {
      "q": "Is this just Microsoft Access with a different name?",
      "a": "No. Access is a desktop database application with its own deployment and maintenance constraints. This is usually a web application backed by a managed database, accessible to the right people without installing a client, and able to integrate with other systems."
    },
    {
      "q": "Do we have to stop using Excel completely?",
      "a": "No. Excel remains useful for analysis, modelling and one-off work. The aim is to stop using one workbook as the operational source of truth. The new system can export clean data for analysis, or a reporting tool can query it directly."
    },
    {
      "q": "What happens to our existing formulas and macros?",
      "a": "They are treated as business rules. Some are straightforward calculations that move into the database or application; others are workarounds for the workbook's limitations and should be simplified. The migration documents which rules were carried forward and which were deliberately changed."
    },
    {
      "q": "How do you know the migration is correct?",
      "a": "The source data is profiled before import, then reconciled after it: record counts, key totals, duplicates and exception lists are compared. A controlled period running alongside the workbook is common before the old file is retired."
    },
    {
      "q": "Can we keep importing spreadsheets from suppliers or sites?",
      "a": "Yes. A controlled import process can validate and stage incoming files before they become records, which is usually safer than staff copying rows into a master workbook."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Has a workbook become the only copy of something important?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the migration"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
