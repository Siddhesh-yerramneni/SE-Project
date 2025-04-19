// src/screens/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ ...formData, author_id: user.id });
      navigate('/allPosts');
    } catch (err) {
      alert('Error creating post');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Write your content..."
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full border px-4 py-2 rounded"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
