import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "SOFTWARE DEVELOPMENT / COVENTRY",
  "title": "Bespoke software for",
  "accent": "Coventry organisations.",
  "lead": "Purpose-built business software for Coventry teams that need clearer workflows, better-connected data and systems that fit the way the organisation actually operates.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "COVENTRY / BUSINESS SOFTWARE",
  "artHeading": "Replace workarounds with software shaped around the operation.",
  "artFooter": "Operations · Data · Portals · Integration",
  "introKicker": "SOFTWARE AROUND THE OPERATION",
  "introTitle": "The valuable part of bespoke software is the fit between the system and the work.",
  "introCopy": [
    "When important processes depend on spreadsheets, inboxes, duplicated data or ageing systems, the problem is rarely solved by adding another generic tool. The useful starting point is understanding the workflow, the decisions people make and the information they need at each stage.",
    "For Coventry organisations, Kinetic Axis can design and engineer internal systems, customer-facing products and connected workflows with a practical focus on maintainability, adoption and future change."
  ],
  "capabilityKicker": "WHAT WE CAN BUILD",
  "capabilityTitle": "Operational software designed around real roles and processes.",
  "capabilityIntro": "From the first workflow map to production delivery, we keep the product close to the people who use it.",
  "cards": [
    {
      "title": "Internal business systems",
      "text": "Role-based tools for repeat operational workflows, records, approvals and status."
    },
    {
      "title": "Workflow automation",
      "text": "Reduce repeated admin and make hand-offs, ownership and exceptions more visible."
    },
    {
      "title": "Customer-facing portals",
      "text": "Give customers a secure route into the parts of the process they need to manage themselves."
    },
    {
      "title": "System integration",
      "text": "Connect existing platforms so teams are not re-keying the same information across tools."
    }
  ],
  "useKicker": "GOOD SIGNALS FOR BESPOKE SOFTWARE",
  "useTitle": "Consider custom software when the process is strategic enough to deserve a better fit.",
  "useIntro": "The case is strongest where workflow, data and service quality matter more than choosing the cheapest generic licence.",
  "useCases": [
    {
      "title": "Spreadsheets are running operations",
      "text": "Move critical data and workflow out of fragile files without losing the flexibility teams actually need."
    },
    {
      "title": "People re-key information",
      "text": "Connect systems and remove repeated manual transfer where it creates delay or error."
    },
    {
      "title": "Legacy software blocks change",
      "text": "Modernise in stages where the current platform is difficult to adapt safely."
    },
    {
      "title": "Off-the-shelf tools do not fit",
      "text": "Build around organisation-specific roles, rules and customer journeys instead of endless workarounds."
    }
  ],
  "process": [
    {
      "title": "Understand operations",
      "text": "Map roles, data, decisions, exceptions and hand-offs with the people closest to the process."
    },
    {
      "title": "Prioritise value",
      "text": "Identify the smallest useful product that materially improves the operation."
    },
    {
      "title": "Build for adoption",
      "text": "Design interfaces, permissions and integrations around repeat day-to-day use."
    },
    {
      "title": "Improve with evidence",
      "text": "Use real operation to guide automation, reporting and further capability."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues operational platform",
      "eyebrow": "OPERATIONS + CUSTOMER",
      "title": "Pace Venues",
      "text": "A product spanning guest experiences, venue operations and connected platform foundations."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React business UI",
      "eyebrow": "BUSINESS INTERFACES",
      "title": "OPUS React",
      "text": "Reusable UI architecture for forms, dashboards and data-rich operational experiences."
    }
  ],
  "related": [
    {
      "href": "/bespoke-software-development",
      "title": "Bespoke software development",
      "text": "Explore the core custom software capability."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce repetitive admin and clarify process ownership."
    },
    {
      "href": "/legacy-system-modernisation",
      "title": "Legacy system modernisation",
      "text": "Plan a safer route away from difficult-to-change software."
    }
  ],
  "faqs": [
    {
      "q": "Do you work with Coventry businesses on-site?",
      "a": "Projects can combine remote delivery with in-person collaboration where it genuinely helps discovery, workshops or stakeholder alignment."
    },
    {
      "q": "Can bespoke software integrate with systems we already use?",
      "a": "Yes. Existing systems, APIs, data ownership and operational dependencies are considered as part of the product architecture."
    },
    {
      "q": "Can we replace a spreadsheet process gradually?",
      "a": "Yes. A staged approach is often safer than trying to replace every workflow at once. We can prioritise the highest-value process and expand from there."
    },
    {
      "q": "Can you take over an existing software product?",
      "a": "Yes, subject to an initial review of the product, codebase, infrastructure and priorities."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Need software that fits the way your Coventry team works?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
