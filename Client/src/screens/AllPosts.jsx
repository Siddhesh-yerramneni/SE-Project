// src/screens/AllPosts.jsx
import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost } from '../services/api';
import PostCard from '../components/PostCard';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const fetchPosts = async () => {
    const res = await getAllPosts();
    setPosts(res.posts || []);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={currentUser?.id} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default AllPosts;
