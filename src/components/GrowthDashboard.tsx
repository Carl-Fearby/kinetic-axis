'use client';
import {useCallback,useEffect,useState} from 'react';
import {AdminHeader} from './AdminHeader';

type Entry={label:string;value:number};
type ExperimentResult={experiment:string;variant:string;impressions:number;clicks:number;conversions:number;clickRate:number;conversionRate:number};
type Summary={
  generatedAt:string;days:number;
  totals:{events:number;leads:number;pageViews:number;leadRate:number;phoneClicks:number;whatsappClicks:number;emailClicks:number};
  planner:{starts:number;completed:number;contactClicks:number;completionRate:number;contactRate:number};
  estimator:{starts:number;calculations:number;contactClicks:number;calculationRate:number;contactRate:number;emails:number;emailOptIns:number;emailRate:number};
  enquiries:{formStarts:number;submits:number;success:number;errors:number;submitRate:number;successRate:number};
  pipeline:{total:number;new:number;contacted:number;qualified:number;proposal:number;won:number;lost:number;followUpsDue:number};
  topPages:Entry[];topOriginPages:Entry[];projectTypes:Entry[];leadSources:Entry[];leadOrigins:Entry[];leadRoutes:Entry[];landingPages:Entry[];campaigns:Entry[];experiments:ExperimentResult[];
};

function Stat({label,value,note}:{label:string;value:string|number;note?:string}){return <div className="ka-growth__stat"><span>{label}</span><strong>{value}</strong>{note&&<small>{note}</small>}</div>}
function Table({title,items}:{title:string;items:Entry[]}){return <section className="ka-growth__table"><h2>{title}</h2>{items.length?<ol>{items.map(item=><li key={item.label}><span>{item.label}</span><b>{item.value}</b></li>)}</ol>:<p>No data yet.</p>}</section>}
function ExperimentTable({items}:{items:ExperimentResult[]}){return <section className="ka-growth__experiment"><div className="ka-growth__experiment-head"><div><span>EXPERIMENTS</span><h2>Variant performance</h2></div><p>Session-scoped first-party experiments. Conversion rate is successful enquiries divided by impressions.</p></div>{items.length?<div className="ka-growth__experiment-table" role="table" aria-label="Experiment performance"><div className="ka-growth__experiment-row ka-growth__experiment-row--head" role="row"><b>Experiment</b><b>Variant</b><b>Views</b><b>Clicks</b><b>CTR</b><b>Leads</b><b>Lead rate</b></div>{items.map(item=><div className="ka-growth__experiment-row" role="row" key={`${item.experiment}:${item.variant}`}><span>{item.experiment.replaceAll('_',' ')}</span><strong>{item.variant}</strong><span>{item.impressions}</span><span>{item.clicks}</span><span>{item.clickRate}%</span><span>{item.conversions}</span><span>{item.conversionRate}%</span></div>)}</div>:<p className="ka-growth__experiment-empty">No experiment data yet.</p>}</section>}

export function GrowthDashboard(){
  const [days,setDays]=useState(30);const [summary,setSummary]=useState<Summary|null>(null);const [error,setError]=useState('');const [loading,setLoading]=useState(false);
  const load=useCallback(async(nextDays:number)=>{setLoading(true);setError('');try{const r=await fetch(`/api/growth-summary?days=${nextDays}`,{headers:{Accept:'application/json'},cache:'no-store'});const j=await r.json().catch(()=>null);if(!r.ok||!j?.ok)throw new Error(r.status===401?'Your admin login was not accepted.':'Unable to load the growth summary.');setSummary(j.summary);}catch(e){setSummary(null);setError(e instanceof Error?e.message:'Unable to load dashboard.')}finally{setLoading(false)}},[]);
  useEffect(()=>{void load(30)},[load]);
  return <main id="main-content" className="ka-admin ka-growth" tabIndex={-1}><div className="ka-admin__wrap ka-growth__wrap">
    <AdminHeader active="growth" title="Growth dashboard." description="First-party conversion data only. No form messages, names or email addresses are exposed here."/>
    <section className="ka-growth__login"><label>Window<select value={days} onChange={e=>{const value=Number(e.target.value);setDays(value);void load(value)}}><option value={7}>7 days</option><option value={30}>30 days</option><option value={90}>90 days</option><option value={365}>365 days</option></select></label><button type="button" disabled={loading} onClick={()=>load(days)}>{loading?'Refreshing…':'Refresh'}</button></section>
    {error&&<p className="ka-growth__error" role="alert">{error}</p>}
    {loading&&!summary&&<p className="ka-growth__generated" aria-live="polite">Loading growth data…</p>}
    {summary&&<><section className="ka-growth__stats"><Stat label="Page views" value={summary.totals.pageViews}/><Stat label="Leads" value={summary.totals.leads} note={`${summary.totals.leadRate} per 100 page views`}/><Stat label="Successful enquiries" value={summary.enquiries.success} note={`${summary.enquiries.successRate}% of submit attempts`}/><Stat label="Planner starts" value={summary.planner.starts} note={`${summary.planner.contactRate}% reached Discuss`}/><Stat label="Estimator calculations" value={summary.estimator.calculations} note={`${summary.estimator.contactRate}% clicked Discuss`}/><Stat label="Estimate emails" value={summary.estimator.emails} note={`${summary.estimator.emailOptIns} marketing opt-ins`}/><Stat label="Direct actions" value={summary.totals.phoneClicks+summary.totals.whatsappClicks+summary.totals.emailClicks} note="Phone + WhatsApp + email"/><Stat label="Pipeline new" value={summary.pipeline.new} note={`${summary.pipeline.followUpsDue} follow-ups due`}/></section>
    <section className="ka-growth__funnels"><div><span>PLANNER</span><b>{summary.planner.starts}</b><i>starts</i><b>{summary.planner.completed}</b><i>completed</i><b>{summary.planner.contactClicks}</b><i>discuss clicks</i></div><div><span>ESTIMATOR</span><b>{summary.estimator.starts}</b><i>starts</i><b>{summary.estimator.calculations}</b><i>ranges</i><b>{summary.estimator.emails}</b><i>emailed</i></div><div><span>ENQUIRY</span><b>{summary.enquiries.formStarts}</b><i>form starts</i><b>{summary.enquiries.submits}</b><i>submits</i><b>{summary.enquiries.success}</b><i>sent</i></div></section>
    <ExperimentTable items={summary.experiments}/>
    <section className="ka-growth__tables"><Table title="Enquiry routes" items={summary.leadRoutes}/><Table title="Lead sources" items={summary.leadSources}/><Table title="Lead landing pages" items={summary.landingPages}/><Table title="Lead origin pages" items={summary.leadOrigins}/><Table title="Project categories" items={summary.projectTypes}/><Table title="Most viewed routes" items={summary.topPages}/><Table title="Contact-origin events" items={summary.topOriginPages}/><Table title="Campaigns" items={summary.campaigns}/></section><p className="ka-growth__generated">Generated {new Date(summary.generatedAt).toLocaleString('en-GB')} · last {summary.days} days</p></>}
  </div></main>;
}
