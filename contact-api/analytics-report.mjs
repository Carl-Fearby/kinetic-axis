import {buildGrowthSummary} from './growth-summary.mjs';

const days=Math.max(1,Math.min(365,Number(process.argv[2]||30)||30));
const analyticsLog=process.env.ANALYTICS_LOG_PATH || '/var/lib/kineticaxis/analytics/events.ndjson';
const leadsLog=process.env.LEADS_LOG_PATH || '/var/lib/kineticaxis/analytics/leads.ndjson';
const summary=await buildGrowthSummary({days,analyticsLog,leadsLog});

const table=(title,items)=>{
  console.log(`\n${title}`);
  if(!items?.length){console.log('  No data yet.');return;}
  const width=Math.max(...items.map(item=>item.label.length),8);
  for(const item of items)console.log(`  ${item.label.padEnd(width)}  ${String(item.value).padStart(5)}`);
};
console.log(`Kinetic Axis growth report — last ${summary.days} day${summary.days===1?'':'s'}`);
console.log(`Events recorded: ${summary.totals.events}`);
console.log(`Leads recorded : ${summary.totals.leads}`);
console.log(`Lead rate      : ${summary.totals.leadRate}% per 100 page views`);
console.log(`\nPlanner funnel`);
console.log(`  Starts             ${String(summary.planner.starts).padStart(5)}`);
console.log(`  Completed          ${String(summary.planner.completed).padStart(5)}   ${summary.planner.completionRate}% of starts`);
console.log(`  Discuss project    ${String(summary.planner.contactClicks).padStart(5)}   ${summary.planner.contactRate}% of starts`);
console.log(`\nEstimator funnel`);
console.log(`  Starts             ${String(summary.estimator.starts).padStart(5)}`);
console.log(`  Ranges shown       ${String(summary.estimator.calculations).padStart(5)}   ${summary.estimator.calculationRate}% of starts`);
console.log(`  Discuss estimate   ${String(summary.estimator.contactClicks).padStart(5)}   ${summary.estimator.contactRate}% of starts`);
console.log(`\nEnquiry funnel`);
console.log(`  Form starts        ${String(summary.enquiries.formStarts).padStart(5)}`);
console.log(`  Submit attempts    ${String(summary.enquiries.submits).padStart(5)}   ${summary.enquiries.submitRate}% of form starts`);
console.log(`  Successful sends   ${String(summary.enquiries.success).padStart(5)}   ${summary.enquiries.successRate}% of submits`);
console.log(`  Errors             ${String(summary.enquiries.errors).padStart(5)}`);
console.log(`\nDirect contact actions`);
console.log(`  Phone clicks       ${String(summary.totals.phoneClicks).padStart(5)}`);
console.log(`  WhatsApp clicks    ${String(summary.totals.whatsappClicks).padStart(5)}`);
console.log(`  Email clicks       ${String(summary.totals.emailClicks).padStart(5)}`);
table('Enquiry routes',summary.leadRoutes);
table('Lead landing pages',summary.landingPages);
table('Lead acquisition sources',summary.leadSources);
table('Lead origin pages',summary.leadOrigins);
table('Campaigns',summary.campaigns);
table('Top project categories',summary.projectTypes);
table('Top enquiry origin pages',summary.topOriginPages);
table('Most viewed routes',summary.topPages);

if(summary.experiments?.length){
  console.log('\nExperiments');
  for(const item of summary.experiments){
    console.log(`  ${item.experiment} / ${item.variant}: ${item.impressions} views · ${item.clicks} clicks (${item.clickRate}%) · ${item.conversions} leads (${item.conversionRate}%)`);
  }
}
