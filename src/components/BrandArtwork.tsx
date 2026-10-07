/** One editable, reusable illustration frame for every service / overview hero. */
type Props = {
  className?: string;
  label: string;
  heading: string;
  mode: string;
  footer: string;
  ariaLabel?: string;
};

const PROFESSIONAL_SERVICE_ART: Record<string, string> = {
  'mkt-hero-art--project-planner': '/assets/service-hero-pro/project-planner.webp',
  // Dedicated overview artwork. These unique classes avoid v06/v07 being shared by
  // multiple pages while keeping the established 8:5 hero treatment consistent.
  'mkt-hero-art--solutions': '/assets/service-hero-pro/solutions.webp',
  'mkt-hero-art--insights': '/assets/service-hero-pro/insights.webp',
  'mkt-hero-art--services': '/assets/service-hero-pro/services.webp',
  'mkt-hero-art--work': '/assets/service-hero-pro/work.webp',
  'mkt-hero-art--experiments': '/assets/service-hero-pro/experiments.webp',
  'mkt-hero-art--phase3-design-system': '/assets/service-hero-pro/ui-ux-design-systems.webp',
  'mkt-hero-art--phase3-react-components': '/assets/service-hero-pro/ui-ux-design-systems.webp',
  'mkt-hero-art--phase3-enterprise-ui': '/assets/service-hero-pro/platforms-back-office-systems.webp',
  'mkt-hero-art--phase3-nextjs': '/assets/service-hero-pro/web-app-development.webp',
  'mkt-hero-art--phase3-node-api': '/assets/service-hero-pro/api-systems-integration.webp',
  'mkt-hero-art--phase3-professional-services': '/assets/service-hero-pro/bespoke-software-development.webp',
  'mkt-hero-art--phase3-sme-transformation': '/assets/service-hero-pro/digital-product-development.webp',
  'mkt-hero-art--phase3-warwickshire': '/assets/service-hero-pro/web-design.webp',
  'mkt-hero-art--phase3-insight-design-system': '/assets/service-hero-pro/ui-ux-design-systems.webp',
  'mkt-hero-art--phase3-insight-react-components': '/assets/service-hero-pro/ui-ux-design-systems.webp',
  'mkt-hero-art--phase3-insight-customer-portal': '/assets/service-hero-pro/platforms-back-office-systems.webp',
  'mkt-hero-art--phase3-insight-legacy': '/assets/service-hero-pro/bespoke-software-development.webp',
  'mkt-hero-art--phase3-insight-saas': '/assets/service-hero-pro/digital-product-development.webp',
  'mkt-hero-art--phase3-insight-internal-system': '/assets/service-hero-pro/platforms-back-office-systems.webp',
  'mkt-hero-art--v01': '/assets/service-hero-pro/web-design.webp',
  'mkt-hero-art--v02': '/assets/service-hero-pro/bespoke-software-development.webp',
  'mkt-hero-art--v03': '/assets/service-hero-pro/web-app-development.webp',
  'mkt-hero-art--v04': '/assets/service-hero-pro/mobile-app-development.webp',
  'mkt-hero-art--v05': '/assets/service-hero-pro/ui-ux-design-systems.webp',
  'mkt-hero-art--v06': '/assets/service-hero-pro/mobile-app-development.webp',
  'mkt-hero-art--v07': '/assets/service-hero-pro/digital-product-development.webp',
  'mkt-hero-art--v08': '/assets/service-hero-pro/digital-product-development.webp',
  'mkt-hero-art--v09': '/assets/service-hero-pro/platforms-back-office-systems.webp',
  'mkt-hero-art--v10': '/assets/service-hero-pro/api-systems-integration.webp',
  'mkt-hero-art--v11': '/assets/service-hero-pro/web-app-development.webp',
};

function ArtArrow() {
  return (
    <svg aria-hidden="true" className="mkt-art-arrow" fill="none" height={21}
      stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter"
      strokeWidth={3} viewBox="0 0 24 24" width={21}>
      <path d="M4 12h16m-7-7 7 7-7 7" />
    </svg>
  );
}

export function BrandArtwork({ className = 'mkt-hero-art', label, heading, mode, footer, ariaLabel }: Props) {
  const professionalImage = Object.entries(PROFESSIONAL_SERVICE_ART)
    .find(([variant]) => className.split(/\s+/).includes(variant))?.[1];

  if (professionalImage) {
    return (
      <div
        className={`${className} mkt-hero-art--photo`}
        aria-hidden="true"
      >
        <img
          aria-hidden="true"
          alt=""
          src={professionalImage}
          width={1586}
          height={992}
          decoding="async"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div className={className} aria-label={ariaLabel}>
      <small>{label}</small>
      <strong>{heading}</strong>
      {mode === 'steps' ? (
        <div className="mkt-art-foot mkt-art-steps">
          <span>Discover the need</span><ArtArrow />
          <span>Design the journey</span><ArtArrow />
          <span>Build with purpose</span>
        </div>
      ) : <span className="mkt-art-foot mkt-art-foot--plain">{footer}</span>}
    </div>
  );
}
