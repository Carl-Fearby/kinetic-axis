import http from 'node:http';
import nodemailer from 'nodemailer';
import {readFileSync,existsSync} from 'node:fs';
import {appendFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {buildGrowthSummary} from './growth-summary.mjs';
import {createLead,getLead,listLeads,updateLead} from './lead-store.mjs';

const PORT = Number(process.env.CONTACT_PORT || 4319);
const HOST = '127.0.0.1';
const ANALYTICS_LOG_PATH = process.env.ANALYTICS_LOG_PATH || '/var/lib/kineticaxis/analytics/events.ndjson';
const LEADS_LOG_PATH = process.env.LEADS_LOG_PATH || '/var/lib/kineticaxis/analytics/leads.ndjson';
const ESTIMATE_LOG_PATH = process.env.ESTIMATE_LOG_PATH || '/var/lib/kineticaxis/analytics/estimates.ndjson';
const LEAD_PIPELINE_LOG_PATH = process.env.LEAD_PIPELINE_LOG_PATH || '/var/lib/kineticaxis/leads/activity.ndjson';

const required = ['SMTP_FROM', 'CONTACT_TO'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error('Missing required environment variables:', missing.join(', '));
  process.exit(1);
}

const transporter = nodemailer.createTransport({sendmail:true,newline:'unix',path:'/usr/sbin/sendmail'});
const contactBuckets=new Map();
const analyticsBuckets=new Map();
const estimateBuckets=new Map();
const CONTACT_LIMIT=5,ANALYTICS_LIMIT=120,ESTIMATE_LIMIT=3,WINDOW=15*60*1000;
const message=(res,status,body)=>{
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  res.end(JSON.stringify(body));
};
const norm=(value,max)=>typeof value==='string'?value.trim().slice(0,max+1):'';
const cleanEventValue=(value,max)=>norm(value,max).replace(/[\r\n\x00-\x1f]/g,' ').replace(/\s+/g,' ').trim();
const emailOK=email=>email.length<=254&&/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);
const categoryCandidates=[new URL('../shared/project-categories.json',import.meta.url),new URL('./project-categories.json',import.meta.url)];
const categoryUrl=categoryCandidates.find(candidate=>existsSync(candidate));
if(!categoryUrl){console.error('Project category configuration is missing.');process.exit(1);}
const projectCategories=JSON.parse(readFileSync(categoryUrl,'utf8'));
const typeAlias=new Map();
for(const category of projectCategories){typeAlias.set(category.value,category.value);for(const alias of category.aliases||[])typeAlias.set(alias,category.value);}
const canonicalType=value=>typeAlias.get(value)||'';
const types=new Set(projectCategories.map(category=>category.value));
const normTypes=value=>{
  const input=Array.isArray(value)?value:[value];
  return [...new Set(input.map(item=>canonicalType(norm(item,100))).filter(Boolean))].slice(0,12);
};

const ESTIMATE_BANDS=new Set(['£5k–£10k','£10k–£20k','£20k–£35k','£35k–£60k','£60k+']);
const ESTIMATE_TIMES=new Set(['2–5 weeks','4–8 weeks','7–12 weeks','10–18 weeks','14+ weeks']);
const ESTIMATE_MATURITY=new Set(['Early idea','Requirements partly defined','Existing product / legacy system']);
const ESTIMATE_QUALITY=new Set(['Prototype / proof of concept','Production-ready','Premium / highly polished']);
const ESTIMATE_FEATURES=new Map([
  ['accounts','Customer / member accounts'],['admin','Admin or staff workspace'],['payments','Payments / subscriptions'],
  ['integrations','Third-party integrations'],['migration','Existing data / content migration'],['realtime','Real-time updates / messaging'],
  ['notifications','Email / push notifications'],['reporting','Reporting / dashboards'],
]);

