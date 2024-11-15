import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Head from 'next/head';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/posts/PostLayout';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `About - ${config.title}`,
    description: `About page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      type: 'profile',
      username: config.author.name,
      title: `About - ${config.title}`,
      description: `About page of ${config.title} - ${config.description}`,
      images: config.avatar,
      url: '/about',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `About - ${config.title}`,
      description: `Learn more about ${config.title}. Discover the story behind the blog.`,
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
    description: `Learn more about ${config.author.name}, the mind behind ${config.title}.`,
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
