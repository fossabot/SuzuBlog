import type { Metadata } from 'next';
import Head from 'next/head';

import PostsClient from './PostsClient';

import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `Posts - ${config.title}`,
    description: `Posts page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      title: `Posts - ${config.title}`,
      description: `Posts page of ${config.title} - ${config.description}`,
      url: `${config.siteUrl}/posts`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `Posts - ${config.title}`,
      description: `Browse the latest posts on ${config.title}. Discover insights, stories, and updates.`,
      images: config.avatar,
    },
  };
}

async function PostsPage() {
  const config = getConfig();
  const posts: PostListData[] = await getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Posts - ${config.title}`,
    url: `${config.siteUrl}/posts`,
    description: `Browse the latest posts on ${config.title}. Discover insights, stories, and updates.`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/posts`,
    },
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <PostsClient posts={posts} />
    </>
  );
}

export { generateMetadata, PostsPage as default };
