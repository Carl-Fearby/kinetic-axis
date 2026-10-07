import { CapabilityServicePage, type CapabilityPageData } from '../../components/CapabilityServicePage';
const data: CapabilityPageData = {
  kicker:'API & SYSTEMS INTEGRATION', title:'Make your systems', accent:'work together.',
  lead:'We connect products, services and data through considered APIs and integrations — reducing duplicated work and making information move where it needs to go.',
  artClass:'mkt-hero-art--v10', artLabel:'CONNECTED SYSTEMS / API', artHeading:'One flow across multiple systems.', artFooter:'APIs · Webhooks · Data sync · Authentication · Services',
  introKicker:'CONNECTED BY DESIGN', introTitle:'Integration should remove friction, not create more of it.',
  introCopy:['Modern products rarely exist in isolation. They depend on booking platforms, payment services, identity providers, notifications, content systems or internal data. The challenge is not simply making two endpoints talk — it is deciding what should own the data, how failures are handled and what the user experiences when systems disagree.','We design integrations around reliability and understandable behaviour, with clear boundaries between your product and the external services it depends on.'],
  cards:[
    {title:'API design',text:'Clear interfaces between products, applications and services with sensible responsibilities and predictable contracts.'},
    {title:'Third-party integration',text:'Connect external platforms such as booking, payment, messaging, identity or content services where the product needs them.'},
    {title:'Data synchronisation',text:'Move and reconcile information between systems while considering ownership, timing and failure states.'},
    {title:'Webhooks & automation',text:'Respond to important events and automate follow-up actions without relying on manual intervention.'},
  ],
  process:[
    {title:'Understand ownership',text:'Identify which system is authoritative for each important piece of information.'},
    {title:'Design the contract',text:'Define the requests, responses, events and failure handling before wiring systems together.'},
    {title:'Integrate securely',text:'Implement authentication, validation, rate limits and observability around the connection.'},
    {title:'Test the edges',text:'Exercise retries, unavailable services, partial data and real operational failure modes.'},
  ],
  projects:[
    {href:'/projects/pace',image:'/assets/project-pace.jpg',alt:'Pace Venues project artwork',eyebrow:'CONNECTED HOSPITALITY',title:'Pace Venues',text:'A platform where customer journeys and venue operations depend on connected data.'},
    {href:'/projects/opus',image:'/assets/project-opus.jpg',alt:'OPUS React project artwork',eyebrow:'SYSTEM THINKING',title:'OPUS React',text:'A reusable interface foundation designed for integration into larger applications.'},
  ],
  related:[
    {href:"/workflow-automation-software",title:"Workflow automation software",text:"Use APIs and webhooks to move information through repeatable processes."},
    {href:"/customer-portal-development",title:"Customer portal development",text:"Bring data from existing systems into one clear customer experience."},
    {href:"/legacy-system-modernisation",title:"Legacy system modernisation",text:"Create safer boundaries between established systems and new products."},
  ],
  faqs:[
    {q:'Can you integrate with an existing supplier API?',a:'Yes, where the supplier provides appropriate access and documentation. We can design the product flow around the capabilities and constraints of that API.'},
    {q:'What if the external service is unavailable?',a:'That is part of the design. Good integrations consider timeouts, retries, fallback behaviour, observability and what the user should see when a dependency is temporarily unavailable.'},
    {q:'Can you create an API for our own product?',a:'Yes. We can design and build APIs that support web apps, mobile apps, back-office systems and future integrations from a common product foundation.'},
  ], contactService:'API and systems integration'
};
export default function PageContent(){return <CapabilityServicePage data={data}/>}
