import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl  flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
          src="https://static.vecteezy.com/system/resources/previews/004/697/831/non_2x/the-initial-letter-p-logo-design-modern-and-professional-free-vector.jpg"
          alt="Logo"
          className="h-10 w-10 rounded-full"></img>
        <h1 className="text-xl font-bold  text-blue-600">Prateek</h1>
        </div>
        
        <div className="space-x-12  flex justify-end text-sm md:text-base text-gray-800 dark:text-gray-100">
          <a href="#home" className="hover:text-blue-500 ">Home</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#projects" className="hover:text-blue-500">Projects</a>
          <a href="#skills" className="hover:text-blue-500">Skills</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </div>
      </div>
    </nav>
  );
}