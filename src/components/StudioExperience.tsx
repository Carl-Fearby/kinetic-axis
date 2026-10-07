import Link from 'next/link';

export function StudioExperience() {
  return (
    <section className="ka-studio-history" aria-labelledby="ka-studio-history-title">
      <div className="ka-studio-history__inner">
        <div className="ka-studio-history__head">
          <div>
            <div className="eyebrow">THREE DECADES OF MAKING DIGITAL THINGS WORK</div>
            <h2 id="ka-studio-history-title">30+ years in. Still close to the code.</h2>
          </div>
          <p>
            Kinetic Axis is led by Carl Fearby, a JavaScript developer whose career has moved through
            technical leadership, running a development company, commercial e-commerce, mobile applications,
            Angular, enterprise interfaces, APIs and DevOps through to today's TypeScript, React, Next.js and Node.js work.
            The focus is web engineering rather than loyalty to any one framework.
          </p>
        </div>

        <div className="ka-studio-history__timeline">
          <article>
            <span>1995–2003</span>
            <h3>Early web & technical leadership</h3>
            <p>
              Technical management at Bluespheres, building bespoke web systems and helping grow
              a team of designers and developers.
            </p>
          </article>
          <article>
            <span>2003–2010</span>
            <h3>Running a digital development studio</h3>
            <p>
              Managing Director at Oceanworks, leading web and software delivery including a CRM,
              a bespoke CMS and a studio that grew to ten developers and designers.
            </p>
          </article>
          <article>
            <span>2010–2022</span>
            <h3>Commercial platforms & engineering</h3>
            <p>
              Senior development and technical-lead work across e-commerce, mobile applications,
              Angular, secure APIs, global teams and CI/CD delivery.
            </p>
          </article>
          <article>
            <span>2022 onward</span>
            <h3>Enterprise product engineering</h3>
            <p>
              More recent experience includes Virgin Media and the Open University, spanning
              JavaScript, TypeScript, Angular, React, Next.js, customer-facing experiences and internal product tooling.
            </p>
          </article>
        </div>

        <div className="ka-studio-history__footer">
          <div className="ka-studio-history__principle">
            <span>WHAT THAT MEANS FOR CLIENTS</span>
            <strong>Senior thinking stays in the room.</strong>
            <p>
              The value is not the number on its own. It is knowing which complexity is necessary,
              which can be avoided, and how design and engineering decisions affect a product after
              the launch-day excitement has passed.
            </p>
            <p className="ka-studio-base"><strong>Warwickshire, UK.</strong> Independent studio, working with organisations locally and across the UK.</p>
            <div className="ka-studio-history__actions">
              <Link href="/work">Explore selected work</Link>
              <Link href="/experience">View experience</Link>
              <Link href="/contact">Discuss a project</Link>
            </div>
          </div>

          <aside className="ka-apple-note" aria-label="Apple, the studio cat">
            <span>STUDIO ASSISTANT / APPLE</span>
            <strong>Unofficial keyboard QA.</strong>
            <p>
              Apple is the studio cat and occasional deploy-script stress tester. Her specialist
              move is walking across the keyboard at exactly the wrong moment.
            </p>
            <small>CAT FEET / CHAOS TESTING / ZERO RESPECT FOR BRACKETS</small>
          </aside>
        </div>
      </div>
    </section>
  );
}
