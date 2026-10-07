import { SeoLandingPage, type SeoLandingPageData } from '../../components/SeoLandingPage';

const data: SeoLandingPageData = {
  "parent": {
    "label": "Solutions",
    "href": "/solutions"
  },
  "kicker": "PAYMENT INTEGRATION DEVELOPMENT",
  "title": "Payments that fit",
  "accent": "the product around them.",
  "lead": "Connect payment providers to web apps, mobile products and operational workflows with clear transaction states, error handling and user journeys.",
  "artClass": "mkt-hero-art--v04",
  "artLabel": "PAYMENTS / INTEGRATION",
  "artHeading": "A payment is a workflow, not just a button.",
  "artFooter": "Checkout · Status · Refunds · Webhooks · Reconciliation",
  "introKicker": "CONNECTED TRANSACTIONS",
  "introTitle": "The difficult part is everything that happens around the payment.",
  "introCopy": [
    "A checkout can look simple while the product behind it has to handle authorisation, confirmation, failure, retries, refunds, asynchronous provider events and the operational record of what happened.",
    "We design payment integration as part of the wider workflow. That means the customer interface, backend state and staff-facing tools agree about whether a transaction is pending, complete, failed or reversed."
  ],
  "capabilityKicker": "PAYMENT CAPABILITIES",
  "capabilityTitle": "Keep customer experience and transaction state aligned.",
  "capabilityIntro": "The implementation depends on the payment provider and commercial model, but resilient integrations share the same fundamentals.",
  "cards": [
    {
      "title": "Provider integration",
      "text": "Integrate supported payment APIs and SDKs using the provider model appropriate to the product."
    },
    {
      "title": "Checkout journeys",
      "text": "Keep payment steps clear, responsive and connected to the action the customer is trying to complete."
    },
    {
      "title": "Webhooks & state",
      "text": "Handle asynchronous provider events so the application can reconcile what actually happened after checkout."
    },
    {
      "title": "Refunds & operations",
      "text": "Give authorised staff visibility into payment status, support actions and refund workflows where the provider permits them."
    }
  ],
  "useKicker": "COMMON PAYMENT FLOWS",
  "useTitle": "Where payments become part of a larger product journey.",
  "useIntro": "The transaction should support the workflow rather than forcing users into a disconnected payment experience.",
  "useCases": [
    {
      "title": "Bookings & reservations",
      "text": "Take deposits or full payment while keeping booking and payment states synchronised."
    },
    {
      "title": "Marketplaces",
      "text": "Connect checkout with the marketplace commercial model, provider capabilities and operator workflows."
    },
    {
      "title": "Subscriptions",
      "text": "Support recurring product access where the billing provider and account model need to stay aligned."
    },
    {
      "title": "Customer portals",
      "text": "Allow customers to view balances, pay for services or understand transaction status within a secure account area."
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
  "projects": [],
  "related": [
    {
      "href": "/api-systems-integration",
      "title": "API & systems integration",
      "text": "Design reliable connections between products and external platforms."
    },
    {
      "href": "/booking-system-development",
      "title": "Booking system development",
      "text": "Connect payments to capacity, confirmation and customer booking journeys."
    },
    {
      "href": "/marketplace-development",
      "title": "Marketplace development",
      "text": "Build buying and selling workflows around the wider transaction model."
    }
  ],
  "faqs": [
    {
      "q": "Which payment providers can you integrate with?",
      "a": "It depends on the provider API, SDKs, supported regions and the commercial model. We assess those constraints before committing to an implementation approach."
    },
    {
      "q": "Can a payment integration support refunds?",
      "a": "Potentially, yes. Refund workflows depend on the provider capabilities and the permissions the business wants staff to have."
    },
    {
      "q": "How do you handle payment failures?",
      "a": "The product should distinguish failure, cancellation, pending state and completed payment clearly, then give the user a safe next action rather than assuming every checkout finishes synchronously."
    },
    {
      "q": "Can payment status be shown in a back office?",
      "a": "Yes. Operational interfaces can surface transaction state and relevant provider references so staff can support customers without relying on a separate dashboard for every action."
    }
  ],
  "contactService": "Payment integration development",
  "ctaTitle": "Need payments to behave like part of the product, not a bolt-on?"
};

export default function PageContent(){return <SeoLandingPage data={data}/>;}
