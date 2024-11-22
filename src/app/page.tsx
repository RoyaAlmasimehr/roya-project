"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedPosts } from "@/utils/api";
import PostCard from "@/components/PostCard";
import { useRef, useEffect } from "react";
import { Post } from "../types/types";

export default function HomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Post[], Error>({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }: { pageParam?: number }) =>
        getPaginatedPosts(pageParam || 1),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Infinite Scroll Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages?.map((page) =>
          page.map((post: Post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage ? (
          <p>Loading more posts...</p>
        ) : (
          hasNextPage && <p>Scroll to load more...</p>
        )}
      </div>
    </main>
  );
}
