'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import PROJECT_CATEGORIES from '../../shared/project-categories.json';
import { trackKineticEvent } from '../lib/analytics-client';
import { getAttributionPayload } from '../lib/attribution-client';

type PlannerState = {
  projectTypes:string[];
  mobilePlatform:string;
  audience:string;
  stage:string;
  existingUrl:string;
  replacementSystem:string;
  problem:string;
  goals:string[];
  mustHaves:string;
  userAccess:string[];
  integrations:string;
  migration:string[];
  success:string;
  constraints:string;
  timeline:string;
  deadlineContext:string;
  budget:string;
  budgetRange:string;
};

const TYPES = PROJECT_CATEGORIES.map(item=>item.value);

const GOALS = [
  'Generate enquiries',
  'Improve a customer journey',
  'Replace manual work',
  'Connect existing systems',
  'Create a new digital product',
  'Improve an existing product',
];

const ACCESS = [
  'Public / no login',
  'Customer accounts',
  'Staff / admin access',
  'Partner / member access',
  'Multiple roles / permissions',
];

const MIGRATION = [
  'No migration expected',
  'Existing website content',
  'Customer / member data',
  'Product / booking data',
  'Documents / files',
  'Spreadsheets / operational data',
  'Unsure',
];

const PLANNER_STORAGE_KEY='kineticaxis.projectPlannerBrief.v1';

function event(name:string, detail:Record<string,string>={}) {
  trackKineticEvent({event:name,page:'project-planner',...detail});
}

