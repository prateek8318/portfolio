import React from "react";
import { motion } from "framer-motion";
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
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Background 3D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"
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
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg">Technologies I work with daily</p>
        </motion.div>

        {/* 3D Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
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
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`text-5xl mb-4 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </h3>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="text-gray-400 text-sm mt-1 block">{skill.level}%</span>
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* 3D Progress Bars Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">Proficiency Level</h3>
          {skills.slice(0, 6).map((skill, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
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
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: idx * 0.2 + 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 right-2 w-2 h-2 bg-white rounded-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 2, 
                    delay: idx * 0.2 + 2.3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
