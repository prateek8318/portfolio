import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/697/831/non_2x/the-initial-letter-p-logo-design-modern-and-professional-free-vector.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-xl font-bold text-blue-600">Prateek</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 text-sm md:text-base text-gray-800 dark:text-gray-100">
          {["home", "about", "projects", "skills", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="hover:text-blue-500 transition-all duration-300 hover:scale-105"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-blue-600">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Slide-In Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden z-50`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-2xl text-blue-600">
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col space-y-6 px-6 text-gray-800 dark:text-gray-100 text-lg">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={toggleMenu}
                className="hover:text-blue-500 transition-all duration-300 hover:translate-x-1"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
