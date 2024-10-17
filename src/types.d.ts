// Frontmatter for each post md file
export interface Frontmatter {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  categories?: string[];
  thumbnail?: string;
  redirect?: string;
}

// Post data
export interface PostData {
  slug: string;
  frontmatter: Frontmatter;
  contentHtml: string;
}
