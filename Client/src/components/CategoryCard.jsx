import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ imageUrl, title, description, linkUrl }) => {
  return (
    <div className="relative group h-64 overflow-hidden rounded-lg shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 z-0"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      ></div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h3 className="text-xl font-extrabold text-white">{title}</h3>
        <p className="text-white font-semibold mt-2 text-center">
          {description}
        </p>
        <Link
          to={`/allBooks/${title}`}
          className="mt-4 inline-block bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition"
        >
          Browse {title}
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
