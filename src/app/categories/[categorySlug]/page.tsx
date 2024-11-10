import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getConfig } from '@/services/config/get-config';
import Loading from '@/app/loading';
import { getAllPosts } from '@/services/content/posts';

import PostListLayout from '@/components/layout/PostListLayout';

async function generateStaticParams() {
  const config = getConfig();
  return config.postCategories.map((category) => ({
    categorySlug: category.slug,
  }));
}

type Properties = {
  params: Promise<{ categorySlug: string }>;
};

async function generateMetadata({ params }: Properties): Promise<Metadata> {
  // read post slug
  const { categorySlug: category } = await params;

  const config = getConfig();

  // Find the category based on the slug from params
  const categoryData = config.postCategories.find(
    (cat) => cat.slug === category
  ) || { name: 'Not Found' };
  return {
    title: `分类：${categoryData.name} - ${config.title}`,
    openGraph: {
      siteName: config.title,
      title: `分类：${categoryData.name} - ${config.title}`,
      description: `分类：${categoryData.name} - ${config.description}`,
      url: `/categories/${category}`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

async function CategoryPage(props: {
  params: Promise<{ categorySlug: string }>;
}) {
  const parameters = await props.params;
  const posts = await getAllPosts();
  const config = getConfig();

  // Find the category based on the slug from params
  const category = config.postCategories.find(
    (cat) => cat.slug === parameters.categorySlug
  );

  if (!category) {
    // If the category doesn't exist, show 404
    notFound();
  }

  // Filter posts by the category name
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.categories?.includes(category.name)
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>{category.name}</h1>
      <Suspense fallback={<Loading />}>
        <PostListLayout posts={filteredPosts} />
      </Suspense>
    </div>
  );
}

export { generateStaticParams, generateMetadata, CategoryPage as default };
