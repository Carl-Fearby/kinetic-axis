import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "BESPOKE SOFTWARE / WARWICKSHIRE",
  "title": "Bespoke software development for",
  "accent": "Warwickshire businesses.",
  "lead": "Custom operational software for Warwickshire organisations replacing manual processes, connecting systems or modernising software that no longer fits the business.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "WARWICKSHIRE / BESPOKE SOFTWARE",
  "artHeading": "Build around your workflow, not around somebody else’s template.",
  "artFooter": "Operations · Automation · Data · Integration",
  "introKicker": "A FOCUSED REGIONAL SERVICE",
  "introTitle": "For organisations that have outgrown spreadsheets, workarounds or rigid software.",
  "introCopy": [
    "This page focuses specifically on bespoke business software in Warwickshire. For broader web, mobile and integration capability, our regional overview covers the wider product offering.",
    "The practical question is whether the workflow is important enough that better-fitting software would reduce friction, improve service or make change easier. We start there, then decide what should be automated, integrated or rebuilt."
  ],
  "capabilityKicker": "BESPOKE SOFTWARE CAPABILITY",
  "capabilityTitle": "Software designed around the roles, rules and data that make the business work.",
  "capabilityIntro": "We can start with one critical workflow or shape a broader operational platform in stages.",
  "cards": [
    {
      "title": "Process-led applications",
      "text": "Turn repeat operational workflows into clear states, actions, ownership and auditability."
    },
    {
      "title": "Back-office systems",
      "text": "Bring records, tasks, exceptions and reporting into interfaces built around operational roles."
    },
    {
      "title": "Integration & automation",
      "text": "Reduce repeated manual transfer by connecting the systems that already matter to the business."
    },
    {
      "title": "Modernisation",
      "text": "Improve or replace ageing software in controlled stages rather than forcing a risky big-bang rewrite."
    }
  ],
  "useKicker": "WHEN CUSTOM SOFTWARE EARNS ITS KEEP",
  "useTitle": "The strongest case is usually a business problem, not a feature wish list.",
  "useIntro": "Bespoke development is worth considering when the cost of workarounds, delay or inflexibility is becoming material.",
  "useCases": [
    {
      "title": "Critical work lives in spreadsheets",
      "text": "Create a safer operational system while preserving the useful flexibility teams rely on."
    },
    {
      "title": "Generic software creates workarounds",
      "text": "Design the product around the organisation’s actual rules instead of adapting the organisation to the tool."
    },
    {
      "title": "Systems do not share data",
      "text": "Connect important services and reduce duplicate entry, reconciliation and uncertainty."
    },
    {
      "title": "Legacy software is hard to change",
      "text": "Create a staged modernisation plan that protects continuity while improving the product foundation."
    }
  ],
  "process": [
    {
      "title": "Find the operational constraint",
      "text": "Understand where time, risk or service quality is being lost today."
    },
    {
      "title": "Model the workflow",
      "text": "Define roles, states, data, rules and exceptions before designing screens."
    },
    {
      "title": "Build the useful core",
      "text": "Deliver the smallest coherent system that materially improves the process."
    },
    {
      "title": "Expand deliberately",
      "text": "Add automation, reporting and connected workflows as evidence shows where they create value."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues bespoke product platform",
      "eyebrow": "BESPOKE PLATFORM",
      "title": "Pace Venues",
      "text": "A connected product spanning customer journeys, venue operations and platform foundations."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React operational interface system",
      "eyebrow": "BUSINESS UI",
      "title": "OPUS React",
      "text": "Reusable interface architecture for data-rich business application experiences."
    }
  ],
  "related": [
    {
      "href": "/bespoke-software-development",
      "title": "Bespoke software development",
      "text": "Explore our broader custom software service."
    },
    {
      "href": "/software-web-app-development-warwickshire",
      "title": "Software & web apps in Warwickshire",
      "text": "See the wider regional product and engineering capability."
    },
    {
      "href": "/replace-spreadsheets-with-bespoke-software",
      "title": "Replace spreadsheet workflows",
      "text": "Explore a focused route for spreadsheet-led operations."
    }
  ],
  "faqs": [
    {
      "q": "Do you only build large bespoke systems?",
      "a": "No. A useful first release can focus on one valuable workflow and expand only when the business case is clear."
    },
    {
      "q": "Can bespoke software replace several spreadsheets?",
      "a": "Yes. We first identify what the spreadsheets are actually doing — data storage, workflow, calculations, approvals or reporting — before designing a safer replacement."
    },
    {
      "q": "Can you integrate with software we need to keep?",
      "a": "Yes. Bespoke software does not require replacing everything. Existing platforms can remain where they work well and be connected where practical."
    },
    {
      "q": "Do you work outside Warwickshire?",
      "a": "Yes. Kinetic Axis works with organisations across the UK. Warwickshire is our local regional route."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Planning bespoke software in Warwickshire?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
