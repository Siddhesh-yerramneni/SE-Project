// src/screens/EditPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editPost, getPostsByAuthor } from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const res = await getPostsByAuthor(user.id);
      const match = res.posts.find(p => p.id === parseInt(id));
      if (match) setPost({ title: match.title, content: match.content });
    };
    fetch();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost(id, post);
    navigate('/allPosts');
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Post Title"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          rows={6}
          placeholder="Post content..."
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
