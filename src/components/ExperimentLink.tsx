'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {assignExperiment,EXPERIMENTS} from '../lib/experiments';
import {trackKineticEvent} from '../lib/analytics-client';

function Arrow(){return <svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={21}><path d="M5 19 19 5M8 5h11v11"/></svg>}

export function HomePlannerExperimentLink({className}:{className:string}){
  const definition=EXPERIMENTS.home_planner_cta;
  const [variant,setVariant]=useState<string>(definition.variants[0]);
  useEffect(()=>{
    const assigned=assignExperiment(definition);
    setVariant(assigned);
    trackKineticEvent({event:'ka_experiment_impression',page:'index',experiment:definition.id,variant:assigned});
  },[]);
  const label=variant==='scope'?'Scope your project':'Plan your project';
  return <Link href="/project-planner" className={className} data-ka-track="home-project-planner" data-ka-experiment={definition.id} data-ka-variant={variant}
    onClick={()=>trackKineticEvent({event:'ka_experiment_click',page:'index',experiment:definition.id,variant,label})}>
    <span className="kad-cta-label">{label}</span><Arrow/>
  </Link>;
}
