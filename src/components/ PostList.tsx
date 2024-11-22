"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Post } from "@/types/blog";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const postsPerPage = 10; 
  const observer = useRef<IntersectionObserver | null>(null);

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]); 
  const [currentPage, setCurrentPage] = useState(0); 


  const loadMorePosts = useCallback(() => {
    const startIndex = currentPage * postsPerPage;
    const nextPosts = posts.slice(startIndex, startIndex + postsPerPage);

    if (nextPosts.length > 0) {
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      setCurrentPage((prev) => prev + 1);
    }
  }, [posts, currentPage, postsPerPage]);


  const observeLastPost = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMorePosts();
      });

      if (node) observer.current.observe(node);
    },
    [loadMorePosts]
  );

  
  useEffect(() => {
    loadMorePosts();
  }, [loadMorePosts]);

  return (
    <div className="lg:grid-cols-2  grid grid-cols-1">
      {displayedPosts.map((post, index) => {
        const isLastPost = index === displayedPosts.length - 1;

        return (
          <Link key={post.id} href={`/blog/${post.id}`} >
            <div
              ref={isLastPost ? observeLastPost : null}
              className="bg-white shadow-md rounded p-4 my-4 hover:bg-green-200 transition-colors cursor-pointer mx-20"
            >
              <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostList;
