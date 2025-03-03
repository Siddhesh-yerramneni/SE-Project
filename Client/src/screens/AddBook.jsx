import React, { useState } from "react";
import { addBook } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookname: "",
    author: "",
    description: "",
    bookImage: ""
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
      const res = await addBook(formData);
      if (res && res.msg) {
        setSuccessMessage(res.msg);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Add Book Error:", error);
      setErrorMessage(error.msg || "Failed to add book.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Book Name</label>
            <input
              type="text"
              name="bookname"
              value={formData.bookname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-orange-400"
              placeholder="Enter book name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-orange-400"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-orange-400"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Book Image URL</label>
            <input
              type="text"
              name="bookImage"
              value={formData.bookImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-orange-400"
              placeholder="Enter image URL"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Add Book
          </button>
        </form>

        {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddBook;
