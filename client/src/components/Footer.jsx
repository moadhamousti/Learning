import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[--secondary-color] p-5 pb-1" id="About">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <img src="./logo.svg" alt="logo" className="w-20 object-cover mb-4" />
            <p className="text-[--primary-color] leading-8 text-center md:text-left lg:text-xl md:text-lg sm:text-sm">
              loremlorem loremlorem lorem lorem lorem lorem lorem lorem lorem loremloremlorem.lorem lorem lorem lorem lorem lorem
            </p>
          </div>

          <div className='flex justify-around gap-2 '>
          {/* About Us Links */}
          <div className=''>
            <ul className="list-none">
              <h3 className="text-2xl text-[--primary-color] font-bold py-4">About Us</h3>
              <li><Link to="#" className="text-[--primary-color] text-lg font-medium">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us Links */}
          <div>
            <ul className="list-none">
              <h3 className="text-2xl text-[--primary-color] font-bold py-4">Follow Us</h3>
              <div className="flex gap-4 md:justify-start justify-start">
                <li><Link to="#facebook"><img src="./facebook.svg" alt="Facebook" className="w-6 h-6" /></Link></li>
                <li><Link to="#instagram"><img src="./instagram.svg" alt="Instagram" className="w-6 h-6" /></Link></li>
                <li><Link to="#twitter"><img src="./twitter.svg" alt="Twitter" className="w-6 h-6" /></Link></li>
              </div>
            </ul>
          </div>
        </div>
    </div>

      {/* Footer Bottom */}
      <p className="text-center text-[--primary-color] text-sm md:text-base lg:text-lg mt-4 mb-2">
        &copy; {new Date().getFullYear()} Made with <span className="text-red-500">❤️</span> by <b>Brahim Azzaf</b>. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
