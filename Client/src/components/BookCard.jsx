import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={`/viewBook/${book.id}`}>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-40 bg-orange-100 flex items-center justify-center rounded">
        <span className="text-2xl font-bold text-orange-500">
          {book.bookname.charAt(0)}
        </span>
      </div>
      <h3 className="text-xl font-bold mt-4 text-gray-800">{book.bookname}</h3>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-500 mt-2">{book.description}</p>
      <p className="text-green-600 mt-2 font-semibold">₹{book.price}</p>
      <p className="text-orange-500 mt-1">{book.category}</p>
    </div>
    </Link>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    bookname: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default BookCard;
