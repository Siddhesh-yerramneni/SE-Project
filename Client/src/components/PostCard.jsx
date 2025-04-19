import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, currentUserId, onDelete }) => (
  <div className="border rounded-lg shadow-md bg-white p-6 mb-4">
    <h3 className="text-2xl font-bold text-gray-800">{post.title}</h3>
    <p className="text-gray-600 mt-2">{post.content}</p>
    <p className="text-sm text-gray-500 mt-3 italic">
      🖋️ Author: {post.author?.username}
    </p>
    {currentUserId === post.author_id && (
      <div className="flex gap-4 mt-4">
        <Link
          to={`/editPost/${post.id}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(post.id)}
          className="text-red-600 font-semibold hover:underline"
        >
          Delete
        </button>
      </div>
    )}
  </div>
);

export default PostCard;
