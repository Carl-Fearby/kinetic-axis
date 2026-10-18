import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { optimizedImage } from '../../lib/optimized-images';
import { formattedDate, newsSorted, NewsCard, NewsCategoryKey, NEWS_CATEGORIES, readingTime, storiesByCategory } from '../../components/NewsStory';

// Flagship: explicitly marked in news.json (featured: true — currently the Pace
// Venues case study), with a data-driven fallback to the newest project story.
const flagship = newsSorted.find(item => item.featured) || storiesByCategory('projects')[0];
const rest = newsSorted.filter(item => item !== flagship);

const Arrow = () => <svg aria-hidden="true" className="ka-heavy-arrow" fill="none" height={20}
  stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3}
  viewBox="0 0 24 24" width={20}><path d="M5 19 19 5M8 5h11v11"/></svg>;

// Category pages exist for every category that holds stories; "All news" is the
// landing itself, so chips link the page the visitor is already filtering.
export const NEWS_CATEGORY_ROUTES: { key: NewsCategoryKey; slug: string }[] = [
  { key: 'projects', slug: 'projects' },
  { key: 'engineering', slug: 'engineering' },
  { key: 'ai', slug: 'ai' },
  { key: 'strategy', slug: 'strategy' },
  { key: 'company', slug: 'company' },
];

export default function PageContent() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="subhero">
        <div className="container">
          <Breadcrumbs className="breadcrumb" items={[{"label": "Home", "href": "/"}, {"label": "News"}]} />
          <div className="eyebrow">News, stories &amp; insights</div>
          <h1>News.</h1>
          <p>Case studies, engineering deep dives and consultancy thinking from the Kinetic Axis studio — published only when there is genuinely something to report.</p>
        </div>
      </section>
      <section className="subsection">
        <div className="container">
          <nav aria-label="Filter stories by category" className="news-filter">
            {NEWS_CATEGORY_ROUTES.map(route => (
              <Link href={`/news/category/${route.slug}`} key={route.slug}>{NEWS_CATEGORIES[route.key].name}</Link>
            ))}
          </nav>
          {flagship ? (
            <Link className="news-featured" href={`/news/${flagship.slug}`}>
              <span className="news-featured__img"><img alt="" decoding="async" height={810} loading="eager" src={optimizedImage(flagship.image, '(max-width:700px) 95vw, 560px').src} width={1440}/></span>
              <span className="news-featured__body">
                <span className="news-card__meta"><span className="news-card__category">{NEWS_CATEGORIES[flagship.category].name}</span><span className="news-card__date">{formattedDate(flagship.date)} · {readingTime(flagship)}</span></span>
                <h2>{flagship.title}</h2>
                <p>{flagship.snippet}</p>
                <span className="news-card__more">Read the flagship story <Arrow/></span>
              </span>
            </Link>
          ) : null}
          <div className="ka-news-grid">
            {rest.map(item => <NewsCard key={item.slug} story={item}/>)}
          </div>
        </div>
      </section>
      <section className="subcta">
        <div className="container subcta-inner">
          <h2>Working on something similar?</h2>
          <Link href="/contact" className="button"><span className="kad-cta-label">Start a conversation</span><svg aria-hidden="true" className="cta-arrow ka-heavy-arrow" fill="none" height={21} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={21}><path d="M4 12h16m-7-7 7 7-7 7"></path></svg></Link>
        </div>
      </section>
    </main>
  );
}
