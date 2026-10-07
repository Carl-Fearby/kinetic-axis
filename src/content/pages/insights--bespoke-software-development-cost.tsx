import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'bespoke-software-development-cost',
  kicker:'BESPOKE SOFTWARE BUYER GUIDE',
  title:'How much does bespoke software development cost?',
  lead:'Bespoke software is priced around the workflow, users, data and integrations it needs to support. The right question is less “how many features?” and more “how much operational complexity are we asking the product to carry?”',
  artClass:'mkt-hero-art--v02',
  artLabel:'GUIDE / BESPOKE SOFTWARE COST',
  artHeading:'Understand the operation before estimating the build.',
  artFooter:'Workflow · Users · Data · Risk · Integration',
  updated:'October 2026',
  answer:[
    'Small, focused internal tools can begin at a lower five-figure level, while broader operational platforms commonly require mid-to-high five-figure investment and complex business-critical systems can move into six figures.',
    'Those are planning bands, not a rate card. The fastest way to improve accuracy is to map one end-to-end workflow, the people involved and the systems or data it depends on.'
  ],
  bands:[
    {label:'FOCUSED TOOL',title:'One operational problem',text:'A defined workflow for a limited group of users, with modest data and integration requirements.'},
    {label:'BUSINESS SYSTEM',title:'Several teams and workflows',text:'Role-based operations, reporting, integrations and supporting admin tools create a broader product surface.'},
    {label:'CORE PLATFORM',title:'Business-critical software',text:'Complex permissions, migration, multiple integrations, tenancy or operational dependency require more discovery, testing and resilience.'},
  ],
  sections:[
    {title:'Why bespoke software does not have a standard price',paragraphs:['Two systems with the same number of screens can represent completely different engineering problems. One may simply store records; another may coordinate approvals, calculate availability, integrate with external providers and maintain an audit trail.','The cost comes from the behaviour the software must reliably support, not from visual page count alone.'],bullets:['Number and complexity of business workflows','Different roles, permissions and approval rules','Data model, migration and reporting requirements','External services, APIs and authentication','Operational tooling and support requirements','Testing, security and resilience appropriate to the risk']},
    {title:'The cost of replacing manual processes',paragraphs:['A spreadsheet or email-based process can appear simple because people compensate for gaps with experience and judgement. Software has to make many of those hidden rules explicit.','During discovery we look for exceptions, hand-offs, duplicate data entry and decisions that currently depend on individual knowledge. Capturing those details early is one of the best ways to avoid budget surprises later.']},
    {title:'Build versus buy matters to the budget',paragraphs:['Bespoke development is not automatically the right answer. If a mature off-the-shelf product supports the workflow well, buying it can be faster and cheaper.','Custom software becomes more compelling when the business is spending significant time on workarounds, when several tools need to be coordinated, or when the process itself creates competitive or operational value.']},
    {title:'How we would scope a first release',paragraphs:['We would normally begin with the most valuable workflow and identify the users, data, decisions and integrations involved from start to finish. That becomes the backbone of the first release.','Features that do not help complete or validate that workflow can be separated into later phases. The result is a more defensible budget and a product that can start earning evidence sooner.']},
  ],
  related:[
    {href:'/bespoke-software-development',title:'Bespoke software development',text:'Our core service for custom platforms, workflow systems and integrated business software.'},
    {href:'/business-software-development',title:'Business software development',text:'Purpose-built operational systems shaped around teams, data and real business processes.'},
    {href:'/workflow-automation-software',title:'Workflow automation software',text:'Reduce repeated admin and connect the steps that move work through the organisation.'},
  ],
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
