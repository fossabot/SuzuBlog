import type { Metadata } from 'next';
import { Suspense } from 'react';

import Loading from '@/app/loading';
import { getConfig } from '@/services/config/get-config';
import { getPostData } from '@/services/content/posts';

import PostLayout from '@/components/layout/PostLayout';
import '@/styles/friendsLinks.css';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: `Friends - ${config.title}`,
    description: `Friends page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      title: `Friends - ${config.title}`,
      description: `Friends page of ${config.title} - ${config.description}`,
      url: '/friends',
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

export default async function FriendsPage() {
  const post: PostData = await getPostData('Friends', 'Friends');
  const config = getConfig();

  return (
    <Suspense fallback={<Loading />}>
      <PostLayout
        post={post}
        showThumbnail={config.thumbnailFriends}
      />
    </Suspense>
  );
}
