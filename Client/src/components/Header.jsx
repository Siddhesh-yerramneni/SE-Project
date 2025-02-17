import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className='bg-rose-400 shadow-md fixed top-0 left-0 w-full z-50'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-white'>Shelf</span>
                        <span className='text-slate-800'>Wise</span>
                    </h1>
                </Link>
                <ul className='flex gap-4'>
                    <Link to='/login'>
                        <li className='hidden sm:inline text-white hover:underline'> Sign in</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}