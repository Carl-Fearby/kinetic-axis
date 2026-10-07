import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'customer-portal-development-guide',
  "kicker": "CUSTOMER PORTAL GUIDE",
  "title": "How to plan a customer portal that people will actually use",
  "lead": "A practical guide to deciding what customers should be able to see and do, how the portal connects to operational systems, and where self-service creates genuine value.",
  "artClass": "mkt-hero-art--phase3-insight-customer-portal",
  "artLabel": "GUIDE / CUSTOMER PORTALS",
  "artHeading": "Self-service only works when the workflow behind it is real.",
  "artFooter": "Accounts · Status · Documents · Actions · Integrations",
  "updated": "October 2026",
  "answer": [
    "Start with the repeat questions and actions customers already contact your team about. Those are often the strongest candidates for portal self-service.",
    "The portal should expose a trustworthy slice of operational data rather than becoming another isolated place staff must update manually."
  ],
  "bands": [
    {
      "label": "VISIBILITY",
      "title": "Show useful status",
      "text": "Give customers accurate information they would otherwise need to ask for."
    },
    {
      "label": "ACTION",
      "title": "Enable safe self-service",
      "text": "Let customers update, request, upload or book where the underlying workflow can support it."
    },
    {
      "label": "INTEGRATION",
      "title": "Keep systems aligned",
      "text": "Connect the portal to the operational source of truth so customer actions do not create another reconciliation process."
    }
  ],
  "sections": [
    {
      "title": "Start from customer demand, not a feature list",
      "paragraphs": [
        "Review the questions, requests and status checks customers already make through email, phone or support. A portal earns its place when it removes friction from those recurring interactions."
      ]
    },
    {
      "title": "Decide what the source of truth is",
      "paragraphs": [
        "Every piece of portal data should have clear ownership. If staff update one system while customers see another, confidence disappears quickly.",
        "Integration design is therefore part of portal design, not a separate backend task."
      ]
    },
    {
      "title": "Model identity and permissions early",
      "paragraphs": [
        "Accounts may represent individuals, organisations, teams or delegated users. Those distinctions affect what people can see, edit and approve.",
        "Permission rules are easier to design before the interface is built than after sensitive information has already been exposed through generic account screens."
      ]
    },
    {
      "title": "Make self-service recoverable",
      "paragraphs": [
        "Customers need clear confirmation, status and recovery when an action fails or requires staff review. The portal should not create a silent dead end because an integration or downstream process did not complete."
      ]
    },
    {
      "title": "Measure whether the portal changes the service",
      "paragraphs": [
        "Useful measures can include fewer status enquiries, faster completion of routine requests, better data quality or shorter onboarding time.",
        "The goal is not simply portal logins; it is a better service journey for customers and staff."
      ]
    }
  ],
  "related": [
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Design and build secure self-service around your real customer workflows."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect portal actions to the systems that own customer and operational data."
    },
    {
      "href": "/business-software-development",
      "title": "Business software development",
      "text": "Improve the internal workflows that sit behind the customer-facing experience."
    }
  ],
  "contactService": "Customer portal development",
  "bandKicker": "PORTAL VALUE",
  "bandTitle": "Visibility, action and integration should reinforce each other.",
  "bandIntro": "A portal that only displays stale information or sends every action back into email rarely changes the customer experience meaningfully.",
  "ctaKicker": "PLAN THE PORTAL",
  "ctaTitle": "Know what customers keep asking your team to do for them?",
  "ctaText": "We can turn those repeat interactions into a practical self-service product scope."
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
