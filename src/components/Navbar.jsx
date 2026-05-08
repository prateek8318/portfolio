import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.div 
          className="hidden lg:flex items-center space-x-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
              }
            }
          }}
        >
          {["home", "about", "projects", "skills", "contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item}`}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="relative group px-4 py-2 text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(249,115,22,0.4)]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249,115,22,0.6)" }}
          >
            Hire Me
          </motion.a>
        </motion.div>

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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 lg:hidden z-[100] bg-gray-900/95 backdrop-blur-2xl flex flex-col"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Prateek</h3>
                  <p className="text-xs text-gray-400">Full Stack Developer</p>
                </div>
              </div>
              <button onClick={toggleMenu} className="p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Links - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
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
                  className="text-4xl font-bold text-white/90 hover:text-orange-400 transition-colors uppercase tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Footer / CTA */}
            <div className="p-8 border-t border-white/5 bg-black/40">
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
                className="block py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center rounded-2xl font-bold text-xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] mb-8"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Hire Me
              </motion.a>

              <div className="flex justify-center gap-10">
                {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="text-white/40 hover:text-white transition-colors"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <Icon className="text-3xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}