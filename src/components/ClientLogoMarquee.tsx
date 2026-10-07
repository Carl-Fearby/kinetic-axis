const CLIENTS = [
  { name: 'Virgin Media', src: '/assets/client-logos/virgin-media.png', width: 205, height: 128, className: 'client-logo--virgin-media' },
  { name: 'O2', src: '/assets/client-logos/o2.png', width: 100, height: 96, className: 'client-logo--o2' },
  { name: 'giffgaff', src: '/assets/client-logos/giffgaff.png', width: 197, height: 74, className: 'client-logo--giffgaff' },
  { name: 'Tesco Mobile', src: '/assets/client-logos/tesco-mobile.png', width: 217, height: 94, className: 'client-logo--tesco-mobile' },
  { name: 'Virgin Mobile', src: '/assets/client-logos/virgin-mobile.png', width: 181, height: 104, className: 'client-logo--virgin-mobile' },
  { name: 'Compusoft', src: '/assets/client-logos/compusoft.png', width: 249, height: 68, className: 'client-logo--compusoft' },
  { name: 'Cyncly', src: '/assets/client-logos/cyncly.png', width: 241, height: 72, className: 'client-logo--cyncly' },
  { name: 'The Open University', src: '/assets/client-logos/open-university.png', width: 212, height: 88, className: 'client-logo--open-university' },
  { name: 'easyfundraising', src: '/assets/client-logos/easyfundraising.png', width: 304, height: 74, className: 'client-logo--easyfundraising' },
  { name: 'Carrentals.co.uk', src: '/assets/client-logos/carrentals.png', width: 410, height: 48, className: 'client-logo--carrentals' },
] as const;

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="client-marquee__group" aria-hidden={duplicate || undefined}>
      {CLIENTS.map((client) => (
        <div className="client-marquee__item" key={`${duplicate ? 'duplicate-' : ''}${client.name}`}>
          <img
            alt={duplicate ? '' : client.name}
            className={`client-marquee__logo ${client.className}`}
            decoding="sync"
            height={client.height}
            loading="eager"
            src={client.src}
            width={client.width}
          />
        </div>
      ))}
    </div>
  );
}

export function ClientLogoMarquee() {
  // No explicit react-dom preload() here. React already emits one
  // <link rel="preload" as="image"> per non-lazy logo in the static export, so
  // the extra call only duplicated head entries. The track is below the fold and
  // the two duplicate groups reuse the same URLs from cache, so there is no fetch
  // for the extra copies to avoid.
  return (
    <section className="client-marquee" aria-labelledby="client-marquee-title">
      <div className="container client-marquee__intro">
        <div className="client-marquee__eyebrow"><span>Trusted experience</span></div>
        <h2 id="client-marquee-title">Companies we&apos;ve worked with</h2>
        <p>
          Experience across telecoms, technology, education, construction and consumer platforms —
          bringing design and engineering together around real-world digital products.
        </p>
      </div>
      <div className="client-marquee__viewport" aria-label="Companies Kinetic Axis has worked with">
        <div className="client-marquee__track">
          <LogoGroup />
          <LogoGroup duplicate />
          <LogoGroup duplicate />
        </div>
      </div>
      <div className="container client-marquee__rule" aria-hidden="true">
        <span></span><i></i><span></span>
      </div>
    </section>
  );
}
