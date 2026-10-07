'use client';

type AdminSection='growth'|'leads';

export function AdminHeader({active,title,description}:{active:AdminSection;title:string;description:string}){
  return <header className="ka-admin__head">
    <div className="ka-admin__intro">
      <span>KINETIC AXIS / INTERNAL</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    <div className="ka-admin__actions">
      <nav className="ka-admin__nav" aria-label="Admin sections">
        <a href="/admin/growth" aria-current={active==='growth'?'page':undefined} className={active==='growth'?'is-active':undefined}>Growth</a>
        <a href="/admin/leads" aria-current={active==='leads'?'page':undefined} className={active==='leads'?'is-active':undefined}>Leads</a>
      </nav>
      <a className="ka-admin__site" href="/">Back to site ↗</a>
    </div>
  </header>;
}
