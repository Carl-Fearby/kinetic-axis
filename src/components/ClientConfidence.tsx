import Link from 'next/link';

export function ClientConfidence() {
  return (
    <section className="ka-confidence" aria-labelledby="ka-confidence-title">
      <div className="ka-confidence__inner">
        <div className="ka-confidence__head">
          <div>
            <span>WORKING WITH KINETIC AXIS</span>
            <h2 id="ka-confidence-title">Senior thinking stays close to the work.</h2>
          </div>
          <p>
            Good delivery is not just the build. It is making the important decisions visible,
            agreeing responsibilities early and keeping the product useful after launch.
          </p>
        </div>
        <div className="ka-confidence__grid">
          <article>
            <small>01 / SENIOR-LED</small>
            <h3>Direct technical and product input</h3>
            <p>Discovery, design and engineering decisions stay close to the people doing the work rather than passing through layers of account management.</p>
          </article>
          <article>
            <small>02 / SCOPE</small>
            <h3>Clarity before commitment</h3>
            <p>We work through users, workflows, integrations and risk before turning a broad idea into a technical commitment.</p>
          </article>
          <article>
            <small>03 / DELIVERY</small>
            <h3>Responsibilities agreed up front</h3>
            <p>Handover, hosting, support, documentation and ongoing development are discussed as part of the project rather than left until launch week.</p>
          </article>
          <article>
            <small>04 / LONGEVITY</small>
            <h3>Useful after launch day</h3>
            <p>Decisions are made with maintainability, real users and future change in mind — not just how the first release looks in a presentation.</p>
          </article>
        </div>
        <div className="ka-confidence__links">
          <Link href="/approach">See how projects run</Link>
          <Link href="/experience">Meet the experience behind the studio</Link>
        </div>
      </div>
    </section>
  );
}
