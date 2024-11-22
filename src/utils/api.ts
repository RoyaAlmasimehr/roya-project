import { Post, Comment } from "@/types/types";

export const getPaginatedPosts = async (page: number): Promise<Post[]> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching posts.");
  }
};



export const getPostDetails = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (!response.ok) throw new Error("Failed to fetch post details");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching post details.");
  }
};

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching comments.");
  }
};
