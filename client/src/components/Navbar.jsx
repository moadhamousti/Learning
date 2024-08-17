import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    // Fetch the current user's data by userId
    const fetchUserImage = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`/api/users/${user.id}`);
          setUserImage(response.data.image);
        } catch (error) {
          console.error('Error fetching user image:', error);
        }
      }
    };

    fetchUserImage();
  }, [user?.id]);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside of the menu
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
        await logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

  return (
    <header className="bg-[--primary-color] text-xl font-semibold flex justify-between items-center p-4 px-7">
      <div>
        <Link to="/">
          <img src="./white-logo.svg" alt="logo" className="object-cover w-16 cursor-pointer" />
        </Link>
      </div>

      {/* User Menu */}
      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMenuToggle}
            className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 focus:outline-none"
          >
            <img
              src={userImage || 'https://firebasestorage.googleapis.com/v0/b/e-learning-9e559.appspot.com/o/profilPics%2Fde7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?alt=media&token=03d1a2e9-28fc-4396-bbc5-350fbef270e7'}
              alt="User Avatar"
              className="object-cover sm:w-full sm:h-full w-fit h-fit"
              onError={(e) => {
                console.error('Image load error:', e);
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute -right-2.5 mt-1 bg-[--primary-color] shadow-lg rounded-lg w-48 z-10">
              <ul className="list-none p-2">
                <li>
                  <Link to="/profile" className="block px-4 py-2 text-[--text-color] hover:text-gray-400">
                    Profile
                  </Link>
                </li>
                {user.isAdmin && (
                  <li>
                    <Link to="/dashboard" className="block px-4 py-2 text-[--text-color] hover:text-gray-400">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/formation" className="block px-4 py-2 text-[--text-color] hover:text-gray-400">
                    Courses
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-[--text-color] hover:text-gray-400 text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="text-decoration-none">
          <button className="py-1 px-3 rounded-md bg-[--button-color] text-[--text-color] text-md font-medium lg:block sm:hidden">
            Login
          </button>
        </Link>
      )}
    </header>
  );
}

export default Navbar;
