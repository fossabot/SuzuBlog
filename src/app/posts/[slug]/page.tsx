import type { Metadata } from 'next';
import { Suspense } from 'react';

import Loading from '@/app/loading';
import { getConfig } from '@/services/config/get-config';
import { getAllPosts, getPostData } from '@/services/content/posts';

import PostLayout from '@/components/layout/PostLayout';

// build static params for all posts
async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Properties = {
  params: Promise<{ slug: string }>;
};

async function generateMetadata({ params }: Properties): Promise<Metadata> {
  // read post slug
  const { slug } = await params;

  // get post data
  const postData = await getPostData(slug);

  // thumbnail image
  const thumbnail = postData.frontmatter.thumbnail;

  const config = getConfig();

  const metaKeywords =
    postData.frontmatter.tags?.join(', ') +
    ', ' +
    postData.frontmatter.categories?.join(', ') +
    ', ' +
    postData.frontmatter.author +
    ', ' +
    'blog';
  return {
    title: `${postData.frontmatter.title} - ${config.title}`,
    description: postData.postAbstract,
    keywords: metaKeywords,
    openGraph: {
      siteName: config.title,
      type: 'article',
      authors: postData.frontmatter.author,
      tags: metaKeywords,
      modifiedTime: postData.frontmatter.date,
      title: postData.frontmatter.title,
      description: postData.postAbstract,
      images: thumbnail,
      url: `/posts/${slug}`,
      locale: config.lang,
    },
  };
}

// PostPage component that receives the params directly
async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const parameters = await props.params;
  const post: PostData = await getPostData(parameters.slug);

  return (
    <Suspense fallback={<Loading />}>
      <PostLayout post={post} />
    </Suspense>
  );
}

export { generateStaticParams, generateMetadata, PostPage as default };
