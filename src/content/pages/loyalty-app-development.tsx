import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "LOYALTY APP DEVELOPMENT",
  "title": "Give customers a reason to",
  "accent": "come back.",
  "lead": "Design loyalty and rewards experiences around useful repeat interactions — not just points on a screen. Connect the mobile journey with the operational systems that make rewards accurate.",
  "artClass": "mkt-hero-art--v08",
  "artLabel": "LOYALTY / REPEAT USE",
  "artHeading": "Recognition, rewards and repeat customer value.",
  "artFooter": "Accounts · Rewards · QR · Offers · Notifications",
  "introKicker": "RETENTION AS A PRODUCT EXPERIENCE",
  "introTitle": "A loyalty app works when the value is obvious on both sides.",
  "introCopy": [
    "Customers need a simple reason to open the app again. The business needs reward rules that are understandable, supportable and connected to real activity. If either side is complicated, loyalty quickly becomes another forgotten account.",
    "We design the customer experience together with the reward model, identity, scanning or transaction flow, notifications and staff-facing controls needed to run it."
  ],
  "capabilityKicker": "LOYALTY CAPABILITIES",
  "capabilityTitle": "Make the reward journey simple, visible and operationally manageable.",
  "capabilityIntro": "Useful loyalty products connect the customer-facing experience to reliable rules and data behind it.",
  "cards": [
    {
      "title": "Accounts & identity",
      "text": "Recognise customers consistently across sign-in, profile, activity and reward history."
    },
    {
      "title": "Rewards & earning rules",
      "text": "Define points, stamps, milestones or other mechanics in a way customers and staff can understand."
    },
    {
      "title": "QR & in-venue interactions",
      "text": "Use scannable codes where a physical interaction needs to connect with the digital account."
    },
    {
      "title": "Offers & communication",
      "text": "Present relevant rewards, offers or updates without turning the product into a notification channel with no utility."
    }
  ],
  "useKicker": "LOYALTY MODELS",
  "useTitle": "Retention can take more than one shape.",
  "useIntro": "The mechanism should fit the frequency, value and context of the customer relationship.",
  "useCases": [
    {
      "title": "Hospitality loyalty",
      "text": "Connect repeat venue visits with rewards, bookings, menus and a broader branded guest experience."
    },
    {
      "title": "Membership benefits",
      "text": "Give members a clear digital identity, access to benefits and a place to understand what is available to them."
    },
    {
      "title": "Points or stamps",
      "text": "Make earning and redeeming easy to understand while keeping transaction history and support visible."
    },
    {
      "title": "Tiered programmes",
      "text": "Use status, thresholds or benefits where the customer relationship justifies a richer progression model."
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
      "alt": "Pace Venues hospitality platform project",
      "eyebrow": "HOSPITALITY PLATFORM",
      "title": "Pace Venues",
      "text": "Bookings, rewards, guest mobile experience and operational tooling built on one platform."
    }
  ],
  "related": [
    {
      "href": "/membership-loyalty-platforms",
      "title": "Membership & loyalty platforms",
      "text": "Broader account, membership and retention platforms across web and mobile."
    },
    {
      "href": "/restaurant-app-development",
      "title": "Restaurant app development",
      "text": "Combine loyalty with bookings, menus and the wider guest journey."
    },
    {
      "href": "/white-label-app-development",
      "title": "White-label app development",
      "text": "Operate a shared product across individually branded customer experiences."
    }
  ],
  "faqs": [
    {
      "q": "Can rewards use QR codes?",
      "a": "Yes. QR interactions can connect physical activity with a customer account, provided the earning and redemption rules are designed to prevent ambiguity and misuse."
    },
    {
      "q": "Can loyalty sit inside a wider customer app?",
      "a": "Yes. In many products loyalty is stronger when it sits alongside genuinely useful tasks such as bookings, account activity, offers or product information."
    },
    {
      "q": "Can staff manage rewards and customer issues?",
      "a": "Yes. Staff-facing tools can expose reward history, adjustments, configuration and support actions with appropriate permissions."
    },
    {
      "q": "Can one loyalty platform support several brands or locations?",
      "a": "Yes. A multi-tenant or white-label architecture can keep brand, configuration and customer data separated while sharing a maintainable platform foundation."
    }
  ],
  "contactService": "Loyalty app development",
  "ctaTitle": "Want loyalty to feel like part of the product, not an add-on?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
