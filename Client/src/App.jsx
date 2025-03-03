import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import Header from "./components/Header.jsx";
import Profile from "./screens/Profile.jsx";
import AddBook from "./screens/AddBook.jsx";
import AllBooks from "./screens/AllBooks.jsx";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/addBook" element={<AddBook />} />
  <Route path="/allBooks" element={<AllBooks />} />

</Routes>


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/allBooks" element={<AllBooks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;