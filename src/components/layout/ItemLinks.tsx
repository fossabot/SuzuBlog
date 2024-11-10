import Link from 'next/link';

import { getConfig } from '@/services/config';
import { convertToPinyin, getUniqueTags } from '@/services/content';

interface ItemLinksProperties {
  items: string[] | undefined;
  type: 'category' | 'tag';
}

export default async function ItemLinks({ items, type }: ItemLinksProperties) {
  if (!items || items.length === 0) {
    return <>{type === 'category' ? '未分类' : '无标签'}</>;
  }

  const config = type === 'category' ? getConfig() : null;
  const uniqueTags = type === 'tag' ? await getUniqueTags() : null;

  const getLink = (item: string) => {
    if (type === 'category' && config) {
      const categoryLink = config.postCategories.find(
        (cat) => cat.name === item && cat.slug
      );
      return categoryLink ? `/categories/${categoryLink.slug}` : null;
    }
    if (type === 'tag' && uniqueTags) {
      return uniqueTags.includes(item)
        ? `/tags/${convertToPinyin(item)}`
        : null;
    }
    return null;
  };

  return (
    <>
      {items.map((item, index) => {
        const link = getLink(item);
        return (
          <span key={item}>
            {link ? (
              <Link
                href={link}
                target='_self'
                aria-label={`Navigate to ${type} ${item}`}
              >
                {item}
              </Link>
            ) : (
              <span>{item}</span>
            )}
            {index < items.length - 1 && ', '}
          </span>
        );
      })}
    </>
  );
}
