import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function About() {
  const { scrollYProgress } = useScroll();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Enhanced Background 3D elements with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-10 right-1/4 w-48 h-48 bg-orange-500/25 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 w-40 h-40 bg-orange-600/25 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 0.6, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-8"
        style={{ y: contentY }}
      >
        <motion.div
          className="text-center mb-12"
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
            About Me
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get to know more about my journey
          </motion.p>
        </motion.div>

        <Tilt
          className="parallax-effect-glare-scale"
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.2}
          scale={1.02}
          gyroscope={true}
        >
          <motion.div
            className="bg-gray-800 rounded-3xl p-12 border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.p 
                className="text-xl text-gray-200 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I'm a passionate <motion.span 
                  className="font-semibold text-orange-400"
                  whileHover={{ scale: 1.1 }}
                >Full Stack Developer</motion.span> with hands-on experience in building dynamic and responsive web applications.
              </motion.p>
              
              <motion.p 
                className="text-xl text-gray-200 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Proficient in <motion.span className="font-semibold text-blue-400" whileHover={{ scale: 1.1 }}>PHP</motion.span>, <motion.span className="font-semibold text-cyan-400" whileHover={{ scale: 1.1 }}>React.js</motion.span>, <motion.span className="font-semibold text-purple-400" whileHover={{ scale: 1.1 }}>React Native</motion.span>, <motion.span className="font-semibold text-green-400" whileHover={{ scale: 1.1 }}>Node.js</motion.span>, <motion.span className="font-semibold text-indigo-400" whileHover={{ scale: 1.1 }}>.NET</motion.span>, <motion.span className="font-semibold text-pink-400" whileHover={{ scale: 1.1 }}>MySQL</motion.span>, and <motion.span className="font-semibold text-yellow-400" whileHover={{ scale: 1.1 }}>Tailwind CSS</motion.span>, I've built real-world projects like blog systems, parking management tools, and mobile applications.
              </motion.p>
              
              <motion.p 
                className="text-xl text-gray-200 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                I enjoy creating <motion.span className="font-semibold text-green-400" whileHover={{ scale: 1.1 }}>fast</motion.span>, <motion.span className="font-semibold text-yellow-400" whileHover={{ scale: 1.1 }}>accessible</motion.span>, and <motion.span className="font-semibold text-red-400" whileHover={{ scale: 1.1 }}>beautiful</motion.span> interfaces, and I'm always eager to collaborate and contribute to a tech-driven team.
              </motion.p>

              {/* Enhanced Stats Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  { number: "50+", label: "Projects Completed", color: "from-orange-500 to-orange-600" },
                  { number: "2+", label: "Years Experience", color: "from-orange-400 to-orange-500" },
                  { number: "100%", label: "Client Satisfaction", color: "from-orange-600 to-orange-700" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <motion.div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </Tilt>
      </motion.div>
    </section>
  );
}