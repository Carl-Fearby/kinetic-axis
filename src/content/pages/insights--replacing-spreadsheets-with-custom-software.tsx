import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'replacing-spreadsheets-with-custom-software',
  "kicker": "OPERATIONS GUIDE",
  "title": "When should you replace spreadsheets with custom software?",
  "lead": "Spreadsheets are excellent tools. The problem starts when a spreadsheet quietly becomes a multi-user application without the permissions, workflow controls or audit trail an application would normally have.",
  "artClass": "mkt-hero-art--v02",
  "artLabel": "GUIDE / SPREADSHEET REPLACEMENT",
  "artHeading": "Keep the useful process. Remove the fragile coordination.",
  "artFooter": "Data · Roles · Workflow · Automation · Migration",
  "updated": "October 2026",
  "answer": [
    "Do not replace a spreadsheet simply because it is a spreadsheet. Replace it when the process around it has become difficult to control: duplicated files, manual hand-offs, unclear ownership, accidental edits or repeated copying between systems.",
    "The safest replacement starts by understanding what the spreadsheet is really doing. Some columns are data, some are rules, some are status, and some are workarounds for missing software."
  ],
  "bands": [
    {
      "label": "KEEP IT",
      "title": "One owner, simple calculation",
      "text": "A spreadsheet can remain the best tool when the workflow is small, flexible and does not depend on controlled multi-user actions."
    },
    {
      "label": "CONNECT IT",
      "title": "Good data, too much manual movement",
      "text": "Integration or automation may remove repeated copying while preserving an existing tool that still works well."
    },
    {
      "label": "REPLACE IT",
      "title": "The sheet has become the workflow",
      "text": "Custom software is more compelling when permissions, status, multiple users, auditability and connected actions are now central to the process."
    }
  ],
  "bandKicker": "REPLACEMENT SIGNALS",
  "bandTitle": "Not every spreadsheet needs an application.",
  "bandIntro": "The trigger is operational risk and repeated friction, not the file format itself.",
  "sections": [
    {
      "title": "Look for coordination problems, not row count",
      "paragraphs": [
        "A large spreadsheet can be perfectly manageable for one specialist. A smaller sheet can be risky if several people edit it, copy it, email versions around or depend on colour and comments to understand what happens next."
      ]
    },
    {
      "title": "Separate data from workflow",
      "paragraphs": [
        "Before designing replacement software, identify which fields are facts, which formulas are business rules, which columns represent status and which actions people perform outside the sheet.",
        "That analysis often reveals that the real product is a workflow application with a table inside it — not simply a prettier spreadsheet."
      ]
    },
    {
      "title": "Add permissions where responsibility matters",
      "paragraphs": [
        "Custom software can make editing and approval rights explicit. A user may be able to create a request, another to approve it and an administrator to correct configuration without everybody receiving unrestricted access to the same file."
      ]
    },
    {
      "title": "Automate repeated hand-offs carefully",
      "paragraphs": [
        "Notifications, generated documents, API calls and status changes can remove manual steps, but automation should follow a clear process. Automating an ambiguous workflow only makes mistakes happen faster."
      ]
    },
    {
      "title": "Plan migration as part of the product",
      "paragraphs": [
        "Existing spreadsheet data often contains duplicates, inconsistent values and historical shortcuts. Migration should define which data is worth carrying forward, how it will be cleaned and how the new system will prove that important records arrived correctly."
      ]
    }
  ],
  "related": [
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Purpose-built operational software for staff workflows and data."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce repetitive hand-offs once the process is understood."
    },
    {
      "href": "/admin-dashboard-development",
      "title": "Admin dashboard development",
      "text": "Create focused views and controls around operational data."
    }
  ],
  "ctaKicker": "OUTGROWN A SPREADSHEET?",
  "ctaTitle": "Map what the sheet is really doing before replacing it.",
  "ctaText": "We can help separate data, rules and workflow, then shape a practical first system around the highest-value operational problem.",
  "contactService": "Internal business systems"
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
