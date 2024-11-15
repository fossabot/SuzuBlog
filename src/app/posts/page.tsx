import type { Metadata } from 'next';
import Head from 'next/head';

import PostsClient from './PostsClient';

import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `文章 - ${config.title}`,
    description: `${config.title} - ${config.description} 的文章页面`,
    openGraph: {
      siteName: config.title,
      title: `文章 - ${config.title}`,
      description: `${config.title} - ${config.description} 的文章页面`,
      url: `${config.siteUrl}/posts`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `文章 - ${config.title}`,
      description: `查看 ${config.title} 的最新文章。发现见解、故事和更新。`,
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
    name: `文章 - ${config.title}`,
    url: `${config.siteUrl}/posts`,
    description: `查看 ${config.title} 的最新文章。发现见解、故事和更新。`,
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
