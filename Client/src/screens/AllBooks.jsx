import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBooks } from "../services/api";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { category } = useParams();


  useEffect(() => {
    fetchBooks();
  }, [category]);

  const fetchBooks = async () => {
    try {
      const data = await fetchAllBooks();
      let allBooks = data.books;
      if (category) {
        allBooks = allBooks.filter(book => book.category === category);
      }
      
      setBooks(allBooks);
    } catch (err) {
      setError(err.msg || "Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-center text-red-600 mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-300 p-14">
<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
  {category!==undefined? `${category} Books` : "All Books"}
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
