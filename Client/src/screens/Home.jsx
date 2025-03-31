import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  const [homeBooks, setHomeBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Uncomment the code below when you're ready to fetch data
  // useEffect(() => {
  //   const fetchHomeBooks = async () => {
  //     try {
  //       const res = await fetch('/api/book/homeBooks');
  //       const data = await res.json();
  //       setHomeBooks(data);
  //     } catch (error) {
  //       setError('Failed to fetch books. Please try again later.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchHomeBooks();
  // }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-contain bg-center"
        style={{
          backgroundImage: "url('/assets/hero.png')",
          filter: "brightness(0.4)",
          zIndex: -1,
        }}
      />

      {/* Scrolling Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="h-[550px] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Welcome to ShelfWise
          </h1>
          <p className="text-lg sm:text-xl text-white mt-4">
            Discover your next great read today!
          </p>
          <a
            href="/allBooks"
            className="mt-8 inline-block bg-orange-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300"
          >
            Browse Books
          </a>
        </section>
        {/* End Hero Section */}

        {/* Explore Categories Section */}
        <section className="py-16 bg-slate-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-700">
              <span className="text-orange-600">Explore</span>
              <span className="mx-2">Categories</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {/* Science Fiction Card */}
              <CategoryCard
                imageUrl="/assets/science-fiction.png"
                title="Science Fiction"
                description="Explore futuristic realms and interstellar adventures beyond the stars."
                linkUrl="/category/science-fiction"
              />
              {/* Non-Fiction Card */}
              <CategoryCard
                imageUrl="/assets/non-fiction.png"
                title="Non-Fiction"
                description="Dive into compelling narratives that reveal truths and insightful real-world stories."
                linkUrl="/category/non-fiction"
              />
              {/* Science Fiction Card */}
              <CategoryCard
                imageUrl="/assets/self-help.png"
                title="Self-Help"
                description="Ignite personal transformation and unlock your potential with every page."
                linkUrl="/category/science-fiction"
              />
              <CategoryCard
                imageUrl="/assets/romance.png"
                title="Romance"
                description=" Experience the passion and emotion of love’s intricate dance."
                linkUrl="/category/science-fiction"
              />
              <CategoryCard
                imageUrl="/assets/mystery.png"
                title="Mystery"
                description="Unravel secrets and unexpected twists in a world of suspense."
                linkUrl="/category/science-fiction"
              />
              <CategoryCard
                imageUrl="/assets/fantasy.png"
                title="Fantasy"
                description="Step into magical lands where myths and legends come alive."
                linkUrl="/category/science-fiction"
              />
            </div>
          </div>
        </section>
        {/* End Explore Categories Section */}

        {/* Popular Books Section */}
        <section className="py-16 bg-slate-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-700">
              Popular Books
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center mt-8">
                <p>Loading...</p>
              </div>
            ) : error ? (
              <p className="text-center text-red-500 mt-8">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {homeBooks.length > 0 ? (
                  homeBooks.map((book) => (
                    <div
                      key={book._id}
                      className="bg-slate-100 shadow-lg rounded-lg p-6 text-center"
                    >
                      <img
                        src={book.bookImage}
                        className="w-50 h-50 object-cover rounded-lg mb-4"
                        alt={book.bookname}
                      />
                      <h3 className="text-xl font-semibold text-slate-700">
                        {book.bookname}
                      </h3>
                      <p className="text-orange-600 font-semibold mt-2">
                        Author: {book.author}
                      </p>
                      <Link
                        to={`/viewBook/${book._id}`}
                        className="mt-4 inline-block bg-orange-600 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No books available.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
        {/* End Popular Books Section */}

        {/* Call to Action Section */}
        <section className="py-16 bg-slate-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Ready to start your reading journey?
            </h2>
            <p className="text-lg sm:text-xl text-slate-100 mt-4">
              Join our community of book lovers today!
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block bg-orange-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
        {/* End Call to Action Section */}
      </div>
    </>
  );
};

export default Home;
