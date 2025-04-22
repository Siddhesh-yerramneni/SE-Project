import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import Header from "./components/Header.jsx";
import Profile from "./screens/Profile.jsx";
import AllBooks from "./screens/AllBooks.jsx";
import AddBook from "./screens/AddBook.jsx";
import ViewBook from "./screens/ViewBook.jsx";
import CreatePost from './screens/CreatePost';
import AllPosts from './screens/AllPosts';
import EditPost from './screens/EditPost';
import AboutUs from "./components/AboutUs.jsx";




function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/allBooks/:category" element={<AllBooks />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/viewBook/:id" element={<ViewBook />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/allPosts" element={<AllPosts />} />
        <Route path="/editPost/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
