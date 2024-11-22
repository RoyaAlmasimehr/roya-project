// app/page.tsx
"use client";
import { useState } from "react";
import { getPaginatedPosts } from "@/utils/api";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const fetchData = async (page: number) => {
    const newPosts = await getPaginatedPosts(page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-2xl">{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load More
      </button>
    </main>
  );
}
