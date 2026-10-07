import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "DESIGN SYSTEM DEVELOPMENT",
  "title": "Design systems that keep",
  "accent": "products coherent.",
  "lead": "Create reusable design foundations, interaction rules and component patterns that make complex digital products easier to build, maintain and evolve.",
  "artClass": "mkt-hero-art--phase3-design-system",
  "artLabel": "DESIGN SYSTEM / PRODUCT UI",
  "artHeading": "Consistency that scales beyond one screen.",
  "artFooter": "Foundations · Components · States · Themes · Documentation",
  "introKicker": "A SYSTEM, NOT A STYLE GUIDE",
  "introTitle": "Make repeated interface decisions once — then make them reusable.",
  "introCopy": [
    "A useful design system connects visual language, interaction behaviour and implementation. It gives teams a shared answer for common product patterns without forcing every screen into the same shape.",
    "We focus on the parts that materially improve delivery: foundations, reusable components, states, accessibility, theming and documentation that designers and developers can actually apply."
  ],
  "capabilityKicker": "DESIGN SYSTEM CAPABILITIES",
  "capabilityTitle": "From visual rules to implementation-ready patterns.",
  "capabilityIntro": "The system should reduce ambiguity for both design and engineering while leaving room for product-specific decisions.",
  "cards": [
    {
      "title": "Foundations",
      "text": "Typography, spacing, colour, responsive rules and interaction states that create a consistent product baseline."
    },
    {
      "title": "Component patterns",
      "text": "Reusable inputs, navigation, overlays, content and data-display patterns shaped around real application needs."
    },
    {
      "title": "Accessibility rules",
      "text": "Focus, validation, states and interaction behaviour considered as reusable system decisions rather than page-by-page fixes."
    },
    {
      "title": "Documentation & adoption",
      "text": "Make the system understandable enough that teams can use, extend and maintain it without creating parallel conventions."
    }
  ],
  "useKicker": "WHEN A DESIGN SYSTEM HELPS",
  "useTitle": "Consistency becomes valuable when the product starts to grow.",
  "useIntro": "A design system is most useful when repeated product decisions are already becoming expensive or inconsistent.",
  "useCases": [
    {
      "title": "Growing SaaS products",
      "text": "Keep new features visually and behaviourally connected as different parts of the application expand."
    },
    {
      "title": "Multiple product teams",
      "text": "Give designers and developers a shared interface language across parallel workstreams."
    },
    {
      "title": "Complex business UI",
      "text": "Standardise forms, tables, dashboards and workflow states where small inconsistencies add real friction."
    },
    {
      "title": "Replatforming work",
      "text": "Use modernisation as an opportunity to remove duplicated UI patterns and establish maintainable foundations."
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
      "eyebrow": "DESIGN SYSTEM CASE STUDY",
      "title": "OPUS React",
      "text": "A reusable React design system covering forms, content, charts, theming and application interface patterns."
    }
  ],
  "related": [
    {
      "href": "/react-component-library-development",
      "title": "React component library development",
      "text": "Turn reusable interface patterns into a practical implementation layer for product teams."
    },
    {
      "href": "/enterprise-ui-development",
      "title": "Enterprise UI development",
      "text": "Design dense operational interfaces around workflow, information and repeat use."
    },
    {
      "href": "/ui-ux-design-systems",
      "title": "UI/UX & design systems",
      "text": "Broader interface and experience design across new and existing products."
    }
  ],
  "faqs": [
    {
      "q": "What is included in a design system?",
      "a": "The exact scope depends on the product, but typically includes visual foundations, reusable components, interaction states, accessibility rules and documentation."
    },
    {
      "q": "Do we need to rebuild our whole interface?",
      "a": "No. A design system can be introduced incrementally, starting with the patterns that create the most repetition or inconsistency."
    },
    {
      "q": "Can the system support light and dark themes?",
      "a": "Yes. Theme behaviour can be designed into tokens and components so visual modes remain consistent rather than becoming separate implementations."
    },
    {
      "q": "Can you work with an existing component library?",
      "a": "Yes. We can audit what already exists, identify duplication or gaps, and improve the system without discarding useful foundations."
    }
  ],
  "contactService": "UI / UX / branding",
  "ctaTitle": "Need a product interface that can grow without drifting apart?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
