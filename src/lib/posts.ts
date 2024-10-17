import fs from 'fs';
import path from 'path';
import { parseMarkdown } from './markdown';
import { PostData, Frontmatter } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// Get all posts data
export async function getAllPosts(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Asynchronously parse markdown file
      const { frontmatter, contentHtml } = await parseMarkdown(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''), // Use file name as slug (without .md)
        // Use assert to tell TypeScript that frontmatter is Frontmatter type
        frontmatter: frontmatter as Frontmatter,
        contentHtml,
      };
    }),
  );

  return allPosts;
}

// Get single post data
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { frontmatter, contentHtml } = await parseMarkdown(fileContents);

  return {
    slug,
    frontmatter,
    contentHtml,
  };
}
