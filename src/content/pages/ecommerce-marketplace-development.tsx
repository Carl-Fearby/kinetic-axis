import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "ECOMMERCE & MARKETPLACES",
  "title": "Digital commerce with",
  "accent": "discovery built in.",
  "lead": "Create online buying and selling experiences where category structure, search, product information and account journeys work together rather than competing for attention.",
  "artClass": "mkt-hero-art--v05",
  "artLabel": "COMMERCE / DISCOVERY",
  "artHeading": "Help people find, understand and act.",
  "artFooter": "Catalogue · Search · UX · Accounts · Operations",
  "introKicker": "BEYOND CHECKOUT",
  "introTitle": "Commerce starts before the basket.",
  "introCopy": [
    "People need to understand what is available, narrow down choices and trust the information they find long before they reach checkout. That makes information architecture, category design, search and product detail part of the commercial system.",
    "Our work on marketplace and product experiences looks at the whole path from discovery to action, including the operational tools needed to maintain content, categories and listings behind it."
  ],
  "capabilityKicker": "COMMERCE CAPABILITIES",
  "capabilityTitle": "Shape the experience around how people actually browse and buy.",
  "capabilityIntro": "The right combination depends on catalogue complexity, transaction model and whether the platform serves one seller or many.",
  "cards": [
    {
      "title": "Information architecture",
      "text": "Organise categories, attributes and navigation so the catalogue makes sense before users search."
    },
    {
      "title": "Search & filtering",
      "text": "Help users narrow large sets of options with relevant filters, sorting and result context."
    },
    {
      "title": "Product & listing UX",
      "text": "Present enough information to support confident action without burying the important decision points."
    },
    {
      "title": "Operational tooling",
      "text": "Give teams practical ways to manage catalogue data, listings, status and content quality behind the storefront."
    }
  ],
  "useKicker": "COMMERCE MODELS",
  "useTitle": "Different models create different product priorities.",
  "useIntro": "A marketplace, retailer and specialist catalogue may all use commerce patterns, but their operational models are not the same.",
  "useCases": [
    {
      "title": "Marketplaces",
      "text": "Serve buyers, sellers and platform operators through one connected product and data model."
    },
    {
      "title": "Specialist ecommerce",
      "text": "Make complex or considered products easier to explore through better category and product information."
    },
    {
      "title": "Recommerce",
      "text": "Support listings, condition, seller information and trust where products come from many individual sources."
    },
    {
      "title": "Catalogue-led platforms",
      "text": "Create searchable product or service catalogues where enquiry or offline fulfilment matters more than conventional checkout."
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
      "href": "/marketplace-development",
      "title": "Marketplace development",
      "text": "Design the buyer, seller and operator sides of a two-sided platform."
    },
    {
      "href": "/web-app-development",
      "title": "Web app development",
      "text": "Build interactive account, search and operational workflows in the browser."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Create repeat-use account areas around orders, listings or customer activity."
    }
  ],
  "faqs": [
    {
      "q": "Can you redesign an existing ecommerce or marketplace experience?",
      "a": "Yes. Discovery, navigation, category structure and account workflows can be improved without necessarily replacing every underlying system at once."
    },
    {
      "q": "Can the platform support multiple sellers?",
      "a": "Yes. That changes the product model significantly because seller onboarding, listings, moderation, account state and platform operations all become part of the experience."
    },
    {
      "q": "Do you build search and filtering interfaces?",
      "a": "Yes. We design the information structure and search/filter experience around the data actually available rather than adding generic filters that do not help users decide."
    },
    {
      "q": "Can ecommerce connect to existing APIs or business systems?",
      "a": "Yes, where those systems provide suitable interfaces. Integration planning should happen early because product availability, pricing, customer data and fulfilment can affect the user experience."
    }
  ],
  "contactService": "Ecommerce and marketplace development",
  "ctaTitle": "Planning a commerce experience where discovery matters as much as checkout?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
