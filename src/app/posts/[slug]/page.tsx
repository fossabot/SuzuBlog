import { getPostData } from '@/services/content/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/layout/PostLayout';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const post: PostData = await getPostData(params.slug);

  return <PostLayout post={post} />;
}
