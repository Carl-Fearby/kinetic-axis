import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "REPLACE SPREADSHEET WORKFLOWS",
  "title": "Replace business-critical spreadsheets with",
  "accent": "purpose-built software.",
  "lead": "Move operational workflows out of fragile spreadsheets when the process needs clearer ownership, safer data, automation, permissions and room to evolve.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "SPREADSHEETS / WORKFLOW CHANGE",
  "artHeading": "Keep the useful flexibility. Remove the operational fragility.",
  "artFooter": "Workflow · Data · Roles · Automation",
  "introKicker": "WHEN A SPREADSHEET BECOMES A SYSTEM",
  "introTitle": "The problem is rarely the spreadsheet itself. It is everything the spreadsheet has quietly become responsible for.",
  "introCopy": [
    "Spreadsheets are excellent flexible tools. Problems start when one file becomes the source of truth for operational status, approvals, calculations, customer records, hand-offs and reporting at the same time.",
    "The right replacement is not a pixel-for-pixel recreation of the workbook. We identify the jobs it performs, keep the flexibility people genuinely need and move the critical workflow into a system with clearer rules, roles and data ownership."
  ],
  "capabilityKicker": "WHAT A REPLACEMENT CAN IMPROVE",
  "capabilityTitle": "Turn hidden spreadsheet behaviour into an explicit, usable workflow.",
  "capabilityIntro": "A focused replacement can start small and remove the highest-risk or highest-friction part first.",
  "cards": [
    {
      "title": "Single source of truth",
      "text": "Reduce duplicate copies and uncertainty about which version contains the current operational state."
    },
    {
      "title": "Roles & permissions",
      "text": "Give different users the actions and information they need without exposing or locking entire workbooks."
    },
    {
      "title": "Workflow & audit trail",
      "text": "Make status, ownership, approvals and important changes visible rather than implied by cells or email."
    },
    {
      "title": "Automation & integration",
      "text": "Connect notifications, calculations and other systems so repeated manual steps do not depend on memory."
    }
  ],
  "useKicker": "SIGNS THE WORKBOOK HAS OUTGROWN ITSELF",
  "useTitle": "If the file is running the process, it may be time to model the process properly.",
  "useIntro": "Not every spreadsheet needs software. These are stronger signals that the operational risk or friction is becoming worth addressing.",
  "useCases": [
    {
      "title": "Several people edit the same process",
      "text": "Ownership, versioning and hand-offs become hard to follow as the team and workflow grow."
    },
    {
      "title": "Macros and formulas carry business rules",
      "text": "Important logic becomes difficult to test, change and explain safely."
    },
    {
      "title": "Reporting needs manual consolidation",
      "text": "Teams spend time merging files or re-keying information before they can understand the operation."
    },
    {
      "title": "Customers or partners need access",
      "text": "A controlled portal or workflow is safer than sharing internal files or copying information into email."
    }
  ],
  "process": [
    {
      "title": "Audit the workbook",
      "text": "Identify data, calculations, states, users, exceptions and the manual work happening around the file."
    },
    {
      "title": "Separate process from presentation",
      "text": "Model what the workflow actually needs before deciding how the replacement interface should look."
    },
    {
      "title": "Migrate the useful core",
      "text": "Move the highest-value workflow and data into a controlled product without recreating unnecessary complexity."
    },
    {
      "title": "Automate after stabilising",
      "text": "Add integrations, notifications and reporting once the core process is reliable and understood."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React business application interfaces",
      "eyebrow": "BUSINESS INTERFACES",
      "title": "OPUS React",
      "text": "Reusable patterns for forms, data, dashboards and complex operational interfaces."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues connected platform",
      "eyebrow": "CONNECTED WORKFLOWS",
      "title": "Pace Venues",
      "text": "Customer and operational journeys brought together around a shared product foundation."
    }
  ],
  "related": [
    {
      "href": "/business-software-development",
      "title": "Business software development",
      "text": "Explore operational software designed around real workflows."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce repetitive admin and connect the process around clear states."
    },
    {
      "href": "/insights/replacing-spreadsheets-with-custom-software",
      "title": "Read the planning guide",
      "text": "Go deeper into the decision before committing to a replacement."
    }
  ],
  "faqs": [
    {
      "q": "Do we need to replace every spreadsheet at once?",
      "a": "No. A staged approach is often safer. Start with the workflow creating the most risk or repeated work, then expand if the product proves useful."
    },
    {
      "q": "Can existing spreadsheet data be migrated?",
      "a": "Usually, yes, but the data should be reviewed and mapped before migration so inconsistencies are not simply carried into the new system."
    },
    {
      "q": "Will users lose spreadsheet flexibility?",
      "a": "The aim is to preserve useful flexibility while making critical rules, permissions and workflow explicit. Some ad-hoc analysis may still belong in spreadsheets after the operational system is introduced."
    },
    {
      "q": "How do we know whether custom software is worth it?",
      "a": "Compare the cost and risk of the current process with the value of clearer workflow, reduced admin, safer data and easier change. Our Project Estimator can help with an early scope sense-check."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Has a spreadsheet become business-critical software by accident?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate a replacement"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
