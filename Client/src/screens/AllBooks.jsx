import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { fetchAllBooks } from "../services/api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await fetchAllBooks();
      setBooks(data.books);
    } catch (err) {
      setError(err.msg || "Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };
  

  if (error) return <div className="text-center text-red-600 mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-300 p-14">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        All Books
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
