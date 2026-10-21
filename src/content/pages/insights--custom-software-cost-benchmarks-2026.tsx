import { InsightArticlePage, type InsightArticleData } from '../../components/InsightArticlePage';

const data: InsightArticleData = {
  slug:'custom-software-cost-benchmarks-2026',
  kicker:'RESEARCH / SOFTWARE BUDGETS',
  title:'UK custom software cost: what 23,040 scenarios show',
  lead:'A transparent scenario analysis of the Kinetic Axis estimator. We ran every combination of project area, capability, starting point and delivery expectation through the published scoring model to see where the budget bands actually fall — and which decisions move them.',
  artClass:'mkt-hero-art--phase3-insight-internal-system',
  artLabel:'RESEARCH / COST BENCHMARKS',
  artHeading:'Where the budget actually moves.',
  artFooter:'23,040 scenarios · 5 bands · 1 model',
  updated:'October 2026',
  answer:[
    'Across 23,040 modelled combinations, 43.8% land in the £35k–£60k band and 38.2% in £20k–£35k. Only 1.3% land at £5k–£10k and 6.9% reach £60k+. The median scenario is £35k–£60k.',
    'The largest shift is not project type on its own. Moving from three selected capabilities to four takes the share of scenarios at £35k or above from 27.3% to 51.6%. A legacy starting point or a premium delivery expectation moves the same scope up again.',
    'This is a model of the estimator, not a survey of invoices or a market average. It is useful for framing scope and spotting which decisions change the shape of a budget. It is not a substitute for a scoped quotation.'
  ],
  bands:[
    {label:'1.3% OF SCENARIOS',title:'£5k–£10k',text:'A narrow, contained first release. Rare in the model because most project areas start above this band before capabilities are added.'},
    {label:'9.8% OF SCENARIOS',title:'£10k–£20k',text:'A defined small build: one primary workflow, limited roles and few integrations or migration demands.'},
    {label:'38.2% OF SCENARIOS',title:'£20k–£35k',text:'The operational middle. Several roles or workflows, some integration, and a first release that has to work in daily use.'},
    {label:'43.8% OF SCENARIOS',title:'£35k–£60k',text:'The largest cluster. Multi-workflow products, data migration, integrations and a production interface with more moving parts.'},
    {label:'6.9% OF SCENARIOS',title:'£60k+',text:'The complex tail: large or phased programmes, deep integration, significant migration or a broad customer-facing product.'},
  ],
  sections:[
    {
      title:'What this analysis is — and is not',
      paragraphs:[
        'The Kinetic Axis project estimator uses a simple, published scoring model. A project area sets a base complexity score. Each selected capability adds points. A legacy starting point adds two, a premium delivery expectation adds two, and a prototype expectation subtracts three. The total maps to one of five planning bands.',
        'To test the model rather than a handful of examples, we enumerated every combination: 10 project areas × 256 capability sets × 3 starting points × 3 delivery expectations. That produces 23,040 distinct scenarios. Every scenario is reproducible in the estimator by selecting the same inputs.',
        'This is not a survey of client invoices, a regional rate card or a claim about what the market charges. It is an analysis of how one transparent planning model behaves when scope changes. The value is in the relative movement between scenarios, not in treating any single band as a quote.'
      ],
      bullets:[
        'No client data, confidential briefs or individual estimates were used',
        'The model excludes VAT, third-party licences, hosting, support and internal client time',
        'The bands are deliberately broad planning ranges, not priced proposals',
        'The analysis is deterministic: the same inputs always produce the same band'
      ]
    },
    {
      title:'Where the scenarios land',
      paragraphs:[
        'The distribution is concentrated in the middle. The £35k–£60k band is the largest single group at 43.8%, followed by £20k–£35k at 38.2%. Together, those two bands account for 82.0% of all scenarios.',
        'The lower bands are much thinner than buyers often expect. Only 1.3% of combinations land at £5k–£10k and 9.8% at £10k–£20k. That does not mean small projects are impossible; it means the model reaches those bands only when the project area, capability set and delivery expectation are all restrained.',
        'At the other end, 6.9% reach £60k+. Those scenarios tend to combine a complex project area, most capabilities and either a legacy starting point or a premium delivery expectation.'
      ],
      table:{
        caption:'Distribution of 23,040 estimator scenarios across the five planning bands',
        columns:['Indicative band','Scenarios','Share'],
        rows:[
          ['£5k–£10k','294','1.3%'],
          ['£10k–£20k','2,256','9.8%'],
          ['£20k–£35k','8,797','38.2%'],
          ['£35k–£60k','10,095','43.8%'],
          ['£60k+','1,598','6.9%']
        ]
      }
    },
    {
      title:'Project area changes the starting point',
      paragraphs:[
        'The project area sets the first assumption. A website or a design-system engagement starts with fewer complexity points than a bespoke internal system or a mobile product. That is why the median website scenario sits a band below the median bespoke-software scenario.',
        'The more useful number is the share of scenarios at £35k or above. A website still reaches that band in 19.9% of combinations, usually when several capabilities and a premium expectation are added. Bespoke software, mobile and SaaS reach it in 68.5% of combinations — not because every project costs that much, but because their starting point is higher and the model has less room to stay low.',
        'Treat the median as a starting assumption, not a verdict. A tightly scoped web application can sit in a lower band; a website with extensive integrations and migration can sit in a higher one.'
      ],
      table:{
        caption:'Median band and share at £35k+ by project area',
        columns:['Project area','Median band','Share at £35k+'],
        rows:[
          ['Website / web design','£20k–£35k','19.9%'],
          ['Web application / portal / dashboard','£35k–£60k','58.9%'],
          ['Bespoke software / internal systems','£35k–£60k','68.5%'],
          ['Mobile application','£35k–£60k','68.5%'],
          ['Digital product / SaaS','£35k–£60k','68.5%'],
          ['Ecommerce / marketplace / loyalty','£35k–£60k','58.9%'],
          ['API / systems integration / payments','£20k–£35k','37.8%'],
          ['UI/UX / design systems / branding','£20k–£35k','29.0%'],
          ['Improve or modernise an existing product','£20k–£35k','48.8%'],
          ['Something else','£20k–£35k','48.8%']
        ]
      }
    },
    {
      title:'Capabilities stack faster than the first three suggest',
      paragraphs:[
        'The clearest pattern in the analysis is the capability count. With zero to three selected capabilities, the median scenario stays at £20k–£35k. At four capabilities it moves to £35k–£60k, and at seven or eight the median reaches £60k+.',
        'This is not because each capability is individually expensive. It is because the bands are five points wide and most capabilities add two points. The fourth selection is often the one that crosses a boundary. In the model, the share of scenarios at £35k+ jumps from 27.3% with three capabilities to 51.6% with four.',
        'That has a practical implication for scoping. A first release with accounts, an admin workspace, reporting and one integration is already a four-capability product. If the budget assumption was built around two capabilities, the gap is not a negotiation tactic; it is a different amount of work.'
      ],
      table:{
        caption:'Median band and share at £35k+ by number of selected capabilities',
        columns:['Capabilities selected','Median band','Share at £35k+'],
        rows:[
          ['0','£20k–£35k','0.0%'],
          ['1','£20k–£35k','0.4%'],
          ['2','£20k–£35k','7.7%'],
          ['3','£20k–£35k','27.3%'],
          ['4','£35k–£60k','51.6%'],
          ['5','£35k–£60k','74.9%'],
          ['6','£35k–£60k','91.3%'],
          ['7','£60k+','97.8%'],
          ['8','£60k+','100.0%']
        ]
      }
    },
    {
      title:'The same scope can move a band on delivery expectation alone',
      paragraphs:[
        'Delivery expectation is not a cosmetic choice. In the model, a prototype expectation subtracts three points and a premium expectation adds two. That five-point spread is the width of a whole band, so the same project area and capability set can land in different bands without any change in feature list.',
        'The result is visible in the distribution. Prototype scenarios have a median of £20k–£35k and only 22.4% reach £35k+. Production-ready scenarios have a median of £35k–£60k and 54.5% reach £35k+. Premium scenarios reach £35k+ in 74.8% of cases and £60k+ in 15.2%.',
        'Starting point has a similar effect. An existing product or legacy system adds two points, taking the median from £20k–£35k to £35k–£60k and the share at £35k+ from 44.4% to 63.6%. That reflects the work of understanding, protecting and migrating something that already exists — not simply rewriting the same screens.'
      ],
      table:{
        caption:'Median band and share at £35k+ by delivery expectation',
        columns:['Delivery expectation','Median band','Share at £35k+'],
        rows:[
          ['Prototype / proof of concept','£20k–£35k','22.4%'],
          ['Production-ready','£35k–£60k','54.5%'],
          ['Premium / highly polished','£35k–£60k','74.8%']
        ]
      }
    },
    {
      title:'What the model cannot tell you',
      paragraphs:[
        'A scenario analysis is only as good as its assumptions. This model does not know the client, the team, the risk, the quality of the existing data or how quickly decisions will be made. It does not include VAT, cloud hosting, third-party licences, ongoing support or the client-side time needed to define and test the product.',
        'It also does not adjust for region, sector or the day rate of a particular supplier. Two studios can quote differently for the same scope because of seniority mix, delivery model, margin and risk. The bands are a way to compare the shape of a project, not a way to declare one quote correct.',
        'The honest use of the analysis is to ask better questions: how many capabilities are genuinely in the first release, what already exists, how polished does it need to be, and what would have to be true for the project to fit a lower band? Those questions are more useful than arguing over a single number.'
      ],
      bullets:[
        'It is not a survey of what UK businesses actually paid',
        'It is not a substitute for discovery, technical review or a scoped proposal',
        'It does not include VAT, hosting, licences, support or internal client costs',
        'It does not account for sector-specific regulation or integration complexity outside the selected capabilities'
      ]
    },
    {
      title:'How to use the bands in a budget conversation',
      paragraphs:[
        'Start with the project area, then list the capabilities that must be in the first release rather than the full eventual product. Count them honestly. If the list reaches four or more, expect the conversation to move into the £35k–£60k band unless the scope is deliberately reduced.',
        'Then separate the starting point from the ambition. A legacy system adds work before the new product exists. A premium expectation adds design, testing and polish across the whole product. Both are legitimate choices; neither is free.',
        'Finally, use the estimator to test two or three versions of the scope rather than one. A first release that proves the core workflow may be a better investment than a broader product that takes longer to reach users. The bands are most useful when they help make that trade-off explicit.'
      ],
      bullets:[
        'List must-have capabilities separately from later-phase ideas',
        'Decide whether the first release is a prototype, a production tool or a premium product',
        'Account for migration and integration as real work, not background tasks',
        'Ask which single capability could move out of the first release without weakening the test',
        'Treat the output as a planning range and validate it with a scoped conversation'
      ]
    }
  ],
  related:[
    {href:'/project-estimator',title:'Project cost estimator',text:'Run your own combination through the model and see which band it lands in.'},
    {href:'/insights/custom-web-app-cost-uk',title:'Custom web app cost in the UK',text:'The workflows, roles, integrations and data decisions that shape a web app budget.'},
    {href:'/insights/bespoke-software-development-cost',title:'Bespoke software development cost',text:'How workflow depth, users, migration and integration change a bespoke build.'},
    {href:'/bespoke-software-development',title:'Bespoke software development',text:'How we scope and deliver software around a workflow the business depends on.'}
  ],
  faqs:[
    {q:'Is this based on real client projects or invoices?',a:'No. It is a scenario analysis of the published estimator model. No client data, confidential briefs or individual estimates were used. The numbers describe how the model behaves, not what a particular client paid.'},
    {q:'Why 23,040 scenarios?',a:'The model has 10 project areas, 8 optional capabilities, 3 starting points and 3 delivery expectations. Enumerating every combination gives 10 × 2^8 × 3 × 3 = 23,040 scenarios.'},
    {q:'Does the band include VAT, hosting, licences or support?',a:'No. The bands describe indicative build scope only. VAT, cloud hosting, third-party licences, ongoing support and client-side time are separate considerations.'},
    {q:'Why is £35k–£60k the largest band?',a:'It reflects the model’s base scores, capability weights and band boundaries. It is not a claim that most UK projects cost that amount. A different model, rate card or scope would produce a different distribution.'},
    {q:'Can I reproduce the analysis?',a:'Yes. The estimator uses the same scoring model. Select a project area, capability set, starting point and delivery expectation and it will return the corresponding band.'},
    {q:'Does location change the estimate?',a:'The model does not apply a regional rate adjustment. It is a UK-wide planning range. Local supplier rates, seniority mix and delivery model can all change a real quotation.'}
  ],
  contactService:'Bespoke software development',
  ctaTitle:'Want to test your own scope against the model?',
  ctaText:'Bring the first-release capabilities, the starting point and the delivery expectation. We will use the range as a starting point for a proper scoping conversation.',
};

export default function PageContent(){return <InsightArticlePage data={data}/>;}
