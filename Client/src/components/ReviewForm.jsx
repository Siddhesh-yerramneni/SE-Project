import React, { useEffect, useState } from 'react';
import { addReview, editReview } from '../services/api';
import { useSelector } from 'react-redux';

const ReviewForm = ({ bookId, existingReview, refreshReviews }) => {
  const [reviewText, setReviewText] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setReviewText(existingReview ? existingReview.review : '');
  }, [existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure the user is logged in before submitting the review.
    if (!user) {
      console.error("User not logged in. Please log in to submit a review.");
      return;
    }

    const payload = {
      book_id: bookId,
      user_id: user.id,
      review: reviewText,
    };

    try {
      if (existingReview) {
        await editReview(existingReview.id, { review: reviewText });
      } else {
        await addReview(payload);
      }
      setReviewText('');
      refreshReviews();
    } catch (err) {
      console.error("Review submit error:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <textarea
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        {existingReview ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
