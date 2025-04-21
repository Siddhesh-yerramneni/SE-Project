import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { fetchAllBooks } from "../services/api";
import { CategoryEnum } from "../utils";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";

const Home = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchBooks();
  }, [location]);

  const fetchBooks = async () => {
    try {
      const data = await fetchAllBooks();
      let allBooks = data.books;
      if (allBooks.length > 4) {
        setPopularBooks(allBooks.slice(0, 4));
      } else {
        setPopularBooks(allBooks);
      }
    } catch (err) {
      setError(err.msg || "Failed to fetch books.");
    } finally {
      setIsLoading(false);
    }
  };

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
                title={CategoryEnum.SCIENCE_FICTION}
                description="Explore futuristic realms and interstellar adventures beyond the stars."
                linkUrl="/allBooks"
              />
              {/* Non-Fiction Card */}
              <CategoryCard
                imageUrl="/assets/non-fiction.png"
                title={CategoryEnum.NON_FICTION}
                description="Dive into compelling narratives that reveal truths and insightful real-world stories."
                linkUrl="/allBooks"
              />
              {/* Science Fiction Card */}
              <CategoryCard
                imageUrl="/assets/self-help.png"
                title={CategoryEnum.SELF_HELP}
                description="Ignite personal transformation and unlock your potential with every page."
                linkUrl="/allBooks"
              />
              <CategoryCard
                imageUrl="/assets/romance.png"
                title={CategoryEnum.ROMANCE}
                description=" Experience the passion and emotion of love’s intricate dance."
                // linkUrl="/allBooks"
              />
              <CategoryCard
                imageUrl="/assets/mystery.png"
                title={CategoryEnum.MYSTERY}
                description="Unravel secrets and unexpected twists in a world of suspense."
                linkUrl="/allBooks"
              />
              <CategoryCard
                imageUrl="/assets/fantasy.png"
                title={CategoryEnum.FANTASY}
                description="Step into magical lands where myths and legends come alive."
                linkUrl="/allBooks"
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
                {popularBooks.length > 0 ? (
                   popularBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
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
