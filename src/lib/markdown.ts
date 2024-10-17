import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Frontmatter } from '@/types';

export async function parseMarkdown(
  content: string,
): Promise<{ frontmatter: Frontmatter; contentHtml: string }> {
  const { data, content: markdownContent } = matter(content);

  // Transform markdown content to HTML
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Keep all comments
    .process(markdownContent);

  // Replace all comments but keep <!--more-->
  const contentHtml = processedContent
    .toString()
    .replace(/<!--[^>]*-->/g, (match) => {
      if (match === '<!--more-->') {
        return match;
      }
      return '';
    });

  return {
    frontmatter: data as Frontmatter,
    contentHtml,
  };
}
