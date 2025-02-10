import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Login = () => {
  // const [formData, setFormData] = useState({ username: "", password: "" });
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await login(formData);
  //     alert(res.data.msg);
  //     navigate("/");
  //   } catch (error) {
  //     alert(error.response?.data?.msg || "Login failed");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-200">
    <div className="bg-rose-400 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-lightBlue-700 mb-6">Log In</h2>

      {/* Error Alert */}

      {/* {error && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div>
            <span className="font-medium">Problem with logging in : {' '}</span>{error}
          </div>
        </div>
      )} */}
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-black font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            required
            // onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-black font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            required
            // onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-300 transition duration-300 border"
        >
          Login
        </button>
        {/* <OAuth/> */}
        {/* Login Link */}
      <p className=" text-black text-center mt-4">
        Don't have an account?{' '}
        <a href="/signup" className="text-white hover:underline">
          Signup
        </a>
      </p>
      </form>
    </div>
  </div>
  );

};

export default Login;
