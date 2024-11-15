import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Head from 'next/head';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/posts/PostLayout';

import '@/styles/friendsLinks.css';

function generateMetadata(): Metadata {
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
    twitter: {
      card: 'summary',
      title: `Friends - ${config.title}`,
      description: `Discover the friends of ${config.title}. Explore the links and connections.`,
      images: config.avatar,
    },
  };
}

async function FriendsPage() {
  const post: FullPostData | null = await getPostData('Friends', 'Friends');
  if (!post) {
    return notFound();
  }
  const config = getConfig();

  const friends = [
    { name: 'ZL Asica', url: 'https://www.zla.pub' },
    // Other friends
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Friends of ${config.title}`,
    url: `${config.siteUrl}/friends`,
    description: `Discover the friends of ${config.title}. Explore the links and connections.`,
    hasPart: friends.map((friend) => ({
      '@type': 'WebSite',
      name: friend.name,
      url: friend.url,
    })),
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <PostLayout
        config={config}
        post={post}
        showThumbnail={config.thumbnailFriends}
      />
    </>
  );
}

export { generateMetadata, FriendsPage as default };
