import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'api-integration-guide',
  "kicker": "SYSTEMS INTEGRATION GUIDE",
  "title": "API integration: what makes two systems work reliably together?",
  "lead": "A successful API integration is not just a request that returns data. It needs clear ownership, authentication, state, failure handling and an operational answer for what happens when the other system is slow, unavailable or inconsistent.",
  "artClass": "mkt-hero-art--v04",
  "artLabel": "GUIDE / API INTEGRATION",
  "artHeading": "Design the failure path before calling the endpoint.",
  "artFooter": "Ownership · Auth · Mapping · Webhooks · Recovery",
  "updated": "October 2026",
  "answer": [
    "Start by defining which system owns each important piece of data and which events need to move between them. Then design authentication, mapping, retries and support around that boundary.",
    "The happy-path API call is usually the easy part. Reliability comes from handling duplicates, timeouts, partial data, asynchronous updates and the possibility that an external provider changes or fails."
  ],
  "bands": [
    {
      "label": "OWNERSHIP",
      "title": "Know the source of truth",
      "text": "Decide which system owns customers, bookings, payments or other records so updates do not create competing versions of reality."
    },
    {
      "label": "CONTRACT",
      "title": "Understand what the API actually guarantees",
      "text": "Authentication, rate limits, pagination, field semantics and provider lifecycle all affect the integration design."
    },
    {
      "label": "RECOVERY",
      "title": "Plan what happens when it goes wrong",
      "text": "Retries, idempotency, queues, monitoring and support visibility prevent temporary failures becoming silent data problems."
    }
  ],
  "bandKicker": "INTEGRATION FOUNDATIONS",
  "bandTitle": "Reliable integrations depend on boundaries and recovery.",
  "bandIntro": "The API documentation describes endpoints. The product architecture still has to decide what those endpoints mean to your workflow.",
  "sections": [
    {
      "title": "Define ownership before moving data",
      "paragraphs": [
        "If two systems can both change the same record, conflict becomes a product problem. Decide which system is authoritative for each domain and whether the integration is one-way, two-way or event-driven."
      ]
    },
    {
      "title": "Authentication is part of the operating model",
      "paragraphs": [
        "API keys, OAuth tokens, service accounts and user-delegated access create different security and lifecycle requirements. Credentials need secure storage and a plan for rotation or expiry."
      ]
    },
    {
      "title": "Map concepts, not just field names",
      "paragraphs": [
        "Two systems may both have a “status” field while meaning completely different things. Integration work needs an explicit mapping between data models and a decision about what to do when one side has no equivalent value."
      ]
    },
    {
      "title": "Use webhooks carefully for asynchronous change",
      "paragraphs": [
        "Webhooks can reduce polling and make updates faster, but receiving an event does not guarantee it will only arrive once or in the order expected. Handlers should be designed for retries, duplicate delivery and verification."
      ]
    },
    {
      "title": "Give operations visibility into failure",
      "paragraphs": [
        "A production integration needs more than application logs. Teams may need to see failed records, provider references, retry status or a safe way to replay an action.",
        "That operational layer is what turns an API connection into a supportable business workflow."
      ]
    }
  ],
  "related": [
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Our service for connecting products, platforms and business data."
    },
    {
      "href": "/payment-integration-development",
      "title": "Payment integration development",
      "text": "Apply integration principles to transaction and payment workflows."
    },
    {
      "href": "/booking-system-development",
      "title": "Booking system development",
      "text": "Connect bespoke booking journeys with established providers and systems."
    }
  ],
  "ctaKicker": "PLANNING AN INTEGRATION?",
  "ctaTitle": "Define ownership and failure behaviour before implementation.",
  "ctaText": "Share the systems, data and workflow involved. We can help turn API documentation into a reliable integration plan.",
  "contactService": "API and systems integration"
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
