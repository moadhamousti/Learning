import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="bg-[--secondary-color] grid gap-4 grid-cols-1 md:grid-cols-2 px-4 py-8 md:py-16" id="Home">
      {/* Text and Button */}
      <div className="flex flex-col justify-center text-[--primary-color] p-4 lg:items-start items-center">
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center lg:text-left w-full md:w-4/5 lg:w-5/6">
          Grow up your skills by online courses with LogoName
        </p>
        <button className="mt-6 p-2 w-2/4 md:w-2/3 lg:w-2/6 border-2 border-[--primary-color] rounded-lg text-[--primary-color] bg-[--secondary-color] hover:bg-[--primary-color] hover:text-[--text-color] font-bold text-lg md:text-xl">
          <Link to="/login">Join Us</Link>
        </button>
      </div>
      {/* Image */}
      <div className="hidden md:block">
        <img src="./banner.png" alt="banner" className="w-full h-auto" />
      </div>
    </section>
  );
}

export default Hero;
