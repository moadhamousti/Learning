import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[--primary-color] text-xl font-semibold flex justify-between items-center px-4 py-2 relative">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src="./white-logo.svg" alt="logo" className="object-cover w-16 cursor-pointer" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-8 h-8 text-[--text-color]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className={`absolute top-full inset-x-0 bg-[--primary-color] ${isOpen ? 'flex' : 'hidden'} md:relative md:flex md:flex-row md:gap-4 md:items-center md:bg-transparent transition-transform duration-300 ease-in-out`}>
        <ul className="list-none flex flex-col sm:flex-row gap-4 text-[--text-color] sm:gap-6 sm:items-center sm:justify-center py-4 sm:py-0 mx-auto max-w-screen-md">
          <li className="text-center"><a href="#Home" className="scroll-smooth">Home</a></li>
          <li className="text-center"><a href="#Features" className="scroll-smooth">Features</a></li>
          <li className="text-center"><a href="#About" className="scroll-smooth">About</a></li>
        </ul>
      </div>
      
      {/* Login Button */}
      <Link to="/login" className="md:block hidden text-decoration-none">
        <button className="py-1 px-3 rounded-md bg-[--button-color] text-[--text-color] text-md font-medium hover:bg-transparent hover:text-[--button-color] hover:border-[--button-color] border-2 border-transparent">
          Login
        </button>
      </Link>
    </header>
  );
};

export default Header;