const ANALYTICS_EVENTS=new Set([
  'ka_page_view','ka_cta_click','ka_phone_click','ka_email_click','ka_whatsapp_click',
  'ka_contact_cta','ka_outbound_click','ka_project_planner_start','ka_project_planner_progress',
  'ka_project_planner_complete','ka_project_planner_contact','ka_project_planner_prefill',
  'ka_contact_form_start','ka_contact_project_type_select','ka_contact_submit','ka_contact_success','ka_contact_error',
  'ka_estimator_start','ka_estimator_calculate','ka_estimator_contact','ka_estimator_email','ka_estimator_prefill','ka_contact_thank_you',
  'ka_experiment_impression','ka_experiment_click'
]);
const takeRateSlot=(buckets,ip,limit,now)=>{
  const recent=(buckets.get(ip)||[]).filter(t=>now-t<WINDOW);
  if(recent.length>=limit){buckets.set(ip,recent);return false;}
  recent.push(now);buckets.set(ip,recent);
  if(buckets.size>6000)for(const [key,times] of buckets)if(times.every(t=>now-t>=WINDOW))buckets.delete(key);
  return true;
};
const recordAnalytics=async payload=>{
  const event=cleanEventValue(payload?.event,64);
  if(!ANALYTICS_EVENTS.has(event))return false;
  const record={
    at:new Date().toISOString(),event,
    page:cleanEventValue(payload?.page,140),source:cleanEventValue(payload?.source,40),originPage:cleanEventValue(payload?.originPage,140),
    projectTypes:cleanEventValue(payload?.projectTypes,600),kind:cleanEventValue(payload?.kind,60),label:cleanEventValue(payload?.label,100),
    host:cleanEventValue(payload?.host,120),step:cleanEventValue(payload?.step,40),campaign:cleanEventValue(payload?.campaign,120),
    attributionSource:cleanEventValue(payload?.attributionSource,100),landingPage:cleanEventValue(payload?.landingPage,160),
    experiment:cleanEventValue(payload?.experiment,80),variant:cleanEventValue(payload?.variant,80),experiments:cleanEventValue(payload?.experiments,500),
  };
  await appendFile(ANALYTICS_LOG_PATH,JSON.stringify(record)+'\n',{encoding:'utf8',mode:0o640});
  return true;
};

