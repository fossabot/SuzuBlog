import { promises as fsPromise } from 'node:fs';
import path from 'node:path';

import pinyin from 'pinyin';

import { getPostFromFile } from '@/services/content/getPostFromFile';

const postsDirectory = path.join(process.cwd(), 'posts');

async function getAllPosts(): Promise<PostData[]> {
  const fileNames = await fsPromise.readdir(postsDirectory);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md')
  );

  const allPosts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      return getPostFromFile(fullPath, fileName.replace(/\.md$/, ''));
    })
  );

  allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return allPosts;
}

async function getPostData(slug: string, page?: string): Promise<PostData> {
  const filePath = page
    ? path.join(postsDirectory, '_pages', `${page}.md`)
    : path.join(postsDirectory, `${slug}.md`);

  return getPostFromFile(filePath, slug);
}

// Helper function to convert Chinese tags to pinyin with underscores
function convertToPinyin(tag: string): string {
  if (/[\u4E00-\u9FA5]/.test(tag)) {
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

export { convertToPinyin, getAllPosts, getPostData, getUniqueTags };
