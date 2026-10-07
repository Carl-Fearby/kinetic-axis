import Link from 'next/link';
import { commercialLinkFor } from '../content/commercial-links';

const COPY: Record<string, {title:string; text:string; label:string}> = {
  'Web design': {
    title:'Need a website that explains the business better?',
    text:'Tell us what the current site is missing, who it needs to reach and what visitors should be able to do next.',
    label:'Enquire about web design',
  },
  'Web application development': {
    title:'Need a browser-based product that makes a real task easier?',
    text:'Share the users, workflow, data and integrations involved. We can help shape the right first version.',
    label:'Discuss a web app',
  },
  'Bespoke software development': {
    title:'Need software shaped around the way the business actually works?',
    text:'Start with the process, the people using it and the friction in the current approach. We can turn that into a practical scope.',
    label:'Discuss bespoke software',
  },
  'Mobile application': {
    title:'Planning a mobile product?',
    text:'Tell us who will use it, what should happen on the device and which systems need to sit behind the experience.',
    label:'Discuss a mobile app',
  },
  'UI / UX / branding': {
    title:'Need a product interface that feels more coherent?',
    text:'Share the journeys, screens or design-system problems you want to improve and we can work through the right next step.',
    label:'Discuss UI/UX work',
  },
  'API and systems integration': {
    title:'Need systems to exchange data more reliably?',
    text:'Tell us what needs to connect, where the data lives and what the successful workflow should look like.',
    label:'Discuss an integration',
  },
  'Platforms and back-office systems': {
    title:'Need an operational platform that fits the workflow?',
    text:'Share the users, permissions, data and day-to-day tasks. We can help shape the right internal product.',
    label:'Discuss a platform',
  },
  'Booking system development': {
    title:'Planning a booking journey?',
    text:'Tell us what customers need to book, what staff need to control and where availability comes from.',
    label:'Discuss a booking system',
  },
  'Hospitality software development': {
    title:'Planning hospitality software?',
    text:'Share the guest journey, venue workflow and systems involved. We can help connect the customer and operational sides.',
    label:'Discuss hospitality software',
  },
  'White-label app development': {
    title:'Planning a white-label app product?',
    text:'Tell us how brands, tenants, data and distribution need to differ while the product stays maintainable underneath.',
    label:'Discuss a white-label app',
  },
};

function Arrow(){
  return <svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21}
    stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
    viewBox="0 0 24 24" width={21}><path d="M5 19 19 5M8 5h11v11"/></svg>;
}

export function ConversationCTA({service, guide=false, title, text, kicker}:{service:string; guide?:boolean; title?:string; text?:string; kicker?:string}) {
  const canonical = commercialLinkFor(service);
  const copy = COPY[service] || {
    title:`Have a ${canonical?.title.toLowerCase() || 'digital'} project in mind?`,
    text:'Tell us what people need to do, where the friction is today and what a better result would look like.',
    label:'Start a conversation',
  };

  const heading=title || (guide && canonical ? `Planning ${canonical.title.toLowerCase()}?` : copy.title);
  const body=text || (guide
    ? 'Use the guide as a starting point, then bring the real workflow, users, integrations and constraints. We can help turn that context into a practical first scope.'
    : copy.text);
  const eyebrow=kicker || (guide ? 'TURN THE GUIDE INTO A REAL SCOPE' : 'START A CONVERSATION');

  return (
    <section className="mkt-cta ka-conversation">
      <div className="mkt-wrap mkt-cta-inner">
        <div>
          <div className="mkt-kicker">{eyebrow}</div>
          <h2>{heading}</h2>
          <p>{body}</p>
        </div>
        <div className="ka-conversation__actions">
          <Link
            href={`/contact?service=${encodeURIComponent(service)}`}
            className="mkt-btn"
            data-ka-track="contact-cta"
            data-ka-track-label={service}
          >
            <span className="kad-cta-label">{guide ? 'Discuss your project' : copy.label}</span><Arrow/>
          </Link>
          {guide && canonical ? (
            <Link href={canonical.href} className="mkt-btn mkt-btn--outline" data-ka-track="service-from-guide">
              <span className="kad-cta-label">Explore {canonical.title}</span><Arrow/>
            </Link>
          ) : (
            <Link href="/approach" className="mkt-btn mkt-btn--outline" data-ka-track="approach-from-service">
              <span className="kad-cta-label">See how projects start</span><Arrow/>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
