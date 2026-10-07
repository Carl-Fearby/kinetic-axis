import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN / BIRMINGHAM",
  "title": "Web design for",
  "accent": "Birmingham businesses.",
  "lead": "Custom websites for Birmingham organisations that need to compete at second-city scale — sharper positioning, faster pages and a clear route from first visit to qualified enquiry.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "BIRMINGHAM / WEB DESIGN",
  "artHeading": "Design that holds up against bigger competitors.",
  "artFooter": "Positioning · Content · Interface · Engineering",
  "introKicker": "COMPETING ON PRESENCE",
  "introTitle": "In Birmingham's market, the website is usually where the shortlist is decided.",
  "introCopy": [
    "Buyers across the West Midlands compare several providers before making contact, and they do it quietly — reading service pages, checking work, judging how clearly each company explains itself. By the time someone reaches your contact form, the design of the site has already done part of the selling.",
    "Kinetic Axis is a Warwickshire studio working with Birmingham businesses across retail, professional services, manufacturing, technology and the creative sector. We handle positioning, content structure, interface design and front-end engineering together, so the finished site reads as one argument rather than a set of decorated pages."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "Websites built to carry a serious commercial message.",
  "capabilityIntro": "Each page has a defined audience, a defined job and a defined next step — then gets the design and engineering to deliver it.",
  "cards": [
    {
      "title": "Marketing & corporate sites",
      "text": "Service architecture, proof and calls to action organised the way business buyers actually evaluate suppliers."
    },
    {
      "title": "E-commerce",
      "text": "Catalogue, search and checkout flows tuned for speed, mobile use and the operational reality behind the store."
    },
    {
      "title": "Campaign & landing pages",
      "text": "Focused pages for paid search, launches and specific offers, built to convert and easy to iterate on."
    },
    {
      "title": "Design systems",
      "text": "Component libraries and patterns that keep multi-page or multi-team sites consistent as they grow."
    }
  ],
  "useKicker": "WHEN A REDESIGN PAYS BACK",
  "useTitle": "Consider a new website when the current one is quietly costing you deals.",
  "useIntro": "The clearest signals come from the gap between the traffic you have and the enquiries you receive.",
  "useCases": [
    {
      "title": "Traffic is fine, enquiries are not",
      "text": "If visits grow but the form stays quiet, the problem is usually message, trust or journey — all design problems."
    },
    {
      "title": "The brand looks smaller online",
      "text": "Inconsistent typography, stock imagery and improvised pages undercut the reputation the business has built."
    },
    {
      "title": "Marketing waits on development",
      "text": "New pages, offers and content should ship in hours, not sprints. Otherwise they simply never ship."
    },
    {
      "title": "The site is slow on mobile",
      "text": "Speed is a ranking factor and a conversion factor. Heavy pages lose both, especially on mobile connections."
    }
  ],
  "process": [
    {
      "title": "Positioning first",
      "text": "Establish what the business must say, to whom, and why a buyer should choose it over the alternatives shown alongside it."
    },
    {
      "title": "Content structure",
      "text": "Map pages, proof points and internal links so services, sectors and locations each have a clear, indexable home."
    },
    {
      "title": "Design & prototype",
      "text": "Design responsive interfaces around reading and action, then validate the critical journeys before build."
    },
    {
      "title": "Build & launch",
      "text": "Engineer a fast static-first site, wire analytics and conversion tracking, then measure and refine after launch."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React design system",
      "eyebrow": "DESIGN SYSTEM",
      "title": "OPUS React",
      "text": "Reusable components, forms and themes that keep data-rich interfaces coherent as products scale."
    },
    {
      "href": "/projects/ebuygum",
      "image": "/assets/project-ebuygum.jpg",
      "alt": "eBuyGum ecommerce design",
      "eyebrow": "E-COMMERCE UX",
      "title": "eBuyGum",
      "text": "Marketplace design shaped around discovery, category structure and responsive buying journeys."
    }
  ],
  "related": [
    {
      "href": "/web-design",
      "title": "Web design",
      "text": "The full design capability — research, content structure, interface design and front-end engineering."
    },
    {
      "href": "/web-app-development",
      "title": "Web application development",
      "text": "For when the requirement is a portal, dashboard or product rather than a marketing site."
    },
    {
      "href": "/ui-ux-design-systems",
      "title": "UI/UX & design systems",
      "text": "Shared interface foundations that keep larger sites and products consistent over time."
    }
  ],
  "faqs": [
    {
      "q": "Do you work with Birmingham businesses in person?",
      "a": "Yes. Workshops and stakeholder sessions can run at your offices in Birmingham or remotely. Day-to-day delivery runs online with scheduled reviews, so location rarely slows the project down."
    },
    {
      "q": "What does a website project cost?",
      "a": "Scope drives cost: a focused marketing site sits at one end, multi-language, e-commerce or product-adjacent builds at the other. The Project Estimator gives an early range without needing an email address."
    },
    {
      "q": "Can you work alongside our marketing team?",
      "a": "Yes. We frequently deliver the design and front-end while internal teams own content, campaigns and ongoing publishing — with clear handover and documentation."
    },
    {
      "q": "How do you handle SEO and performance?",
      "a": "Structure, metadata, internal linking and Core Web Vitals are part of the build, not a later phase — the site launches fast, indexable and measurable."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Need a website that holds its own in the Birmingham market?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the cost"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>; }
