import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/90 border-b border-gray-700 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-4 group"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/697/831/non_2x/the-initial-letter-p-logo-design-modern-and-professional-free-vector.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-gray-600 shadow-lg"
            />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-orange-400">Prateek</h1>
            <p className="text-xs text-gray-400 font-medium">Full Stack Developer</p>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {["home", "about", "projects", "skills", "contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="relative group px-4 py-2 text-white/80 hover:text-white"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Hamburger Button */}
        <motion.button
          className="lg:hidden p-3 text-white bg-gray-800/60 rounded-lg border border-gray-700"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </motion.button>
      </div>

      {/* Mobile Menu - positioned below navbar */}
      <motion.div
        className={`fixed top-full left-0 right-0 lg:hidden z-[40] backdrop-blur-xl bg-gray-950/95 border-t border-gray-800`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          {/* <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <div className="flex items-center space-x-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/004/697/831/non_2x/the-initial-letter-p-logo-design-modern-and-professional-free-vector.jpg"
                alt="Logo"
                className="h-10 w-10 rounded-full border border-orange-500/30"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Prateek</h3>
                <p className="text-sm text-gray-400">Full Stack Developer</p>
              </div>
            </div>
            <button onClick={toggleMenu} className="text-white/70 hover:text-white">
              <FaTimes className="text-3xl" />
            </button>
          </div> */}

          {/* Links */}
          <div className="flex-1 flex flex-col p-6 space-y-4">
            {["home", "about", "projects", "skills", "contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  setTimeout(() => {
                    const element = document.getElementById(item);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="text-lg font-medium text-white hover:text-orange-400 hover:bg-gray-800/50 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </div>

          {/* Footer / CTA */}
          <div className="p-6 border-t border-gray-800 space-y-4">
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu();
                setTimeout(() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="block py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.a>

            <div className="flex justify-center gap-6 pt-4">
              <a href="https://github.com/prateek8318" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-3xl text-white/70 hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/prateek-pandey-6087b624b/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-3xl text-white/70 hover:text-white" />
              </a>
              <a href="mailto:prateekpandey2580@gmail.com">
                <FaEnvelope className="text-3xl text-white/70 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}