import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { useScrollTrigger } from "../hooks/useSmoothScroll";
import { useAdvancedCursor } from "../hooks/useAdvancedCursor";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaPhp, FaLaravel, FaGitAlt, FaDatabase,
  FaNodeJs, FaPython, FaDocker, FaAws,
  FaMicrosoft
} from "react-icons/fa";

const skills = [
  { icon: <FaHtml5 />, name: "HTML", level: 95, color: "from-orange-500 to-red-500" },
  { icon: <FaCss3Alt />, name: "CSS", level: 90, color: "from-blue-500 to-blue-600" },
  { icon: <FaJs />, name: "JavaScript", level: 85, color: "from-yellow-400 to-yellow-600" },
  { icon: <FaReact />, name: "React", level: 88, color: "from-cyan-400 to-blue-500" },
  { icon: <FaReact />, name: "React Native", level: 82, color: "from-blue-400 to-cyan-600" },
  { icon: <FaPhp />, name: "PHP", level: 92, color: "from-purple-500 to-indigo-600" },
  { icon: <FaLaravel />, name: "Laravel", level: 87, color: "from-red-500 to-orange-600" },
  { icon: <FaDatabase />, name: "MySQL", level: 83, color: "from-blue-600 to-cyan-600" },
  { icon: <FaGitAlt />, name: "Git", level: 86, color: "from-orange-600 to-red-600" },
  { icon: <FaNodeJs />, name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
  { icon: <FaMicrosoft />, name: ".NET", level: 78, color: "from-purple-600 to-blue-600" },
  { icon: <FaDocker />, name: "Docker", level: 70, color: "from-blue-500 to-blue-700" },
];

export default function Skills() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll();
  const { progress: scrollProgress } = useScrollTrigger(ref, { trigger: 0.2 });
  const { addMagneticEffect } = useAdvancedCursor();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  return (
    <section ref={ref} id="skills" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Video for Skills - Optimized Playback */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <video
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          onCanPlay={(e) => {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  e.target.play().catch(() => {});
                } else {
                  e.target.pause();
                }
              });
            }, { threshold: 0.1 });
            observer.observe(e.target);
          }}
        >
          <source src="/12681556_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Brain Icon */}
          <motion.div 
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 z-0 opacity-40 pointer-events-none"
            animate={{ 
              y: [0, -20, 0],
              rotateY: [0, 180, 360]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <img src="/skills-3d.png" alt="3D Brain" className="w-full h-full object-contain" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 relative z-20">Technical Expertise</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full relative z-20" />
          
          {/* Smartphones Lottie - Positioned to the far right corner */}
          <div className="absolute -bottom-32 -right-32 w-80 h-80 z-0 pointer-events-none drop-shadow-[0_0_30px_rgba(249,115,22,0.15)] opacity-80">
            <DotLottiePlayer src="/Smartphones Applications.lottie" autoplay loop />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="glass-luxury rounded-3xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: idx * 0.05 }}
              whileHover={isMobile ? {} : { y: -5 }}
            >
              <div className={`text-4xl md:text-5xl mb-6 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}>
                {skill.icon}
              </div>
              
              <h3 className="text-white font-bold text-lg mb-4">{skill.name}</h3>
              
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + idx * 0.05 }}
                />
              </div>
              <div className="mt-2 text-right">
                <span className="text-gray-500 text-xs font-medium">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
