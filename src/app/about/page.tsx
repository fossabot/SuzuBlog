import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Head from 'next/head';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/posts/PostLayout';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `关于 - ${config.title}`,
    description: `${config.title} - ${config.description} 的关于及自我介绍页面`,
    openGraph: {
      siteName: config.title,
      type: 'profile',
      username: config.author.name,
      title: `关于 - ${config.title}`,
      description: `${config.title} - ${config.description} 的关于及自我介绍页面`,
      images: config.avatar,
      url: '/about',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `关于 - ${config.title}`,
      description: `了解 ${config.author.name}，${config.title} 的站长。`,
      images: config.avatar,
    },
  };
}

async function AboutPage() {
  const post: FullPostData | null = await getPostData('About', 'About');
  if (!post) {
    return notFound();
  }
  const config = getConfig();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.author.name,
    description: `了解更多关于 ${config.author.name}，${config.title} 的站长。`,
    url: `${config.siteUrl}/about`,
    image: config.avatar,
    sameAs: config.author.link,
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
        showThumbnail={config.thumbnailAbout}
      />
    </>
  );
}

export { generateMetadata, AboutPage as default };
