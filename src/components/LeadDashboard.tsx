'use client';

import {useCallback,useEffect,useMemo,useState} from 'react';
import {AdminHeader} from './AdminHeader';

type LeadStatus='New'|'Contacted'|'Qualified'|'Proposal'|'Won'|'Lost';
type LeadSummary={
  leadId:string;createdAt:string;updatedAt:string;status:LeadStatus;followUp:string;
  name:string;email:string;company:string;projectTypes:string[];enquirySource:string;originPage:string;
  firstSource:string;firstMedium:string;firstCampaign:string;firstLandingPage:string;firstReferrerHost:string;
  lastSource:string;lastMedium:string;lastCampaign:string;lastLandingPage:string;experiments:string;
};
type Activity={at:string;type:string;label:string};
type LeadDetail=LeadSummary&{message:string;plannerBrief:string;estimateBrief:string;activity:Activity[];notes:{at:string;note:string}[]};
type Stats={total:number;new:number;contacted:number;qualified:number;proposal:number;won:number;lost:number;followUpsDue:number};
const statuses:LeadStatus[]=['New','Contacted','Qualified','Proposal','Won','Lost'];

const formatDate=(value:string,withTime=false)=>{
  if(!value)return '—';
  const d=new Date(value.length===10?`${value}T12:00:00`:value);
  if(Number.isNaN(d.getTime()))return value;
  return new Intl.DateTimeFormat('en-GB',withTime?{dateStyle:'medium',timeStyle:'short'}:{dateStyle:'medium'}).format(d);
};

function Metric({label,value,emphasis=false}:{label:string;value:number;emphasis?:boolean}){
  return <div className={`ka-leads__metric${emphasis?' ka-leads__metric--alert':''}`}><span>{label}</span><strong>{value}</strong></div>;
}

