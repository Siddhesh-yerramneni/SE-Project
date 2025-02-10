import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup";
import Header from "./components/Header.jsx";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
