import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'custom-web-app-cost-uk',
  kicker:'WEB APPLICATION BUYER GUIDE',
  title:'How much does a custom web app cost in the UK?',
  lead:'There is no useful single average for a custom web application. Cost follows the number of meaningful workflows, user roles, integrations, data rules and operational risks the product needs to handle.',
  artClass:'mkt-hero-art--v03',
  artLabel:'GUIDE / WEB APPLICATION COST',
  artHeading:'Price the workflow, not the number of screens.',
  artFooter:'Scope · Roles · Data · Integrations · Delivery',
  updated:'October 2026',
  answer:[
    'A focused custom web application is usually a five-figure software project rather than a website-sized purchase. Products with several user roles, complex integrations, payments, migration or multi-tenant architecture can move substantially beyond that.',
    'The most useful estimate comes after the core workflow has been mapped. A short discovery phase can often remove more uncertainty than trying to price a long feature list from assumptions.'
  ],
  bands:[
    {label:'FOCUSED',title:'One clear workflow',text:'A narrow application with a small number of roles and limited integration is the simplest shape to estimate and deliver.'},
    {label:'CONNECTED',title:'Several workflows and systems',text:'Multiple roles, integrations, operational tooling and richer data rules increase design, engineering and testing effort.'},
    {label:'PLATFORM',title:'Multi-tenant or business-critical product',text:'Tenancy, migration, permissions, resilience, complex operations and long-term product needs push the work toward platform-scale investment.'},
  ],
  sections:[
    {title:'What actually drives the cost of a web application?',paragraphs:['Screens are visible, so they are easy to count. They are rarely the best predictor of engineering effort. A simple-looking screen can sit on top of permissions, validation, calculations, integrations and data states that make it expensive to build safely.','When we scope a web application we look at the complete job the product needs to perform, including what happens when the normal journey goes wrong.'],bullets:['How many distinct user roles and permissions are needed','How complex the core workflows and business rules are','Which external APIs or systems must be integrated','Whether existing data needs cleaning or migration','How much back-office and support tooling is required','The level of security, auditability and operational resilience needed']},
    {title:'Why an MVP can still be a serious software project',paragraphs:['MVP should mean the smallest coherent product that can prove something useful. It does not mean shipping a fragile version of every planned feature.','A good first release usually contains fewer complete workflows rather than many partial ones. That approach creates a clearer budget, lowers delivery risk and gives the team better evidence for what deserves investment next.']},
    {title:'Where budgets unexpectedly grow',paragraphs:['Integration and edge cases are two common sources of hidden effort. A third-party API may look straightforward until authentication, rate limits, incomplete data or error recovery need to be handled. Likewise, a workflow that works for the normal case may need considerably more logic once cancellations, overrides, refunds or unusual permissions are included.','Operational tooling is another area that is often underestimated. If staff need to support customers, correct data or manage configuration, those interfaces are part of the product too.']},
    {title:'How to get a more useful estimate',paragraphs:['Start with the outcome and the highest-value user journey. Describe who uses the product, what they are trying to achieve, what information is required and which existing systems are involved.','From there, discovery can turn assumptions into a workflow, identify the risky parts and separate the essential first release from later opportunities. That produces an estimate tied to a product shape rather than a speculative feature list.']},
  ],
  related:[
    {href:'/web-app-development',title:'Web application development',text:'Our core service for browser-based products, portals, dashboards and interactive applications.'},
    {href:'/saas-product-development',title:'SaaS product development',text:'Planning a subscription or multi-tenant product with a roadmap beyond the first release.'},
    {href:'/customer-portal-development',title:'Customer portal development',text:'Secure self-service products built around repeat customer tasks and connected data.'},
  ],
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
