import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleSignOut = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
        window.location.reload(); // Reload to reset state
    };

    return (
        <header className='bg-slate-700 shadow-md fixed top-0 left-0 w-full z-50'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-100'>Shelf</span>
                        <span className='text-orange-600'>Wise</span>
                    </h1>
                </Link>
                <ul className='flex gap-4 items-center'>
                    <Link to='/'><li className='hidden sm:inline text-slate-100 hover:underline'>Home</li></Link>
                    <Link to='/about'><li className='hidden sm:inline text-slate-100 hover:underline'>About</li></Link>

                    {currentUser ? (
                        <>
                            <Link to='/profile'>
                                <li className='hidden sm:inline text-slate-100 hover:underline'>
                                    Profile
                                </li>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className='hidden sm:inline text-slate-100 hover:underline'
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <li className='hidden sm:inline text-slate-100 hover:underline'>Sign in</li>
                        </Link>
                    )}
                    {currentUser && (
  <Link to="/addBook">
    <li className="hidden sm:inline text-slate-100 hover:underline">Add Book</li>
  </Link>
  
)}
{currentUser && (
  <Link to="/createPost" className="text-slate-100 hover:underline">Create Post</Link>
)}
<Link to="/allPosts" className="text-slate-100 hover:underline">View Posts</Link>



                </ul>
            </div>
        </header>
    );
}
