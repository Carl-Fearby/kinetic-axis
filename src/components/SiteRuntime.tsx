'use client';
import { useLayoutEffect } from 'react';
import { initPageMotion } from '../lib/motion';
import { trackKineticEvent } from '../lib/analytics-client';
import { captureAttribution, getAttributionPayload, restoreAttribution } from '../lib/attribution-client';
import { getExperimentContext } from '../lib/experiments';
import PROJECT_CATEGORIES from '../../shared/project-categories.json';

const PROJECT_TYPE_ALIAS = new Map<string,string>();
for (const category of PROJECT_CATEGORIES) {
  PROJECT_TYPE_ALIAS.set(category.value,category.value);
  for (const alias of category.aliases) PROJECT_TYPE_ALIAS.set(alias,category.value);
}
const canonicalProjectType=(value:string)=>PROJECT_TYPE_ALIAS.get(value) || '';

/** All interactive behaviour is installed/removed with the individual route. */
export function SiteRuntime({ pageKey }: { pageKey: string }) {
  useLayoutEffect(() => {
    const cleanup: Array<() => void> = [];
    const contactSourceKey='kineticaxis.contactSourcePage.v1';
    const emit = (event:string, detail:Record<string,string>={}) => {
      trackKineticEvent({event,page:pageKey,...detail});
    };
    captureAttribution();
    emit('ka_page_view');
    if(pageKey==='contact/thank-you') emit('ka_contact_thank_you');
    const listen = <K extends keyof DocumentEventMap>(target: Document, name: K,
      fn: (event: DocumentEventMap[K]) => void, capture = false) => {
      const cb = fn as EventListener;
      target.addEventListener(name,cb,capture);
      cleanup.push(() => target.removeEventListener(name,cb,capture));
    };
    const mobileButton = document.querySelector<HTMLButtonElement>('.ka-toggle, .menu-toggle');
    const nav = document.querySelector<HTMLElement>('.ka-links, .header-nav');
    if (mobileButton && nav) {
      const close = (restoreFocus=false) => {
        nav.classList.remove('open');
        mobileButton.setAttribute('aria-expanded','false');
        if (restoreFocus) mobileButton.focus();
      };
      const toggle = () => {
        const opened=nav.classList.toggle('open');
        mobileButton.setAttribute('aria-expanded',String(opened));
      };
      const onMobileKey=(event:KeyboardEvent)=>{
        if (event.key==='Escape' && nav.classList.contains('open')) {
          event.preventDefault();
          close(true);
        }
      };
      const onMobileOutside=(event:PointerEvent)=>{
        if (!nav.classList.contains('open')) return;
        const target=event.target;
        if (target instanceof Node && !nav.contains(target) && !mobileButton.contains(target)) close(false);
      };
      mobileButton.addEventListener('click',toggle);
      document.addEventListener('keydown',onMobileKey);
      document.addEventListener('pointerdown',onMobileOutside);
      cleanup.push(() => {
        mobileButton.removeEventListener('click',toggle);
        document.removeEventListener('keydown',onMobileKey);
        document.removeEventListener('pointerdown',onMobileOutside);
      });
      const mobileLinks=[...nav.querySelectorAll<HTMLAnchorElement>('a')];
      const onMobileLink=()=>close(false);
      mobileLinks.forEach(anchor=>anchor.addEventListener('click',onMobileLink));
      cleanup.push(()=>mobileLinks.forEach(anchor=>anchor.removeEventListener('click',onMobileLink)));
    }

    // Accessible dropdown menus used by Services and Experiments.
    document.querySelectorAll<HTMLElement>('[data-services-menu]').forEach(menu => {
      const button=menu.querySelector<HTMLButtonElement>('.services-nav-toggle');
      const dropdown=menu.querySelector<HTMLElement>('.services-dropdown');
      if (!button || !dropdown) return;
      const mq=window.matchMedia('(max-width: 760px)');
      const canHover=window.matchMedia('(min-width:761px) and (hover:hover)');
      let lastInput='pointer';
      const setOpen = (yes:boolean) => {
        menu.classList.toggle('is-open',yes);
        button.setAttribute('aria-expanded',String(yes));
      };
      const onToggle=(ev:MouseEvent)=>{
        ev.stopPropagation();
        setOpen((!mq.matches && canHover.matches && menu.matches(':hover')) || !menu.classList.contains('is-open'));
      };
      const onKey=(ev:KeyboardEvent)=>{
        if (ev.key==='Escape' && menu.classList.contains('is-open')) {
          ev.preventDefault();setOpen(false);button.focus();
        }
      };
      const onIn=()=>{if (!mq.matches && lastInput==='keyboard') setOpen(true);};
      const onOut=(ev:FocusEvent)=>{if (!menu.contains(ev.relatedTarget as Node|null))setOpen(false);};
      const onEnter=()=>{if (canHover.matches)setOpen(true);};
      const onLeave=()=>{if (canHover.matches && !menu.contains(document.activeElement))setOpen(false);};
      const onOutside=(ev:PointerEvent)=>{lastInput='pointer';if(!menu.contains(ev.target as Node))setOpen(false);};
      const onDocKey=(ev:KeyboardEvent)=>{if(ev.key==='Tab')lastInput='keyboard';};
      const onMQ=()=>setOpen(false);
      const onLink=()=>setOpen(false);
      button.addEventListener('click',onToggle);
      menu.addEventListener('keydown',onKey);
      menu.addEventListener('focusin',onIn);
      menu.addEventListener('focusout',onOut);
      menu.addEventListener('mouseenter',onEnter);
      menu.addEventListener('mouseleave',onLeave);
      document.addEventListener('pointerdown',onOutside);
      document.addEventListener('keydown',onDocKey,true);
      mq.addEventListener?.('change',onMQ);
      const links=dropdown.querySelectorAll('a');
      links.forEach(link=>link.addEventListener('click',onLink));
      cleanup.push(()=>{
        button.removeEventListener('click',onToggle);
        menu.removeEventListener('keydown',onKey);
        menu.removeEventListener('focusin',onIn);
        menu.removeEventListener('focusout',onOut);
        menu.removeEventListener('mouseenter',onEnter);
        menu.removeEventListener('mouseleave',onLeave);
        document.removeEventListener('pointerdown',onOutside);
        document.removeEventListener('keydown',onDocKey,true);
        mq.removeEventListener?.('change',onMQ);
        links.forEach(link=>link.removeEventListener('click',onLink));
      });
    });

    // Smooth FAQ accordions. Keep native <details>/<summary> semantics, but take
    // control of the click so both opening and closing can animate rather than snap.
    document.querySelectorAll<HTMLDetailsElement>('.mkt-faq > details').forEach(detail => {
      const summary=detail.querySelector<HTMLElement>(':scope > summary');
      if (!summary) return;
      const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
      let animation:Animation|null=null;
      let direction:'opening'|'closing'|null=null;

      const borderHeight=()=>{
        const style=getComputedStyle(detail);
        return (parseFloat(style.borderTopWidth)||0)+(parseFloat(style.borderBottomWidth)||0);
      };
      const closedHeight=()=>{
        const style=getComputedStyle(detail);
        return summary.getBoundingClientRect().height+
          (parseFloat(style.paddingTop)||0)+(parseFloat(style.paddingBottom)||0)+borderHeight();
      };
      const stopAnimation=()=>{
        if (animation) {
          animation.onfinish=null;
          animation.oncancel=null;
          animation.cancel();
          animation=null;
        }
        detail.classList.remove('ka-faq-animating');
      };
      const settle=(next:Animation,closeAfter:boolean)=>{
        if (animation!==next) return;
        if (closeAfter) detail.open=false;
        animation=null;
        direction=null;
        detail.classList.remove('ka-faq-animating');
      };
      const expand=(startHeight:number)=>{
        stopAnimation();
        if (reducedMotion.matches) {detail.open=true;direction=null;return;}
        detail.open=true;
        // scrollHeight excludes borders while the animated CSS height is border-box.
        const endHeight=detail.scrollHeight+borderHeight();
        detail.classList.add('ka-faq-animating');
        direction='opening';
        const next=detail.animate(
          [
            {height:`${startHeight}px`,opacity:.985},
            {height:`${endHeight}px`,opacity:1},
          ],
          {duration:340,easing:'cubic-bezier(.22,.75,.24,1)'}
        );
        animation=next;
        next.onfinish=()=>settle(next,false);
      };
      const collapse=(startHeight:number)=>{
        stopAnimation();
        if (reducedMotion.matches) {detail.open=false;direction=null;return;}
        const endHeight=closedHeight();
        detail.classList.add('ka-faq-animating');
        direction='closing';
        const next=detail.animate(
          [
            {height:`${startHeight}px`,opacity:1},
            {height:`${endHeight}px`,opacity:.985},
          ],
          {duration:280,easing:'cubic-bezier(.4,0,.2,1)'}
        );
        animation=next;
        next.onfinish=()=>settle(next,true);
      };
      const onSummaryClick=(event:MouseEvent)=>{
        event.preventDefault();
        const currentHeight=detail.getBoundingClientRect().height;
        if (!detail.open || direction==='closing') expand(currentHeight);
        else collapse(currentHeight);
      };
      summary.addEventListener('click',onSummaryClick);
      cleanup.push(()=>{
        summary.removeEventListener('click',onSummaryClick);
        stopAnimation();
        direction=null;
      });
    });

    // Analytics-ready interaction events. No third-party script is loaded here and
    // no form values / personal information are included in event payloads.
    const onTrackedClick=(event:MouseEvent)=>{
      const target=event.target instanceof Element ? event.target.closest('a,button') as HTMLElement|null : null;
      if (!target) return;
      const explicit=target.dataset.kaTrack;
      const href=target instanceof HTMLAnchorElement ? target.href : '';
      const rawHref=target instanceof HTMLAnchorElement ? target.getAttribute('href') || '' : '';
      const label=target.dataset.kaTrackLabel || target.textContent?.trim().replace(/\s+/g,' ').slice(0,80) || '';
      if (explicit) emit('ka_cta_click',{kind:explicit,label});
      if (rawHref.startsWith('tel:')) emit('ka_phone_click',{label});
      else if (rawHref.startsWith('mailto:')) emit('ka_email_click',{label});
      else if (/wa\.me\//i.test(href)) emit('ka_whatsapp_click',{label});
      else if (rawHref.startsWith('/contact') || href.startsWith(`${window.location.origin}/contact`)) {
        if (pageKey!=='contact') {
          try { sessionStorage.setItem(contactSourceKey,pageKey); } catch {}
        }
        emit('ka_contact_cta',{label});
      }
      else if (href && target instanceof HTMLAnchorElement) {
        try {
          const url=new URL(href);
          if (url.origin!==window.location.origin) emit('ka_outbound_click',{host:url.host,label});
        } catch {}
      }
    };
    document.addEventListener('click',onTrackedClick,true);
    cleanup.push(()=>document.removeEventListener('click',onTrackedClick,true));

    // Static export still POSTs to the existing separate, same-origin Node/Postfix API.
    if (pageKey==='contact') {
      const form=document.querySelector<HTMLFormElement>('#enquiry-form');
      const button=document.querySelector<HTMLButtonElement>('#enquiry-submit');
      const label=button?.querySelector<HTMLElement>('.kad-form__submit-label');
      const status=document.querySelector<HTMLElement>('#enquiry-status');
      const projectTypeInputs=[...document.querySelectorAll<HTMLInputElement>('input[name="projectType"]')];
      const projectTypeError=document.querySelector<HTMLElement>('#enquiry-project-types-error');
      const message=document.querySelector<HTMLTextAreaElement>('#enquiry-message');
      const messageLabel=document.querySelector<HTMLLabelElement>('label[for="enquiry-message"]');
      const messageHelp=document.querySelector<HTMLElement>('#enquiry-message-help');
      const messageCount=document.querySelector<HTMLElement>('#enquiry-message-count');
      const updateMessageCount=()=>{
        if (!message || !messageCount) return;
        const count=message.value.length;
        messageCount.textContent=`${count.toLocaleString('en-GB')} / 1,500`;
        messageCount.setAttribute('aria-label',`${count.toLocaleString('en-GB')} of 1,500 characters used`);
        messageCount.dataset.state=count>=1350?'warning':'';
      };
      if (message) {
        message.addEventListener('input',updateMessageCount);
        cleanup.push(()=>message.removeEventListener('input',updateMessageCount));
        updateMessageCount();
      }
      const plannerBriefInput=document.querySelector<HTMLInputElement>('#planner-brief');
      const estimateBriefInput=document.querySelector<HTMLInputElement>('#estimate-brief');
      const transfer=document.querySelector<HTMLElement>('#planner-transfer');
      const params=new URLSearchParams(window.location.search);
      const requested=params.get('service');
      const handoffSource=params.get('from');
      const fromPlanner=handoffSource==='planner';
      const fromEstimator=handoffSource==='estimator';
      const plannerStorageKey='kineticaxis.projectPlannerBrief.v1';
      const estimatorStorageKey='kineticaxis.projectEstimate.v1';
      const plannerMaxAgeMs=24*60*60*1000;
      let plannerServices:string[]=[];
      let plannerProjectTypes:string[]=[];
      const setProjectTypes=(values:string[])=>{
        const wanted=new Set(values.map(canonicalProjectType).filter(Boolean));
        projectTypeInputs.forEach(input=>{input.checked=wanted.has(input.value);});
      };
      if (requested) {
        const canonical=canonicalProjectType(requested);
        if (canonical) setProjectTypes([canonical]);
      }
      const resetPlannerHandoff = (serviceValue = '') => {
        try { sessionStorage.removeItem(plannerStorageKey); sessionStorage.removeItem(estimatorStorageKey); } catch {}
        try { localStorage.removeItem(plannerStorageKey); localStorage.removeItem(estimatorStorageKey); } catch {}
        if (form) form.reset();
        if (plannerBriefInput) plannerBriefInput.value='';
        if (estimateBriefInput) estimateBriefInput.value='';
        if (transfer) {
          transfer.hidden=true;
          transfer.dataset.state='';
        }
        if (message) {
          message.value='';
          message.required=true;
          message.minLength=15;
          message.placeholder='A little about your idea, the goal and any useful timings...';
          updateMessageCount();
        }
        if (messageLabel) messageLabel.textContent='Tell us about your project *';
        if (messageHelp) messageHelp.textContent='15–1,500 characters.';
        if (projectTypeError) projectTypeError.textContent='';
        if (status) { status.textContent=''; status.dataset.state=''; }
        const canonical=canonicalProjectType(serviceValue);
        if (canonical) setProjectTypes([canonical]);
      };

      // A planner handoff only belongs to the planner-originated contact URL.
      // Navigating to Contact/Let's talk again is a fresh enquiry, even though
      // Next keeps the same /contact pathname mounted when only query/hash change.
      const onFreshContactNavigation=(event:MouseEvent)=>{
        if (event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target=event.target;
        if (!(target instanceof Element)) return;
        const anchor=target.closest<HTMLAnchorElement>('a[href]');
        if (!anchor || (anchor.target && anchor.target.toLowerCase()!=='_self')) return;
        let destination:URL;
        try { destination=new URL(anchor.href,window.location.href); } catch { return; }
        if (destination.origin!==window.location.origin || destination.pathname!=='/contact') return;
        if (['planner','estimator'].includes(destination.searchParams.get('from')||'')) return;
        if (!fromPlanner && !fromEstimator && !plannerBriefInput?.value && !estimateBriefInput?.value && (transfer?.hidden ?? true)) return;
        resetPlannerHandoff(destination.searchParams.get('service') || '');
      };
      document.addEventListener('click',onFreshContactNavigation,true);
      cleanup.push(()=>document.removeEventListener('click',onFreshContactNavigation,true));

      if (fromPlanner && message) {
        let plan:Record<string,unknown>|null=null;
        const storageCandidates:Storage[]=[];
        try { storageCandidates.push(window.sessionStorage); } catch {}
        try { storageCandidates.push(window.localStorage); } catch {}
        for (const storage of storageCandidates) {
          try {
            const raw=storage.getItem(plannerStorageKey);
            const parsed=raw ? JSON.parse(raw) as unknown : null;
            if (parsed && typeof parsed==='object') {
              const candidate=parsed as Record<string,unknown>;
              const savedAt=typeof candidate.savedAt==='number' ? candidate.savedAt : 0;
              if (savedAt && Date.now()-savedAt<=plannerMaxAgeMs) {plan=candidate;break;}
              storage.removeItem(plannerStorageKey);
            }
          } catch {}
        }
        const brief=plan && typeof plan.brief==='string' ? plan.brief.trim() : '';
        if(plan && plan.attribution && typeof plan.attribution==='object') restoreAttribution(plan.attribution as Parameters<typeof restoreAttribution>[0]);
        const service=plan && typeof plan.service==='string' ? plan.service : '';
        plannerServices=plan && Array.isArray(plan.services)
          ? plan.services.filter((value):value is string=>typeof value==='string' && value.length>0)
          : (service ? [service] : []);
        plannerProjectTypes=plan && Array.isArray(plan.projectTypes)
          ? plan.projectTypes.filter((value):value is string=>typeof value==='string' && value.length>0)
          : (plan && typeof plan.projectType==='string' ? [plan.projectType] : []);
        const plannerSelections=[...plannerServices,...plannerProjectTypes].map(canonicalProjectType).filter(Boolean);
        if (plannerSelections.length) setProjectTypes(plannerSelections);
        if (brief) {
          if (plannerBriefInput) plannerBriefInput.value=brief;
          message.value='';
          message.required=false;
          message.minLength=0;
          message.placeholder='Add any extra detail, context or questions here…';
          updateMessageCount();
          if (messageLabel) messageLabel.textContent='Anything else you’d like us to know?';
          if (messageHelp) messageHelp.textContent='Optional — your Project Planner brief is already attached.';
          if (transfer) {
            transfer.hidden=false;
            transfer.dataset.state='success';
            transfer.querySelector<HTMLElement>('.kad-planner-transfer__eyebrow')!.textContent='PROJECT PLANNER BRIEF ATTACHED';
            transfer.querySelector<HTMLElement>('#planner-transfer-title')!.textContent='Your project plan is attached to this enquiry.';
            const copy=transfer.querySelector<HTMLParagraphElement>('p');
            if (copy) copy.textContent='Your selected project areas and planner answers are attached. Add your contact details and any extra context you want us to know.';
            window.requestAnimationFrame(()=>transfer.focus({preventScroll:true}));
          }
          emit('ka_project_planner_prefill',{projectTypes:plannerProjectTypes.join(' + ') || 'Not selected'});

          // Re-anchor after the planner handoff has been applied. The browser can
          // resolve the URL hash before route CSS and the dynamic transfer panel
          // have settled, which can otherwise leave the form too far up the page.
          if (form && window.location.hash === '#enquiry-form') {
            window.requestAnimationFrame(()=>{
              window.requestAnimationFrame(()=>form.scrollIntoView({block:'start',behavior:'auto'}));
            });
          }
        } else if (transfer) {
          transfer.hidden=false;
          transfer.dataset.state='error';
          transfer.querySelector<HTMLElement>('.kad-planner-transfer__eyebrow')!.textContent='PROJECT PLANNER BRIEF NOT FOUND';
          transfer.querySelector<HTMLElement>('#planner-transfer-title')!.textContent='We couldn’t attach the saved planner brief.';
          const copy=transfer.querySelector<HTMLParagraphElement>('p');
          if (copy) copy.textContent='Your selected service has been carried over where possible. You can still type or paste your project details below.';
          window.requestAnimationFrame(()=>transfer.focus({preventScroll:true}));
        }
      }

      if (fromEstimator && message) {
        let estimate:Record<string,unknown>|null=null;
        const storageCandidates:Storage[]=[];
        try { storageCandidates.push(window.sessionStorage); } catch {}
        try { storageCandidates.push(window.localStorage); } catch {}
        for (const storage of storageCandidates) {
          try {
            const raw=storage.getItem(estimatorStorageKey);
            const parsed=raw ? JSON.parse(raw) as unknown : null;
            if (parsed && typeof parsed==='object') {
              const candidate=parsed as Record<string,unknown>;
              const savedAt=typeof candidate.savedAt==='number' ? candidate.savedAt : 0;
              if (savedAt && Date.now()-savedAt<=plannerMaxAgeMs) {estimate=candidate;break;}
              storage.removeItem(estimatorStorageKey);
            }
          } catch {}
        }
        const brief=estimate && typeof estimate.brief==='string' ? estimate.brief.trim() : '';
        if(estimate && estimate.attribution && typeof estimate.attribution==='object') restoreAttribution(estimate.attribution as Parameters<typeof restoreAttribution>[0]);
        const service=estimate && typeof estimate.service==='string' ? estimate.service : '';
        const services=estimate && Array.isArray(estimate.services)
          ? estimate.services.filter((value):value is string=>typeof value==='string' && value.length>0)
          : (service ? [service] : []);
        const selections=services.map(canonicalProjectType).filter(Boolean);
        if (selections.length) setProjectTypes(selections);
        if (brief) {
          if (estimateBriefInput) estimateBriefInput.value=brief;
          message.value='';
          message.required=false;
          message.minLength=0;
          message.placeholder='Add any extra detail, context or questions here…';
          updateMessageCount();
          if (messageLabel) messageLabel.textContent='Anything else you’d like us to know?';
          if (messageHelp) messageHelp.textContent='Optional — your Project Estimator summary is already attached.';
          if (transfer) {
            transfer.hidden=false;
            transfer.dataset.state='success';
            transfer.querySelector<HTMLElement>('.kad-planner-transfer__eyebrow')!.textContent='PROJECT ESTIMATOR SUMMARY ATTACHED';
            transfer.querySelector<HTMLElement>('#planner-transfer-title')!.textContent='Your indicative project range is attached to this enquiry.';
            const copy=transfer.querySelector<HTMLParagraphElement>('p');
            if (copy) copy.textContent='The project area, indicative budget band and delivery window are attached. Add your contact details and any extra context you want us to know.';
            window.requestAnimationFrame(()=>transfer.focus({preventScroll:true}));
          }
          emit('ka_estimator_prefill',{projectTypes:selections.join(' + ') || 'Not selected'});
          if (form && window.location.hash === '#enquiry-form') {
            window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>form.scrollIntoView({block:'start',behavior:'auto'})));
          }
        } else if (transfer) {
          transfer.hidden=false;
          transfer.dataset.state='error';
          transfer.querySelector<HTMLElement>('.kad-planner-transfer__eyebrow')!.textContent='PROJECT ESTIMATOR SUMMARY NOT FOUND';
          transfer.querySelector<HTMLElement>('#planner-transfer-title')!.textContent='We couldn’t attach the saved estimate.';
          const copy=transfer.querySelector<HTMLParagraphElement>('p');
          if (copy) copy.textContent='Your selected project area has been carried over where possible. You can still tell us about the project below.';
        }
      }
      if (form && button && label && status) {
        let formStarted=false;
        const markFormStarted=()=>{
          if (formStarted) return;
          formStarted=true;
          const source=plannerBriefInput?.value ? 'planner' : estimateBriefInput?.value ? 'estimator' : 'direct';
          emit('ka_contact_form_start',{source});
        };
        form.addEventListener('focusin',markFormStarted,{once:true});
        cleanup.push(()=>form.removeEventListener('focusin',markFormStarted));
        const onProjectTypeChange=()=>{
          const selected=projectTypeInputs.filter(input=>input.checked).map(input=>input.value).join(' + ') || 'None';
          emit('ka_contact_project_type_select',{projectTypes:selected});
        };
        projectTypeInputs.forEach(input=>input.addEventListener('change',onProjectTypeChange));
        cleanup.push(()=>projectTypeInputs.forEach(input=>input.removeEventListener('change',onProjectTypeChange)));
        const submit = async (event:SubmitEvent) => {
          event.preventDefault(); status.textContent='';status.dataset.state='';status.setAttribute('role','status');
          if (!form.reportValidity()) return;
          const selectedProjectTypes=projectTypeInputs.filter(input=>input.checked).map(input=>input.value);
          if (!selectedProjectTypes.length) {
            if (projectTypeError) projectTypeError.textContent='Choose at least one project area.';
            projectTypeInputs[0]?.focus();
            return;
          }
          if (projectTypeError) projectTypeError.textContent='';
          const enquirySource=plannerBriefInput?.value ? 'planner' : estimateBriefInput?.value ? 'estimator' : 'direct';
          const projectTypesLabel=selectedProjectTypes.join(' + ');
          let originPage='direct';
          try { originPage=sessionStorage.getItem(contactSourceKey) || (enquirySource==='planner' ? 'project-planner' : enquirySource==='estimator' ? 'project-estimator' : 'direct'); } catch {}
          emit('ka_contact_submit',{source:enquirySource,originPage,projectTypes:projectTypesLabel});
          button.disabled=true;label.textContent='Sending…';
          try {
            const formData=new FormData(form);
            const fields:Record<string,unknown>=Object.fromEntries(formData);
            fields.projectType=formData.getAll('projectType').map(value=>String(value));
            fields.enquirySource=enquirySource;
            fields.originPage=originPage;
            Object.assign(fields,getAttributionPayload());
            fields.experiments=getExperimentContext();
            const response=await fetch(form.getAttribute('action') || '/api/contact', {
              method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
              body:JSON.stringify(fields),credentials:'same-origin',cache:'no-store'
            });
            const result=await response.json().catch(()=>null);
            if (!response.ok || !result || result.ok!==true) throw new Error(result?.message || 'Unable to send right now.');
            status.dataset.state='success';status.setAttribute('role','status');status.textContent='Thanks — your enquiry has been sent. We’ll reply by email.';emit('ka_contact_success',{source:enquirySource,originPage,projectTypes:projectTypesLabel});
            if (fromPlanner || fromEstimator) {
              try { sessionStorage.removeItem(plannerStorageKey); sessionStorage.removeItem(estimatorStorageKey); } catch {}
              try { localStorage.removeItem(plannerStorageKey); localStorage.removeItem(estimatorStorageKey); } catch {}
            }
            try { sessionStorage.removeItem(contactSourceKey); } catch {}
            try { sessionStorage.setItem('kineticaxis.lastEnquiry.v1',JSON.stringify({source:enquirySource,projectTypes:selectedProjectTypes,at:Date.now()})); } catch {}
            form.reset();
            updateMessageCount();
            window.location.assign('/contact/thank-you');
          } catch (err) {
            emit('ka_contact_error',{source:enquirySource,originPage,projectTypes:projectTypesLabel});status.dataset.state='error';status.setAttribute('role','alert');
            status.textContent='Your message has not been sent. '+(err instanceof Error?err.message:'Please try again.')+' You can also email hello@kineticaxisdigital.co.uk.';
          } finally {button.disabled=false;label.textContent='Send enquiry';}
        };
        form.addEventListener('submit',submit);
        cleanup.push(()=>form.removeEventListener('submit',submit));
      }
    }
    // Case-study filters keep discovery lightweight and fully usable without a framework-level state store.
    const caseFilterGroup=document.querySelector<HTMLElement>('[data-ka-case-filters]');
    if (caseFilterGroup) {
      const caseCards=[...document.querySelectorAll<HTMLElement>('[data-ka-case-card]')];
      const countLabel=document.querySelector<HTMLElement>('[data-ka-case-filter-count]');
      const filterButtons=[...caseFilterGroup.querySelectorAll<HTMLButtonElement>('[data-ka-case-filter]')];
      const applyCaseFilter=(button:HTMLButtonElement)=>{
        const selected=button.dataset.kaCaseFilter?.split(/\s+/).filter(Boolean) || ['all'];
        let visible=0;
        for (const card of caseCards) {
          const tags=card.dataset.kaCaseTags?.split(/\s+/) || [];
          const show=selected.includes('all') || selected.some(tag=>tags.includes(tag));
          card.hidden=!show;
          if (show) {visible++;card.classList.add('ka-is-visible');}
        }
        for (const item of filterButtons) {
          const active=item===button;
          item.classList.toggle('is-active',active);
          item.setAttribute('aria-pressed',String(active));
        }
        if (countLabel) countLabel.textContent=`Showing ${selected.includes('all')?'all':visible} ${visible===1?'case study':'case studies'}`;
      };
      for (const button of filterButtons) {
        const onClick=()=>applyCaseFilter(button);
        button.addEventListener('click',onClick);
        cleanup.push(()=>button.removeEventListener('click',onClick));
      }
    }

    // Homepage advert lightbox. The video keeps a data-src until the first
    // open, so no media bytes are downloaded during normal page views.
    const adDialog=document.getElementById('ka-advert-dialog');
    const adTrigger=document.querySelector<HTMLButtonElement>('[data-ka-ad-open]');
    const adVideo=adDialog?.querySelector<HTMLVideoElement>('video');
    if (adDialog && adTrigger) {
      let adReturnFocus:HTMLElement|null=null;
      const adClose=()=>{
        if (adDialog.hidden) return;
        adDialog.hidden=true;
        adVideo?.pause();
        document.documentElement.classList.remove('ka-ad-open');
        emit('ka_ad_close');
        const target=adReturnFocus;adReturnFocus=null;
        if (target && document.contains(target)) target.focus();
      };
      const adOpen=()=>{
        adReturnFocus=document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (adVideo) {
          if (!adVideo.getAttribute('src') && adVideo.dataset.src) adVideo.setAttribute('src',adVideo.dataset.src);
          // Every open starts the advert from the beginning and plays it.
          try { adVideo.currentTime=0; } catch {}
          const playback=adVideo.play();
          if (playback && typeof playback.catch==='function') playback.catch(()=>{});
        }
        adDialog.hidden=false;
        document.documentElement.classList.add('ka-ad-open');
        emit('ka_ad_open');
        adDialog.querySelector<HTMLElement>('.ka-video-lightbox__close')?.focus();
      };
      adTrigger.addEventListener('click',adOpen);
      cleanup.push(()=>adTrigger.removeEventListener('click',adOpen));
      adDialog.querySelectorAll<HTMLElement>('[data-ka-ad-close]').forEach(el=>{
        el.addEventListener('click',adClose);
        cleanup.push(()=>el.removeEventListener('click',adClose));
      });
      listen(document,'keydown',(event:KeyboardEvent)=>{
        if (adDialog.hidden) return;
        if (event.key==='Escape') { event.preventDefault(); adClose(); return; }
        if (event.key==='Tab') {
          const items=[...adDialog.querySelectorAll<HTMLElement>('button, video[controls], a[href]')];
          if (!items.length) return;
          const first=items[0] as HTMLElement, last=items[items.length-1] as HTMLElement;
          const active=document.activeElement;
          if (event.shiftKey && (active===first || !adDialog.contains(active))) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && (active===last || !adDialog.contains(active))) { event.preventDefault(); first.focus(); }
        }
      });
    }

    document.querySelectorAll<HTMLElement>('#year').forEach(x=>x.textContent=String(new Date().getFullYear()));
    cleanup.push(initPageMotion());
    return ()=>cleanup.reverse().forEach(fn=>fn());
  },[pageKey]);
  return null;
}
