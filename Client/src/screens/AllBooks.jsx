import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBooks } from "../services/api";
import { useParams } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { category } = useParams();


  console.log("category=>", category)
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
<<<<<<< HEAD
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        All Books
      </h2>

=======
<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
  {category!==undefined? `${category} Books` : "All Books"}
</h2>
>>>>>>> 81de171505b521ee58732511221d4be04a1dab6e
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Link
              key={book.id}
              to={`/viewBook/${book.id}`}
              className="block hover:shadow-lg transition duration-300 rounded-md"
            >
              <div className="border p-4 rounded-md shadow-md bg-white hover:bg-orange-100 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  {/* ✅ Placeholder-style image block */}
                  <div className="w-full h-48 bg-orange-100 flex items-center justify-center rounded mb-4">
                    <span className="text-4xl font-bold text-orange-500">
                      {book.bookname?.charAt(0).toUpperCase() || "B"}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {book.bookname}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Author: {book.author}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {book.description}
                  </p>

                  <p className="text-green-700 font-semibold mt-2">
                    ₹{book.price}
                  </p>

                  <p className="text-xs text-orange-500 mt-1">{book.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
