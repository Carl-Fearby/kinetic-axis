'use client';

import {useMemo,useRef,useState} from 'react';
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
  {max:5,cost:'£5k–£10k',time:'2–5 weeks',shape:'Focused first release'},
  {max:9,cost:'£10k–£20k',time:'4–8 weeks',shape:'Defined product build'},
  {max:14,cost:'£20k–£35k',time:'7–12 weeks',shape:'Multi-workflow product'},
  {max:20,cost:'£35k–£60k',time:'10–18 weeks',shape:'Complex platform build'},
  {max:999,cost:'£60k+',time:'14+ weeks',shape:'Large or phased programme'},
];

const STORAGE_KEY='kineticaxis.projectEstimate.v1';

export function ProjectEstimator(){
  const [projectType,setProjectType]=useState('Web application / portal / dashboard');
  const [features,setFeatures]=useState<FeatureKey[]>(['accounts','admin']);
  const [maturity,setMaturity]=useState('Early idea');
  const [quality,setQuality]=useState('Production-ready');
  const [calculated,setCalculated]=useState(false);
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
    `Indicative build band: ${band.cost}`,
    `Indicative delivery window: ${band.time}`,
    `Likely delivery shape: ${band.shape}`,'',
    'This is an early planning range, not a quotation. Discovery can move the estimate up or down once workflows, data, integrations and release scope are understood.',
  ].join('\n'),[projectType,maturity,quality,features,band]);
  const calculate=()=>{markStarted();setCalculated(true);emit('ka_estimator_calculate',{projectTypes:projectType,kind:band.cost});};
  const discuss=()=>{
    const payload={version:1,savedAt:Date.now(),service:projectType,services:[projectType],brief,costBand:band.cost,timeBand:band.time,attribution:getAttributionPayload()};
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

    <div className="ka-estimator__calculate"><button type="button" onClick={calculate}>Show my indicative range <span aria-hidden="true">↗</span></button><p>No email required. Nothing is sent to us unless you choose to discuss it.</p></div>

    <section className={`ka-estimator__result${calculated?' is-visible':''}`} aria-live="polite" aria-atomic="true">
      {calculated && <>
        <div className="ka-estimator__result-head"><div><span>INDICATIVE BUILD BAND</span><strong>{band.cost}</strong></div><div><span>DELIVERY WINDOW</span><strong>{band.time}</strong></div></div>
        <div className="ka-estimator__result-copy"><h2>{band.shape}</h2><p>This is a planning range rather than a quote. The biggest variables are usually workflow depth, integrations, data migration, platform constraints and what the first release genuinely needs to prove.</p></div>
        <div className="ka-estimator__result-actions"><button type="button" onClick={discuss}>Discuss this estimate <span aria-hidden="true">↗</span></button><Link href="/project-planner">Build a detailed project brief <span aria-hidden="true">↗</span></Link></div>
      </>}
    </section>
  </div>;
}
