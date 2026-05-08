import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function About() {
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={ref} id="about" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Simplified Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-500/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Knowledge Icon */}
          <motion.div 
            className="absolute -top-16 right-0 w-28 h-28 opacity-30 pointer-events-none"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/about-3d.png" alt="3D Books" className="w-full h-full object-contain" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="glass-luxury rounded-[2.5rem] p-8 md:p-12 border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Student Lottie - Moved to the far left corner */}
            <div className="absolute -top-40 -left-48 w-64 h-64 z-0 pointer-events-none opacity-60 drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <DotLottieReact src="/STUDENT.lottie" autoplay loop />
            </div>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed text-center font-light relative z-20 px-4">
              I'm a passionate <span className="text-orange-400 font-medium">Full Stack Developer</span> with a knack for building dynamic, high-performance web and mobile applications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { number: "50+", label: "Projects Completed", icon: "🚀" },
                { number: "2+", label: "Years Experience", icon: "💎" },
                { number: "100%", label: "Client Satisfaction", icon: "⭐" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`bg-white/5 rounded-3xl p-8 border border-white/5 text-center group ${!isMobile ? 'hover:bg-white/10' : ''} transition-colors`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={isMobile ? {} : { y: -5 }}
                >
                  <div className="text-3xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 text-center">
              <p className="text-gray-400 text-lg leading-relaxed italic">
                "I believe in writing clean, maintainable code that solves real-world problems while providing a seamless user experience."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
