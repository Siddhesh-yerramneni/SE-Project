import React, { useEffect, useState } from 'react';
import { getReviews, deleteReview } from '../services/api';
import ReviewForm from './ReviewForm';

const ReviewList = ({ bookId, currentUserId }) => {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await getReviews(bookId);
      setReviews(res.reviews || []);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      console.log("✅ Review deleted");
      fetchReviews();
    } catch (err) {
      console.error("❌ Delete failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Reviews</h3>

      {editingReview && (
        <p className="text-sm text-blue-600 mb-2">
          Editing your review...
        </p>
      )}

      {currentUserId && (
        <ReviewForm
          bookId={bookId}
          userId={currentUserId}
          existingReview={editingReview}
          refreshReviews={() => {
            fetchReviews();
            setEditingReview(null);
          }}
        />
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-600 mt-4">No reviews yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-3 rounded-md bg-white shadow-sm">
              <p className="text-gray-800">{review.review}</p>
              <div className="text-sm text-gray-500 mt-1">
                Name: {review.user.name? review.user.name:review.user.username}
              </div>
              {currentUserId === review.user_id && (
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setEditingReview(review)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