export function ProjectPlanner() {
  const [state,setState]=useState<PlannerState>({
    projectTypes:['Web application / portal / dashboard'],
    mobilePlatform:'iOS and Android',
    audience:'Customers and staff',
    stage:'Early idea',
    existingUrl:'',
    replacementSystem:'',
    problem:'',
    goals:[],
    mustHaves:'',
    userAccess:[],
    integrations:'',
    migration:[],
    success:'',
    constraints:'',
    timeline:'Flexible / not fixed',
    deadlineContext:'',
    budget:'Still exploring',
    budgetRange:'Prefer to discuss',
  });
  const startedRef=useRef(false);
  const completedRef=useRef(false);
  const completionMarkerRef=useRef<HTMLDivElement|null>(null);
  const markStarted=()=>{
    if (startedRef.current) return;
    startedRef.current=true;
    event('ka_project_planner_start');
  };

  useEffect(()=>{
    const marker=completionMarkerRef.current;
    if (!marker || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>{
      if (completedRef.current || !startedRef.current) return;
      if (entries.some(entry=>entry.isIntersecting && entry.intersectionRatio>=0.55)) {
        completedRef.current=true;
        event('ka_project_planner_complete',{projectTypes:state.projectTypes.join(' + ') || 'Not selected'});
        observer.disconnect();
      }
    },{threshold:[0.55]});
    observer.observe(marker);
    return ()=>observer.disconnect();
  },[state.projectTypes]);

  const toggleProjectType=(item:string)=>{
    markStarted();
    setState(current=>({
      ...current,
      projectTypes:current.projectTypes.includes(item)
        ? current.projectTypes.filter(value=>value!==item)
        : [...current.projectTypes,item],
    }));
  };

  const toggleGoal=(goal:string)=>{
    markStarted();
    setState(current=>({
      ...current,
      goals:current.goals.includes(goal)
        ? current.goals.filter(item=>item!==goal)
        : [...current.goals,goal],
    }));
  };

  const toggleAccess=(item:string)=>{
    markStarted();
    setState(current=>({
      ...current,
      userAccess:current.userAccess.includes(item)
        ? current.userAccess.filter(value=>value!==item)
        : [...current.userAccess,item],
    }));
  };

  const toggleMigration=(item:string)=>{
    markStarted();
    setState(current=>{
      if (item==='No migration expected') {
        return {...current,migration:current.migration.includes(item)?[]:[item]};
      }
      const withoutNone=current.migration.filter(value=>value!=='No migration expected');
      return {
        ...current,
        migration:withoutNone.includes(item)
          ? withoutNone.filter(value=>value!==item)
          : [...withoutNone,item],
      };
    });
  };

  const showBudgetRange=state.budget==='Budget range agreed internally' || state.budget==='Approved project budget';

  const brief=useMemo(()=>{
    const lines=[
      'KINETIC AXIS — PROJECT STARTER BRIEF',
      '',
      `Project types: ${state.projectTypes.length ? state.projectTypes.join(', ') : 'Not selected yet'}`,
    ];

    if (state.projectTypes.includes('Mobile application')) lines.push(`Mobile platform: ${state.mobilePlatform}`);
    lines.push(
      `Primary audience: ${state.audience}`,
      `Current stage: ${state.stage}`,
    );
    if (state.stage==='Existing product to improve') lines.push(`Existing product / URL: ${state.existingUrl.trim() || 'Not provided yet'}`);
    if (state.stage==='Replacing an existing system') lines.push(`System being replaced: ${state.replacementSystem.trim() || 'Not described yet'}`);

    lines.push(
      '',
      `Problem to solve: ${state.problem.trim() || 'Not described yet'}`,
      `Main goals: ${state.goals.length ? state.goals.join(', ') : 'Not selected yet'}`,
      `First-release must-haves: ${state.mustHaves.trim() || 'Not defined yet'}`,
      `Users / access: ${state.userAccess.length ? state.userAccess.join(', ') : 'Not selected yet'}`,
      `Systems / integrations: ${state.integrations.trim() || 'Not defined yet'}`,
      `Content / data migration: ${state.migration.length ? state.migration.join(', ') : 'Not selected yet'}`,
      `What success looks like: ${state.success.trim() || 'Not defined yet'}`,
      `Constraints / requirements: ${state.constraints.trim() || 'None noted yet'}`,
      '',
      `Timescale: ${state.timeline}`,
    );
    if (state.timeline==='Specific deadline') lines.push(`Deadline context: ${state.deadlineContext.trim() || 'Not provided yet'}`);
    lines.push(`Budget stage: ${state.budget}`);
    if (showBudgetRange) lines.push(`Indicative investment range: ${state.budgetRange}`);

    lines.push(
      '',
      'Questions to take into discovery:',
      '• Which part of the problem carries the most business or user value?',
      '• What should the first release prove before more is invested?',
      '• Who owns the data, content and operational process behind it?',
      '• Which dependencies could affect scope, timing or launch?',
    );
    return lines.join('\n');
  },[state,showBudgetRange]);

  const contactServices=useMemo(()=>Array.from(new Set(state.projectTypes)),[state.projectTypes]);
  const primaryContactService=contactServices[0] || 'Something else';
  const contactHref=`/contact?service=${encodeURIComponent(primaryContactService)}&from=planner#enquiry-form`;

  const plannerPayload=useMemo(()=>({
    version:3,
    savedAt:Date.now(),
    service:primaryContactService,
    services:contactServices,
    ...state,
    brief,
    attribution:getAttributionPayload(),
  }),[primaryContactService,contactServices,state,brief]);

  const saveBriefLocally=()=>{
    const serialized=JSON.stringify({...plannerPayload,savedAt:Date.now()});
    let saved=false;
    try { sessionStorage.setItem(PLANNER_STORAGE_KEY,serialized); saved=true; } catch {}
    // Fallback for browsers that isolate or discard sessionStorage during navigation.
    // Contact removes this copy after a successful enquiry and ignores stale copies.
    try { localStorage.setItem(PLANNER_STORAGE_KEY,serialized); saved=true; } catch {}
    return saved;
  };

  // Keep the current draft available to the secondary CTA lower on this page as well.
  useEffect(()=>{
    try { sessionStorage.setItem(PLANNER_STORAGE_KEY,JSON.stringify({...plannerPayload,savedAt:Date.now()})); } catch {}
  },[plannerPayload]);

  const includeBriefInEnquiry=(clickEvent:ReactMouseEvent<HTMLAnchorElement>)=>{
    clickEvent.preventDefault();
    markStarted();
    if (!completedRef.current) {
      completedRef.current=true;
      event('ka_project_planner_complete',{projectTypes:state.projectTypes.join(' + ') || 'Not selected'});
    }
    saveBriefLocally();
    event('ka_project_planner_contact',{projectTypes:state.projectTypes.join(' + ') || 'Not selected'});
    // Use a full navigation after storage has been written. This makes the handoff
    // reliable in the statically exported build as well as during Next client routing.
    window.location.assign(contactHref);
  };

  return <div className="ka-planner" onChangeCapture={markStarted} onInputCapture={markStarted}>
    <div className="ka-planner__form" aria-label="Digital project planner">
      <div className="ka-planner__step">
        <span>01 / FORMAT</span>
        <h2>What are you planning?</h2>
        <p className="ka-planner__choice-help">Choose all that apply. You can turn each option on or off.</p>
        <div className="ka-planner__choices" role="group" aria-label="Project types">
          {TYPES.map(item=><button key={item} type="button"
            className={state.projectTypes.includes(item)?'is-selected':''}
            aria-pressed={state.projectTypes.includes(item)}
            onClick={()=>toggleProjectType(item)}>{item}</button>)}
        </div>
        {state.projectTypes.includes('Mobile application') && <label className="ka-planner__conditional">
          <span>01A / PLATFORM</span>
          <strong>Which mobile platform are you considering?</strong>
          <select value={state.mobilePlatform} onChange={e=>setState(c=>({...c,mobilePlatform:e.target.value}))}>
            <option>iOS and Android</option><option>iOS first</option><option>Android first</option><option>Not decided yet</option>
          </select>
        </label>}
      </div>

      <div className="ka-planner__split">
        <label><span>02 / AUDIENCE</span><strong>Who mainly uses it?</strong>
          <select value={state.audience} onChange={e=>setState(c=>({...c,audience:e.target.value}))}>
            <option>Customers</option><option>Staff / internal teams</option>
            <option>Customers and staff</option><option>Partners / members</option>
          </select>
        </label>
        <label><span>03 / STAGE</span><strong>Where are you today?</strong>
          <select value={state.stage} onChange={e=>setState(c=>({...c,stage:e.target.value}))}>
            <option>Early idea</option><option>Existing product to improve</option>
            <option>Replacing an existing system</option><option>Requirements partly defined</option>
          </select>
        </label>
      </div>

      {state.stage==='Existing product to improve' && <label className="ka-planner__field ka-planner__field--conditional">
        <span>03A / EXISTING PRODUCT</span>
        <strong>Is there an existing site or product we should understand?</strong>
        <input className="ka-planner__control" type="url" inputMode="url" maxLength={240}
          value={state.existingUrl} onChange={e=>setState(c=>({...c,existingUrl:e.target.value}))}
          placeholder="https://…" />
        <small>Optional. A public URL is enough — do not enter login details.</small>
      </label>}

      {state.stage==='Replacing an existing system' && <label className="ka-planner__field ka-planner__field--conditional">
        <span>03A / REPLACEMENT</span>
        <strong>What are you replacing?</strong>
        <textarea maxLength={250} value={state.replacementSystem}
          onChange={e=>setState(c=>({...c,replacementSystem:e.target.value}))}
          placeholder="For example: an old CRM, spreadsheet workflow, legacy portal or off-the-shelf platform…" />
      </label>}

      <label className="ka-planner__field">
        <span>04 / PROBLEM</span>
        <strong>What are you trying to solve?</strong>
        <textarea maxLength={420} value={state.problem}
          onChange={e=>setState(c=>({...c,problem:e.target.value}))}
          placeholder="What is difficult, slow, expensive or frustrating today?" />
        <small>Optional, but this is one of the most useful things to bring into discovery.</small>
      </label>

      <div className="ka-planner__step">
        <span>05 / OUTCOME</span>
        <h2>What needs to get better?</h2>
        <div className="ka-planner__checks">
          {GOALS.map(goal=><label key={goal}>
            <input type="checkbox" checked={state.goals.includes(goal)} onChange={()=>toggleGoal(goal)}/>
            <span>{goal}</span>
          </label>)}
        </div>
      </div>

      <label className="ka-planner__field">
        <span>06 / FIRST RELEASE</span>
        <strong>What absolutely needs to be included?</strong>
        <textarea maxLength={420} value={state.mustHaves}
          onChange={e=>setState(c=>({...c,mustHaves:e.target.value}))}
          placeholder="The must-have features or capabilities for a useful first release…" />
        <small>Think must-haves rather than the full wish list. This helps us identify an achievable first version.</small>
      </label>

      <div className="ka-planner__step">
        <span>07 / USERS &amp; ACCESS</span>
        <h2>How will people use it?</h2>
        <div className="ka-planner__checks">
          {ACCESS.map(item=><label key={item}>
            <input type="checkbox" checked={state.userAccess.includes(item)} onChange={()=>toggleAccess(item)}/>
            <span>{item}</span>
          </label>)}
        </div>
      </div>

      <label className="ka-planner__field">
        <span>08 / CONNECTIONS</span>
        <strong>{state.projectTypes.includes('API / systems integration / payments')?'Which systems need to connect?':'Systems or integrations already involved'}</strong>
        <textarea maxLength={350} value={state.integrations}
          onChange={e=>setState(c=>({...c,integrations:e.target.value}))}
          placeholder="For example: CRM, booking platform, payment provider, existing API, spreadsheets…" />
        <small>Keep this high-level. Do not enter passwords, API keys or confidential data.</small>
      </label>

      <div className="ka-planner__step">
        <span>09 / CONTENT &amp; DATA</span>
        <h2>Does anything need to be moved across?</h2>
        <div className="ka-planner__checks">
          {MIGRATION.map(item=><label key={item}>
            <input type="checkbox" checked={state.migration.includes(item)} onChange={()=>toggleMigration(item)}/>
            <span>{item}</span>
          </label>)}
        </div>
      </div>

      <label className="ka-planner__field">
        <span>10 / SUCCESS</span>
        <strong>What would make this project successful?</strong>
        <textarea maxLength={300} value={state.success}
          onChange={e=>setState(c=>({...c,success:e.target.value}))}
          placeholder="For example: more enquiries, fewer manual tasks, faster processing, increased revenue or a better customer experience…" />
      </label>

      <label className="ka-planner__field">
        <span>11 / CONSTRAINTS</span>
        <strong>Anything we need to work around?</strong>
        <textarea maxLength={350} value={state.constraints}
          onChange={e=>setState(c=>({...c,constraints:e.target.value}))}
          placeholder="Existing technology, internal IT, accessibility, branding, hosting, security, procurement or supplier requirements…" />
        <small>Optional. High-level constraints are enough at this stage.</small>
      </label>

      <div className="ka-planner__split">
        <label><span>12 / TIMING</span><strong>Timescale</strong>
          <select value={state.timeline} onChange={e=>setState(c=>({...c,timeline:e.target.value}))}>
            <option>Flexible / not fixed</option><option>Within 3 months</option>
            <option>3–6 months</option><option>6–12 months</option><option>Specific deadline</option>
          </select>
        </label>
        <label><span>13 / INVESTMENT</span><strong>Budget stage</strong>
          <select value={state.budget} onChange={e=>setState(c=>({...c,budget:e.target.value}))}>
            <option>Still exploring</option><option>Budget range agreed internally</option>
            <option>Need help defining scope before budgeting</option><option>Approved project budget</option>
          </select>
        </label>
      </div>

      {(state.timeline==='Specific deadline' || showBudgetRange) && <div className="ka-planner__split ka-planner__split--conditional">
        {state.timeline==='Specific deadline' && <label><span>12A / DEADLINE CONTEXT</span><strong>What is driving the date?</strong>
          <input className="ka-planner__control" type="text" maxLength={200} value={state.deadlineContext}
            onChange={e=>setState(c=>({...c,deadlineContext:e.target.value}))}
            placeholder="Launch, event, campaign, contract renewal, system shutdown…" />
        </label>}
        {showBudgetRange && <label><span>13A / INDICATIVE RANGE</span><strong>Approximate investment range</strong>
          <select value={state.budgetRange} onChange={e=>setState(c=>({...c,budgetRange:e.target.value}))}>
            <option>Under £10k</option><option>£10k–£25k</option><option>£25k–£50k</option><option>£50k+</option><option>Prefer to discuss</option>
          </select>
        </label>}
      </div>}
      <div ref={completionMarkerRef} className="ka-planner__completion-marker" aria-hidden="true" />
    </div>

    <aside className="ka-planner__brief" data-nosnippet="">
      <span>YOUR STARTER BRIEF</span>
      <h2>Your project, at a glance.</h2>
      <p className="ka-planner__brief-intro">A clear summary of what you have told us so far. You can keep refining it as your thinking develops.</p>

      <div className="ka-planner__summary ka-planner__summary--compact">
        <section className="ka-planner__summary-section ka-planner__summary-section--snapshot" aria-labelledby="planner-summary-overview">
          <div className="ka-planner__summary-heading">
            <span>01</span><h3 id="planner-summary-overview">Project snapshot</h3>
          </div>
          <dl className="ka-planner__snapshot-grid">
            <div className="ka-planner__snapshot-types"><dt>Planning</dt><dd>{state.projectTypes.length ? <span className="ka-planner__summary-tags">{state.projectTypes.map(item=><span key={item}>{item}</span>)}</span> : <span className="is-empty">Not selected yet</span>}</dd></div>
            <div><dt>Audience</dt><dd>{state.audience}</dd></div>
            <div><dt>Stage</dt><dd>{state.stage}</dd></div>
          </dl>
          {(state.projectTypes.includes('Mobile application') || state.stage==='Existing product to improve' || state.stage==='Replacing an existing system') && <dl className="ka-planner__summary-extra">
            {state.projectTypes.includes('Mobile application') && <div><dt>Platform</dt><dd>{state.mobilePlatform}</dd></div>}
            {state.stage==='Existing product to improve' && state.existingUrl.trim() && <div><dt>Existing product</dt><dd>{state.existingUrl.trim()}</dd></div>}
            {state.stage==='Replacing an existing system' && state.replacementSystem.trim() && <div><dt>Replacing</dt><dd>{state.replacementSystem.trim()}</dd></div>}
          </dl>}
        </section>

        <section className="ka-planner__summary-section" aria-labelledby="planner-summary-needs">
          <div className="ka-planner__summary-heading">
            <span>02</span><h3 id="planner-summary-needs">Priorities</h3>
          </div>
          <dl className="ka-planner__summary-lines">
            <div><dt>Problem</dt><dd className={!state.problem.trim()?'is-empty':''}>{state.problem.trim() || 'Not described yet'}</dd></div>
            <div className="ka-planner__summary-pills-row"><dt>Goals</dt><dd>{state.goals.length ? <span className="ka-planner__summary-tags">{state.goals.map(goal=><span key={goal}>{goal}</span>)}</span> : <span className="is-empty">Not selected yet</span>}</dd></div>
            <div><dt>First release</dt><dd className={!state.mustHaves.trim()?'is-empty':''}>{state.mustHaves.trim() || 'Not defined yet'}</dd></div>
            {state.success.trim() && <div><dt>Success</dt><dd>{state.success.trim()}</dd></div>}
          </dl>
        </section>

        <section className="ka-planner__summary-section" aria-labelledby="planner-summary-delivery">
          <div className="ka-planner__summary-heading">
            <span>03</span><h3 id="planner-summary-delivery">Delivery context</h3>
          </div>
          <dl className="ka-planner__delivery-grid">
            <div className="ka-planner__delivery-wide"><dt>Users &amp; access</dt><dd>{state.userAccess.length ? <span className="ka-planner__summary-tags">{state.userAccess.map(item=><span key={item}>{item}</span>)}</span> : <span className="is-empty">Not selected yet</span>}</dd></div>
            <div className="ka-planner__delivery-wide"><dt>Integrations</dt><dd className={!state.integrations.trim()?'is-empty':''}>{state.integrations.trim() || 'Not defined yet'}</dd></div>
            <div><dt>Timescale</dt><dd>{state.timeline}</dd></div>
            <div><dt>Budget</dt><dd>{showBudgetRange ? state.budgetRange : state.budget}</dd></div>
            {state.migration.length>0 && <div className="ka-planner__delivery-wide ka-planner__delivery-divider"><dt>Migration</dt><dd><span className="ka-planner__summary-tags">{state.migration.map(item=><span key={item}>{item}</span>)}</span></dd></div>}
            {state.constraints.trim() && <div className="ka-planner__delivery-wide ka-planner__delivery-divider"><dt>Constraints</dt><dd>{state.constraints.trim()}</dd></div>}
            {state.timeline==='Specific deadline' && state.deadlineContext.trim() && <div className="ka-planner__delivery-wide ka-planner__delivery-divider"><dt>Deadline</dt><dd>{state.deadlineContext.trim()}</dd></div>}
          </dl>
        </section>

        <p className="ka-planner__summary-note">This gives us enough context to make the first conversation focused and useful.</p>
      </div>

      <p>Your answers stay in this browser. Nothing from the planner is sent to Kinetic Axis unless you choose to include it in an enquiry.</p>
      <a href={contactHref} onClick={includeBriefInEnquiry}
        data-ka-track="project-planner-contact" data-ka-track-label={state.projectTypes.join(' + ') || 'Not selected'}>
        Discuss this project <span aria-hidden="true">↗</span>
      </a>
    </aside>
  </div>;
}
