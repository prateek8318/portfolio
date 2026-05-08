import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaDatabase, FaArrowUp, FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from "../hooks/useDarkMode";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const videoRef = useRef(null);
  const { isDark, toggleDarkMode } = useDarkMode();

  // Optimized scroll-based transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoize particles to prevent re-renders
  const particles = useMemo(() => [...Array(12)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2 + 'px',
    left: Math.random() * 100 + '%',
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 8
  })), []);

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Optimized Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://www.pexels.com/video/853880/download/" type="video/mp4" />
        </video>
        
        {/* Animated Background Blobs - Simplified */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute top-1/4 -right-10 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-[80px]"></div>
      </div>
      
      {/* Particle Background */}
      <div className="particle-bg fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              backgroundColor: 'rgba(249, 115, 22, 0.3)',
              borderRadius: '50%',
              position: 'absolute'
            }}
            animate={{
              y: ['110vh', '-10vh'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Available for Work</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-white">Prateek Kumar</span>
              <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Pandey</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-xl">
              Building outstanding digital experiences with modern web technologies.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="btn-luxury px-8 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-3 glass-luxury rounded-xl text-white font-medium hover:scale-105 transition-transform">
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Profile Image with Simplified Animations */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                <img 
                  src="./image.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FaLaptopCode />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sections */}
      <About />
      <Projects />
      <Skills />
      <Contact />

      {/* UI Controls */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={toggleDarkMode}
          className="w-12 h-12 glass-luxury text-white rounded-full shadow-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}
