import fs from 'node:fs';
import path from 'node:path';

import pinyin from 'pinyin';

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
function getUniqueTags() {
  const filePath = path.join(process.cwd(), 'public', 'postsData.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const posts: PostData[] = JSON.parse(fileContent);

  // Get all tags from all posts and remove duplicates
  const allTags = posts.flatMap((post) => post.frontmatter.tags || []);
  const uniqueTags = [...new Set(allTags)];

  return uniqueTags;
}

export { convertToPinyin, getUniqueTags };
