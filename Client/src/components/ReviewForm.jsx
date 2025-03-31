import React, { useEffect, useState } from 'react';
import { addReview, editReview } from '../services/api';

const ReviewForm = ({ bookId, userId, existingReview, refreshReviews }) => {
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    if (existingReview) {
      setReviewText(existingReview.review);
    } else {
      setReviewText('');
    }
  }, [existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      book_id: bookId,
      user_id: userId,
      review: reviewText,
    };
    console.log("Submitting Review:", payload);

    try {
      if (existingReview) {
        await editReview(existingReview.id, { review: reviewText });
        console.log("✅ Review updated");
      } else {
        await addReview(payload);
        console.log("✅ Review added");
      }

      setReviewText('');
      refreshReviews();
    } catch (err) {
      console.error("❌ Review submit error:", err.response?.data || err.message);
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
