import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { NewsCategoryKey, NEWS_CATEGORIES, NewsCard, storiesByCategory } from './NewsStory';

/** Filtered view over news.json; one static page per category with stories. */
export default function PageContent({category}: {category: NewsCategoryKey}) {
  const items = storiesByCategory(category);
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="subhero">
        <div className="container">
          <Breadcrumbs className="breadcrumb" items={[{"label": "Home", "href": "/"}, {"label": "News", "href": "/news"}, {"label": NEWS_CATEGORIES[category].name}]} />
          <div className="eyebrow">{items.length} {items.length === 1 ? 'story' : 'stories'}</div>
          <h1>{NEWS_CATEGORIES[category].name}.</h1>
          <p>The latest stories in this strand of studio work — filtered from the complete news and insights index.</p>
        </div>
      </section>
      <section className="subsection">
        <div className="container">
          {items.length ? (
            <div className="ka-news-grid">
              {items.map(item => <NewsCard key={item.slug} story={item}/>)}
            </div>
          ) : null}
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
