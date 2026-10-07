import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN & SOFTWARE / SOLIHULL",
  "title": "Websites and software for",
  "accent": "Solihull organisations.",
  "lead": "Research-led websites, web apps and bespoke software for Solihull businesses — from the M42 corridor and the NEC side of the borough to professional firms, retailers and operators in the town centre and Shirley.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "SOLIHULL / WEB DESIGN & SOFTWARE",
  "artHeading": "Clarity wins before the first meeting.",
  "artFooter": "Structure · Design · Build · Measure",
  "introKicker": "BETWEEN BIRMINGHAM AND WARWICKSHIRE",
  "introTitle": "Solihull buyers compare quickly. Clarity wins before the first meeting.",
  "introCopy": [
    "Solihull sits at one of the busiest commercial junctions in the Midlands — the NEC, Birmingham Airport and the planned Interchange on one side, the M42 business corridors and Land Rover's Solihull plant on the other, with established professional firms, retailers and services filling the town centre and Shirley. Buyers here are time-poor and comparison-driven: they will look at three suppliers in one sitting and decide who looks capable before anyone picks up the phone.",
    "Kinetic Axis builds for that moment — content structure and interface design that answers the comparison quickly, plus the portals, operational software and integrations that keep the promise once the enquiry arrives. One senior team plans both, so nothing is lost between the marketing site and the system behind it."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "A website that survives the comparison.",
  "capabilityIntro": "Each piece is scoped against a job, an audience and a measurable outcome rather than a template.",
  "cards": [
    {
      "title": "Corporate & multi-audience sites",
      "text": "Service, sector and location architecture that lets several buyer types find their answer without wading through yours."
    },
    {
      "title": "Portals & web applications",
      "text": "Client accounts, order status, booking and self-service tools that reduce the load on your team after the click."
    },
    {
      "title": "Bespoke software",
      "text": "Operational systems for finance, operations and reporting — shaped around the process instead of forcing a new one."
    },
    {
      "title": "Mobile apps & integration",
      "text": "Customer and workforce apps, plus API work connecting the website to CRM, ERP and finance platforms."
    }
  ],
  "useKicker": "SIGNS IT IS TIME TO ACT",
  "useTitle": "When the current setup quietly leaks enquiries.",
  "useIntro": "The strongest cases are where the site or the workflow is costing credibility every month without announcing it.",
  "useCases": [
    {
      "title": "Competitors look more capable",
      "text": "Same sector, similar clients — but their site answers the buyer's questions and yours deflects them. That gap decides shortlists."
    },
    {
      "title": "Leads arrive with the wrong expectations",
      "text": "Unclear scope and buried proof mean every enquiry starts with a misalignment to correct before real work begins."
    },
    {
      "title": "The site and the systems disagree",
      "text": "What the website promises and what the back office can deliver are managed by humans passing messages between them."
    },
    {
      "title": "Every change needs a developer",
      "text": "New services, sectors or pricing stuck behind a ticket. Publishing should be routine for the team, not a dependency."
    }
  ],
  "process": [
    {
      "title": "Discover",
      "text": "Understand the audiences, the competitors in the results and what the site must prove in the first thirty seconds."
    },
    {
      "title": "Structure",
      "text": "Plan pages, messaging order and internal links so every service and location has a clear, indexable home."
    },
    {
      "title": "Design",
      "text": "Design around reading, comparison and action — accessible, fast and consistent across every buyer type."
    },
    {
      "title": "Build & measure",
      "text": "Ship a static-first build with analytics, consent mode and conversion tracking wired in from day one."
    }
  ],
  "projects": [
    {
      "href": "/projects/veyra",
      "image": "/assets/project-veyra.jpg",
      "alt": "Veyra Studio website design",
      "eyebrow": "BRAND WEBSITE",
      "title": "Veyra",
      "text": "A brand-led site where positioning, visual language and enquiry path were designed as one system."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS design system interface",
      "eyebrow": "DESIGN SYSTEM",
      "title": "OPUS",
      "text": "A component library that keeps a growing product surface consistent as teams and screens multiply."
    }
  ],
  "related": [
    {
      "href": "/web-design-birmingham",
      "title": "Web design in Birmingham",
      "text": "The neighbouring city capability — custom websites for organisations competing at second-city scale."
    },
    {
      "href": "/web-design",
      "title": "Web design",
      "text": "The core design capability: research, content structure, interface design and front-end build."
    },
    {
      "href": "/bespoke-software-development",
      "title": "Bespoke software",
      "text": "Operational software shaped around your process — the route out of duplicated admin."
    }
  ],
  "faqs": [
    {
      "q": "Do you work on-site with Solihull organisations?",
      "a": "Yes. Kick-off, discovery and review sessions can run at your Solihull offices or online — whichever gets the right people in the room. The rest of delivery runs remotely with shared previews and scheduled checkpoints."
    },
    {
      "q": "How long does a project take?",
      "a": "Most brochure and marketing sites land in eight to twelve weeks depending on content readiness. Portal and software work is phased so a useful first release ships early, with later phases judged on real use."
    },
    {
      "q": "Can you work alongside our marketing team or agency?",
      "a": "Yes. We are comfortable owning the build while your team owns brand and campaigns, or owning both. Responsibilities and handover points are agreed up front so nothing stalls at the boundary."
    },
    {
      "q": "What happens after launch?",
      "a": "Hosting, monitoring, support and iterative improvement are available for everything we build, with documentation if your team prefers to take it in-house. The post-launch model is agreed before release."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Planning a website or system for your Solihull team?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
