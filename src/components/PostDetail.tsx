"use client";

import { useQuery } from "@tanstack/react-query";
import { Post } from "../types/blog";
import { Comment } from "../types/comments";

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error fetching comments: {error.message}</div>;

  return (
    <div className=" p-4 ">
      <h1 className="text-blue-300 py-4 px-5">{post.title}</h1>

      <h2 className="py-4 px-5">Comments</h2>
      <ul>
        {comments?.map((comment) => (
          <div key={comment.id} className="p-4 ">
            <li className="bg-slate-800 p-4">
              {comment.id}- {comment.body}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export default PostDetail;
