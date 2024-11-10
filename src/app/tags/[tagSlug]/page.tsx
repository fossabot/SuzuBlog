import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { getConfig } from '@/services/config';
import {
  getAllPosts,
  convertToPinyin,
  getUniqueTags,
} from '@/services/content';
import Loading from '@/app/loading';

import PostListLayout from '@/components/layout/PostListLayout';

// Generate static paths for all unique tags
async function generateStaticParams() {
  const uniqueTags = await getUniqueTags();
  return uniqueTags.map((tag) => ({
    // Convert only Chinese tags to pinyin slug
    tagSlug: convertToPinyin(tag),
  }));
}

type Properties = {
  params: Promise<{ tagSlug: string }>;
};

async function generateMetadata({ params }: Properties): Promise<Metadata> {
  // read post slug
  const { tagSlug: tag } = await params;

  const config = getConfig();

  // Find the tag based on the slug from params
  const uniqueTags = await getUniqueTags();
  const tagData =
    uniqueTags.find((t) => convertToPinyin(t) === tag) || 'Not Found';
  return {
    title: `标签：${tagData} - ${config.title}`,
    openGraph: {
      siteName: config.title,
      title: `标签：${tagData} - ${config.title}`,
      url: `${config.siteUrl}/tags/${tag}`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

async function TagPage(props: { params: Promise<{ tagSlug: string }> }) {
  const parameters = await props.params;
  const posts = await getAllPosts();

  // Retrieve all unique tags from the posts
  const uniqueTags = await getUniqueTags();

  // Find the tag based on the slug from params
  const tag = uniqueTags.find(
    (tag) => convertToPinyin(tag) === parameters.tagSlug
  );

  if (!tag) {
    // If the tag doesn't exist, show 404
    notFound();
  }

  // Filter posts by the tag name
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.tags?.includes(tag)
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>{tag}</h1>
      <Suspense fallback={<Loading />}>
        <PostListLayout posts={filteredPosts} />
      </Suspense>
    </div>
  );
}

export { generateStaticParams, generateMetadata, TagPage as default };
