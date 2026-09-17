import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaDatabase, FaArrowUp, FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from "../hooks/useDarkMode";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { TypewriterText } from "./TypewriterText";

// Lazy load below-the-fold components for performance
const TerminalIntro = React.lazy(() => import("./TerminalIntro"));
const About = React.lazy(() => import("./About"));
const StatsDashboard = React.lazy(() => import("./StatsDashboard"));
const Projects = React.lazy(() => import("./Projects"));
const Skills = React.lazy(() => import("./Skills"));
const Contact = React.lazy(() => import("./Contact"));

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  // Optimized scroll-based transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const bgX = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const bgY = useTransform(springY, [-0.5, 0.5], [30, -30]);
  const fgX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const fgY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
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

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Optimized Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Animated Background Blobs with Parallax */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ x: bgX, y: bgY }}
        >
          <div className="absolute top-0 -left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute top-1/4 -right-10 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-[80px]"></div>
      </div>
      
      {/* Particle Background Removed for Performance */}

      {/* Floating Tech Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-100">
        {['React', 'Node', 'PHP', 'SQL', 'JS', 'CSS'].map((tech, i) => (
          <motion.div
            key={tech}
            className="absolute text-white/10 font-bold text-6xl md:text-8xl select-none"
            style={{ 
              left: `${(i * 20) % 100}%`, 
              top: `${(i * 25) % 100}%` 
            }}
            animate={{ 
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {tech}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { 
                  staggerChildren: 0.2,
                  delayChildren: 0.3 
                }
              }
            }}
            className="space-y-6"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full border border-white/10"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Available for Work</span>
            </motion.div>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="block text-white">Prateek Kumar</span>
              <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Pandey</span>
            </motion.h1>
            
            <TypewriterText />

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a href="#projects" className="btn-luxury px-8 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-3 glass-luxury rounded-xl text-white font-medium hover:scale-105 transition-transform border border-white/10">
                Contact Me
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download="Prateek_Resume.pdf" className="px-8 py-3 glass-luxury rounded-xl text-white font-medium hover:scale-105 transition-transform border border-white/10 text-orange-400">
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image with Floating Robot Icon */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ x: fgX, y: fgY }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px]">
              {/* Outer Glows */}
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl z-10 p-2 bg-white/5 backdrop-blur-sm">
                <img 
                  src="/image.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Lottie Animation - Developer */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 z-20 pointer-events-none">
                <DotLottieReact
                  src="/Developer.lottie"
                  autoplay
                  loop
                />
              </div>

              {/* 3D Robot Developer Icon Removed for Performance - Keeping only Lottie */}

              {/* Decorative Tech Elements */}
              <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 glass-luxury rounded-2xl border border-white/10 text-white flex items-center gap-3 z-20 shadow-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Coding Magic...</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sections - Lazy Loaded */}
      <React.Suspense fallback={<div className="h-screen flex items-center justify-center text-orange-400">Loading section...</div>}>
        <TerminalIntro />
        <About />
        <StatsDashboard />
        <Projects />
        <Skills />
        <Contact />
      </React.Suspense>

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
    </motion.div>
  );
}
