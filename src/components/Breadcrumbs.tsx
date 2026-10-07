import Link from 'next/link';
import { Fragment } from 'react';

export type Crumb = { label: string; href?: string };
/** Preserve the original nav > span and nav > a structure for existing CSS. */
export function Breadcrumbs({ items, className = 'ka-crumb' }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      {items.map((item, i) => (
        <Fragment key={`${item.label}-${i}`}>
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          {item.href ? (
            <Link href={item.href.replace(/\.html(?=[?#]|$)/, '')}>
              {item.label}
            </Link>
          ) : <span aria-current="page">{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
