'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { defaultTo } from 'es-toolkit/compat';

import PostListLayout from './PostList';
import Pagination from './Pagination';

import { getFilteredPosts } from '@/services/utils';

interface PostPageClientProperties {
  posts: PostListData[];
  translation: Translation;
}

const PostPageClient = ({ posts, translation }: PostPageClientProperties) => {
  const searchParameters = useSearchParams();
  const categoryParameter = defaultTo(searchParameters.get('category'), '');
  const tagParameter = defaultTo(searchParameters.get('tag'), '');
  const searchQuery = defaultTo(searchParameters.get('query'), '');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Filter posts based on search, category, and tag
  const filteredPosts = getFilteredPosts(
    posts,
    searchQuery,
    categoryParameter,
    tagParameter
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container mx-auto flex animate-fadeInDown flex-col items-center p-4'>
      {/* Post List */}
      <PostListLayout
        posts={currentPosts}
        translation={translation}
      />

      {/* Pagination */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostPageClient;
