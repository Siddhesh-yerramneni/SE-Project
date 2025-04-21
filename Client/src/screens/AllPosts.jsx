import React, { useEffect, useState } from "react";
import { getAllPosts, deletePost } from "../services/api";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.posts || []);
    } catch (err) {
      console.error("Fetch posts error:", err.msg || err);
      setError(err.msg || "Failed to fetch posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      setSuccessMessage("");
      setErrorMessage("");
    if (confirmDelete) {
      try {
        const res = await deletePost(id);;
              if (res && res.msg) {
                setSuccessMessage(res.msg);
              }
        fetchPosts();
      } catch (err) {
        console.error("Delete post error:", err.msg || err);
        setErrorMessage(error.msg || "Failed to delete post.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20" data-cy="all-posts">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Posts</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={currentUser?.id}
            onDelete={handleDelete}
          />
        ))
      )}
      {/* Display Success Message */}
      {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}

        {/* Display Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}
    </div>
  );
};

export default AllPosts;
