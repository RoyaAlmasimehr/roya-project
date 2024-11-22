// app/posts/[id]/page.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "@/utils/api";

export default function PostDetails({ params }: { params: { id: string } }) {
  const { data: comments, isLoading } = useQuery(["comments", params.id], () =>
    getPostComments(params.id)
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="border-b py-2">
            {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
