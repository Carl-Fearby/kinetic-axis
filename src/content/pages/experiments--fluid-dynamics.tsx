import { FluidCanvas } from '../../components/FluidCanvas';

export default function PageContent(){return <main className="mkt-page ka-fluid-page" id="main-content" tabIndex={-1}>
  <section className="ka-fluid-stage" aria-labelledby="ka-fluid-title">
    <FluidCanvas/>
    <div className="ka-fluid-shade" aria-hidden="true"/>
    <div className="ka-fluid-overlay">
      <div className="ka-fluid-kicker">EXPERIMENT / 01</div>
      <h1 id="ka-fluid-title">Fluid Dynamics</h1>
      <p>Move through the field, then click and drag to disturb it.</p>
    </div>
    <div className="ka-fluid-instruction" aria-hidden="true">
      <span className="ka-fluid-instruction__mark"><i/><i/></span>
      <span className="ka-fluid-instruction__label">CLICK + DRAG</span>
    </div>
  </section>
 </main>}
