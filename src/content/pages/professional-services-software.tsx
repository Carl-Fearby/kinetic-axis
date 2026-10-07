import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "PROFESSIONAL SERVICES SOFTWARE",
  "title": "Software for service businesses that",
  "accent": "run on process.",
  "lead": "Design bespoke operational software for teams managing clients, cases, projects, documents, approvals and repeat internal workflows.",
  "artClass": "mkt-hero-art--phase3-professional-services",
  "artLabel": "PROFESSIONAL SERVICES / OPERATIONS",
  "artHeading": "Turn process knowledge into a clearer system.",
  "artFooter": "Clients · Cases · Tasks · Documents · Reporting",
  "introKicker": "PROCESS IS THE PRODUCT",
  "introTitle": "Service businesses often carry their real operating model across too many tools.",
  "introCopy": [
    "Professional services workflows frequently span CRM records, spreadsheets, email, documents and specialist platforms. The friction appears in hand-offs, duplicate entry and the work needed to understand current status.",
    "Bespoke software can bring the critical workflow into one operational view while continuing to integrate with the tools that still make sense to keep."
  ],
  "capabilityKicker": "PROFESSIONAL SERVICES CAPABILITIES",
  "capabilityTitle": "Make client and operational work easier to follow.",
  "capabilityIntro": "The system should reflect how work actually moves through the organisation, including exceptions and responsibility changes.",
  "cards": [
    {
      "title": "Client & case management",
      "text": "Bring context, status, ownership and next actions into a consistent operational record."
    },
    {
      "title": "Workflow & approvals",
      "text": "Model stages, reviews and exceptions so responsibility is visible without relying on inbox memory."
    },
    {
      "title": "Document processes",
      "text": "Connect documents and structured workflow where files are part of delivering the service."
    },
    {
      "title": "Management visibility",
      "text": "Expose progress, bottlenecks and workload through reporting that follows the real process."
    }
  ],
  "useKicker": "COMMON SERVICE WORKFLOWS",
  "useTitle": "Replace coordination overhead with a system people can trust.",
  "useIntro": "The strongest opportunities are usually where valuable staff time is spent reconciling information between tools.",
  "useCases": [
    {
      "title": "Client onboarding",
      "text": "Coordinate information, documents, checks and internal ownership from enquiry to active engagement."
    },
    {
      "title": "Case or matter workflows",
      "text": "Track structured stages, actions and evidence around ongoing client work."
    },
    {
      "title": "Project delivery",
      "text": "Bring milestones, responsibility, client context and operational reporting into one view."
    },
    {
      "title": "Internal approvals",
      "text": "Make review and authorisation steps visible, auditable and easier to progress."
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
  "projects": [],
  "related": [
    {
      "href": "/business-software-development",
      "title": "Business software development",
      "text": "Build the wider operational platform around organisation-specific workflows."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Give clients secure self-service access where it improves the service journey."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce repeated administration and make hand-offs more reliable."
    }
  ],
  "faqs": [
    {
      "q": "Can bespoke software integrate with our CRM or document systems?",
      "a": "Yes, where those systems provide suitable integration options. We map ownership carefully so the new software complements useful existing tools rather than duplicating them."
    },
    {
      "q": "Do we have to replace every spreadsheet at once?",
      "a": "No. We normally focus first on the workflows where spreadsheets create the most risk, duplication or coordination overhead."
    },
    {
      "q": "Can clients have their own portal?",
      "a": "Yes. A customer portal can expose selected status, documents, requests or self-service actions without giving external users access to internal operational screens."
    },
    {
      "q": "Can the software support different teams or service lines?",
      "a": "Yes. Roles, workflow variations and shared data can be designed around the way the organisation is structured."
    }
  ],
  "contactService": "Business software development",
  "ctaTitle": "Have a service workflow that depends on too many disconnected tools?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
