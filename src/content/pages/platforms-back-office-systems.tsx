import { CapabilityServicePage, type CapabilityPageData } from '../../components/CapabilityServicePage';
const data: CapabilityPageData = {
  kicker:'PLATFORMS & BACK-OFFICE SYSTEMS', title:'Powerful tools behind the', accent:'customer experience.',
  lead:'We design and build operational platforms, admin systems and dashboards that make the day-to-day work behind a digital service clearer, faster and easier to manage.',
  artClass:'mkt-hero-art--v09', artLabel:'OPERATIONS / CONTROL', artHeading:'The tools behind the experience.', artFooter:'Dashboards · Workflows · Permissions · Data · Reporting',
  introKicker:'OPERATIONS MATTER', introTitle:'The product customers see is only half the story.',
  introCopy:['Bookings need to be managed. Content needs to change. Availability needs control. Teams need permissions, visibility and a reliable view of what is happening. That operational layer deserves the same care as the customer interface.','We build back-office products around the people using them every day — reducing unnecessary steps, exposing the right information and keeping complex workflows understandable.'],
  cards:[
    {title:'Admin & dashboards',text:'Clear operational views for managing customers, content, availability, settings and day-to-day activity.'},
    {title:'Workflow tools',text:'Purpose-built flows for the real sequence of work rather than forcing teams into generic software.'},
    {title:'Roles & permissions',text:'Different access levels and tenant-aware experiences so the right people can manage the right things.'},
    {title:'Data & reporting',text:'Useful views of operational data, status and performance without turning the product into a spreadsheet.'},
  ],
  process:[
    {title:'Map the work',text:'Understand who does what, where information comes from and what causes friction today.'},
    {title:'Simplify the flow',text:'Remove unnecessary steps and organise the system around meaningful tasks.'},
    {title:'Build for clarity',text:'Create interfaces, permissions and data views that support confident decisions.'},
    {title:'Connect & improve',text:'Integrate surrounding systems and refine the platform as real usage reveals opportunities.'},
  ],
  projects:[
    {href:'/projects/pace',image:'/assets/project-pace.jpg',alt:'Pace Venues project artwork',eyebrow:'VENUE OPERATIONS',title:'Pace Venues',text:'Guest experience paired with a web-based operational back office.'},
    {href:'/projects/opus',image:'/assets/project-opus.jpg',alt:'OPUS React project artwork',eyebrow:'BUSINESS UI',title:'OPUS React',text:'Reusable components for complex product and management interfaces.'},
  ],
  related:[
    {href:"/admin-dashboard-development",title:"Admin dashboard development",text:"Design practical operational interfaces for data, actions and exceptions."},
    {href:"/business-software-development",title:"Business software development",text:"Create a wider platform around workflows, teams and business data."},
    {href:"/booking-system-development",title:"Booking system development",text:"Connect customer reservations to the tools staff use to manage capacity."},
  ],
  faqs:[
    {q:'Can you replace spreadsheets or disconnected tools?',a:'Often, yes. We first map the workflow and data that matter, then decide whether a focused bespoke platform can remove duplication and manual work.'},
    {q:'Can the platform support multiple organisations?',a:'Yes. Multi-tenant or white-label architecture can separate organisations, users, configuration and data while retaining one maintainable product foundation.'},
    {q:'Can staff and customers use the same underlying system?',a:'Yes. A common API and data model can support different interfaces for customers, staff and administrators while keeping the underlying information connected.'},
  ], contactService:'Platforms and back-office systems'
};
export default function PageContent(){return <CapabilityServicePage data={data}/>}
