import React, { useEffect, useState } from "react";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/homeBooks");
        const data = await res.json();
        setBooks(data.books);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  

  if (loading) return <div className="text-center mt-20">Loading books...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-14">

      <h2 className="text-3xl font-bold text-center mb-8">All Books</h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              <img
                src={book.bookImage}
                alt={book.bookname}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{book.bookname}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-500 mt-2">{book.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
