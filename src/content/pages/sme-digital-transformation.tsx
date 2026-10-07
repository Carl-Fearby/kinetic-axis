import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "SME DIGITAL TRANSFORMATION",
  "title": "Practical digital change for",
  "accent": "growing businesses.",
  "lead": "Improve the workflows that create the most operational drag — combining better software, integration and automation without turning transformation into a giant programme.",
  "artClass": "mkt-hero-art--phase3-sme-transformation",
  "artLabel": "SME / DIGITAL TRANSFORMATION",
  "artHeading": "Change the process that matters first.",
  "artFooter": "Workflow · Data · Integration · Automation · Adoption",
  "introKicker": "FOCUSED CHANGE",
  "introTitle": "Digital transformation does not need to mean replacing everything.",
  "introCopy": [
    "For growing businesses, the most valuable digital work is often specific: remove duplicate entry, replace a fragile spreadsheet, connect two systems or give customers a better self-service journey.",
    "We start with the operational pain and commercial goal, then shape a staged solution that can deliver value before the entire organisation has to change around it."
  ],
  "capabilityKicker": "TRANSFORMATION CAPABILITIES",
  "capabilityTitle": "Improve the operating model one useful step at a time.",
  "capabilityIntro": "The aim is measurable reduction in friction, not technology for its own sake.",
  "cards": [
    {
      "title": "Workflow discovery",
      "text": "Find where people re-enter data, chase status or rely on undocumented workarounds."
    },
    {
      "title": "System consolidation",
      "text": "Bring important workflow and information together where fragmentation is creating cost or risk."
    },
    {
      "title": "Integration & automation",
      "text": "Connect systems and remove repetitive hand-offs that do not need human judgement."
    },
    {
      "title": "Staged modernisation",
      "text": "Plan change in manageable releases so the business can keep operating while the technology improves."
    }
  ],
  "useKicker": "GOOD FIRST TRANSFORMATION TARGETS",
  "useTitle": "Start where operational friction is visible every week.",
  "useIntro": "A focused first project is easier to measure, adopt and build on than a broad technology replacement programme.",
  "useCases": [
    {
      "title": "Spreadsheet-heavy operations",
      "text": "Move critical shared workflows into a structured system when the sheet has become the database, UI and audit trail."
    },
    {
      "title": "Disconnected customer data",
      "text": "Reduce copying and reconciliation between systems that each hold part of the customer journey."
    },
    {
      "title": "Manual status chasing",
      "text": "Give staff and customers clearer visibility instead of relying on calls, inboxes and memory."
    },
    {
      "title": "Legacy internal tools",
      "text": "Replace difficult-to-change software in stages around the highest-value workflow first."
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
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues connected business platform",
      "eyebrow": "CONNECTED OPERATIONS",
      "title": "Pace Venues",
      "text": "A product that connects customer-facing experiences with operational workflows rather than treating them as separate systems."
    }
  ],
  "related": [
    {
      "href": "/internal-business-systems",
      "title": "Internal business systems",
      "text": "Create a clearer operational system around roles, data and workflow."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Remove repeat administration and make system hand-offs dependable."
    },
    {
      "href": "/legacy-system-modernisation",
      "title": "Legacy system modernisation",
      "text": "Move away from difficult-to-change software without a single high-risk cutover."
    }
  ],
  "faqs": [
    {
      "q": "Where should an SME start with digital transformation?",
      "a": "Start with a workflow where the current process has visible cost, delay, duplication or risk. A focused improvement is easier to scope and measure than a broad transformation programme."
    },
    {
      "q": "Do we need to replace our existing systems?",
      "a": "Not necessarily. Integration, focused replacement or a new workflow layer can often preserve systems that still do their job well."
    },
    {
      "q": "Can transformation be delivered in stages?",
      "a": "Yes. Staged delivery is usually preferable because it lets the business learn from real use and reduces the risk of a large one-time change."
    },
    {
      "q": "How do you decide what to automate?",
      "a": "We separate repeatable rules from work that genuinely needs human judgement, then automate the parts where doing so improves reliability or frees meaningful time."
    }
  ],
  "contactService": "Business software development",
  "ctaTitle": "Know where the operational friction is, but not what the right system should be?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
