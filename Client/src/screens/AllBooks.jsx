import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/getBooks");
        const data = await res.json();
        setBooks(data.books);
      } catch (err) {
        setError("Failed to fetch books.");
      }
    };
    fetchBooks();
  }, []);

  if (error) return <div className="text-center text-red-600 mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-300 p-14">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        All Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-40 bg-orange-100 flex items-center justify-center rounded">
                <span className="text-2xl font-bold text-orange-500">
                  {book.bookname.charAt(0)}
                </span>
              </div>
              <Link to={`/viewBook/${book.id}`}>
  <h3 className="text-xl font-bold mt-4 text-gray-800 hover:underline">
    {book.bookname}
  </h3>
</Link>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-500 mt-2">{book.description}</p>
              <p className="text-green-600 mt-2 font-semibold">
                ₹{book.price}
              </p>
              <p className="text-orange-500 mt-1">{book.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
