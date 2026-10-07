import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "MARKETPLACE DEVELOPMENT",
  "title": "Marketplace products where",
  "accent": "both sides need to work.",
  "lead": "Design and build marketplace experiences around discovery, listings, trust, transactions and the operational tools needed to keep buyers and sellers moving.",
  "artClass": "mkt-hero-art--v05",
  "artLabel": "MARKETPLACE / TWO-SIDED PRODUCT",
  "artHeading": "Discovery on one side. Operations on the other.",
  "artFooter": "Listings · Search · Accounts · Trust · Transactions",
  "introKicker": "TWO AUDIENCES, ONE PRODUCT",
  "introTitle": "A marketplace is not just ecommerce with more sellers.",
  "introCopy": [
    "Marketplaces have to create value for at least two audiences at the same time. Buyers need confidence and easy discovery; sellers need practical listing and account workflows; the operator needs moderation, support and visibility across both.",
    "We treat those journeys as one product system. Search, category structure, listing quality, identity, payments and back-office tooling all affect whether the marketplace feels trustworthy and usable."
  ],
  "capabilityKicker": "MARKETPLACE CAPABILITIES",
  "capabilityTitle": "Build the product around discovery, trust and repeat use.",
  "capabilityIntro": "The exact feature set depends on what is being exchanged, but the underlying product problems are surprisingly consistent.",
  "cards": [
    {
      "title": "Listings & catalogue",
      "text": "Structured listing flows, categories, attributes, media and status that keep supply useful and searchable."
    },
    {
      "title": "Search & discovery",
      "text": "Help buyers move from broad browsing to relevant results with filters, categories and product context."
    },
    {
      "title": "Seller workflows",
      "text": "Give sellers clear account, listing, status and management tools without exposing unnecessary complexity."
    },
    {
      "title": "Operations & trust",
      "text": "Support moderation, reporting, support actions, payments and platform controls behind the customer experience."
    }
  ],
  "useKicker": "MARKETPLACE SHAPES",
  "useTitle": "Different marketplaces need different trust models.",
  "useIntro": "The product model should follow the relationship between buyer, seller and operator rather than copying a generic store.",
  "useCases": [
    {
      "title": "Product marketplaces",
      "text": "Buyer and seller flows around physical or digital products, categories, listings and fulfilment expectations."
    },
    {
      "title": "Service marketplaces",
      "text": "Match demand with providers while handling profiles, availability, requests, pricing or reviews."
    },
    {
      "title": "Niche communities",
      "text": "Build focused discovery and exchange around a specialist category where context matters more than sheer catalogue size."
    },
    {
      "title": "B2B exchanges",
      "text": "Support account rules, structured product data, enquiries or transaction workflows between organisations."
    }
  ],
  "process": [
    {
      "title": "Understand the workflow",
      "text": "Map users, decisions, data, hand-offs and exceptions before deciding what the software should look like."
    },
    {
      "title": "Define the product shape",
      "text": "Separate the core outcome from useful extras so the first release is coherent rather than over-scoped."
    },
    {
      "title": "Design and integrate",
      "text": "Build the interface, data model and integrations together so the product behaves as one system."
    },
    {
      "title": "Release and evolve",
      "text": "Use real operation and customer feedback to decide what should be improved, automated or expanded next."
    }
  ],
  "projects": [
    {
      "href": "/projects/ebuygum",
      "image": "/assets/project-ebuygum.jpg",
      "alt": "eBuyGum marketplace redesign project",
      "eyebrow": "MARKETPLACE EXPERIENCE",
      "title": "eBuyGum",
      "text": "A marketplace redesign focused on discovery, category browsing and a more coherent buyer and seller experience."
    }
  ],
  "related": [
    {
      "href": "/ecommerce-marketplace-development",
      "title": "Ecommerce & marketplace development",
      "text": "Sector-focused product thinking for online buying, selling and discovery."
    },
    {
      "href": "/payment-integration-development",
      "title": "Payment integration development",
      "text": "Connect checkout, payment providers and transaction state where the marketplace requires it."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Create secure account areas for repeat users and self-service workflows."
    }
  ],
  "faqs": [
    {
      "q": "Can you build both buyer and seller dashboards?",
      "a": "Yes. The two experiences can share one platform while exposing different workflows, information and permissions to each audience."
    },
    {
      "q": "Can a marketplace include payments?",
      "a": "Yes, where the commercial model requires it. The correct approach depends on who takes payment, who receives funds, refunds, fees and the capabilities of the chosen payment provider."
    },
    {
      "q": "Can you improve an existing marketplace rather than rebuild it?",
      "a": "Yes. Search, listing flows, category structure, seller tools or operational interfaces can often be improved in stages."
    },
    {
      "q": "How do you decide what belongs in an MVP marketplace?",
      "a": "We focus on the smallest end-to-end exchange that proves supply and demand can meet successfully, then add sophistication once that core journey is working."
    }
  ],
  "contactService": "Marketplace development",
  "ctaTitle": "Building a product that has to work for buyers, sellers and operators?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
