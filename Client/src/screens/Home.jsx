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
    </div>
  );
};

export default Home;