const server=http.createServer(async(req,res)=>{
  if(req.url==='/health'&&req.method==='GET')return message(res,200,{ok:true});
  const requestUrl=new URL(req.url||'/',`http://${HOST}`);
  const isContact=requestUrl.pathname==='/api/contact'&&req.method==='POST';
  const isEstimateEmail=requestUrl.pathname==='/api/estimate-email'&&req.method==='POST';
  const isEvents=requestUrl.pathname==='/api/events'&&req.method==='POST';
  const isGrowth=requestUrl.pathname==='/api/growth-summary'&&req.method==='GET';
  const isLeadsGet=requestUrl.pathname==='/api/leads'&&req.method==='GET';
  const isLeadsPost=requestUrl.pathname==='/api/leads'&&req.method==='POST';
  if(!isContact&&!isEstimateEmail&&!isEvents&&!isGrowth&&!isLeadsGet&&!isLeadsPost)return message(res,404,{ok:false,message:'Not found.'});

  if(isGrowth){
    try{
      const summary=await buildGrowthSummary({days:requestUrl.searchParams.get('days')||30,analyticsLog:ANALYTICS_LOG_PATH,leadsLog:LEADS_LOG_PATH,pipelineLog:LEAD_PIPELINE_LOG_PATH,estimatesLog:ESTIMATE_LOG_PATH});
      return message(res,200,{ok:true,summary});
    }catch(err){console.error('Growth summary failed:',err.code||'unknown');return message(res,500,{ok:false,message:'Unable to build growth summary.'});}
  }

  if(isLeadsGet){
    try{
      const leadId=cleanEventValue(requestUrl.searchParams.get('id')||'',40);
      if(leadId){const lead=await getLead(LEAD_PIPELINE_LOG_PATH,leadId);return lead?message(res,200,{ok:true,lead}):message(res,404,{ok:false,message:'Lead not found.'});}
      const result=await listLeads(LEAD_PIPELINE_LOG_PATH,{status:requestUrl.searchParams.get('status')||'',q:requestUrl.searchParams.get('q')||'',source:requestUrl.searchParams.get('source')||'',projectType:requestUrl.searchParams.get('projectType')||'',days:requestUrl.searchParams.get('days')||''});
      return message(res,200,{ok:true,...result});
    }catch(err){console.error('Lead list failed:',err.code||err.message||'unknown');return message(res,500,{ok:false,message:'Unable to load leads.'});}
  }

  const ct=req.headers['content-type']||'';
  if(!ct.toLowerCase().startsWith('application/json'))return message(res,415,{ok:false,message:'Unsupported content type.'});
  const maxBodyBytes=isEvents?4096:isLeadsPost?8192:isEstimateEmail?8000:24000;
  let raw='';
  try{for await(const part of req){raw+=part.toString('utf8');if(Buffer.byteLength(raw,'utf8')>maxBodyBytes)return message(res,413,{ok:false,message:'Your message is too large.'});}}
  catch{return message(res,400,{ok:false,message:'Unable to read submission.'});}
  let data;try{data=JSON.parse(raw);}catch{return message(res,400,{ok:false,message:'Invalid submission.'});}
  if(!data||typeof data!=='object'||Array.isArray(data))return message(res,400,{ok:false,message:'Invalid submission.'});

  if(isEvents){
    const ip=String(req.headers['x-real-ip']||req.socket.remoteAddress||'unknown').slice(0,90);
    if(!takeRateSlot(analyticsBuckets,ip,ANALYTICS_LIMIT,Date.now()))return message(res,202,{ok:true});
    try{const recorded=await recordAnalytics(data);return message(res,recorded?202:400,{ok:recorded});}
    catch(err){console.error('Analytics write failed:',err.code||'unknown');return message(res,202,{ok:true});}
  }

  if(isEstimateEmail){
    const ip=String(req.headers['x-real-ip']||req.socket.remoteAddress||'unknown').slice(0,90);
    if(!takeRateSlot(estimateBuckets,ip,ESTIMATE_LIMIT,Date.now()))return message(res,429,{ok:false,message:'Too many requests. Please try again later.'});
    if(norm(data.website_url_verify,500))return message(res,200,{ok:true});

    const email=norm(data.email,254),projectType=canonicalType(norm(data.projectType,100));
    const costBand=cleanEventValue(data.costBand,30),timeBand=cleanEventValue(data.timeBand,30);
    const maturity=cleanEventValue(data.maturity,60),quality=cleanEventValue(data.quality,60);
    const features=[...new Set((Array.isArray(data.features)?data.features.slice(0,8):[]).map(item=>cleanEventValue(item,40)).filter(key=>ESTIMATE_FEATURES.has(key)))];
    const marketingConsent=data.marketingConsent===true;
    if(!emailOK(email)||!projectType||!types.has(projectType)||!ESTIMATE_BANDS.has(costBand)||!ESTIMATE_TIMES.has(timeBand)||!ESTIMATE_MATURITY.has(maturity)||!ESTIMATE_QUALITY.has(quality)){
      return message(res,400,{ok:false,message:'Please check your email address and estimate details.'});
    }

    const featureLabels=features.map(key=>ESTIMATE_FEATURES.get(key));
    const shape=new Map([['£5k–£10k','Focused first release'],['£10k–£20k','Defined product build'],['£20k–£35k','Multi-workflow product'],['£35k–£60k','Complex platform build'],['£60k+','Large or phased programme']]).get(costBand);
    const checklist=[
      'What must the first release prove, and who will use it?',
      'Which workflow is causing the most delay, rework or manual reconciliation?',
      'What data has to move, and who owns the current source?',
      'Which integrations or external systems are essential on day one?',
      'What constraints matter: devices, connectivity, permissions, compliance or accessibility?',
      'What decision or date is driving the project?'
    ];
    const text=[
      'Hi,','',
      'Here is the estimate you asked us to send from the Kinetic Axis project estimator.','',
      `Project area: ${projectType}`,
      `Starting point: ${maturity}`,
      `Delivery expectation: ${quality}`,
      `Likely capabilities: ${featureLabels.length?featureLabels.join(', '):'No additional capabilities selected'}`,'',
      `Indicative build band: ${costBand}`,
      `Indicative delivery window: ${timeBand}`,
      `Likely delivery shape: ${shape}`,'',
      'A useful scope checklist:',
      ...checklist.map((item,index)=>`${index+1}. ${item}`),'',
      'This is an early planning range, not a quotation. Discovery can move the estimate up or down once workflows, data, integrations and release scope are understood.','',
      "If you'd like to talk it through, reply to this email and we'll pick it up from there.",'',
      'Kinetic Axis',
      '07971 639927',
      'hello@kineticaxisdigital.co.uk', '',
      marketingConsent
        ? "You also asked for occasional practical planning notes. We'll keep them infrequent, and you can unsubscribe at any time by replying to this email."
        : 'You did not opt in to marketing emails. We will only use this address to respond if you contact us about the estimate.'
    ].join('\n');

    try{
      await transporter.sendMail({from:process.env.SMTP_FROM,to:email,replyTo:process.env.CONTACT_TO,subject:'Your Kinetic Axis project estimate',text,disableFileAccess:true,disableUrlAccess:true});
      try{
        const internal=['Estimator email requested','',`Email: ${email}`,`Project area: ${projectType}`,`Starting point: ${maturity}`,`Delivery expectation: ${quality}`,`Likely capabilities: ${featureLabels.length?featureLabels.join(', '):'None selected'}`,`Build band: ${costBand}`,`Delivery window: ${timeBand}`,`Marketing opt-in: ${marketingConsent?'Yes':'No'}`,'','The estimate and scope checklist were emailed to the visitor.'].join('\n');
        await transporter.sendMail({from:process.env.SMTP_FROM,to:process.env.CONTACT_TO,replyTo:{name:'Kinetic Axis estimator',address:email},subject:'Estimator email requested - '+costBand,text:internal,disableFileAccess:true,disableUrlAccess:true});
      }catch(err){console.error('Estimator internal notification failed:',err.code||'unknown');}
      try{
        const record={at:new Date().toISOString(),email,projectType,costBand,timeBand,features,maturity,quality,marketingConsent,marketingConsentAt:marketingConsent?new Date().toISOString():null,consentSource:'project-estimator'};
        await appendFile(ESTIMATE_LOG_PATH,JSON.stringify(record)+'\n',{encoding:'utf8',mode:0o640});
      }catch(err){console.error('Estimator email record failed:',err.code||'unknown');}
      return message(res,200,{ok:true});
    }catch(err){console.error('Estimator email failed:',err.code||'unknown');return message(res,503,{ok:false,message:'Email delivery is temporarily unavailable. Please try again later.'});}
  }

  if(isLeadsPost){
    try{const lead=await updateLead(LEAD_PIPELINE_LOG_PATH,data);return message(res,200,{ok:true,lead});}
    catch(err){const notFound=String(err?.message||'').includes('not found');return message(res,notFound?404:400,{ok:false,message:err?.message||'Unable to update lead.'});}
  }

  const ip=String(req.headers['x-real-ip']||req.socket.remoteAddress||'unknown').slice(0,90);
  if(!takeRateSlot(contactBuckets,ip,CONTACT_LIMIT,Date.now()))return message(res,429,{ok:false,message:'Too many attempts. Please try again later.'});
  if(norm(data.website_url_verify,500))return message(res,200,{ok:true});

  const name=norm(data.name,120),email=norm(data.email,254),company=norm(data.company,150),projectTypes=normTypes(data.projectType),
    content=norm(data.message,1500),plannerBrief=norm(data.plannerBrief,8000),estimateBrief=norm(data.estimateBrief,5000);
  const enquirySource=cleanEventValue(data.enquirySource,30)||'direct',originPage=cleanEventValue(data.originPage,160)||'direct';
  const experiments=cleanEventValue(data.experiments,500);
  const firstSource=cleanEventValue(data.firstSource,100),firstMedium=cleanEventValue(data.firstMedium,80),firstCampaign=cleanEventValue(data.firstCampaign,120),firstTerm=cleanEventValue(data.firstTerm,120),firstContent=cleanEventValue(data.firstContent,120),firstReferrerHost=cleanEventValue(data.firstReferrerHost,120),firstLandingPage=cleanEventValue(data.firstLandingPage,160),firstCapturedAt=cleanEventValue(data.firstCapturedAt,40);
  const lastSource=cleanEventValue(data.lastSource,100),lastMedium=cleanEventValue(data.lastMedium,80),lastCampaign=cleanEventValue(data.lastCampaign,120),lastTerm=cleanEventValue(data.lastTerm,120),lastContent=cleanEventValue(data.lastContent,120),lastReferrerHost=cleanEventValue(data.lastReferrerHost,120),lastLandingPage=cleanEventValue(data.lastLandingPage,160),lastCapturedAt=cleanEventValue(data.lastCapturedAt,40);
  const attachedBrief=plannerBrief||estimateBrief;
  const messageOK=attachedBrief?(content.length===0||content.length>=15):content.length>=15;
  if(!name||name.length>120||/[\r\n\x00-\x1f]/.test(name)||!emailOK(email)||company.length>150||/[\r\n\x00-\x1f]/.test(company)||!projectTypes.length||projectTypes.some(type=>!types.has(type))||!messageOK||content.length>1500||plannerBrief.length>8000||estimateBrief.length>5000){
    return message(res,400,{ok:false,message:'Please complete all required fields with valid details.'});
  }

  const projectTypeLabel=projectTypes.join(', ');
  const subjectProjectTypes=projectTypes.length<=2?projectTypes.join(' + '):projectTypes.slice(0,2).join(' + ')+' + '+(projectTypes.length-2)+' more';
  const leadId=randomUUID();
  const text=['New Kinetic Axis website enquiry','',`Lead ID: ${leadId}`,'Name: '+name,'Email: '+email,'Organisation: '+(company||'Not given'),(projectTypes.length>1?'Project areas: ':'Project area: ')+projectTypeLabel];
  if(plannerBrief)text.push('','Attached Project Planner brief:','',plannerBrief);
  if(estimateBrief)text.push('','Attached Project Estimator summary:','',estimateBrief);
  text.push('','Additional details:',content||'None provided','','Acquisition context:',`Enquiry route: ${enquirySource}`,`Origin page: ${originPage}`,`First touch: ${firstSource||'direct'} / ${firstMedium||'none'}${firstCampaign?` / ${firstCampaign}`:''}`,`First landing: ${firstLandingPage||'Not captured'}${firstReferrerHost?` / referrer ${firstReferrerHost}`:''}`,`Last touch: ${lastSource||firstSource||'direct'} / ${lastMedium||firstMedium||'none'}${lastCampaign?` / ${lastCampaign}`:''}`,`Last landing: ${lastLandingPage||firstLandingPage||'Not captured'}`,experiments?`Experiment context: ${experiments}`:'','', 'Submitted via '+(process.env.PUBLIC_SITE_URL||'kineticaxisdigital.com'));
  const emailText=text.join('\n');

  try{
    await transporter.sendMail({from:process.env.SMTP_FROM,to:process.env.CONTACT_TO,replyTo:{name,address:email},subject:'Kinetic Axis enquiry - '+subjectProjectTypes,text:emailText,disableFileAccess:true,disableUrlAccess:true});
    try{
      const leadRecord={at:new Date().toISOString(),leadId,enquirySource,originPage,projectTypes,firstSource:firstSource||'direct',firstMedium:firstMedium||'none',firstCampaign,firstTerm,firstContent,firstReferrerHost,firstLandingPage,firstCapturedAt,lastSource:lastSource||firstSource||'direct',lastMedium:lastMedium||firstMedium||'none',lastCampaign,lastTerm,lastContent,lastReferrerHost,lastLandingPage,lastCapturedAt,experiments};
      await appendFile(LEADS_LOG_PATH,JSON.stringify(leadRecord)+'\n',{encoding:'utf8',mode:0o640});
    }catch(err){console.error('Lead attribution write failed:',err.code||'unknown');}
    try{
      await createLead(LEAD_PIPELINE_LOG_PATH,{leadId,name,email,company,projectTypes,enquirySource,originPage,firstSource:firstSource||'direct',firstMedium:firstMedium||'none',firstCampaign,firstLandingPage,firstReferrerHost,lastSource:lastSource||firstSource||'direct',lastMedium:lastMedium||firstMedium||'none',lastCampaign,lastLandingPage,experiments,message:content,plannerBrief,estimateBrief});
    }catch(err){console.error('Lead pipeline write failed:',err.code||err.message||'unknown');}
    try{
      const thanks=['Hi '+name+',','','Thanks for getting in touch with Kinetic Axis. We’ve received your enquiry and will review it in context rather than treat it like a generic lead.','',`Project area${projectTypes.length>1?'s':''}: ${projectTypeLabel}`,plannerBrief?'Project Planner brief: attached to your enquiry':estimateBrief?'Project Estimator summary: attached to your enquiry':'',content?`Additional detail: ${content}`:'','',"We’ll reply by email after we’ve reviewed what you sent.",'',`Reference: ${leadId}`,'','Kinetic Axis','07971 639927','hello@kineticaxisdigital.co.uk'].filter(Boolean).join('\n');
      await transporter.sendMail({from:process.env.SMTP_FROM,to:email,replyTo:process.env.CONTACT_TO,subject:'Thanks — we’ve received your Kinetic Axis enquiry',text:thanks,disableFileAccess:true,disableUrlAccess:true});
    }catch(err){console.error('Customer acknowledgement failed:',err.code||'unknown');}
    return message(res,200,{ok:true,leadId});
  }catch(err){console.error('Mail send failed:',err.code||'unknown');return message(res,503,{ok:false,message:'Email delivery is temporarily unavailable. Please use the email link instead.'});}
});
server.listen(PORT,HOST,()=>console.log(`Kinetic Axis contact API listening on ${HOST}:${PORT}`));
