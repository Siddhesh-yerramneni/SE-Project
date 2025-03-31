import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBook } from '../services/api';
import ReviewList from '../components/ReviewList';

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBook(id);
        setBook(res.book);
      } catch (err) {
        console.error('Failed to fetch book:', err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div className="text-center mt-20">Loading book...</div>;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("Current user:", currentUser); // Optional: debug

  return (
    <div className="min-h-screen p-8 bg-slate-100">
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800">{book.bookname}</h2>
        <p className="text-gray-700 mt-2">Author: {book.author}</p>
        <p className="mt-4 text-gray-600">{book.description}</p>
        <p className="text-green-600 font-semibold mt-2">₹{book.price}</p>
        <p className="text-orange-600 mt-1">{book.category}</p>

        {/* ✅ Corrected field casing */}
        <ReviewList bookId={book.id} currentUserId={currentUser?.id} />
      </div>
    </div>
  );
};

export default ViewBook;
