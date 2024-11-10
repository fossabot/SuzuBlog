import { promises as fsPromises } from 'node:fs';
import path from 'node:path';

import { getConfig } from '@/services/config';
import { fileExists, formatDateTime } from '@/services/utils/fileUtils';

export async function processFrontmatter(
  frontmatter: Frontmatter,
  fileName: string,
  fullPath: string
): Promise<Frontmatter> {
  const config = getConfig();
  frontmatter.title =
    frontmatter.title?.slice(0, 100) || fileName.replace(/\.md$/, '');
  frontmatter.author = frontmatter.author?.slice(0, 30) || config.author.name;

  if (frontmatter.thumbnail && !frontmatter.thumbnail.includes('://')) {
    const thumbnailPath = path.join(
      process.cwd(),
      'public',
      frontmatter.thumbnail
    );
    frontmatter.thumbnail = (await fileExists(thumbnailPath))
      ? frontmatter.thumbnail
      : config.background;
  } else {
    frontmatter.thumbnail = frontmatter.thumbnail || config.background;
  }

  if (frontmatter.date) {
    frontmatter.date = formatDateTime(frontmatter.date);
  } else {
    const stats = await fsPromises.stat(fullPath);
    frontmatter.date = stats.mtime
      .toISOString()
      .replace('T', ' ')
      .split('.')[0];
  }

  return frontmatter;
}
