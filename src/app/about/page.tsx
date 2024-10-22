import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import { getPostData } from '@/services/content/posts';
import { PostData } from '@/types';

export default async function AboutPage() {
  const post: PostData = await getPostData('About', 'About');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailAbout} />;
}
