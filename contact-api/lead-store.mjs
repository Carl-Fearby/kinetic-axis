import {appendFile,readFile} from 'node:fs/promises';

export const LEAD_STATUSES=['New','Contacted','Qualified','Proposal','Won','Lost'];

const clean=(value,max=200)=>typeof value==='string'?value.trim().slice(0,max):'';
const validLeadId=value=>/^[0-9a-f-]{36}$/i.test(String(value||''));
const validDate=value=>value===''||/^\d{4}-\d{2}-\d{2}$/.test(value);

async function readEvents(logPath){
  let text='';
  try{text=await readFile(logPath,'utf8');}catch(err){if(err?.code==='ENOENT')return [];throw err;}
  const events=[];
  for(const line of text.split(/\n+/)){
    if(!line)continue;
    try{const item=JSON.parse(line);if(item&&typeof item==='object'&&validLeadId(item.leadId))events.push(item);}catch{}
  }
  return events;
}

async function appendEvent(logPath,event){
  await appendFile(logPath,JSON.stringify({...event,at:new Date().toISOString()})+'\n',{encoding:'utf8',mode:0o640});
}

function aggregate(events){
  const leads=new Map();
  for(const event of events){
    const id=event.leadId;
    if(event.event==='created'){
      leads.set(id,{
        leadId:id,createdAt:event.at,updatedAt:event.at,status:'New',followUp:'',
        name:event.name||'',email:event.email||'',company:event.company||'',projectTypes:Array.isArray(event.projectTypes)?event.projectTypes:[],
        enquirySource:event.enquirySource||'direct',originPage:event.originPage||'direct',
        firstSource:event.firstSource||'direct',firstMedium:event.firstMedium||'none',firstCampaign:event.firstCampaign||'',firstLandingPage:event.firstLandingPage||'',firstReferrerHost:event.firstReferrerHost||'',
        lastSource:event.lastSource||event.firstSource||'direct',lastMedium:event.lastMedium||event.firstMedium||'none',lastCampaign:event.lastCampaign||'',lastLandingPage:event.lastLandingPage||event.firstLandingPage||'',
        experiments:event.experiments||'',message:event.message||'',plannerBrief:event.plannerBrief||'',estimateBrief:event.estimateBrief||'',
        activity:[{at:event.at,type:'created',label:'Lead created'}],notes:[],
      });
      continue;
    }
    const lead=leads.get(id);if(!lead)continue;
    lead.updatedAt=event.at||lead.updatedAt;
    if(event.event==='status'&&LEAD_STATUSES.includes(event.status)){
      lead.status=event.status;
      lead.activity.push({at:event.at,type:'status',label:`Status changed to ${event.status}`});
    }else if(event.event==='follow_up'){
      lead.followUp=event.followUp||'';
      lead.activity.push({at:event.at,type:'follow_up',label:event.followUp?`Follow-up set for ${event.followUp}`:'Follow-up cleared'});
    }else if(event.event==='note'&&event.note){
      const note={at:event.at,note:event.note};lead.notes.push(note);
      lead.activity.push({at:event.at,type:'note',label:event.note});
    }
  }
  for(const lead of leads.values()){
    lead.activity.sort((a,b)=>String(b.at).localeCompare(String(a.at)));
    lead.notes.sort((a,b)=>String(b.at).localeCompare(String(a.at)));
  }
  return leads;
}

