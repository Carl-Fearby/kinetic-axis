import { CapabilityServicePage, type CapabilityPageData } from '../../components/CapabilityServicePage';
const data: CapabilityPageData = {
  kicker:'DIGITAL PRODUCT DEVELOPMENT', title:'From idea to working', accent:'digital product.',
  lead:'We turn ambitious ideas into useful digital products — bringing product definition, UX, application engineering, APIs and launch thinking into one connected process.',
  artClass:'mkt-hero-art--v08', artLabel:'PRODUCT / END TO END', artHeading:'Idea. Experience. Engineering. Launch.', artFooter:'Discovery · UX · Applications · APIs · Delivery',
  introKicker:'ONE CONNECTED PRODUCT TEAM', introTitle:'More than a front end and more than a build.',
  introCopy:['A successful digital product is a connected system of decisions. The customer experience, operational workflow, data model, integrations and deployment all influence one another. We bring those conversations together rather than handing them between disconnected disciplines.','That makes this a strong fit for founders, product teams and organisations creating a new digital service, modernising an existing platform or turning a manual process into a product people can actually use.'],
  cards:[
    {title:'Product definition',text:'Clarify the problem, audience, outcomes and first useful release before unnecessary features are committed.'},
    {title:'UX & interface design',text:'Shape journeys, screens and interaction patterns around the tasks people genuinely need to complete.'},
    {title:'Application engineering',text:'Build responsive front ends, APIs, data models and product logic as one maintainable system.'},
    {title:'Launch & evolution',text:'Prepare the product for real use, measure what matters and create a foundation that can continue to grow.'},
  ],
  process:[
    {title:'Discover',text:'Understand the opportunity, users, workflow and commercial constraints.'},
    {title:'Define',text:'Prioritise the product, architecture and first release around measurable value.'},
    {title:'Design & build',text:'Create the experience and engineer the systems behind it in parallel.'},
    {title:'Launch & evolve',text:'Release, observe real usage and improve the product with evidence.'},
  ],
  projects:[
    {href:'/projects/pace',image:'/assets/project-pace.jpg',alt:'Pace Venues project artwork',eyebrow:'CONNECTED PRODUCT',title:'Pace Venues',text:'Guest mobile app, bookings, rewards and venue operations.'},
    {href:'/projects/opus',image:'/assets/project-opus.jpg',alt:'OPUS React project artwork',eyebrow:'PRODUCT SYSTEM',title:'OPUS React',text:'Reusable product UI engineered as a coherent design system.'},
  ],
  related:[
    {href:"/saas-product-development",title:"SaaS product development",text:"Shape a subscription or multi-tenant product from first release onward."},
    {href:"/white-label-app-development",title:"White-label app development",text:"Design a shared product core that can support several branded experiences."},
    {href:"/business-software-development",title:"Business software development",text:"Turn operational needs into a maintainable product built around the business."},
  ],
  faqs:[
    {q:'Can you start with an early-stage idea?',a:'Yes. Product definition is often most valuable before a long feature list exists. We can help turn the idea into a prioritised, testable first product.'},
    {q:'Can you build the customer experience and the back office?',a:'Yes. Many useful products need both. We design the public-facing journey and the operational tools behind it as parts of the same system.'},
    {q:'Do you work with existing platforms too?',a:'Yes. We can extend, modernise or reframe an existing product where the current experience, architecture or workflows are holding it back.'},
  ], contactService:'Digital product development'
};
export default function PageContent(){return <CapabilityServicePage data={data}/>}
