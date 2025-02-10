// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="shadow">
      {/* Hero Section */}
      <section className="bg-cream-white py-16 bg-[url(/src/assets/shelfwise.jpg)]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-blue">Welcome to ShelfWise</h1>
          <p className="text-lg sm:text-xl text-navy-blue mt-4">Discover your next great read today!</p>
          <Link
            to="/allBooks"
            className="mt-8 inline-block bg-vibrant-orange text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300"
          >
            Browse Books
          </Link>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-cream-white">
        <div className="p-6 container bg-navy-blue mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-cream-white">
            <span className='text-vibrant-orange'>Explore</span>
            <span className='mx-2'>Categories</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className= " bg-[url(/src/assets/fiction.jpg)]  bg-cream-white p-8 text-center shadow-sm ">
              <h3 className="text-xl font-extrabold text-white">Fiction</h3>
              <p className="text-white font-semibold mt-4">Immerse yourself in stories that captivate and inspire.</p>
              <Link to="/category/fiction" className="text-vibrant-orange hover:underline font-bold mt-4 inline-block">
                Browse Fiction
              </Link>
            </div>
            <div className="bg-[url(/src/assets/non-fiction.jpg)]   bg-cream-white p-8 text-center shadow-sm">
              <h3 className="text-xl font-extrabold text-white
              ">Non-Fiction</h3>
              <p className="text-white font-semibold mt-4">Explore books that educate and inform.</p>
              <Link to="/category/non-fiction" className="text-vibrant-orange hover:underline font-bold mt-4 inline-block">
                Browse Non-Fiction
              </Link>
            </div>
            <div className="bg-[url(/src/assets/science-fiction.jpg)]  bg-cream-white p-8 text-center shadow-sm">
              <h3 className="text-xl font-extrabold text-white
              ">Science Fiction</h3>
              <p className="text-white font-semibold mt-4">Dive into futuristic worlds and advanced technologies.</p>
              <Link to="/category/science-fiction" className="text-vibrant-orange font-bold hover:underline font-semibold mt-4 inline-block">
                Browse Science Fiction
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
