import { getPostData } from '@/lib/posts';
import Image from 'next/image';
import { PostData } from '@/types';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: PostData = await getPostData(params.slug);

  return (
    <article className='container mx-auto p-4'>
      {post.frontmatter.thumbnail && (
        <div className='relative h-64 w-full'>
          <Image
            src={post.frontmatter.thumbnail}
            alt={post.frontmatter.title}
            width={200}
            height={200}
            className='h-full w-full rounded-lg object-cover'
          />
        </div>
      )}

      <h1 className='text-3xl font-bold'>{post.frontmatter.title}</h1>
      <p className='text-sm'>
        {post.frontmatter.author} · {post.frontmatter.date}
      </p>

      <div
        className='mt-6'
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