export function LeadDashboard(){
  const [leads,setLeads]=useState<LeadSummary[]>([]);
  const [stats,setStats]=useState<Stats>({total:0,new:0,contacted:0,qualified:0,proposal:0,won:0,lost:0,followUpsDue:0});
  const [selectedId,setSelectedId]=useState('');
  const [detail,setDetail]=useState<LeadDetail|null>(null);
  const [status,setStatus]=useState('All');
  const [source,setSource]=useState('All');
  const [projectType,setProjectType]=useState('All');
  const [days,setDays]=useState('0');
  const [filterOptions,setFilterOptions]=useState<{sources:string[];projectTypes:string[]}>({sources:[],projectTypes:[]});
  const [query,setQuery]=useState('');
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const [note,setNote]=useState('');
  const [followUp,setFollowUp]=useState('');

  const loadDetail=useCallback(async(id:string)=>{
    if(!id){setDetail(null);return;}
    try{
      const r=await fetch(`/api/leads?id=${encodeURIComponent(id)}`,{headers:{Accept:'application/json'},cache:'no-store'});
      const j=await r.json().catch(()=>null);
      if(!r.ok||!j?.ok)throw new Error(r.status===401?'Your admin login was not accepted.':'Unable to load this lead.');
      setDetail(j.lead);setFollowUp(j.lead.followUp||'');
    }catch(e){setDetail(null);setError(e instanceof Error?e.message:'Unable to load this lead.');}
  },[]);

  const load=useCallback(async(nextStatus=status,nextQuery=query,keepSelection=true,nextSource=source,nextProjectType=projectType,nextDays=days)=>{
    setLoading(true);setError('');
    try{
      const params=new URLSearchParams();if(nextStatus&&nextStatus!=='All')params.set('status',nextStatus);if(nextQuery.trim())params.set('q',nextQuery.trim());if(nextSource&&nextSource!=='All')params.set('source',nextSource);if(nextProjectType&&nextProjectType!=='All')params.set('projectType',nextProjectType);if(nextDays&&nextDays!=='0')params.set('days',nextDays);
      const r=await fetch(`/api/leads${params.size?`?${params}`:''}`,{headers:{Accept:'application/json'},cache:'no-store'});
      const j=await r.json().catch(()=>null);
      if(!r.ok||!j?.ok)throw new Error(r.status===401?'Your admin login was not accepted.':'Unable to load leads.');
      setLeads(j.leads||[]);setStats(j.stats||stats);setFilterOptions(j.filters||{sources:[],projectTypes:[]});
      const stillVisible=keepSelection&&(j.leads||[]).some((lead:LeadSummary)=>lead.leadId===selectedId);
      const id=stillVisible?selectedId:((j.leads||[])[0]?.leadId||'');
      setSelectedId(id);await loadDetail(id);
    }catch(e){setLeads([]);setDetail(null);setError(e instanceof Error?e.message:'Unable to load leads.');}
    finally{setLoading(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status,query,source,projectType,days,selectedId,loadDetail]);

  useEffect(()=>{void load('','',false,'All','All','0')},[]); // eslint-disable-line react-hooks/exhaustive-deps

  const update=useCallback(async(payload:Record<string,string>)=>{
    if(!selectedId)return;
    setSaving(true);setError('');
    try{
      const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({leadId:selectedId,...payload})});
      const j=await r.json().catch(()=>null);if(!r.ok||!j?.ok)throw new Error(j?.message||'Unable to update lead.');
      setDetail(j.lead);setFollowUp(j.lead.followUp||'');setNote('');
      await load(status,query,true,source,projectType,days);
    }catch(e){setError(e instanceof Error?e.message:'Unable to update lead.');}
    finally{setSaving(false);}
  },[selectedId,status,query,source,projectType,days,load]);

  const due=useMemo(()=>detail?.followUp&&detail.followUp<=new Date().toISOString().slice(0,10)&&!['Won','Lost'].includes(detail.status),[detail]);

  return <main id="main-content" className="ka-admin ka-leads" tabIndex={-1}><div className="ka-admin__wrap ka-leads__wrap">
    <AdminHeader active="leads" title="Lead management." description="Turn website enquiries into conversations, proposals and customers without losing the acquisition context that brought them here."/>

    <section className="ka-leads__metrics" aria-label="Lead pipeline summary"><Metric label="All leads" value={stats.total}/><Metric label="New" value={stats.new}/><Metric label="Qualified" value={stats.qualified}/><Metric label="Proposal" value={stats.proposal}/><Metric label="Won" value={stats.won}/><Metric label="Follow-ups due" value={stats.followUpsDue} emphasis={stats.followUpsDue>0}/></section>

    <section className="ka-leads__toolbar"><label>Search<input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')void load(status,query,false,source,projectType,days)}} placeholder="Name, company, email or reference"/></label><label>Status<select value={status} onChange={e=>{setStatus(e.target.value);void load(e.target.value,query,false,source,projectType,days)}}><option>All</option>{statuses.map(item=><option key={item}>{item}</option>)}</select></label><label>Source<select value={source} onChange={e=>{setSource(e.target.value);void load(status,query,false,e.target.value,projectType,days)}}><option>All</option>{filterOptions.sources.map(item=><option key={item}>{item}</option>)}</select></label><label>Service<select value={projectType} onChange={e=>{setProjectType(e.target.value);void load(status,query,false,source,e.target.value,days)}}><option>All</option>{filterOptions.projectTypes.map(item=><option key={item}>{item}</option>)}</select></label><label>Window<select value={days} onChange={e=>{setDays(e.target.value);void load(status,query,false,source,projectType,e.target.value)}}><option value="0">All time</option><option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option><option value="365">365 days</option></select></label><button type="button" onClick={()=>load(status,query,true,source,projectType,days)} disabled={loading}>{loading?'Refreshing…':'Refresh'}</button></section>
    {error&&<p className="ka-leads__error" role="alert">{error}</p>}

    <div className="ka-leads__workspace">
      <section className="ka-leads__list" aria-label="Leads"><div className="ka-leads__section-title"><span>PIPELINE</span><strong>{leads.length} shown</strong></div>{leads.length?leads.map(lead=><button type="button" key={lead.leadId} className={`ka-leads__item${selectedId===lead.leadId?' is-active':''}`} onClick={()=>{setSelectedId(lead.leadId);void loadDetail(lead.leadId)}}><span className={`ka-leads__status ka-leads__status--${lead.status.toLowerCase()}`}>{lead.status}</span><strong>{lead.name}</strong><small>{lead.company||lead.email}</small><div>{lead.projectTypes.slice(0,2).map(type=><i key={type}>{type}</i>)}</div><time>{formatDate(lead.createdAt)}</time>{lead.followUp&&<em className={lead.followUp<=new Date().toISOString().slice(0,10)&&!['Won','Lost'].includes(lead.status)?'is-due':''}>Follow-up {formatDate(lead.followUp)}</em>}</button>):<div className="ka-leads__empty"><strong>No leads match this view.</strong><p>New contact enquiries will appear here automatically after this release is deployed.</p></div>}</section>

      <section className="ka-leads__detail" aria-live="polite">{detail?<>
        <div className="ka-leads__detail-head"><div><span>LEAD / {detail.leadId.slice(0,8).toUpperCase()}</span><h2>{detail.name}</h2><p>{detail.company||'No organisation supplied'} · <a href={`mailto:${detail.email}?subject=${encodeURIComponent('Your Kinetic Axis enquiry')}`}>{detail.email}</a></p></div><span className={`ka-leads__status ka-leads__status--${detail.status.toLowerCase()}`}>{detail.status}</span></div>

        <div className="ka-leads__controls"><label>Status<select value={detail.status} disabled={saving} onChange={e=>void update({action:'status',status:e.target.value})}>{statuses.map(item=><option key={item}>{item}</option>)}</select></label><label>Follow-up<input type="date" value={followUp} onChange={e=>setFollowUp(e.target.value)}/></label><button type="button" disabled={saving||followUp===detail.followUp} onClick={()=>void update({action:'follow_up',followUp})}>Save follow-up</button>{detail.followUp&&<button type="button" className="ka-leads__quiet" disabled={saving} onClick={()=>void update({action:'follow_up',followUp:''})}>Clear</button>}</div>
        {due&&<p className="ka-leads__due">Follow-up is due {formatDate(detail.followUp)}.</p>}

        <div className="ka-leads__facts"><div><span>Project areas</span><p className="ka-leads__pills">{detail.projectTypes.map(type=><b key={type}>{type}</b>)}</p></div><div><span>Enquiry route</span><strong>{detail.enquirySource}</strong></div><div><span>Origin page</span><strong>{detail.originPage}</strong></div><div><span>First touch</span><strong>{detail.firstSource} / {detail.firstMedium}</strong><small>{detail.firstCampaign||detail.firstLandingPage||'Direct / untagged'}</small></div></div>

        {(detail.message||detail.plannerBrief||detail.estimateBrief)&&<section className="ka-leads__brief"><h3>Enquiry context</h3>{detail.message&&<div><span>Additional details</span><p>{detail.message}</p></div>}{detail.plannerBrief&&<details><summary>Project Planner brief</summary><pre>{detail.plannerBrief}</pre></details>}{detail.estimateBrief&&<details><summary>Project Estimator summary</summary><pre>{detail.estimateBrief}</pre></details>}</section>}

        <section className="ka-leads__notes"><div><span>FOLLOW-UP</span><h3>Notes & activity</h3></div><label htmlFor="lead-note">Add a private note</label><textarea id="lead-note" rows={4} maxLength={2000} value={note} onChange={e=>setNote(e.target.value)} placeholder="Call notes, next step, decision maker, proposal context…"/><div className="ka-leads__note-actions"><small>{note.length} / 2,000</small><button type="button" disabled={saving||note.trim().length<2} onClick={()=>void update({action:'note',note})}>Add note</button></div><ol>{detail.activity.map((item,index)=><li key={`${item.at}-${index}`}><time>{formatDate(item.at,true)}</time><strong>{item.type==='note'?'Note':item.type==='status'?'Status':item.type==='follow_up'?'Follow-up':'Lead'}</strong><p>{item.label}</p></li>)}</ol></section>
      </>:<div className="ka-leads__empty ka-leads__empty--detail"><strong>Select a lead</strong><p>Lead details, source, notes and follow-up actions will appear here.</p></div>}</section>
    </div>
    <p className="ka-leads__footnote">Lead records are stored privately on the Kinetic Axis server and are available only through this password-protected admin area. Pipeline records begin with version 1.5.0.</p>
  </div></main>;
}
