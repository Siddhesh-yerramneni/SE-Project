import React from "react";

const PostCard = ({ post, currentUserId, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white p-6 mb-4" data-cy="post-card">
      <h3 className="text-2xl font-bold text-gray-800" data-cy="post-title">
        {post.title}
      </h3>
      <p className="text-gray-600 mt-2" data-cy="post-content">
        {post.content}
      </p>
      <p className="text-sm text-gray-500 mt-3 italic" data-cy="post-author">
        🖋️ Author:
        {post.user?.name || post.user?.username || "Unknown"}
      </p>

      {currentUserId === post.user_id && (
        <div className="flex gap-4 mt-4">
          <button
            aria-label="Edit"
            className="text-blue-500 hover:underline"
            onClick={() => {
              window.location.href = `/editPost/${post.id}`;
            }}
          >
            Edit
          </button>
          <button
            aria-label="Delete"
            className="text-red-500 hover:underline"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
