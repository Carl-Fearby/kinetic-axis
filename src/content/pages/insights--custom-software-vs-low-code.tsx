import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'custom-software-vs-low-code',
  kicker:'BESPOKE SOFTWARE / PLATFORM CHOICE',
  title:'Custom software vs low-code: which fits your operation?',
  lead:'Low-code can be the sensible way to solve an internal problem quickly. It becomes expensive when the thing you built quietly turns into a business-critical product. The decision is less about the tool than about how long the workflow will matter.',
  artClass:'mkt-hero-art--phase3-insight-internal-system',
  artLabel:'LOW-CODE / BUILD DECISION',
  artHeading:'Choose the platform around the life of the problem.',
  artFooter:'Speed · Ownership · Limits · Total cost',
  updated:'October 2026',
  answer:[
    'Low-code platforms such as Power Apps, Airtable, Bubble or a configured SaaS product are a good fit for contained workflows, short-lived tools, simple data and modest change. They reduce the cost of the first version considerably.',
    'Custom software becomes the better economic choice when the workflow is central to the business, needs to evolve continuously, carries complex permissions or integrations, or demands performance and user experience a platform cannot provide. The mistake is judging the decision on build cost alone rather than the cost of living with the result.'
  ],
  bands:[
    {label:'CONFIGURE',title:'A contained internal workflow',text:'Use low-code when the process is stable, the users are few, the data is straightforward and the tool is not the product.'},
    {label:'EXTEND',title:'A platform plus targeted engineering',text:'A hybrid route: keep the platform for what it does well, build the workflow, integration or interface it cannot handle properly.'},
    {label:'BUILD',title:'A product the business depends on',text:'Custom software when the workflow is core, must evolve, or needs deeper integration, control and long-term ownership.'},
  ],
  sections:[
    {title:'Where low-code genuinely wins',paragraphs:['Low-code is not a lesser choice by default. For an approval process, a site inspection form, an asset register or a short-lived campaign tool, a configured platform can deliver useful software in days rather than months.','It also moves some of the maintenance burden to the vendor. Updates, hosting and basic security are handled for you, and a non-developer can often make small changes without a release cycle. When those advantages match the problem, choosing custom software can be a vanity decision.'],bullets:['The workflow is well understood and unlikely to change much','The number of users, records and integrations is modest','The tool supports internal operations rather than customer experience','The platform is not expected to become a product you sell']},
    {title:'Where the platform starts to cost more',paragraphs:['Platform limits rarely announce themselves. They accumulate. A simple form gains a second approval step, then a third. A report needs data from another system. A customer-facing portal needs to look and behave like the brand rather than the template.','Each of those changes is possible, but the workarounds multiply: duplicate data, brittle automations, per-user licensing that grows with adoption, and interfaces that cannot be made accessible or fast enough. The licence is rarely the expensive part; the friction and workarounds around it are.'],bullets:['Workarounds and duplicate sources of truth','Per-user or per-record costs that scale with success','Limited control over performance, accessibility and interface quality','Vendor roadmap and pricing changes you do not control','Difficult export or exit if the platform stops fitting']},
    {title:'The total cost of ownership argument',paragraphs:['A low-code build often wins on year one cost. A custom build often wins on year three, but only if the workflow is important enough to justify the investment. If the process changes every six months, a platform that lets operations adapt it may still be cheaper overall.','The useful comparison is not licence versus development days. It is the cost of building, changing, integrating, supporting and eventually replacing each option over the period the workflow will exist.'],bullets:['How often the workflow is expected to change','Who will make those changes and at what cost','Which integrations are essential versus nice to have','What happens to data and access if the platform is replaced']},
    {title:'Questions that usually settle the decision',paragraphs:['Start with the role of the workflow, not the technology. If it is how the business earns money, serves customers or meets a regulatory obligation, it probably deserves software designed around it. If it is an internal convenience that could be replaced without much disruption, a platform is often sufficient.','The second question is change. Custom software is a commitment to owning a product: design, engineering, hosting, support and a roadmap. That is worthwhile when the product is important and expected to evolve. It is a burden when the problem was always going to be temporary.'],bullets:['Would a week of downtime stop the business?','Does the interface need to meet a brand, accessibility or performance standard?','Are there integrations the platform cannot support cleanly?','Will this still be running in three to five years?','Do we want to own the roadmap, or follow a vendor\'s?']},
    {title:'A hybrid route is often the honest answer',paragraphs:['The choice is not always binary. Many sensible architectures keep a low-code or SaaS platform for the parts it handles well — workflow automation, simple data collection, an established CRM — and build the specific operational or customer-facing layer that the platform cannot do properly.','That keeps the first release cheap where cheapness is safe, and puts engineering effort where it changes the experience or protects the business. The important thing is to make the boundary explicit so data ownership does not drift into ambiguity later.'],bullets:['Keep the platform for stable, internal, low-differentiation work','Build the customer experience and core operational logic','Integrate through a clear API rather than copying data between tools','Document which system owns each record from the start']},
  ],
  related:[
    {href:'/bespoke-software-development',title:'Bespoke software development',text:'How we scope and build software around a workflow the business actually depends on.'},
    {href:'/internal-business-systems',title:'Internal business systems',text:'Operational tools for roles, approvals, data and reporting.'},
    {href:'/workflow-automation-software',title:'Workflow automation software',text:'Reduce repeated admin and connect the steps around a process.'},
  ],
  faqs:[
    {q:'Is low-code always cheaper than custom software?',a:'It is usually cheaper to build the first version. It is not always cheaper over the life of the workflow, particularly when licences scale with users, workarounds accumulate or the interface becomes customer-facing.'},
    {q:'Can low-code be replaced by custom software later?',a:'Yes, but the cost depends on how well the data model and integrations were documented. Platforms that allow clean export make the transition much easier than those that keep logic inside proprietary configuration.'},
    {q:'What if we only need a small internal tool?',a:'A small, stable internal tool is often a good fit for low-code. Custom software is harder to justify when the workflow is contained, low-risk and unlikely to become part of the customer experience.'},
    {q:'Does custom software mean we are locked in to one developer?',a:'It should not. A well-run project includes documentation, source control, environment setup and a handover plan so another team can maintain the product. Proprietary lock-in is a delivery failure, not an inevitable feature of custom software.'},
  ],
  contactService:'Bespoke software development',
  ctaTitle:'Weighing up a low-code tool against a purpose-built system?',
  ctaText:'Bring the workflow and the constraints. We will tell you honestly whether a platform is sufficient or whether engineering effort would earn its place.',
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
