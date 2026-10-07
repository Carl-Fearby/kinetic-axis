import {getExperimentContext} from './experiments';

export type KineticAnalyticsPayload = Record<string,string> & {event:string;page:string};

/**
 * Privacy-conscious first-party conversion telemetry.
 *
 * Events contain only route/interaction metadata that the caller explicitly
 * supplies. Form field values, names, email addresses, free-text messages,
 * cookies and persistent visitor IDs are never added here.
 */
export function trackKineticEvent(payload:KineticAnalyticsPayload){
  if (typeof window==='undefined') return;
  const experiments=getExperimentContext();
  const enriched=experiments && !payload.experiments ? {...payload,experiments} : payload;
  const win=window as Window & {dataLayer?:Array<Record<string,string>>};
  const layer=win.dataLayer ?? (win.dataLayer=[]);
  layer.push(enriched);
  window.dispatchEvent(new CustomEvent('kineticaxis:event',{detail:enriched}));

  // Keep local development quiet: events remain available in dataLayer and
  // through the CustomEvent bridge, but no network request is made on localhost.
  const hostname=window.location.hostname;
  if(process.env.NODE_ENV!=='production'||hostname==='localhost'||hostname==='127.0.0.1'||hostname==='[::1]') return;

  // Production conversion telemetry uses a dedicated endpoint so contact-form
  // traffic and anonymous interaction events stay completely separate.
  try {
    void fetch('/api/events',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(enriched),
      credentials:'same-origin',
      cache:'no-store',
      keepalive:true,
    }).catch(()=>{});
  } catch {}
}
