import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN / COVENTRY",
  "title": "Web design for",
  "accent": "Coventry organisations.",
  "lead": "Research-led websites for Coventry businesses and institutions — clear structure, distinctive design and fast, accessible pages that turn local searches into real enquiries.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "COVENTRY / WEB DESIGN",
  "artHeading": "A website that earns its place in the enquiry process.",
  "artFooter": "Structure · Design · Build · Measure",
  "introKicker": "WEBSITES WITH A JOB TO DO",
  "introTitle": "Most Coventry organisations do not need a prettier homepage. They need a clearer one.",
  "introCopy": [
    "A website earns its keep when a visitor arriving from a search, an advert or a referral can understand what you do, judge whether you are right for them and take the next step without friction. That is a structure and content problem before it is a visual one.",
    "Kinetic Axis designs and builds websites for Coventry businesses, professional practices, manufacturers, venues and public-facing organisations — combining content planning, interface design and front-end engineering in one senior team, so nothing is lost between the idea and the live site."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "Websites engineered around the journey from search to enquiry.",
  "capabilityIntro": "Every page is designed against a job, an audience and a measurable outcome rather than a template.",
  "cards": [
    {
      "title": "Corporate & brochure websites",
      "text": "Clear service architecture, confident typography and content that answers the questions buyers actually ask."
    },
    {
      "title": "E-commerce & booking",
      "text": "Product, checkout and booking journeys built for speed, trust and straightforward day-to-day management."
    },
    {
      "title": "Landing pages & campaigns",
      "text": "Focused pages for services, locations and campaigns that carry a single message all the way to conversion."
    },
    {
      "title": "Redesign & migration",
      "text": "Rethink an ageing site without losing rankings, content value or the equity the current domain has earned."
    }
  ],
  "useKicker": "SIGNS IT IS TIME TO REDESIGN",
  "useTitle": "Consider a new website when the site is now the constraint.",
  "useIntro": "The strongest cases are where the website is costing enquiries, credibility or internal time every month.",
  "useCases": [
    {
      "title": "The site looks older than the business",
      "text": "Buyers judge capability in seconds. Design quality is the first proof point before anyone reads a case study."
    },
    {
      "title": "Enquiries stall at the contact page",
      "text": "Unclear services, buried proof and heavy forms quietly lose the visitors you already paid to acquire."
    },
    {
      "title": "Every edit needs a developer",
      "text": "Content that is slow to change gets left stale. Publishing should be routine, not a ticket."
    },
    {
      "title": "Mobile visits behave badly",
      "text": "Most local search starts on a phone. Slow loads, tiny tap targets and pop-ups push people back to the results page."
    }
  ],
  "process": [
    {
      "title": "Discover",
      "text": "Understand the audience, the enquiries that matter, the competitors in the results and what the site must prove."
    },
    {
      "title": "Structure",
      "text": "Plan pages, messaging order and internal links so every service and location has a clear, indexable home."
    },
    {
      "title": "Design",
      "text": "Design the interface around reading, comparison and action — with accessibility built in, not bolted on."
    },
    {
      "title": "Build & measure",
      "text": "Ship a fast, static-first site with analytics, consent mode and conversion tracking wired in from day one."
    }
  ],
  "projects": [
    {
      "href": "/projects/ebuygum",
      "image": "/assets/project-ebuygum.jpg",
      "alt": "eBuyGum marketplace design",
      "eyebrow": "MARKETPLACE DESIGN",
      "title": "eBuyGum",
      "text": "Discovery, category structure and responsive ecommerce UX built around how people actually browse."
    },
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues platform design",
      "eyebrow": "HOSPITALITY PLATFORM",
      "title": "Pace Venues",
      "text": "A guest-facing experience and operational platform designed as one connected product."
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
      "text": "Reusable interface foundations that keep a growing site consistent as pages multiply."
    },
    {
      "href": "/digital-product-development",
      "title": "Digital product development",
      "text": "When the website needs to become a portal, platform or product rather than a brochure."
    }
  ],
  "faqs": [
    {
      "q": "Do you provide web design for Coventry businesses on-site?",
      "a": "Yes. Discovery and workshops can run at your Coventry offices or online — whichever gets the right people in the room. Delivery after that is a mix of focused sessions and asynchronous review."
    },
    {
      "q": "How long does a website project take?",
      "a": "Most brochure and marketing sites land in eight to twelve weeks depending on content readiness. E-commerce, booking or multi-audience sites take longer because the journeys carry more moving parts."
    },
    {
      "q": "Will we be able to edit the site ourselves?",
      "a": "Yes. Content and structure are planned so routine updates are straightforward, and we document the patterns your team will use most often."
    },
    {
      "q": "Can you improve an existing site instead of replacing it?",
      "a": "Often, yes. A content, structure and performance pass on a sound codebase can recover most of the value at a fraction of a rebuild — we will tell you honestly which route fits."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Need a website that works as hard as your Coventry team?",
  "secondaryCta": {
    "href": "/project-planner",
    "label": "Plan the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
