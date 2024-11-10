import fs from 'node:fs';

import { processFrontmatter } from '@/services/content/processFrontmatter';
import { parseMarkdown } from '@/services/parsing/markdown';

async function getPostFromFile(
  filePath: string,
  slug: string
): Promise<PostData> {
  const fileContents = await fs.promises.readFile(filePath, 'utf8');

  const { frontmatter, postAbstract, contentHtml } =
    await parseMarkdown(fileContents);

  const processedFrontmatter = await processFrontmatter(
    frontmatter,
    `${slug}.md`,
    filePath
  );

  const fileStats = await fs.promises.stat(filePath);
  const lastModified = fileStats.mtime.toISOString();

  return {
    slug,
    postAbstract,
    frontmatter: processedFrontmatter,
    contentHtml,
    lastModified,
  };
}

export { getPostFromFile };
