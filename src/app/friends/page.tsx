import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import { getPostData } from '@/services/content/posts';
import '@/styles/friendsLinks.css';
import { PostData } from '@/types';

export default async function FriendsPage() {
  const post: PostData = await getPostData('Friends', 'Friends');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailFriends} />;
}
