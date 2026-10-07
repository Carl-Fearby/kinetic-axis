import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '../../../src/components/SiteHeader';
import {SiteFooter} from '../../../src/components/SiteFooter';
import {SiteRuntime} from '../../../src/components/SiteRuntime';

export const metadata:Metadata={
  title:'Enquiry received | Kinetic Axis',
  description:'Your Kinetic Axis project enquiry has been received.',
  alternates:{canonical:'https://kineticaxisdigital.com/contact/thank-you'},
  robots:'noindex,nofollow',
};

export default function Page(){
  return <div className="site-root ka-thanks-page" data-ka-page="contact/thank-you">
    <link rel="stylesheet" href="/page-css/contact.css" />
    <a className="ka-skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader pageKey="contact"/>
    <main id="main-content" tabIndex={-1} className="ka-thanks">
      <section className="ka-thanks__hero"><div className="ka-thanks__inner">
        <div className="ka-thanks__mark" aria-hidden="true">✓</div>
        <div className="eyebrow">ENQUIRY RECEIVED</div>
        <h1>Thanks. We’ve got it.</h1>
        <p>Your enquiry is with Kinetic Axis. You’ll also receive a confirmation email, and we’ll reply after we’ve reviewed what you sent.</p>
        <div className="ka-thanks__actions"><Link className="button" href="/work"><span>See our work</span><span aria-hidden="true">↗</span></Link><Link className="button button-ghost" href="/insights"><span>Read our insights</span><span aria-hidden="true">↗</span></Link></div>
      </div></section>
      <section className="ka-thanks__next"><div className="ka-thanks__inner"><div className="eyebrow">WHAT HAPPENS NEXT</div><div className="ka-thanks__grid"><article><b>01</b><h2>We read the context.</h2><p>We review the problem, project areas and any planner or estimator summary you attached.</p></article><article><b>02</b><h2>We clarify what matters.</h2><p>If something needs unpacking, we’ll focus on users, workflows, constraints and the first useful release.</p></article><article><b>03</b><h2>We agree the next step.</h2><p>That may be discovery, a scoped piece of work or simply a clear recommendation on what to do next.</p></article></div></div></section>
    </main>
    <SiteFooter/><SiteRuntime pageKey="contact/thank-you"/>
  </div>;
}
