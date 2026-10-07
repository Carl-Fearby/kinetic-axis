import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "MEMBERSHIP & LOYALTY PLATFORMS",
  "title": "Turn repeat relationships into",
  "accent": "a useful digital product.",
  "lead": "Bring member identity, benefits, rewards, account activity and communications into a product people have a reason to use repeatedly.",
  "artClass": "mkt-hero-art--v08",
  "artLabel": "MEMBERSHIP / RETENTION",
  "artHeading": "Identity, value and repeat engagement in one place.",
  "artFooter": "Accounts · Benefits · Rewards · Activity · Support",
  "introKicker": "REPEAT RELATIONSHIPS",
  "introTitle": "Membership is stronger when the product does more than prove someone belongs.",
  "introCopy": [
    "A digital membership or loyalty platform can become the place customers manage benefits, understand status, access offers, review activity and complete repeat tasks. That makes utility as important as branding.",
    "We design the member-facing experience together with the rules, account model and staff tooling needed to operate it reliably."
  ],
  "capabilityKicker": "PLATFORM CAPABILITIES",
  "capabilityTitle": "Connect member value with the systems that deliver it.",
  "capabilityIntro": "The strongest programmes make status and benefit easy to understand while keeping administration practical behind the scenes.",
  "cards": [
    {
      "title": "Identity & profiles",
      "text": "Create a consistent member record across sign-in, profile, status and relevant activity."
    },
    {
      "title": "Benefits & rewards",
      "text": "Present entitlements, points, tiers or offers in language members can understand and act on."
    },
    {
      "title": "Digital interactions",
      "text": "Use QR, account actions or in-app journeys where online identity needs to connect to real-world activity."
    },
    {
      "title": "Operations & support",
      "text": "Give authorised teams the tools to manage configuration, investigate issues and support member accounts."
    }
  ],
  "useKicker": "PROGRAMME MODELS",
  "useTitle": "Membership can support different kinds of ongoing value.",
  "useIntro": "The product should match why somebody returns, not force every relationship into the same points model.",
  "useCases": [
    {
      "title": "Loyalty programmes",
      "text": "Reward repeat purchasing or visits with visible progress and simple redemption."
    },
    {
      "title": "Paid membership",
      "text": "Give members access to benefits, account information and digital services tied to an active relationship."
    },
    {
      "title": "Venue & hospitality",
      "text": "Combine loyalty with booking, venue information and other repeat guest tasks."
    },
    {
      "title": "Multi-brand programmes",
      "text": "Use shared platform capabilities while preserving distinct branding, configuration or programme rules."
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
      "href": "/loyalty-app-development",
      "title": "Loyalty app development",
      "text": "Create the mobile reward and repeat-use experience."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Give members secure self-service across account and activity."
    },
    {
      "href": "/white-label-app-development",
      "title": "White-label app development",
      "text": "Support distinct brands on a shared product foundation."
    }
  ],
  "faqs": [
    {
      "q": "Can membership and loyalty live in the same platform?",
      "a": "Yes. The account model can support status, entitlements and reward activity together when that reflects the real customer relationship."
    },
    {
      "q": "Can the platform include QR codes?",
      "a": "Yes. QR can be useful when a digital member identity or reward action needs to connect with a physical venue or staff interaction."
    },
    {
      "q": "Can members use both web and mobile experiences?",
      "a": "Yes. A shared backend can support different front ends where the use case justifies both, while keeping account and programme data consistent."
    },
    {
      "q": "Can the system support several brands?",
      "a": "Yes. Brand, content and configuration can be tenant-specific while the underlying product remains shared and maintainable."
    }
  ],
  "contactService": "Membership and loyalty platforms",
  "ctaTitle": "Planning a membership experience people will actually return to?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
