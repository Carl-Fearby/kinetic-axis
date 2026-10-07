import Link from 'next/link';

type ExperienceAuthorityProps = {
  className?: string;
};

export function ExperienceAuthority({className = ''}: ExperienceAuthorityProps) {
  return (
    <section className={`ka-authority ${className}`.trim()} aria-labelledby="ka-authority-title">
      <div className="ka-authority__inner">
        <div className="ka-authority__copy">
          <div className="ka-authority__kicker">30+ YEARS / HANDS-ON DIGITAL EXPERIENCE</div>
          <h2 id="ka-authority-title">Experience that still gets hands-on.</h2>
          <p>
            Kinetic Axis is led by Carl Fearby, a JavaScript developer and web engineer whose career began in 1995.
            The toolkit has moved from hand-built HTML, CSS and JavaScript through PHP, Angular and mobile work to
            TypeScript, React, Next.js and Node.js — alongside APIs, databases, delivery pipelines and the day-to-day
            realities of keeping software useful after launch.
          </p>
          <p>
            New Kinetic Axis solutions are purpose-built rather than rebadged WordPress themes, page builders or
            off-the-shelf products. If you already depend on WordPress or another established platform, we can maintain
            and improve it, integrate it with other systems, or plan a sensible staged migration when bespoke ownership
            becomes the better long-term fit.
          </p>
          <Link href="/experience" className="ka-authority__link">
            Meet the experience behind Kinetic Axis
            <svg aria-hidden="true" className="ka-heavy-arrow ka-heavy-arrow--right" fill="none"
              height={20} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter"
              strokeWidth={3} viewBox="0 0 24 24" width={20}>
              <path d="M4 12h16m-7-7 7 7-7 7"/>
            </svg>
          </Link>
        </div>
        <div className="ka-authority__facts" aria-label="Experience highlights">
          <article>
            <strong>1995</strong>
            <span>Working in web and software since</span>
          </article>
          <article>
            <strong>30+</strong>
            <span>Years across JavaScript, web engineering, software and product delivery</span>
          </article>
          <article>
            <strong>End to end</strong>
            <span>From browser code and UX to APIs, data, operations and delivery</span>
          </article>
        </div>
      </div>
    </section>
  );
}
