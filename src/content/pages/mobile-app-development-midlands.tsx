import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Services",
    "href": "/services"
  },
  "kicker": "MOBILE APP DEVELOPMENT / MIDLANDS",
  "title": "Mobile app development across",
  "accent": "the Midlands.",
  "lead": "iOS and Android product design and development for Midlands organisations planning customer apps, workforce tools, loyalty products and connected digital services.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "MIDLANDS / MOBILE PRODUCTS",
  "artHeading": "Design the app around the repeat behaviour that makes it useful.",
  "artFooter": "iOS · Android · Loyalty · Connected Services",
  "introKicker": "MOBILE WHERE MOBILE ADDS VALUE",
  "introTitle": "An app earns its place when it makes a repeat task faster, more useful or more connected.",
  "introCopy": [
    "A mobile app is not automatically the right answer. It becomes valuable when device access, repeat engagement, notifications, loyalty, scanning or an always-available customer journey materially improves the experience.",
    "Kinetic Axis helps Midlands organisations define that product case before implementation, then connects the mobile experience to the backend services, admin tools and integrations needed to operate it properly."
  ],
  "capabilityKicker": "MOBILE PRODUCT CAPABILITY",
  "capabilityTitle": "The app, the services behind it and the operational tooling around it.",
  "capabilityIntro": "We treat mobile as one part of the wider product rather than an isolated set of screens.",
  "cards": [
    {
      "title": "Customer apps",
      "text": "Branded mobile journeys for accounts, booking, content, repeat tasks and self-service."
    },
    {
      "title": "Loyalty & membership",
      "text": "Rewards, QR interactions, benefits and repeat engagement designed around customer behaviour."
    },
    {
      "title": "White-label products",
      "text": "Shared product foundations with controlled branding, configuration and tenant strategy."
    },
    {
      "title": "Connected backends",
      "text": "APIs, data, notifications and operational interfaces that make the mobile experience dependable."
    }
  ],
  "useKicker": "WHEN MOBILE IS THE RIGHT SHAPE",
  "useTitle": "Choose an app because the behaviour needs it, not because the format sounds attractive.",
  "useIntro": "The strongest mobile products have a clear reason to live on the device and a clear operational model behind them.",
  "useCases": [
    {
      "title": "Repeat customer behaviour",
      "text": "Make recurring bookings, account tasks, loyalty or content access faster than starting again on the web."
    },
    {
      "title": "Device capabilities matter",
      "text": "Use scanning, notifications, camera, biometrics or local device behaviour where it improves the journey."
    },
    {
      "title": "Multiple brands need one platform",
      "text": "Use a controlled white-label model where several customer-facing apps share a product foundation."
    },
    {
      "title": "Mobile and operations must connect",
      "text": "Link the customer app with admin, content, booking, rewards or other operational services."
    }
  ],
  "process": [
    {
      "title": "Validate the mobile case",
      "text": "Identify the repeat behaviour, device advantage and product outcome before committing to the format."
    },
    {
      "title": "Design the product loop",
      "text": "Make the core journey clear, fast and coherent before expanding features."
    },
    {
      "title": "Connect the platform",
      "text": "Build mobile, APIs and operational tooling around the same product rules."
    },
    {
      "title": "Release and evolve",
      "text": "Use real adoption and customer behaviour to guide the next release."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues mobile hospitality platform",
      "eyebrow": "MOBILE + OPERATIONS",
      "title": "Pace Venues",
      "text": "A hospitality product connecting branded mobile journeys with venue operations."
    },
    {
      "href": "/projects/veyra",
      "image": "/assets/project-veyra.jpg",
      "alt": "Veyra Studio digital product",
      "eyebrow": "DIGITAL PRODUCT",
      "title": "Veyra Studio",
      "text": "A focused product experience shaped around complex creative planning workflows."
    }
  ],
  "related": [
    {
      "href": "/mobile-app-development",
      "title": "Mobile app development",
      "text": "Explore the core iOS and Android product capability."
    },
    {
      "href": "/white-label-app-development",
      "title": "White-label app development",
      "text": "Plan shared logic across multiple branded applications."
    },
    {
      "href": "/loyalty-app-development",
      "title": "Loyalty app development",
      "text": "Design rewards and repeat customer engagement into the product."
    }
  ],
  "faqs": [
    {
      "q": "Do you build both iOS and Android apps?",
      "a": "Yes. Platform strategy depends on the audience, product requirements, release model and the services the app needs to connect to."
    },
    {
      "q": "Can you help decide whether we need an app or a web application?",
      "a": "Yes. We can compare the journeys, device requirements, distribution model and expected repeat behaviour before choosing the product shape."
    },
    {
      "q": "Can a mobile app connect to our existing booking or CRM system?",
      "a": "Yes, where suitable APIs or integration routes are available. Integration constraints are reviewed early because they affect the product architecture."
    },
    {
      "q": "Do you work with organisations outside the Midlands?",
      "a": "Yes. Kinetic Axis works across the UK; this page is a direct route for Midlands organisations planning a mobile product."
    }
  ],
  "contactService": "Mobile application",
  "ctaTitle": "Planning a mobile product in the Midlands?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate your project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
