import { getPostDetails } from "@/utils/api";
import Comments from "../../../components/Comments";

export default async function PostDetails({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostDetails(params.id);

  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p>{post.body}</p>
      <Comments postId={params.id} />
    </div>
  );
}
