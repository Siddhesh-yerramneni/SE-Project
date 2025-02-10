import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [homeBooks, setHomeBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeBooks = async () => {
      try {
        const res = await fetch('/api/book/homeBooks');
        const data = await res.json();
        setHomeBooks(data);
      } catch (error) {
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeBooks();
  }, []);

  return (
    <div className='shadow'>
      {/* Hero Section */}
      <section className="bg-cream-white py-16  bg-[url(/src/assets/shelfwise.jpg)] " >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-blue">
            Welcome to ShelfWise
          </h1>
          <p className="text-lg sm:text-xl text-navy-blue mt-4">
            Discover your next great read today!
          </p>
          <Link to="/allBooks" className="mt-8 inline-block bg-vibrant-orange text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300">
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

      {/* Popular Books Section */}
      <section className="py-16 bg-cream-white">
        <div className='container mx-auto'>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy-blue">
            Popular Books
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center mt-8">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 mt-8">{error}</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
              {homeBooks.length > 0 ? (
                homeBooks.map((book) => (
                  <div key={book._id} className='bg-cream-white shadow-lg rounded-lg p-6 text-center'>
                    <img src={book.bookImage} className='w-50 h-50 object-cover rounded-lg mb-4' alt={book.bookname} />
                    <h3 className='text-xl font-semibold text-navy-blue'>
                      {book.bookname}
                    </h3>
                    <p className="text-vibrant-orange font-semibold mt-2">
                      Author: {book.author}
                    </p>
                    <Link
                      to={`/viewBook/${book._id}`}
                      className="mt-4 inline-block bg-vibrant-orange text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No books available.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-navy-blue">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-cream-white">
            Ready to start your reading journey?
          </h2>
          <p className="text-lg sm:text-xl text-cream-white mt-4">
            Join our community of book lovers today!
          </p>
          <Link to="/signup" className="mt-8 inline-block bg-vibrant-orange text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;