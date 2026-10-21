'use client';

import {type FormEvent,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import PROJECT_CATEGORIES from '../../shared/project-categories.json';
import {trackKineticEvent} from '../lib/analytics-client';
import {getAttributionPayload} from '../lib/attribution-client';

type FeatureKey='accounts'|'admin'|'payments'|'integrations'|'migration'|'realtime'|'notifications'|'reporting';

const FEATURES:{key:FeatureKey;label:string;points:number}[]=[
  {key:'accounts',label:'Customer / member accounts',points:2},
  {key:'admin',label:'Admin or staff workspace',points:2},
  {key:'payments',label:'Payments / subscriptions',points:2},
  {key:'integrations',label:'Third-party integrations',points:2},
  {key:'migration',label:'Existing data / content migration',points:2},
  {key:'realtime',label:'Real-time updates / messaging',points:3},
  {key:'notifications',label:'Email / push notifications',points:1},
  {key:'reporting',label:'Reporting / dashboards',points:2},
];

const BASE_POINTS:Record<string,number>={
  'Website / web design':3,
  'Web application / portal / dashboard':7,
  'Bespoke software / internal systems':8,
  'Mobile application':8,
  'Digital product / SaaS':8,
  'Ecommerce / marketplace / loyalty':7,
  'API / systems integration / payments':5,
  'UI/UX / design systems / branding':4,
  'Improve or modernise an existing product':6,
  'Something else':6,
};

const bands=[
  {max:5,standardCost:'£10k–£20k',cost:'£5k–£10k',time:'2–5 weeks',shape:'Focused first release'},
  {max:9,standardCost:'£20k–£40k',cost:'£10k–£20k',time:'4–8 weeks',shape:'Defined product build'},
  {max:14,standardCost:'£40k–£70k',cost:'£20k–£35k',time:'7–12 weeks',shape:'Multi-workflow product'},
  {max:20,standardCost:'£70k–£120k',cost:'£35k–£60k',time:'10–18 weeks',shape:'Complex platform build'},
  {max:999,standardCost:'£120k+',cost:'£60k+',time:'14+ weeks',shape:'Large or phased programme'},
];

const STORAGE_KEY='kineticaxis.projectEstimate.v1';

export function ProjectEstimator(){
  const [projectType,setProjectType]=useState('Web application / portal / dashboard');
  const [features,setFeatures]=useState<FeatureKey[]>(['accounts','admin']);
  const [maturity,setMaturity]=useState('Early idea');
  const [quality,setQuality]=useState('Production-ready');
  const [calculated,setCalculated]=useState(false);
  const [email,setEmail]=useState('');
  const [marketingConsent,setMarketingConsent]=useState(false);
  const [emailState,setEmailState]=useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [emailMessage,setEmailMessage]=useState('');
  const started=useRef(false);
  const emit=(event:string,detail:Record<string,string>={})=>trackKineticEvent({event,page:'project-estimator',...detail});
  const markStarted=()=>{if(started.current)return;started.current=true;emit('ka_estimator_start');};
  const toggle=(key:FeatureKey)=>{markStarted();setFeatures(current=>current.includes(key)?current.filter(x=>x!==key):[...current,key]);setCalculated(false);};
  const score=useMemo(()=>{
    let value=BASE_POINTS[projectType]||6;
    for(const feature of FEATURES)if(features.includes(feature.key))value+=feature.points;
    if(maturity==='Existing product / legacy system')value+=2;
    if(quality==='Premium / highly polished')value+=2;
    if(quality==='Prototype / proof of concept')value=Math.max(2,value-3);
    return value;
  },[projectType,features,maturity,quality]);
  const band=bands.find(item=>score<=item.max) || bands[bands.length-1];
  const brief=useMemo(()=>[
    'KINETIC AXIS — PROJECT ESTIMATE SNAPSHOT','',
    `Project area: ${projectType}`,
    `Current position: ${maturity}`,
    `Delivery expectation: ${quality}`,
    `Likely capabilities: ${features.length?FEATURES.filter(f=>features.includes(f.key)).map(f=>f.label).join(', '):'No additional capabilities selected'}`,'',
    `Indicative build band (standard industry rate): ${band.standardCost}`,
    `Indicative build band (our rate, 50% below standard): ${band.cost}`,
    `Indicative delivery window: ${band.time}`,
    `Likely delivery shape: ${band.shape}`,'',
    'This is an early planning range, not a quotation. The standard industry rate is an indicative comparison for the same scope, not a surveyed market average; our rate is 50% below that reference. Discovery can move the estimate up or down once workflows, data, integrations and release scope are understood.',
  ].join('\n'),[projectType,maturity,quality,features,band]);
  const calculate=()=>{markStarted();setCalculated(true);setEmailState('idle');setEmailMessage('');emit('ka_estimator_calculate',{projectTypes:projectType,kind:band.cost});};
  const emailEstimate=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(emailState==='sending')return;
    const trimmed=email.trim();
    if(!trimmed||trimmed.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(trimmed)){setEmailState('error');setEmailMessage('Enter a valid email address so we can send the estimate.');return;}
    setEmailState('sending');setEmailMessage('');
    try{
      const response=await fetch('/api/estimate-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:trimmed,projectType,features,costBand:band.cost,standardBand:band.standardCost,timeBand:band.time,maturity,quality,marketingConsent,website_url_verify:''})});
      const payload=await response.json().catch(()=>null);
      if(!response.ok||!payload?.ok)throw new Error(payload?.message||'Unable to send the estimate. Please try again.');
      setEmailState('sent');setEmailMessage('Estimate sent. Check your inbox, and the spam folder if it has not arrived.');
      emit('ka_estimator_email',{projectTypes:projectType,kind:band.cost});
    }catch(error){setEmailState('error');setEmailMessage(error instanceof Error?error.message:'Unable to send the estimate. Please try again.');}
  };
  const discuss=()=>{
    const payload={version:1,savedAt:Date.now(),service:projectType,services:[projectType],brief,costBand:band.cost,standardBand:band.standardCost,timeBand:band.time,attribution:getAttributionPayload()};
    try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify(payload));}catch{}
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));}catch{}
    emit('ka_estimator_contact',{projectTypes:projectType,kind:band.cost});
    window.location.assign(`/contact?service=${encodeURIComponent(projectType)}&from=estimator#enquiry-form`);
  };

  return <div className="ka-estimator" onInputCapture={markStarted} onChangeCapture={markStarted}>
    <section className="ka-estimator__panel" aria-labelledby="estimate-project-type">
      <div className="ka-estimator__step"><span>01 / PROJECT</span><h2 id="estimate-project-type">What are you mainly building?</h2></div>
      <div className="ka-estimator__types" role="radiogroup" aria-label="Primary project area">
        {PROJECT_CATEGORIES.map(item=><button key={item.value} type="button" role="radio" aria-checked={projectType===item.value}
          className={projectType===item.value?'is-selected':''} onClick={()=>{markStarted();setProjectType(item.value);setCalculated(false);}}>{item.value}</button>)}
      </div>
    </section>

    <section className="ka-estimator__panel" aria-labelledby="estimate-capabilities">
      <div className="ka-estimator__step"><span>02 / CAPABILITIES</span><h2 id="estimate-capabilities">What might the first useful release need?</h2><p>Choose anything that is likely to matter. This is about complexity, not committing to a final feature list.</p></div>
      <div className="ka-estimator__checks">
        {FEATURES.map(item=><label key={item.key}><input type="checkbox" checked={features.includes(item.key)} onChange={()=>toggle(item.key)}/><span>{item.label}</span></label>)}
      </div>
    </section>

    <section className="ka-estimator__panel ka-estimator__panel--split">
      <label><span>03 / STARTING POINT</span><strong>Where are you today?</strong><select value={maturity} onChange={e=>{setMaturity(e.target.value);setCalculated(false);}}><option>Early idea</option><option>Requirements partly defined</option><option>Existing product / legacy system</option></select></label>
      <label><span>04 / EXPECTATION</span><strong>What level are you aiming for?</strong><select value={quality} onChange={e=>{setQuality(e.target.value);setCalculated(false);}}><option>Prototype / proof of concept</option><option>Production-ready</option><option>Premium / highly polished</option></select></label>
    </section>

    <div className="ka-estimator__calculate"><button type="button" onClick={calculate}>Show my indicative range <span aria-hidden="true">↗</span></button><p>No email required. Nothing is sent unless you ask us to email the estimate or discuss it.</p></div>

    <section className={`ka-estimator__result${calculated?' is-visible':''}`}>
      {calculated && <>
        <div aria-live="polite" aria-atomic="true">
          <div className="ka-estimator__result-head"><div><span>STANDARD INDUSTRY RATE</span><strong className="ka-estimator__standard-rate">{band.standardCost}</strong></div><div><span>OUR RATE · 50% LESS</span><strong>{band.cost}</strong></div><div><span>DELIVERY WINDOW</span><strong>{band.time}</strong></div></div>
          <div className="ka-estimator__result-copy"><h2>{band.shape}</h2><p>This is a planning range rather than a quote. The standard industry rate is an indicative comparison for the same scope, not a surveyed market average; our rate is 50% below that reference. The biggest variables are usually workflow depth, integrations, data migration, platform constraints and what the first release genuinely needs to prove.</p></div>
        </div>
        <div className="ka-estimator__result-actions"><button type="button" onClick={discuss}>Discuss this estimate <span aria-hidden="true">↗</span></button><Link href="/project-planner">Build a detailed project brief <span aria-hidden="true">↗</span></Link></div>
        <form className="ka-estimator__email" onSubmit={emailEstimate} noValidate>
          <div className="ka-estimator__email-head"><span>OPTIONAL</span><h3>Email me this estimate</h3><p>We will send the range above with a short scope checklist you can use to prepare for a conversation.</p></div>
          <div className="ka-estimator__email-row">
            <label htmlFor="estimate-email"><span>Email address</span><input id="estimate-email" name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={event=>{setEmail(event.target.value);if(emailState==='error'){setEmailState('idle');setEmailMessage('');}}} aria-describedby="estimate-email-note" aria-invalid={emailState==='error'?'true':undefined} placeholder="you@company.co.uk"/></label>
            <button type="submit" disabled={emailState==='sending'}>{emailState==='sending'?'Sending…':'Email my estimate'}</button>
          </div>
          <label className="ka-estimator__consent" htmlFor="estimate-marketing"><input id="estimate-marketing" name="marketingConsent" type="checkbox" checked={marketingConsent} onChange={event=>setMarketingConsent(event.target.checked)}/><span>Also send me occasional practical planning notes. I can unsubscribe at any time.</span></label>
          <p className="ka-estimator__email-note" id="estimate-email-note">We use your email to send this estimate and the checklist. We only add you to occasional notes if you tick the box. Read our <Link href="/privacy">privacy policy</Link>.</p>
          {emailMessage&&<p className={`ka-estimator__email-status ka-estimator__email-status--${emailState}`} role={emailState==='error'?'alert':'status'}>{emailMessage}</p>}
        </form>
      </>}
    </section>
  </div>;
}
