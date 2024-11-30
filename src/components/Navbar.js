import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import melodica from '../img/Music App Icon.jpeg';
import { AiFillHeart } from 'react-icons/ai';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Handle logout logic (clear user data, tokens, etc.)
      setIsLoggedIn(false);
      alert('You have been logged out');
    } else {
      // Handle login logic
      setIsLoggedIn(true);
      alert('You are now logged in');
    }
  };

  return (
    <header className="sticky bg-gray-100 top-0 z-10 shadow-md">
      <div className="max-w-full mx-auto flex items-center justify-between p-4">
        {/* Logo Section (Left) */}
        <div className="flex items-center pl-4">
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on logo click
          >
            <img
              src={melodica}
              alt="Logo"
              className="h-24 w-24 rounded-full object-cover shadow-lg hover:opacity-80 transition-all"
            />
          </NavLink>
        </div>

        {/* Centered Navigation Links (Desktop) */}
        <nav className="hidden md:flex flex-grow justify-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-black font-semibold text-lg ${
                isActive ? 'border-b-2 border-blue-500' : 'hover:text-blue-400 transition-all'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/playlist"
            className={({ isActive }) =>
              `text-black font-semibold text-lg ${
                isActive ? 'border-b-2 border-blue-500' : 'hover:text-blue-400 transition-all'
              }`
            }
          >
            Playlists
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-black font-semibold text-lg ${
                isActive ? 'border-b-2 border-blue-500' : 'hover:text-blue-400 transition-all'
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/premium"
            className={({ isActive }) =>
              `text-black font-semibold text-lg ${
                isActive ? 'border-b-2 border-blue-500' : 'hover:text-blue-400 transition-all'
              }`
            }
          >
            Premium
          </NavLink>
        </nav>

        {/* Right Section (Sign In and Liked Icon) */}
        <div className="flex items-center pr-4 space-x-4">
          <button
            onClick={handleLoginLogout} // Login/Logout button
            className="hidden md:block text-black bg-red-600 h-12 w-24 p-2 rounded-md font-semibold text-lg text-center hover:text-blue-400 transition-all"
          >
            {isLoggedIn ? 'Log Out' : 'Log In'} {/* Toggle button text */}
          </button>
          <NavLink to="/liked-songs" className="hidden md:block">
            <AiFillHeart size={40} className="text-red-500 hover:text-red-600 transition-all" />
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md text-black focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 space-y-4 shadow-md">
          <NavLink
            to="/"
            className="block text-black font-semibold hover:text-blue-400"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu
          >
            Home
          </NavLink>
          <NavLink
            to="/playlist"
            className="block text-black font-semibold hover:text-blue-400"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu
          >
            Playlists
          </NavLink>
          <NavLink
            to="/about"
            className="block text-black font-semibold hover:text-blue-400"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu
          >
            About Us
          </NavLink>
          <NavLink
            to="/premium"
            className="block text-black font-semibold hover:text-blue-400"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu
          >
            Premium
          </NavLink>
          <button
            onClick={handleLoginLogout}
            className="block text-black font-semibold hover:text-blue-400"
          >
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </button>
          <NavLink
            to="/liked-songs"
            className="block"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu
          >
            <AiFillHeart className="text-red-500 text-2xl hover:text-red-600 transition-all mx-auto" />
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navigation;
