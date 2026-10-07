import {listLeads} from './lead-store.mjs';
import {readFile,readdir} from 'node:fs/promises';
import {dirname,basename,join} from 'node:path';
import {gunzipSync} from 'node:zlib';

async function linesFromRotatedLog(logPath){
  let files=[];
  try{
    files=(await readdir(dirname(logPath)))
      .filter(name=>name===basename(logPath)||name.startsWith(basename(logPath)+'.'))
      .map(name=>join(dirname(logPath),name));
  }catch(err){if(err?.code!=='ENOENT')throw err;}
  const lines=[];
  for(const file of files){
    let buffer;try{buffer=await readFile(file);}catch{continue;}
    if(file.endsWith('.gz')){try{buffer=gunzipSync(buffer);}catch{continue;}}
    lines.push(...buffer.toString('utf8').split(/\n+/).filter(Boolean));
  }
  return lines;
}

const inc=(map,key,n=1)=>{if(key)map.set(key,(map.get(key)||0)+n);};
const top=(map,limit=12)=>[...map.entries()].sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([label,value])=>({label,value}));
const rate=(a,b)=>b?Math.round((a/b)*1000)/10:0;
const parseExperimentContext=value=>String(value||'').split(';').map(pair=>pair.split('=',2)).filter(parts=>parts.length===2&&parts[0]&&parts[1]).map(([experiment,variant])=>({experiment,variant}));

export async function buildGrowthSummary({days=30,analyticsLog,leadsLog,pipelineLog}){
  const safeDays=Math.max(1,Math.min(365,Number(days)||30));
  const since=Date.now()-safeDays*24*60*60*1000;
  const events=new Map(),pages=new Map(),origins=new Map(),projectTypes=new Map(),sources=new Map(),campaigns=new Map(),leadSources=new Map(),leadOrigins=new Map(),leadRoutes=new Map(),landingPages=new Map(),daily=new Map();
  const experimentStats=new Map();
  const expRow=(experiment,variant)=>{
    const key=`${experiment}\u0000${variant}`;
    if(!experimentStats.has(key))experimentStats.set(key,{experiment,variant,impressions:0,clicks:0,conversions:0});
    return experimentStats.get(key);
  };
  let rows=0;
  for(const line of await linesFromRotatedLog(analyticsLog)){
    let item;try{item=JSON.parse(line);}catch{continue;}
    const at=Date.parse(item.at||'');if(!Number.isFinite(at)||at<since)continue;
    rows++;inc(events,item.event||'unknown');inc(pages,item.page);inc(origins,item.originPage);inc(sources,item.source);
    if(item.projectTypes)for(const type of String(item.projectTypes).split(' + ').map(x=>x.trim()).filter(Boolean))inc(projectTypes,type);
    if(item.event==='ka_experiment_impression'&&item.experiment&&item.variant)expRow(item.experiment,item.variant).impressions++;
    if(item.event==='ka_experiment_click'&&item.experiment&&item.variant)expRow(item.experiment,item.variant).clicks++;
    if(item.event==='ka_contact_success')for(const pair of parseExperimentContext(item.experiments))expRow(pair.experiment,pair.variant).conversions++;
  }
  let leads=0;
  for(const line of await linesFromRotatedLog(leadsLog)){
    let item;try{item=JSON.parse(line);}catch{continue;}
    const at=Date.parse(item.at||'');if(!Number.isFinite(at)||at<since)continue;
    leads++;
    inc(leadSources,item.firstSource||item.lastSource||item.enquirySource||'direct');
    inc(leadOrigins,item.originPage||'direct');
    inc(leadRoutes,item.enquirySource||'direct');
    inc(landingPages,item.firstLandingPage||item.lastLandingPage||'direct');
    inc(campaigns,item.firstCampaign||item.lastCampaign||'');
    const day=new Date(at).toISOString().slice(0,10);inc(daily,day);
  }
  const ev=name=>events.get(name)||0;
  const plannerStarts=ev('ka_project_planner_start'),plannerComplete=ev('ka_project_planner_complete'),plannerContact=ev('ka_project_planner_contact');
  const estimatorStarts=ev('ka_estimator_start'),estimates=ev('ka_estimator_calculate'),estimatorContact=ev('ka_estimator_contact');
  const formStarts=ev('ka_contact_form_start'),submits=ev('ka_contact_submit'),success=ev('ka_contact_success'),pageViews=ev('ka_page_view');
  const pipeline=pipelineLog?(await listLeads(pipelineLog)).stats:{total:0,new:0,contacted:0,qualified:0,proposal:0,won:0,lost:0,followUpsDue:0};
  const experiments=[...experimentStats.values()].map(item=>({...item,clickRate:rate(item.clicks,item.impressions),conversionRate:rate(item.conversions,item.impressions)})).sort((a,b)=>b.impressions-a.impressions||a.experiment.localeCompare(b.experiment)||a.variant.localeCompare(b.variant));
  return {
    generatedAt:new Date().toISOString(),days:safeDays,
    totals:{events:rows,leads,pageViews,leadRate:rate(leads,pageViews),phoneClicks:ev('ka_phone_click'),whatsappClicks:ev('ka_whatsapp_click'),emailClicks:ev('ka_email_click')},
    planner:{starts:plannerStarts,completed:plannerComplete,contactClicks:plannerContact,completionRate:rate(plannerComplete,plannerStarts),contactRate:rate(plannerContact,plannerStarts)},
    estimator:{starts:estimatorStarts,calculations:estimates,contactClicks:estimatorContact,calculationRate:rate(estimates,estimatorStarts),contactRate:rate(estimatorContact,estimatorStarts)},
    enquiries:{formStarts,submits,success,errors:ev('ka_contact_error'),submitRate:rate(submits,formStarts),successRate:rate(success,submits)},pipeline,
    topPages:top(pages,15),topOriginPages:top(origins,12),projectTypes:top(projectTypes,12),eventSources:top(sources,10),leadSources:top(leadSources,10),leadOrigins:top(leadOrigins,10),leadRoutes:top(leadRoutes,10),landingPages:top(landingPages,12),campaigns:top(campaigns,10),dailyLeads:top(new Map([...daily.entries()].sort((a,b)=>a[0].localeCompare(b[0]))),365),experiments,
  };
}
