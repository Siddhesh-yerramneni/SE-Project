import React, { useState } from "react";
import { addBook } from "../services/api";
import { useNavigate } from "react-router-dom";
import { CategoryEnum } from "../utils";

const categories = Object.values(CategoryEnum);

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookname: "",
    author: "",
    description: "",
    price: "",
    category: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const res = await addBook(payload);
      if (res && res.msg) {
        setSuccessMessage(res.msg || "Book added successfully!");
        setTimeout(() => {
          navigate("/allBooks");
        }, 3000);
      } else {
        setErrorMessage("Unexpected server response.");
      }
    } catch (error) {
      console.error("Add Book Error:", error);
      setErrorMessage(error.msg || "Failed to add book.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="bookname"
            value={formData.bookname}
            onChange={handleChange}
            required
            placeholder="Book Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400"
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Author"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400"
          >
            <option value="" disabled selected>Select a category</option>
            {categories.map((cat, index) => (
           
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-300"
          >
            Add Book
          </button>
        </form>

        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddBook;
