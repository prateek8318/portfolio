import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaLaptopCode, FaMobileAlt, FaDatabase, FaCloud, FaCode, FaServer, FaPlay, FaPause, FaArrowUp } from "react-icons/fa";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";


export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const videoRef = React.useRef(null);

  // Enhanced scroll-based transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const backgroundBlur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  
  return (
    <>
      {/* Enhanced Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Video Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://www.pexels.com/video/853880/download/" type="video/mp4" />
        </video>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-950/60 via-gray-900/60 to-gray-950/60"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.6, 0.9]) }}
        />
      </div>
      
      {/* Enhanced Scroll-based Background Elements */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 will-change-transform"
        style={{
          opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0]),
          y: backgroundY,
          filter: `blur(${backgroundBlur}px)`,
          transform: 'translate3d(0,0,0)'
        }}
      />
      
      {/* Enhanced Parallax Tech Grid */}
      <motion.div 
        className="fixed inset-0 opacity-10 will-change-transform"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        }}
      />
      
      {/* Tech-themed Background Elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        {/* Floating Code Brackets */}
        <motion.div
          className="absolute top-20 left-20 text-orange-500/30 text-6xl font-mono"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {'</>'}
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-32 text-orange-400/25 text-5xl font-mono"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {'{...}'}
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-40 text-orange-600/20 text-4xl font-mono"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 4, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {'< />'}
        </motion.div>
        
        {/* Binary Code Rain */}
        <motion.div
          className="absolute top-0 left-1/4 text-green-400/10 font-mono text-sm"
          animate={{
            y: [-100, 1000],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {'01101001 01001001 01001001 01101111'}
        </motion.div>
        
        <motion.div
          className="absolute top-0 right-1/3 text-green-400/10 font-mono text-sm"
          animate={{
            y: [-100, 1000],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        >
          {'01010000 01010010 01000001 01010100 01000101 01000101 01001011'}
        </motion.div>
        
        {/* Floating Tech Icons */}
        <motion.div
          className="absolute top-1/3 left-20 text-orange-500/20 text-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {'</>'}
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-20 text-orange-400/15 text-4xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            rotate: [0, -360, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {'{}'}
        </motion.div>
      </motion.div>

    {/* Enhanced 3D Floating Elements Background */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Code Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-cyan-400/20 text-2xl font-mono will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        >
          {['{ }', '< />', '[]', '()', '=>', '...'][i % 6]}
        </motion.div>
      ))}
      
      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/30 rounded-full blur-xl will-change-transform"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-pink-400/30 rounded-full blur-xl will-change-transform"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-400/30 rounded-full blur-xl will-change-transform"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
      />
    </div>

    {/* Optimized Floating Tech Icons */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Tech Icons with Enhanced Animation */}
      <motion.div
        className="absolute top-32 left-20 text-cyan-300/30 text-6xl will-change-transform"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <FaLaptopCode />
      </motion.div>
      
      <motion.div
        className="absolute top-60 right-32 text-pink-300/30 text-5xl will-change-transform"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 15, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <FaMobileAlt />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-40 text-emerald-300/30 text-7xl will-change-transform"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 20, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <FaDatabase />
      </motion.div>
    </div>

    {/* Modern Hero Section */}
    <motion.section
    id="home"
      className="min-h-screen flex items-center justify-center bg-gray-950 p-8 relative overflow-hidden"
      style={{ opacity: heroOpacity, scale: heroScale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Text Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">Available for Work</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Prateek Kumar
            <span className="text-orange-400"> Pandey</span>
          </motion.h1>

          <motion.div
            className="text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Full Stack Developer
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {['PHP', 'React', 'Node.js', '.NET'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium border border-gray-700 hover:bg-gray-700 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        
        {/* Image Section */}
<motion.div
  className="flex justify-center lg:justify-end items-center"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  <div className="relative flex items-center justify-center">
    
    {/* Outer rotating ring */}
    <motion.div
      className="absolute w-[480px] h-[480px] rounded-full"
      style={{
        background: 'conic-gradient(from 0deg, transparent 60%, #f97316 80%, #ef4444 90%, transparent 100%)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />

    {/* Inner glow ring */}
    <div
      className="absolute w-[300px] h-[300px] rounded-full"
      style={{
        boxShadow: '0 0 60px 10px rgba(249, 115, 22, 0.4), inset 0 0 40px rgba(249, 115, 22, 0.1)',
        border: '2px solid rgba(249, 115, 22, 0.5)',
      }}
    />

    {/* Profile Image - Circular */}
    <motion.div
      className="relative w-[480px] h-[480px] rounded-full overflow-hidden border-4 border-orange-500/60 z-10"
      style={{
        boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)'
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="/src/assets/image.png"
        alt="Prateek Kumar Pandey"
        className="w-full h-full object-cover object-top"
      />
    </motion.div>

    {/* Decorative brackets < > */}
    <motion.div
      className="absolute left-0 text-orange-400/40 text-5xl font-bold select-none"
      animate={{ x: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ transform: 'translateX(-30px)' }}
    >
      {"<"}
    </motion.div>
    <motion.div
      className="absolute right-0 text-orange-400/40 text-5xl font-bold select-none"
      animate={{ x: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ transform: 'translateX(30px)' }}
    >
      {">"}
    </motion.div>

  </div>
</motion.div>
      </motion.div>

             
    </motion.section>
    
    <About />
      <Projects />
      <Skills />
      <Contact />
      
      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-full shadow-lg hover:shadow-cyan-400/50 z-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
      </>       
  );
 
}
