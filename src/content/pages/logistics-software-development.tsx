import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "SECTOR / LOGISTICS",
  "title": "Logistics software",
  "accent": "development.",
  "lead": "Software for logistics teams — consignments, routing, driver workflows, proof of delivery, customer tracking and the integrations that keep operations and accounts aligned.",
  "artClass": "mkt-hero-art--v09",
  "artLabel": "LOGISTICS / OPERATIONS",
  "artHeading": "Keep the depot, the driver and the customer on the same status.",
  "artFooter": "Consignments · Routes · Drivers · Delivery",
  "introKicker": "LOGISTICS RUNS ON TIMELY, SHARED STATUS",
  "introTitle": "The expensive problem is rarely the first plan. It is everything that changes after it.",
  "introCopy": [
    "A logistics operation is a chain of handoffs: order, allocation, route, load, delivery, proof and invoice. Most systems capture one or two of those well. The rest are reconstructed from phone calls, message threads and a spreadsheet the transport office keeps open.",
    "A purpose-built operational layer connects those events so the depot, the driver and the customer see the same position. It can sit alongside an existing transport management system or accounts package rather than replacing the parts that already work."
  ],
  "capabilityKicker": "WHERE A CUSTOM SYSTEM HELPS",
  "capabilityTitle": "The operational events that generic tools handle badly.",
  "capabilityIntro": "Start with the handoff creating the most calls, rework or disputed proof.",
  "cards": [
    {
      "title": "Consignments & allocation",
      "text": "Bring orders, collections and deliveries into a single operational view with the status and exceptions that matter."
    },
    {
      "title": "Routing & driver workflows",
      "text": "Give drivers a clear run, stop sequence and capture flow that works on a phone or handheld in poor signal."
    },
    {
      "title": "Proof of delivery & exceptions",
      "text": "Capture signature, photo, timestamp and reason codes at the door so a dispute has evidence rather than a phone call."
    },
    {
      "title": "Customer tracking & notifications",
      "text": "Expose the status customers actually ask about, without the service team copying updates into email."
    }
  ],
  "useKicker": "SIGNS THE OPERATION IS BEING HELD TOGETHER MANUALLY",
  "useTitle": "When the transport office is the integration layer.",
  "useIntro": "These are the patterns where a focused system tends to remove cost and customer friction.",
  "useCases": [
    {
      "title": "Allocation lives in a spreadsheet",
      "text": "Several versions of the run sheet make it unclear which vehicle, stop or time window is current."
    },
    {
      "title": "Proof is scattered",
      "text": "Photos and signatures sit on drivers' phones or in message threads when a customer disputes a delivery."
    },
    {
      "title": "Status is chased by phone",
      "text": "Customer service calls the depot for an update because the system they can see does not reflect the actual journey."
    },
    {
      "title": "Invoicing waits for paperwork",
      "text": "Completed work is re-keyed into accounts days later because delivery evidence and job references are not connected."
    }
  ],
  "process": [
    {
      "title": "Map the journey",
      "text": "Follow a consignment from order through allocation, loading, delivery, exception and invoice."
    },
    {
      "title": "Define the event model",
      "text": "Agree the statuses, timestamps and evidence that every part of the operation will rely on."
    },
    {
      "title": "Design for the driver",
      "text": "Keep capture fast, tolerant of poor signal and clear about what happens when a stop cannot be completed as planned."
    },
    {
      "title": "Connect the office",
      "text": "Feed customer service, accounts and reporting from the same events rather than separate exports."
    }
  ],
  "projects": [
    {
      "href": "/projects/pace",
      "image": "/assets/project-pace.jpg",
      "alt": "Pace Venues operational platform across multiple sites",
      "eyebrow": "MULTI-SITE OPERATIONS",
      "title": "Pace Venues",
      "text": "Operational and customer journeys brought together on one platform across several venues."
    },
    {
      "href": "/projects/opus",
      "image": "/assets/project-opus.jpg",
      "alt": "OPUS React operational data interfaces",
      "eyebrow": "OPERATIONAL INTERFACES",
      "title": "OPUS React",
      "text": "Dense, data-rich interfaces for teams working with records, statuses, exceptions and reporting."
    }
  ],
  "related": [
    {
      "href": "/mobile-app-development",
      "title": "Mobile app development",
      "text": "Driver and field applications designed for real devices and unreliable connectivity."
    },
    {
      "href": "/customer-portal-development",
      "title": "Customer portal development",
      "text": "Give customers a controlled view of orders, delivery status and documents."
    },
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Connect transport, warehouse, accounting and customer systems with clear ownership."
    },
    {
      "href": "/workflow-automation-software",
      "title": "Workflow automation software",
      "text": "Reduce repeated status updates, notifications and exception handling."
    }
  ],
  "faqs": [
    {
      "q": "Are you replacing our transport management system?",
      "a": "Not by default. If a TMS already handles planning and compliance well, the useful work is often the operational gap around it: driver capture, customer visibility, exception evidence or the link to invoicing. We scope the boundary before deciding what to build."
    },
    {
      "q": "Can a driver app work without signal?",
      "a": "It can, but offline behaviour has to be designed deliberately. That means local capture, a queue for uploads and a clear conflict rule when the device reconnects. Assuming a web page will behave like an app is where most field projects fail."
    },
    {
      "q": "Can customers track their own deliveries?",
      "a": "Yes. A customer-facing view can expose the statuses and evidence you choose, with appropriate access control. The important decision is which events are safe and useful to publish rather than exposing the whole internal model."
    },
    {
      "q": "Can it integrate with our accounts package?",
      "a": "Where there is a usable API or import route, yes. Delivery evidence and job references should flow with the invoice so finance is not reconciling paperwork against a ledger."
    },
    {
      "q": "Do you work with operators outside the Midlands?",
      "a": "Yes. Discovery and delivery can run remotely, with on-site sessions where they add value. The studio is based in Warwickshire and works with organisations across the UK."
    }
  ],
  "contactService": "Bespoke software development",
  "ctaTitle": "Where does the transport office become the integration layer?",
  "secondaryCta": {
    "href": "/project-estimator",
    "label": "Estimate the project"
  }
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
