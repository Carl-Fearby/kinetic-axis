import { optimizedImage } from '../lib/optimized-images';

// `displayWidth` mirrors each logo's CSS cap (index.css .client-logo--*) so the
// browser fetches no more than cap × device pixel ratio.
const CLIENTS: readonly { name: string; src: string; width: number; height: number; className: string; displayWidth: number }[] = [
  { name: 'Virgin Media', src: '/assets/client-logos/virgin-media.png', width: 205, height: 128, className: 'client-logo--virgin-media', displayWidth: 104 },
  { name: 'O2', src: '/assets/client-logos/o2.png', width: 100, height: 96, className: 'client-logo--o2', displayWidth: 54 },
  { name: 'giffgaff', src: '/assets/client-logos/giffgaff.png', width: 197, height: 74, className: 'client-logo--giffgaff', displayWidth: 112 },
  { name: 'Tesco Mobile', src: '/assets/client-logos/tesco-mobile.png', width: 217, height: 94, className: 'client-logo--tesco-mobile', displayWidth: 110 },
  { name: 'Virgin Mobile', src: '/assets/client-logos/virgin-mobile.png', width: 181, height: 104, className: 'client-logo--virgin-mobile', displayWidth: 96 },
  { name: 'Compusoft', src: '/assets/client-logos/compusoft.png', width: 249, height: 68, className: 'client-logo--compusoft', displayWidth: 126 },
  { name: 'Cyncly', src: '/assets/client-logos/cyncly.png', width: 241, height: 72, className: 'client-logo--cyncly', displayWidth: 122 },
  { name: 'The Open University', src: '/assets/client-logos/open-university.png', width: 212, height: 88, className: 'client-logo--open-university', displayWidth: 112 },
  { name: 'easyfundraising', src: '/assets/client-logos/easyfundraising.png', width: 304, height: 74, className: 'client-logo--easyfundraising', displayWidth: 152 },
  { name: 'Carrentals.co.uk', src: '/assets/client-logos/carrentals.png', width: 410, height: 48, className: 'client-logo--carrentals', displayWidth: 205 },
  { name: 'Veyra Studio', src: '/assets/client-logos/veyra.webp', width: 900, height: 300, className: 'client-logo--veyra', displayWidth: 164 },
  { name: 'Emberlyn', src: '/assets/client-logos/emberlyn.webp', width: 900, height: 300, className: 'client-logo--emberlyn', displayWidth: 164 },
  { name: 'Heart of England', src: '/assets/client-logos/heart-of-england.png', width: 768, height: 175, className: 'client-logo--heart-of-england', displayWidth: 184 },
  { name: 'Tata Consultancy Services (TCS)', src: '/assets/client-logos/tcs-transparent.png', width: 2170, height: 725, className: 'client-logo--tcs', displayWidth: 154 },
  { name: 'CEMEX', src: '/assets/client-logos/cemex.png', width: 600, height: 108, className: 'client-logo--cemex', displayWidth: 156 },
] as const;

const CLIENT_ROWS = [CLIENTS.filter((_, index) => index % 2 === 0), CLIENTS.filter((_, index) => index % 2 === 1)];

function LogoGroup({ clients, duplicate = false }: { clients: typeof CLIENTS; duplicate?: boolean }) {
  return (
    <div className="client-marquee__group" aria-hidden={duplicate || undefined}>
      {clients.map((client) => {
        const optimized = optimizedImage(client.src, `${client.displayWidth}px`);
        return (
        <div className="client-marquee__item" key={`${duplicate ? 'duplicate-' : ''}${client.name}`}>
          <img
            alt={duplicate ? '' : client.name}
            className={`client-marquee__logo ${client.className}`}
            style={client.className === 'client-logo--cemex' ? { filter: 'grayscale(1)' } : undefined}
            decoding="sync"
            height={client.height}
            loading="eager"
            sizes={optimized.sizes}
            src={optimized.src}
            srcSet={optimized.srcSet}
            width={client.width}
          />
        </div>
        );
      })}
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
      <div className="client-marquee__rows" aria-label="Companies Kinetic Axis has worked with">
        {CLIENT_ROWS.map((clients, index) => (
          <div className="client-marquee__viewport" key={index}>
            <div className={`client-marquee__track${index === 1 ? ' client-marquee__track--reverse' : ''}`}>
              <LogoGroup clients={clients} />
              <LogoGroup clients={clients} duplicate />
              <LogoGroup clients={clients} duplicate />
            </div>
          </div>
        ))}
      </div>
      <div className="container client-marquee__rule" aria-hidden="true">
        <span></span><i></i><span></span>
      </div>
    </section>
  );
}
