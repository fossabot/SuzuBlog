import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Head from 'next/head';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/posts/PostLayout';

import '@/styles/friendsLinks.css';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `朋友 - ${config.title}`,
    description: `${config.title} - ${config.description} 的朋友们`,
    openGraph: {
      siteName: config.title,
      title: `朋友 - ${config.title}`,
      description: `${config.title} - ${config.description} 的朋友们`,
      url: '/friends',
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `朋友 - ${config.title}`,
      description: `发现 ${config.title} 的朋友们。探索链接和联系。`,
      images: config.avatar,
    },
  };
}

async function FriendsPage() {
  const post: FullPostData | null = await getPostData('Friends', 'Friends');
  if (!post) {
    return notFound();
  }
  const redirectUrl = post.frontmatter.redirect || '';
  if (redirectUrl) {
    redirect(redirectUrl);
  }
  const config = getConfig();

  const friends = [
    { name: 'ZL Asica', url: 'https://www.zla.pub' },
    // Other friends
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `朋友 - ${config.title}`,
    url: `${config.siteUrl}/friends`,
    description: `发现 ${config.title} 的朋友们。探索链接和联系。`,
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
