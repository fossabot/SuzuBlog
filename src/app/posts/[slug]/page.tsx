import PostLayout from '@/components/layout/PostLayout';
import { getAllPosts, getPostData } from '@/services/content/posts';
import { PostData } from '@/types';

// build static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// PostPage component that receives the params directly
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post: PostData = await getPostData(params.slug);

  return <PostLayout post={post} />;
}
