'use client';

import { defaultTo } from 'es-toolkit/compat';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface ItemLinksProperties {
  type: 'category' | 'tag';
  translation: Translation;
  items?: string[];
}

const getLink = (
  item: string,
  type: 'category' | 'tag',
  searchParameters: URLSearchParams
) => {
  const newParameters = new URLSearchParams(searchParameters);
  newParameters.set(type, item);
  return `/posts?${newParameters.toString()}`;
};

function ItemLinks({ items, translation, type }: ItemLinksProperties) {
  const searchParameters = useSearchParams();
  const displayItems = defaultTo(items, []);
  const displayItemsLength = displayItems.length;

  if (displayItemsLength === 0) {
    return (
      <>
        {type === 'category'
          ? translation.post.noCategories
          : translation.post.noTags}
      </>
    );
  }

  return (
    <>
      {displayItems.map((item, index) => (
        <span key={item}>
          <Link
            href={getLink(item, type, searchParameters)}
            target='_self'
            aria-label={`${translation.navigate} ${type} ${item}`}
            className='no-underline'
          >
            {item}
          </Link>
          {index < displayItemsLength - 1 && ', '}
        </span>
      ))}
    </>
  );
}

export default ItemLinks;
