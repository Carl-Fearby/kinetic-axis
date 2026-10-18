import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { optimizedImage } from '../lib/optimized-images';
import news from '../content/news.json';
export type NewsSectionText = { heading?: string; paragraphs: string[]; media?: { src: string; alt: string; caption?: string } };
export type NewsCategoryKey = 'projects' | 'engineering' | 'ai' | 'strategy' | 'company';

export type NewsStoryData = {
  date: string;
  slug: string;
  category: NewsCategoryKey;
  tags: string[];
  title: string;
  logo?: string;
  logoAlt?: string;
  image: string;
  imageAlt: string;
  /** Landing flagship marker; the grid and story pages are unaffected. */
  featured?: boolean;
  /** Opt out of the homepage latest-3 showcase; the story stays on /news and category pages. */
  hideOnHome?: boolean;
  /** "contain": card tile keeps the tight cover crop, the story hero shows the
   *  full uncropped composition so in-image context stays readable. */
  heroFit?: 'contain';
  snippet: string;
  seoTitle?: string;
  seoDescription?: string;
  project?: { label: string; text: string; url?: string; urlLabel?: string; internal?: boolean };
  services?: { label: string; href: string }[];
  body: NewsSectionText[];
};

export const NEWS_CATEGORIES: Record<NewsCategoryKey, { name: string }> = {
  projects: { name: 'Projects & case studies' },
  engineering: { name: 'Engineering & technology' },
  ai: { name: 'AI & innovation' },
  strategy: { name: 'Digital strategy' },
  company: { name: 'Company news' },
};

/** Newest first; the source array is arranged visually, sorting stays explicit. */
export const newsSorted = [...news.items as NewsStoryData[]].sort((a, b) => b.date.localeCompare(a.date));

/** Editorial date lookup for a story slug; kept in step with sitemap lastmod. */
export function newsStory(slug: string): NewsStoryData {
  const item = (news.items as NewsStoryData[]).find(entry => entry.slug === slug);
  if (!item) throw new Error(`Unknown news story: ${slug}`);
  return item;
}

