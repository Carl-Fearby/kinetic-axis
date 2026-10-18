/**
 * Build-time image optimisation helper.
 *
 * `scripts/optimize-images.mjs` generates responsive WebP variants for the
 * client-logo marquee and the project-card artwork, and records them in
 * `src/content/optimized-images.json`. This helper turns a manifest entry into
 * `src` / `srcSet` / `sizes` props; any source missing from the manifest falls
 * back to the original file unchanged.
 *
 * Static export: there is no runtime image service, so every variant is a
 * pre-generated file under /assets/optimized/.
 */
import manifest from '../content/optimized-images.json';

type ManifestVariant = { src: string; width: number; bytes?: number };
type ManifestEntry = { width?: number; height?: number; variants: ManifestVariant[] };

const entries = manifest as Record<string, ManifestEntry>;

export type OptimizedImageProps = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

export function optimizedImage(source: string, sizes?: string): OptimizedImageProps {
  const entry = entries[source];
  if (!entry?.variants?.length) return { src: source };
  const variants = [...entry.variants].sort((a, b) => a.width - b.width);
  return {
    src: variants[0].src,
    srcSet: variants.map(variant => `${variant.src} ${variant.width}w`).join(', '),
    sizes,
  };
}

/** Relevant-work card grid columns: 3-up at desktop, 2-up on tablet, full width on phones. */
export const WORKCARD_SIZES = '(max-width:560px) 90vw, (max-width:800px) 50vw, 32vw';

const PROJECT_KEYS = ['pace', 'ebuygum', 'opus', 'vx27', 'veyra', 'emberlyn'] as const;
export type ProjectKey = typeof PROJECT_KEYS[number];

const PROJECT_SOURCES: Record<ProjectKey, string> = {
  pace: '/assets/project-pace.jpg',
  ebuygum: '/assets/project-ebuygum.jpg',
  opus: '/assets/project-opus.jpg',
  vx27: '/assets/project-vx27.jpg',
  veyra: '/assets/project-veyra.jpg',
  emberlyn: '/assets/project-emberlyn.jpg',
};

/** Ready variants for the six project artwork images used across service and case-study pages. */
export function projectImages(keys: readonly ProjectKey[], sizes: string = WORKCARD_SIZES) {
  return Object.fromEntries(keys.map(key => [
    key, optimizedImage(PROJECT_SOURCES[key], sizes),
  ])) as Record<ProjectKey, OptimizedImageProps>;
}
