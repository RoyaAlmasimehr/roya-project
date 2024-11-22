import Link from "next/link";
import { Post } from "@/types/types";

export default function PostCard({ post }: { post: Post }) {
  if (!post) return <p>Error: Post data is missing</p>;

  return (
    <div className="border p-4 rounded hover:shadow-lg">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mt-2 text-gray-400">{post.body.substring(0, 100)}...</p>
      <Link
        href={`/blog/${post.id}`}
        className="text-blue-500 mt-4 hover:text-blue-300 inline-block"
      >
        Read More
      </Link>
    </div>
  );
}