export function storiesByCategory(category: string): NewsStoryData[] {
  return newsSorted.filter(item => item.category === (category as NewsCategoryKey));
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const dateShortFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const wordCount = (story: NewsStoryData) => story.body.flatMap(section => section.paragraphs).join(' ').split(/\s+/).length;

function ordinalDay(iso: string, withYear: boolean) {
  const fmt = withYear ? dateFmt : dateShortFmt;
  return fmt.formatToParts(new Date(`${iso}T00:00:00Z`)).map(part => {
    if (part.type !== 'day') return part.value;
    const day = Number(part.value);
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return `${part.value}${suffix}`;
  }).join('');
}

export function formattedDate(iso: string) {
  return ordinalDay(iso, false);
}

export function formattedDateWithYear(iso: string) {
  return ordinalDay(iso, true);
}

export function readingTime(story: NewsStoryData) {
  return `${Math.max(2, Math.round(wordCount(story) / 200))} min read`;
}

const Arrow = () => <svg aria-hidden="true" className="ka-heavy-arrow" fill="none" height={20}
  stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
  viewBox="0 0 24 24" width={20}><path d="M5 19 19 5M8 5h11v11"/></svg>;

/** Card used on the news landing, category pages and the homepage showcase. */
export function NewsCard({ story }: { story: NewsStoryData }) {
  const tile = story.logo
    ? optimizedImage(story.logo, '(max-width:640px) 90vw, (max-width:1000px) 45vw, 30vw')
    : optimizedImage(story.image, '(max-width:640px) 90vw, (max-width:1000px) 45vw, 30vw');
  return (
    <Link className="news-card" data-ka-track="news-card" href={`/news/${story.slug}`}>
      {story.logo ? (
        <span className="news-card__img news-card__img--logo"><img alt="" decoding="async" height={252} loading="lazy" src={tile.src} srcSet={tile.srcSet} sizes={tile.sizes} width={448}/></span>
      ) : (
        <span className="news-card__img"><img alt="" decoding="async" height={252} loading="lazy" src={tile.src} srcSet={tile.srcSet} sizes={tile.sizes} width={448}/></span>
      )}
      <span className="news-card__meta">
        <span className="news-card__category">{NEWS_CATEGORIES[story.category].name}</span>
        <span className="news-card__date">{formattedDate(story.date)} · {readingTime(story)}</span>
      </span>
      <h2>{story.title}</h2>
      <p>{story.snippet}</p>
      <span className="news-card__more">Read the story <Arrow/></span>
    </Link>
  );
}

export function NewsStory({slug}: {slug: string}) {
  const story = newsStory(slug);
  const brand = story.logo ? optimizedImage(story.logo, '(min-width:900px) 640px, 90vw') : null;
  const image = optimizedImage(story.image, '(min-width:900px) 900px, 90vw');
  const related = newsSorted.filter(item => item.slug !== story.slug && item.category === story.category).slice(0, 2);
  const further = newsSorted.filter(item => item.slug !== story.slug && item.category !== story.category).slice(0, 3 - related.length);
  const relatedStories = [...related, ...further].slice(0, 3);
  const project = story.project;
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="subhero">
        <div className="container">
          <Breadcrumbs className="breadcrumb" items={[{"label": "Home", "href": "/"}, {"label": "News", "href": "/news"}, {"label": story.title}]} />
          <div className="eyebrow">{formattedDateWithYear(story.date)} · {readingTime(story)}</div>
          <h1>{story.title}</h1>
          {project ? (
            <p className="news-story__project">
              {project.label}: {project.text}
              {project.url ? (project.internal
                ? <Link href={project.url}> · {project.urlLabel} <Arrow/></Link>
                : <a href={project.url} rel="noopener noreferrer" target="_blank"> · {project.urlLabel} <Arrow/></a>
              ) : null}
            </p>
          ) : null}
        </div>
      </section>
      <section className="subsection">
        <div className="container">{brand ? (
          <img alt={story.logoAlt || ''} className="news-story__media news-story__media--logo" decoding="async" height={382} loading="eager" src={brand.src} srcSet={brand.srcSet} sizes={brand.sizes} width={680}/>
        ) : (
          <img alt={story.imageAlt} className={story.heroFit === 'contain' ? 'news-story__media news-story__media--full' : 'news-story__media'} decoding="async" height={810} loading="eager" src={image.src} srcSet={image.srcSet} sizes={image.sizes} width={1440}/>
        )}</div>
        <article className="container container--narrow news-story">
          {story.body.map((section, index) => (
            <section key={index}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs.map((paragraph, p) => <p key={p}>{paragraph}</p>)}
              {section.media ? (
                <figure className="news-story__figure">
                  <img alt={section.media.alt} decoding="async" height={531} loading="lazy" src={optimizedImage(section.media.src, '90vw').src} width={944}/>
                  <figcaption>{section.media.caption}</figcaption>
                </figure>
              ) : null}
            </section>
          ))}
          {story.services?.length ? (
            <div className="news-story__links">
              {story.services.map(service => (
                <Link href={service.href} key={service.href}>{service.label} <Arrow/></Link>
              ))}
            </div>
          ) : null}
          <Link href="/news" className="news-story__back">Back to all news</Link>
        </article>
      </section>
      {relatedStories.length ? (
        <section className="subsection news-related">
          <div className="container">
            <h2>More from the studio.</h2>
            <div className="ka-news-grid">
              {relatedStories.map(item => <NewsCard key={item.slug} story={item}/>)}
            </div>
          </div>
        </section>
      ) : null}
      <section className="subcta">
        <div className="container subcta-inner">
          <h2>Working on something similar?</h2>
          <Link href="/contact" className="button"><span className="kad-cta-label">Start a conversation</span><svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={21}><path d="M4 12h16m-7-7 7 7-7 7"></path></svg></Link>
        </div>
      </section>
    </main>
  );
}
