'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaFolder, FaTags } from 'react-icons/fa6';

interface CategoriesTagsListProperties {
  type: 'category' | 'tag';
  translation: Translation;
  items?: string[];
}

const CategoriesTagsList = ({
  type,
  translation,
  items = [],
}: CategoriesTagsListProperties) => {
  const searchParameters = useSearchParams();

  // Handle no categories or tags
  if (items.length === 0) {
    return (
      <span>
        {type === 'category'
          ? translation.post.noCategories
          : translation.post.noTags}
      </span>
    );
  }

  // Get link with new category or tag
  const getLink = (item: string) => {
    const newParameters = new URLSearchParams(searchParameters);
    newParameters.set(type, item);
    return `/posts?${newParameters.toString()}`;
  };

  const typeTranslation =
    type === 'category' ? translation.post.categories : translation.post.tags;

  return (
    <span className='flex items-center'>
      {/* Render Type icon */}
      {type === 'category' ? (
        <FaFolder className='mr-1' />
      ) : (
        <FaTags className='mr-1' />
      )}
      {/* List */}
      <span>
        {items.map((item, index) => (
          <span key={item}>
            <Link
              href={getLink(item)}
              target='_self'
              title={`${translation.navigate} ${typeTranslation} ${item}`}
              aria-label={`${translation.navigate} ${typeTranslation} ${item}`}
              className='no-underline'
            >
              {item}
            </Link>
            {/* Add comma, except for the last item */}
            {index < items.length - 1 && ', '}
          </span>
        ))}
      </span>
    </span>
  );
};

export default CategoriesTagsList;
