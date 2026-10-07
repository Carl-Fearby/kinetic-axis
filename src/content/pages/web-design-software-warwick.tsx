import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "WEB DESIGN & SOFTWARE / WARWICK",
  "title": "Websites and software for",
  "accent": "Warwick organisations.",
  "lead": "Research-led websites, web apps and bespoke software for Warwick's professional practices, hospitality venues, retailers and established firms — in the county town where reputation still travels by word of mouth.",
  "artClass": "mkt-hero-art--phase3-warwickshire",
  "artLabel": "WARWICK / WEB DESIGN & SOFTWARE",
  "artHeading": "Reputation, translated into a page people can act on.",
  "artFooter": "Structure · Design · Build · Measure",
  "introKicker": "SELLING ON TRUST",
  "introTitle": "Warwick's businesses sell on trust. The website should carry some of it.",
  "introCopy": [
    "Warwick is a county town of professionals and independents: solicitors and accountants, estate agents and financial advisers, hotels, restaurants and the hospitality trade that serves the castle and the conferences around it. Buyers here research quietly before they ever make contact — they read, compare and shortlist, then arrive already half-decided. The website's job is to earn the second half.",
    "Kinetic Axis plans, designs and builds for Warwick organisations in one senior team: content structure and interface design for the front end, and the portals, booking flows and operational software behind it — so what visitors are promised and what the business can actually deliver stay aligned."
  ],
  "capabilityKicker": "WHAT WE DESIGN AND BUILD",
  "capabilityTitle": "A website, and the working software underneath it.",
  "capabilityIntro": "Each piece is scoped against a real audience, a real job and a measurable outcome.",
  "cards": [
    {
      "title": "Corporate & professional websites",
      "text": "Service pages that answer the questions clients actually ask, with proof, credentials and people visible before the contact form."
    },
    {
      "title": "Booking, enquiry & e-commerce",
      "text": "Reservations, room availability, event enquiry and retail journeys that hold up on a phone at the moment of decision."
    },
    {
      "title": "Portals & bespoke software",
      "text": "Client portals, case tracking and internal tools that cut the email back-and-forth professional practices live with."
    },
    {
      "title": "Mobile apps & integration",
      "text": "Customer-facing apps and the API work that connects websites to CRM, finance and booking systems."
    }
  ],
  "useKicker": "SIGNS IT IS TIME TO ACT",
  "useTitle": "When the current setup is costing you quiet.",
  "useIntro": "The damage is rarely dramatic — it shows up as fewer enquiries, thinner shortlists and time spent explaining what the site should have.",
  "useCases": [
    {
      "title": "The site undersells the firm",
      "text": "Twenty years of standing in the town, and a homepage that reads like a placeholder. First impressions are decided before the handshake."
    },
    {
      "title": "Enquiries arrive unqualified",
      "text": "The wrong briefs, the wrong budgets, the same basic questions on every call — because the pages never set expectations."
    },
    {
      "title": "Bookings and enquiries hit email",
      "text": "Requests land in an inbox, get forwarded twice and occasionally lost. A structured flow fixes that without new headcount."
    },
    {
      "title": "Admin eats the working week",
      "text": "Diaries, spreadsheets and copied data between systems. Software shaped around the practice gives the hours back."
    }
  ],
  "process": [
    {
      "title": "Discover",
      "text": "Map the audiences, the questions clients ask before buying and what the site must prove to earn a conversation."
    },
    {
      "title": "Structure",
      "text": "Plan pages, messaging order and internal links so every service, sector and location has a clear home."
    },
    {
      "title": "Design",
      "text": "Design around reading, comparison and action — accessible, fast and consistent with the reputation the brand already holds."
    },
    {
      "title": "Build & measure",
      "text": "Launch with analytics, consent mode and conversion tracking in place, so decisions afterwards rest on evidence."
    }
  ],
  "projects": [
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS design system interface",
      "eyebrow": "DESIGN SYSTEM",
      "title": "OPUS",
      "text": "A component library that keeps a growing product surface consistent as teams and screens multiply."
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
      "href": "/web-app-development",
      "title": "Web application development",
      "text": "Portals, dashboards and browser-based tools for clients, teams and partners."
    },
    {
      "href": "/areas-we-serve",
      "title": "Areas we serve",
      "text": "Coventry, Birmingham, Warwickshire and the surrounding towns served from a local studio."
    }
  ],
  "faqs": [
    {
      "q": "Do you meet Warwick clients in person?",
      "a": "Yes — kick-off, discovery and review sessions can run at your Warwick offices or online. Day-to-day delivery runs remotely with scheduled checkpoints, so senior attention stays on the work rather than the commute."
    },
    {
      "q": "How long does a website project take?",
      "a": "Most brochure and marketing sites land in eight to twelve weeks depending on content readiness. Hospitality and booking journeys take a little longer because availability, deposits and third-party systems all carry moving parts."
    },
    {
      "q": "Can you improve our existing site instead of replacing it?",
      "a": "Often, yes. A content, structure and performance pass on a sound codebase can recover most of the value at a fraction of a rebuild — we will tell you honestly which route fits before anything is committed."
    },
    {
      "q": "Will the site work for a professional practice's compliance needs?",
      "a": "Accessibility, privacy, consent mode and secure form handling are built in from the start, and content patterns are planned so regulated claims, disclaimers and credentials stay consistent across the site."
    }
  ],
  "contactService": "Web design",
  "ctaTitle": "Need the website to reflect the reputation the town already knows?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
