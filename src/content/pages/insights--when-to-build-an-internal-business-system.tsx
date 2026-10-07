import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'when-to-build-an-internal-business-system',
  "kicker": "INTERNAL SYSTEMS GUIDE",
  "title": "When should you build an internal business system?",
  "lead": "Use workflow cost, risk and coordination overhead — not frustration alone — to decide when spreadsheets and general-purpose tools have stopped being enough.",
  "artClass": "mkt-hero-art--phase3-insight-internal-system",
  "artLabel": "GUIDE / INTERNAL SYSTEMS",
  "artHeading": "Build when the workflow has become the problem.",
  "artFooter": "Process · Data · Roles · Exceptions · Reporting",
  "updated": "October 2026",
  "answer": [
    "Consider bespoke internal software when the organisation repeatedly pays for the mismatch between the process and the tools: duplicate entry, poor visibility, manual reconciliation, avoidable errors or workarounds that only a few people understand.",
    "Do not build simply because custom software sounds cleaner. If an existing product fits the workflow well enough, configuration or integration may be the better investment."
  ],
  "bands": [
    {
      "label": "KEEP",
      "title": "Existing tools still fit",
      "text": "The process is simple, ownership is clear and the cost of workarounds remains low."
    },
    {
      "label": "CONNECT",
      "title": "Integration solves the gap",
      "text": "The right systems already exist but data or lifecycle events are not moving between them reliably."
    },
    {
      "label": "BUILD",
      "title": "The workflow is genuinely specific",
      "text": "Core operational logic, roles or exceptions no longer fit general-purpose software without significant ongoing compromise."
    }
  ],
  "sections": [
    {
      "title": "Measure the hidden workflow cost",
      "paragraphs": [
        "Look beyond licence fees. Repeated copying, status chasing, rework, reporting effort and reliance on one person’s knowledge can cost more than the software itself.",
        "Those costs create a stronger business case than simply disliking the current tools."
      ]
    },
    {
      "title": "Separate configuration problems from product gaps",
      "paragraphs": [
        "Before building, check whether the existing platform can support the workflow through better configuration, automation or integration.",
        "Custom software makes sense when the mismatch is structural rather than a setup problem."
      ]
    },
    {
      "title": "Identify the system of record",
      "paragraphs": [
        "Internal software often becomes valuable because it creates one dependable view of operational state. Decide what data the new system owns and what should remain in CRM, finance, document or other specialist tools."
      ]
    },
    {
      "title": "Model exceptions, not just the happy path",
      "paragraphs": [
        "Internal workflows contain cancellations, corrections, approvals, escalations and unusual cases. Those exceptions should be part of discovery because they often determine whether the new system is genuinely useful."
      ]
    },
    {
      "title": "Start with one coherent workflow",
      "paragraphs": [
        "A first release can focus on one end-to-end process and integrate with surrounding tools. This creates value sooner and avoids turning the project into an attempt to replace every system at once."
      ]
    }
  ],
  "related": [
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Build operational software around roles, workflow and data."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Automate repeat steps when the core systems already fit."
    },
    {
      "href": "/sme-digital-transformation",
      "title": "SME digital transformation",
      "text": "Prioritise practical system and workflow improvements in manageable stages."
    }
  ],
  "contactService": "Internal business systems",
  "bandKicker": "BUY, CONNECT OR BUILD",
  "bandTitle": "Custom software is one option, not the default answer.",
  "bandIntro": "The right decision depends on how specific the workflow is and where the current operational cost actually comes from.",
  "ctaKicker": "MAP THE WORKFLOW",
  "ctaTitle": "Not sure whether the process needs software, integration or simply better configuration?",
  "ctaText": "We can help map the workflow and identify the smallest useful intervention."
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
