import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-xl bg-gray-900/90 border-b border-gray-700 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated Navbar Background */}
      <div className="absolute inset-0 bg-gray-800/10"></div>
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(90deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.1) 50%, rgba(251,146,60,0.1) 100%)",
            "linear-gradient(90deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.1) 50%, rgba(251,146,60,0.1) 100%)",
            "linear-gradient(90deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.1) 50%, rgba(251,146,60,0.1) 100%)",
            "linear-gradient(90deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.1) 50%, rgba(251,146,60,0.1) 100%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Professional Logo & Brand */}
        <motion.div 
          className="flex items-center space-x-4 group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://static.vecteezy.com/system/resources/previews/004/697/831/non_2x/the-initial-letter-p-logo-design-modern-and-professional-free-vector.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-gray-600 shadow-lg"
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
            />
          </motion.div>
          <div>
            <motion.h1 
              className="text-2xl font-bold text-orange-400"
              whileHover={{ scale: 1.1 }}
            >
              Prateek
            </motion.h1>
            <motion.p 
              className="text-xs text-gray-400 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Full Stack Developer
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {["home", "about", "projects", "skills", "contact"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="relative group px-4 py-2 font-medium text-white/80 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-orange-400/15 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>
          ))}
          
          {/* CTA Buttons */}
          <motion.div className="flex items-center space-x-3 ml-4">
            <motion.a
              href="#contact"
              className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-400/50 transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.div 
          className="lg:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button 
            onClick={toggleMenu} 
            className="relative p-2 text-white"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </motion.div>
          </button>
        </motion.div>

        {/* Enhanced Mobile Menu */}
        <motion.div
          className={`fixed top-0 right-0 h-full w-80 backdrop-blur-2xl bg-gradient-to-br from-indigo-950/95 via-purple-900/95 to-pink-950/95 shadow-2xl border-l border-cyan-400/20 lg:hidden z-50`}
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Mobile Menu Header */}
          <div className="relative p-6 border-b border-cyan-400/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.img
                  src="https://static.vecteezy.com/system/resources/previews/004/697/831/non_2x/the-initial-letter-p-logo-design-modern-and-professional-free-vector.jpg"
                  alt="Logo"
                  className="h-10 w-10 rounded-full border border-cyan-400/30"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Prateek</h3>
                  <p className="text-xs text-gray-400">Full Stack Developer</p>
                </div>
              </div>
              <motion.button 
                onClick={toggleMenu} 
                className="p-2 text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-6 space-y-4">
            {["home", "about", "projects", "skills", "contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={toggleMenu}
                className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-lg transition-all duration-300 hover:bg-cyan-400/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 50 }}
                transition={{ delay: menuOpen ? index * 0.1 : 0, duration: 0.3 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-600">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-gray-300 text-sm font-medium">Available for Work</span>
                </div>
              </motion.a>
            ))}
            
            {/* Mobile CTA */}
            <motion.div className="pt-4 space-y-3">
              <motion.a
                href="#contact"
                onClick={toggleMenu}
                className="block w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Me
              </motion.a>
            </motion.div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cyan-400/20">
            <div className="flex justify-center space-x-4">
              {[
                { icon: FaGithub, href: "https://github.com/prateek8318" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/prateek-pandey-6087b624b/" },
                { icon: FaEnvelope, href: "mailto:prateekpandey2580@gmail.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cyan-400/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-cyan-400/20 transition-all duration-300"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