export async function createLead(logPath,payload){
  const leadId=clean(payload.leadId,40);
  if(!validLeadId(leadId))throw new Error('Invalid lead id');
  await appendEvent(logPath,{
    event:'created',leadId,
    name:clean(payload.name,120),email:clean(payload.email,254),company:clean(payload.company,150),
    projectTypes:Array.isArray(payload.projectTypes)?payload.projectTypes.map(x=>clean(x,120)).filter(Boolean).slice(0,12):[],
    enquirySource:clean(payload.enquirySource,40)||'direct',originPage:clean(payload.originPage,160)||'direct',
    firstSource:clean(payload.firstSource,100)||'direct',firstMedium:clean(payload.firstMedium,80)||'none',firstCampaign:clean(payload.firstCampaign,120),firstLandingPage:clean(payload.firstLandingPage,160),firstReferrerHost:clean(payload.firstReferrerHost,120),
    lastSource:clean(payload.lastSource,100)||clean(payload.firstSource,100)||'direct',lastMedium:clean(payload.lastMedium,80)||clean(payload.firstMedium,80)||'none',lastCampaign:clean(payload.lastCampaign,120),lastLandingPage:clean(payload.lastLandingPage,160)||clean(payload.firstLandingPage,160),
    experiments:clean(payload.experiments,500),message:clean(payload.message,1500),plannerBrief:clean(payload.plannerBrief,8000),estimateBrief:clean(payload.estimateBrief,5000),
  });
}

export async function listLeads(logPath,{status='',q='',source='',projectType='',days=''}={}){
  const leads=aggregate(await readEvents(logPath));
  const statusFilter=clean(status,30);const query=clean(q,120).toLowerCase();const sourceFilter=clean(source,100);const projectFilter=clean(projectType,120);
  const safeDays=Math.max(0,Math.min(3650,Number(days)||0));const since=safeDays?Date.now()-safeDays*24*60*60*1000:0;
  const rows=[...leads.values()].filter(lead=>{
    if(statusFilter&&statusFilter!=='All'&&lead.status!==statusFilter)return false;
    if(sourceFilter&&sourceFilter!=='All'&&lead.firstSource!==sourceFilter)return false;
    if(projectFilter&&projectFilter!=='All'&&!lead.projectTypes.includes(projectFilter))return false;
    if(since&&Date.parse(lead.createdAt)<since)return false;
    if(!query)return true;
    return [lead.leadId,lead.name,lead.email,lead.company,lead.originPage,lead.firstSource,...lead.projectTypes].join(' ').toLowerCase().includes(query);
  }).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  const today=new Date().toISOString().slice(0,10);
  const stats={total:leads.size,new:0,contacted:0,qualified:0,proposal:0,won:0,lost:0,followUpsDue:0};
  for(const lead of leads.values()){
    const key=lead.status.toLowerCase();if(key in stats)stats[key]++;
    if(lead.followUp&&lead.followUp<=today&&!['Won','Lost'].includes(lead.status))stats.followUpsDue++;
  }
  const sources=[...new Set([...leads.values()].map(lead=>lead.firstSource).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  const projectTypes=[...new Set([...leads.values()].flatMap(lead=>lead.projectTypes).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  return {stats,filters:{sources,projectTypes},leads:rows.map(({message,plannerBrief,estimateBrief,activity,notes,...summary})=>summary)};
}

export async function getLead(logPath,leadId){
  if(!validLeadId(leadId))return null;
  return aggregate(await readEvents(logPath)).get(leadId)||null;
}

export async function updateLead(logPath,payload){
  const leadId=clean(payload?.leadId,40);if(!validLeadId(leadId))throw new Error('Invalid lead id');
  const existing=await getLead(logPath,leadId);if(!existing)throw new Error('Lead not found');
  const action=clean(payload?.action,30);
  if(action==='status'){
    const status=clean(payload?.status,30);if(!LEAD_STATUSES.includes(status))throw new Error('Invalid lead status');
    await appendEvent(logPath,{event:'status',leadId,status});
  }else if(action==='follow_up'){
    const followUp=clean(payload?.followUp,10);if(!validDate(followUp))throw new Error('Invalid follow-up date');
    await appendEvent(logPath,{event:'follow_up',leadId,followUp});
  }else if(action==='note'){
    const note=clean(payload?.note,2000);if(note.length<2)throw new Error('Note is too short');
    await appendEvent(logPath,{event:'note',leadId,note});
  }else throw new Error('Unsupported lead action');
  return getLead(logPath,leadId);
}
