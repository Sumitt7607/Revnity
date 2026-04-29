const API_URL = import.meta.env.VITE_API_URL || '/api';

export const blogApi = {
  getPosts: async () => {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    const data = await res.json();
    return data.map((p: any) => ({ ...p, id: p._id }));
  },

  createPost: async (post: any) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to create post');
    const data = await res.json();
    return { ...data, id: data._id };
  },

  deletePost: async (id: string) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return true;
  },

  getPostById: async (id: string) => {
    const res = await fetch(`${API_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const data = await res.json();
    return { ...data, id: data._id };
  },

  updatePost: async (id: string, post: any) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to update post');
    const data = await res.json();
    return { ...data, id: data._id };
  }
};
