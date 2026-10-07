import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN & SOFTWARE / LEAMINGTON SPA",
  "title": "Websites and software for",
  "accent": "Leamington Spa businesses.",
  "lead": "Research-led websites, web apps and bespoke software for Royal Leamington Spa — from Silicon Spa games studios and digital agencies to the independents trading along the Parade and the High Street.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "LEAMINGTON SPA / WEB DESIGN & SOFTWARE",
  "artHeading": "Design quality is the first proof point.",
  "artFooter": "Structure · Design · Build · Measure",
  "introKicker": "IN A TOWN THAT NOTICES DESIGN",
  "introTitle": "In a town full of studios, average design gets noticed — for the wrong reasons.",
  "introCopy": [
    "Leamington Spa is one of the UK's recognised clusters for games and digital: the Silicon Spa name covers dozens of studios and hundreds of specialists, a short walk from the Regency terraces where independents, agencies and professional firms trade. The audience here reads craft quickly. Typography, motion, loading speed and the quality of a case study are all judged before anyone reads a word of the copy.",
    "Kinetic Axis designs and builds for Leamington organisations with that bar in mind — content planning, interface design and front-end engineering in one senior team, plus the web applications, operational tools and integrations that sit behind a modern digital business."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "Work that stands up to a design-literate audience.",
  "capabilityIntro": "Every page and screen is designed against a job, an audience and a measurable outcome.",
  "cards": [
    {
      "title": "Brand-led websites",
      "text": "Distinctive, fast front ends where typography, motion and content structure carry the standard the studio expects."
    },
    {
      "title": "Portals & web applications",
      "text": "Member areas, dashboards and tools that turn a website from a brochure into something people use."
    },
    {
      "title": "Bespoke software",
      "text": "Pipeline, production and reporting tools for studios and agencies outgrowing spreadsheets and generic PM tools."
    },
    {
      "title": "Campaigns, apps & integration",
      "text": "Launch pages, mobile experiences and API work connecting storefronts, CRMs and finance systems."
    }
  ],
  "useKicker": "SIGNS IT IS TIME TO ACT",
  "useTitle": "When the work is sharper than the website.",
  "useIntro": "The strongest cases are where the current site is quietly undercutting the quality of everything around it.",
  "useCases": [
    {
      "title": "The site does not match the portfolio",
      "text": "Prospects arrive expecting craft and meet a template. Design-literate buyers read that gap immediately."
    },
    {
      "title": "Publishing needs a developer",
      "text": "Studios change quickly — launches, showreels, hiring. Content that is slow to update is content nobody updates."
    },
    {
      "title": "Studio operations live in too many tools",
      "text": "Projects, time, invoices and status scattered across apps, with someone reconciling it all manually every month."
    },
    {
      "title": "The site is slow on mobile",
      "text": "Half the traffic arrives on a phone over mobile data. Heavy pages lose those visitors back to the results page."
    }
  ],
  "process": [
    {
      "title": "Discover",
      "text": "Understand the audience, the competitors in the results and the standard the brand has to meet on the first screen."
    },
    {
      "title": "Structure",
      "text": "Plan pages, messaging and data flows so every service, case study and location has a clear, indexable home."
    },
    {
      "title": "Design",
      "text": "Design the interface around reading, comparison and action — accessibility and performance treated as design material."
    },
    {
      "title": "Build & measure",
      "text": "Ship a fast, static-first build with analytics, consent mode and conversion tracking wired in from day one."
    }
  ],
  "projects": [
    {
      "href": "/projects/emberlyn",
      "image": "/assets/project-emberlyn.jpg",
      "alt": "Emberlyn artist website design",
      "eyebrow": "BRAND-LED WEBSITE",
      "title": "Emberlyn",
      "text": "A brand-led artist website where visual identity, music, video and navigation work together."
    },
    {
      "href": "/projects/vx27",
      "image": "/assets/project-vx27.jpg",
      "alt": "VX-27 companion web experience design",
      "eyebrow": "INTERACTIVE EXPERIENCE",
      "title": "VX-27",
      "text": "A companion web experience carrying a distinctive sci-fi identity beyond the game itself."
    }
  ],
  "related": [
    {
      "href": "/web-design",
      "title": "Web design",
      "text": "The core design capability: research, content structure, interface design and front-end build."
    },
    {
      "href": "/ui-ux-design-systems",
      "title": "UI/UX & design systems",
      "text": "Reusable interface foundations that keep a growing product consistent as screens multiply."
    },
    {
      "href": "/digital-product-development",
      "title": "Digital product development",
      "text": "When the website needs to become a portal, platform or product rather than a brochure."
    }
  ],
  "faqs": [
    {
      "q": "Do you work with Leamington Spa studios and agencies?",
      "a": "Yes — and we are happy to work white-label or alongside an existing team. Discovery can run at your Leamington offices or online, with delivery structured around shared previews and scheduled checkpoints."
    },
    {
      "q": "How long does a website project take?",
      "a": "Most brochure and marketing sites land in eight to twelve weeks depending on content readiness. Product and portal work is phased, so the first useful release usually ships before the wider roadmap completes."
    },
    {
      "q": "Will the site hold up on performance and accessibility?",
      "a": "Yes. Static-first delivery, real image budgets, keyboard access and consent mode are part of the build standard — not a later optimisation pass. Fast, accessible pages are also what search engines reward."
    },
    {
      "q": "Can you improve an existing site instead of replacing it?",
      "a": "Often, yes. A content, structure and performance pass on a sound codebase can recover most of the value at a fraction of a rebuild — we will tell you honestly which route fits."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Planning a website or product for your Leamington Spa team?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
