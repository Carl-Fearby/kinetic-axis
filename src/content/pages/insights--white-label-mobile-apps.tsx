import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'white-label-mobile-apps',
  "kicker": "MOBILE PRODUCT GUIDE",
  "title": "White-label mobile apps: one product, many brands",
  "lead": "White-label architecture can reduce duplicated engineering while still giving each customer or venue a distinct branded product. The difficult part is deciding what should be shared and what must vary safely.",
  "artClass": "mkt-hero-art--v08",
  "artLabel": "GUIDE / WHITE-LABEL APPS",
  "artHeading": "Share the product foundation, not the customer identity.",
  "artFooter": "Codebase · Brand · Tenant · Config · Distribution",
  "updated": "October 2026",
  "answer": [
    "A white-label app usually shares core application code, backend capabilities and release processes while brand assets, configuration, content and tenant data vary by customer.",
    "The model works best when customers genuinely use the same product logic. If every customer needs different workflows, the shared codebase can become a collection of exceptions rather than an efficient platform."
  ],
  "bands": [
    {
      "label": "SHARED CORE",
      "title": "Keep product logic together",
      "text": "Navigation patterns, booking logic, account flows and API clients can stay common where customers use the same product."
    },
    {
      "label": "CONFIGURATION",
      "title": "Make deliberate variation configurable",
      "text": "Brand, content, feature flags, endpoints and tenant settings should vary through controlled configuration rather than copied code."
    },
    {
      "label": "DISTRIBUTION",
      "title": "Treat app-store delivery as part of the product",
      "text": "Separate branded apps create operational work around identifiers, signing, store metadata, review and coordinated releases."
    }
  ],
  "bandKicker": "ARCHITECTURE MODEL",
  "bandTitle": "Separate shared behaviour from controlled variation.",
  "bandIntro": "The healthier the boundary between core product and tenant configuration, the easier the platform is to maintain.",
  "sections": [
    {
      "title": "What is actually shared in a white-label app?",
      "paragraphs": [
        "The strongest candidates for sharing are product behaviours that should remain consistent: authentication, navigation, booking or ordering flows, API access and common interface components.",
        "Brand identity, customer-specific content and configuration can sit above that shared foundation."
      ]
    },
    {
      "title": "Branding should be configuration, not a fork",
      "paragraphs": [
        "Creating a new source-code branch for every customer feels simple at first and becomes difficult as fixes and features need to be repeated. A better model defines the parts allowed to vary and builds them into a controlled brand or tenant configuration."
      ]
    },
    {
      "title": "Tenant data must remain distinct",
      "paragraphs": [
        "A shared application does not mean shared customer data. The backend architecture needs an explicit tenancy model so the app loads the correct organisation, content, permissions and data for the branded product."
      ]
    },
    {
      "title": "App-store distribution changes the operational model",
      "paragraphs": [
        "Publishing several branded applications means managing bundle identifiers, icons, screenshots, store metadata, signing and release coordination for each app. That overhead should be planned rather than treated as a one-off launch task."
      ]
    },
    {
      "title": "When one multi-brand app may be better",
      "paragraphs": [
        "If separate app-store identities do not create meaningful customer value, one app that switches organisation or brand context can be simpler to distribute and maintain.",
        "The choice should follow how customers discover and understand the product, not only what is technically possible."
      ]
    }
  ],
  "related": [
    {
      "href": "/white-label-app-development",
      "title": "White-label app development",
      "text": "Design and build shared app foundations across multiple brands."
    },
    {
      "href": "/mobile-app-development",
      "title": "Mobile app development",
      "text": "Purposeful iOS and Android product development."
    },
    {
      "href": "/restaurant-app-development",
      "title": "Restaurant app development",
      "text": "A practical hospitality use case for branded customer apps."
    }
  ],
  "ctaKicker": "PLANNING A WHITE-LABEL PRODUCT?",
  "ctaTitle": "Define the shared core before multiplying the brands.",
  "ctaText": "We can help map product behaviour, tenant boundaries, branding and release strategy before the codebase starts to fragment.",
  "contactService": "White-label app development"
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
