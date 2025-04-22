import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, currentUserId, onDelete }) => (
  <div
    data-cy="post-card"
    className="border rounded-lg shadow-md bg-white p-6 mb-4"
  >
    <h3 className="text-2xl font-bold text-gray-800" data-cy="post-title">
      {post.title}
    </h3>
    <p className="text-gray-600 mt-2" data-cy="post-content">
      {post.content}
    </p>
    <p className="text-sm text-gray-500 mt-3 italic" data-cy="post-author">
      🖋️ Author: {post.author?.username || 'Unknown'}
    </p>
    {currentUserId === post.author_id && (
      <div className="flex gap-4 mt-4">
        <Link
          to={`/editPost/${post.id}`}
          className="text-blue-600 font-semibold hover:underline"
          data-cy="edit-post-btn"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(post.id)}
          className="text-red-600 font-semibold hover:underline"
          data-cy="delete-post-btn"
        >
          Delete
        </button>
      </div>
    )}
  </div>
);

export default PostCard;
