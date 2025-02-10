import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className='shadow'>
      <section className="bg-zinc-200 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to ShelfWise
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mt-4">
            Discover your next great read today!
          </p>
        </div>
      </section>     
    </div>
  );
};

export default Home;