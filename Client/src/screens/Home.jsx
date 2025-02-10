import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="shadow">
      {/* Hero Section */}
      <section className="bg-slate-100 py-16 bg-[url(/src/assets/shelfwise.jpg)]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-700">Welcome to ShelfWise</h1>
          <p className="text-lg sm:text-xl text-slate-700 mt-4">Discover your next great read today!</p>
          <Link
            to="/allBooks"
            className="mt-8 inline-block bg-orange-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300"
          >
            Browse Books
          </Link>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-slate-100">
        <div className="p-6 container bg-slate-700 mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-100">
            <span className='text-orange-600'>Explore</span>
            <span className='mx-2'>Categories</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className= " bg-[url(/src/assets/fiction.jpg)]  bg-slate-100 p-8 text-center shadow-sm ">
              <h3 className="text-xl font-extrabold text-white">Fiction</h3>
              <p className="text-white font-semibold mt-4">Immerse yourself in stories that captivate and inspire.</p>
              <Link to="/category/fiction" className="text-orange-600 hover:underline font-bold mt-4 inline-block">
                Browse Fiction
              </Link>
            </div>
            <div className="bg-[url(/src/assets/non-fiction.jpg)]   bg-slate-100 p-8 text-center shadow-sm">
              <h3 className="text-xl font-extrabold text-white
              ">Non-Fiction</h3>
              <p className="text-white font-semibold mt-4">Explore books that educate and inform.</p>
              <Link to="/category/non-fiction" className="text-orange-600 hover:underline font-bold mt-4 inline-block">
                Browse Non-Fiction
              </Link>
            </div>
            <div className="bg-[url(/src/assets/science-fiction.jpg)]  bg-slate-100 p-8 text-center shadow-sm">
              <h3 className="text-xl font-extrabold text-white
              ">Science Fiction</h3>
              <p className="text-white font-semibold mt-4">Dive into futuristic worlds and advanced technologies.</p>
              <Link to="/category/science-fiction" className="text-orange-600 font-bold hover:underline font-semibold mt-4 inline-block">
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
