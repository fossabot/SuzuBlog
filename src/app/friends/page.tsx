import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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

  return (
    <PostLayout
      config={config}
      post={post}
      showThumbnail={config.thumbnailFriends}
    />
  );
}

export { generateMetadata, FriendsPage as default };
