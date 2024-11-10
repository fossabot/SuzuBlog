import pinyin from 'pinyin';

import { getAllPosts } from '../content';

// Helper function to check if a string contains Chinese characters
function containsChinese(text: string): boolean {
  return /[\u4E00-\u9FA5]/.test(text);
}

// Helper function to convert Chinese tags to pinyin with underscores
function convertToPinyin(tag: string): string {
  if (containsChinese(tag)) {
    return pinyin(tag, { style: pinyin.STYLE_NORMAL }).flat().join('_');
  }
  return tag; // If not Chinese, return the original tag
}

// Helper function to get unique tags from local tags
async function getUniqueTags() {
  const posts = await getAllPosts();
  // Get all tags from all posts and remove duplicates
  const allTags = posts.flatMap((post) => post.frontmatter.tags || []);

  return [...new Set(allTags)];
}

export { convertToPinyin, getUniqueTags };
