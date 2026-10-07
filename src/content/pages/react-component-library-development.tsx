import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "REACT COMPONENT LIBRARY DEVELOPMENT",
  "title": "Reusable React components for",
  "accent": "real product teams.",
  "lead": "Build a maintainable component library that turns product patterns into dependable, accessible and reusable application building blocks.",
  "artClass": "mkt-hero-art--phase3-react-components",
  "artLabel": "REACT / COMPONENT SYSTEM",
  "artHeading": "Reusable UI with implementation discipline.",
  "artFooter": "React · Components · Forms · Themes · Documentation",
  "introKicker": "IMPLEMENTATION LAYER",
  "introTitle": "A component library should make the right thing easier to build.",
  "introCopy": [
    "Reusable React components are valuable when they capture more than styling. The useful layer includes behaviour, states, accessibility expectations and the small implementation decisions that otherwise get repeated across a product.",
    "We design the component API around the product rather than copying a generic catalogue. That keeps the library practical for the workflows and information patterns teams actually need."
  ],
  "capabilityKicker": "COMPONENT LIBRARY CAPABILITIES",
  "capabilityTitle": "A usable system from primitives to complex patterns.",
  "capabilityIntro": "The right level of abstraction matters: enough reuse to improve consistency, without making every future requirement fight the component API.",
  "cards": [
    {
      "title": "Core primitives",
      "text": "Buttons, inputs, layout, typography and state foundations with predictable behaviour and composition."
    },
    {
      "title": "Complex form controls",
      "text": "Validation, labels, errors, disabled states and field patterns designed for business workflows."
    },
    {
      "title": "Application patterns",
      "text": "Navigation, overlays, data display and content structures that reflect how the product is actually used."
    },
    {
      "title": "Developer documentation",
      "text": "Clear examples and usage guidance so the library becomes a delivery tool rather than an internal showcase."
    }
  ],
  "useKicker": "WHERE IT PAYS OFF",
  "useTitle": "Reduce repeated UI work without freezing the product.",
  "useIntro": "A component library is most useful where several screens, teams or products share interaction patterns.",
  "useCases": [
    {
      "title": "SaaS platforms",
      "text": "Create common product primitives while leaving room for feature-specific workflows."
    },
    {
      "title": "Back-office systems",
      "text": "Standardise dense forms, tables, filters and operational actions across complex applications."
    },
    {
      "title": "Multi-product estates",
      "text": "Share interface behaviour across related products without duplicating core UI decisions."
    },
    {
      "title": "Product modernisation",
      "text": "Replace inconsistent legacy widgets with a maintainable React implementation layer in stages."
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
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React component library project",
      "eyebrow": "REACT COMPONENT SYSTEM",
      "title": "OPUS React",
      "text": "A component-led React system spanning form inputs, overlays, content components, charts and themes."
    }
  ],
  "related": [
    {
      "href": "/design-system-development",
      "title": "Design system development",
      "text": "Connect component implementation to a wider set of visual and interaction rules."
    },
    {
      "href": "/enterprise-ui-development",
      "title": "Enterprise UI development",
      "text": "Apply reusable patterns to dense, high-frequency operational interfaces."
    },
    {
      "href": "/web-app-development",
      "title": "Web app development",
      "text": "Build complete browser-based products around the component system."
    }
  ],
  "faqs": [
    {
      "q": "Is a React component library the same as a design system?",
      "a": "Not exactly. A component library is the implementation layer; a design system also includes the visual, interaction and usage rules that guide how those components should be applied."
    },
    {
      "q": "Can you build on top of an existing library?",
      "a": "Yes. We can extend or rationalise an existing implementation where that is more useful than replacing it."
    },
    {
      "q": "How do you avoid over-engineering components?",
      "a": "We start from repeated product patterns and real use cases, then abstract only where reuse creates a clear benefit."
    },
    {
      "q": "Can components support accessibility requirements?",
      "a": "Yes. Keyboard behaviour, focus, labels, states and semantic structure can be built into reusable components so teams do not solve the same accessibility problems repeatedly."
    }
  ],
  "contactService": "UI / UX / branding",
  "ctaTitle": "Need a React UI foundation your product team can actually reuse?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
