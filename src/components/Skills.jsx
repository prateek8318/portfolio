import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  return (
    <section ref={ref} id="skills" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Enhanced Background 3D elements with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-20 left-20 w-48 h-48 bg-orange-500/25 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-orange-600/25 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div className="relative z-10 max-w-6xl mx-auto px-8" style={{ y: contentY }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technical Skills
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Technologies I work with daily
          </motion.p>
        </motion.div>

        {/* Enhanced 3D Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {skills.map((skill, idx) => (
            <Tilt
              key={idx}
              className="parallax-effect-glare-scale"
              perspective={1000}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
              gyroscope={true}
            >
              <motion.div
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl hover:shadow-blue-400/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`text-5xl mb-4 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                  {skill.name}
                </h3>
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-gray-400 text-sm mt-1 block">{skill.level}%</span>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>

        {/* Enhanced 3D Progress Bars Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Proficiency Level
          </motion.h3>
          {skills.slice(0, 6).map((skill, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-700 rounded-xl p-4 border border-gray-600"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                    {skill.icon}
                  </div>
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-gray-400 text-sm">{skill.level}%</span>
              </div>
              <div className="relative h-3 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.8 + idx * 0.2, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 right-2 w-2 h-2 bg-white rounded-full"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1, x: [0, 5, 0] } : { opacity: 0 }}
                  transition={{ 
                    duration: 2, 
                    delay: 2.3 + idx * 0.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
