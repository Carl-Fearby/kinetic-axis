import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "SAAS & TECHNOLOGY PRODUCTS",
  "title": "Build a product that can",
  "accent": "keep becoming better.",
  "lead": "Design and engineer SaaS and technology products around repeat use, multi-tenant needs, operational reality and a roadmap that extends beyond the first release.",
  "artClass": "mkt-hero-art--v03",
  "artLabel": "SAAS / PRODUCT",
  "artHeading": "A product foundation built to evolve.",
  "artFooter": "Tenancy · Onboarding · Roles · Product UI · Operations",
  "introKicker": "PRODUCT, NOT PROJECT",
  "introTitle": "SaaS needs a useful first release and a maintainable second one.",
  "introCopy": [
    "A SaaS product is not finished at launch. Onboarding, permissions, tenancy, support tooling, billing, integrations and product analytics can all become part of how the service operates over time.",
    "We help shape the first coherent release while making deliberate decisions about what needs to be extensible now and what can wait until the product has real evidence."
  ],
  "capabilityKicker": "SAAS CAPABILITIES",
  "capabilityTitle": "Foundations for a product that serves repeat users.",
  "capabilityIntro": "The architecture and interface should reflect how the product is sold, configured, supported and used over time.",
  "cards": [
    {
      "title": "Multi-tenant product models",
      "text": "Separate organisations, configuration and data appropriately while keeping the platform maintainable."
    },
    {
      "title": "Onboarding & accounts",
      "text": "Help users understand the product quickly and manage identity, organisation membership and permissions."
    },
    {
      "title": "Product UI & workflows",
      "text": "Design repeat-use interfaces where clarity matters more than marketing-page spectacle."
    },
    {
      "title": "Operational tooling",
      "text": "Give the product team visibility and controls for support, configuration and customer management."
    }
  ],
  "useKicker": "PRODUCT STAGES",
  "useTitle": "Different stages need different engineering decisions.",
  "useIntro": "An early SaaS product should preserve learning speed without creating avoidable structural problems.",
  "useCases": [
    {
      "title": "New SaaS MVPs",
      "text": "Build the smallest complete product that can test a real customer problem and usage model."
    },
    {
      "title": "Existing product expansion",
      "text": "Add workflows, roles, integrations or product areas without losing consistency across the application."
    },
    {
      "title": "Platform consolidation",
      "text": "Bring fragmented product experiences and back-office tools onto a more coherent shared foundation."
    },
    {
      "title": "White-label SaaS",
      "text": "Support brand or tenant variation where one underlying product serves distinct customer organisations."
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
      "alt": "OPUS React design system project",
      "eyebrow": "DESIGN SYSTEM",
      "title": "OPUS React",
      "text": "Reusable React components and interaction patterns for complex product and business interfaces."
    }
  ],
  "related": [
    {
      "href": "/saas-product-development",
      "title": "SaaS product development",
      "text": "Our focused solution page for shaping and delivering subscription and multi-tenant products."
    },
    {
      "href": "/ui-ux-design-systems",
      "title": "UI/UX & design systems",
      "text": "Create reusable product patterns that help the interface remain coherent as the product grows."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect the SaaS product to the external services customers and operations depend on."
    }
  ],
  "faqs": [
    {
      "q": "Can you build a SaaS MVP?",
      "a": "Yes. We focus the first release on a complete, testable customer outcome rather than trying to include every future feature at reduced quality."
    },
    {
      "q": "Can SaaS software support multiple organisations?",
      "a": "Yes. Multi-tenant architecture can separate organisation data, users, permissions and configuration while preserving a shared application foundation."
    },
    {
      "q": "Can you work on an existing SaaS product?",
      "a": "Yes. We can improve a product area, introduce a design system, add integrations or help modernise architecture without requiring a full rebuild."
    },
    {
      "q": "Do you build the admin side as well as the customer product?",
      "a": "Yes. Support and operational tooling are part of the product system when the team needs them to manage customers, configuration or issues effectively."
    }
  ],
  "contactService": "SaaS product development",
  "ctaTitle": "Building a software product that needs room to evolve?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
