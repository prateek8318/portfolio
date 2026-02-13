import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden"
    >
      {/* Background 3D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-1/4 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-10 left-1/3 w-28 h-28 bg-purple-500/10 rounded-full blur-3xl"
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
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg">Get to know more about my journey</p>
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
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-gray-200 leading-relaxed">
                I'm a passionate <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Full Stack Developer</span> with hands-on experience in building dynamic and responsive web applications.
              </p>
              
              <p className="text-xl text-gray-200 leading-relaxed">
                Proficient in <span className="font-semibold text-blue-400">PHP</span>, <span className="font-semibold text-cyan-400">React.js</span>, <span className="font-semibold text-purple-400">React Native</span>, <span className="font-semibold text-green-400">Node.js</span>, <span className="font-semibold text-indigo-400">.NET</span>, <span className="font-semibold text-pink-400">MySQL</span>, and <span className="font-semibold text-yellow-400">Tailwind CSS</span>, I've built real-world projects like blog systems, parking management tools, and mobile applications.
              </p>
              
              <p className="text-xl text-gray-200 leading-relaxed">
                I enjoy creating <span className="font-semibold text-green-400">fast</span>, <span className="font-semibold text-yellow-400">accessible</span>, and <span className="font-semibold text-red-400">beautiful</span> interfaces, and I'm always eager to collaborate and contribute to a tech-driven team.
              </p>

              {/* Stats Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "50+", label: "Projects Completed", color: "from-blue-500 to-cyan-500" },
                  { number: "3+", label: "Years Experience", color: "from-purple-500 to-pink-500" },
                  { number: "100%", label: "Client Satisfaction", color: "from-green-500 to-emerald-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
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
      </div>
    </section>
  );
}