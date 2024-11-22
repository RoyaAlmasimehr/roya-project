"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "@/utils/api";
import { Comment } from "../types/types";
export default function Comments({ postId }: { postId: string }) {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => getPostComments(postId),
  });

  if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Error loading comments. Please try again later.</p>;
  if (comments?.length === 0)
    return <p>No comments available for this post.</p>;

  return (
    <ul className="mt-6">
      {comments?.map((comment) => (
        <li key={comment.id} className="border-b py-2">
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}
