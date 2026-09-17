import React, { useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaPhp, FaLaravel, FaGitAlt, FaDatabase,
  FaNodeJs, FaPython, FaDocker, FaAws,
  FaMicrosoft
} from "react-icons/fa";

const skillCategories = {
  Backend: [
    { icon: <FaPhp />, name: "PHP", level: 92, color: "from-purple-500 to-indigo-600" },
    { icon: <FaLaravel />, name: "Laravel", level: 87, color: "from-red-500 to-orange-600" },
    { icon: <FaNodeJs />, name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
    { icon: <FaMicrosoft />, name: ".NET Core", level: 78, color: "from-purple-600 to-blue-600" },
    { icon: <FaPython />, name: "Python", level: 75, color: "from-yellow-500 to-blue-500" },
  ],
  Frontend: [
    { icon: <FaReact />, name: "React", level: 88, color: "from-cyan-400 to-blue-500" },
    { icon: <FaReact />, name: "React Native", level: 82, color: "from-blue-400 to-cyan-600" },
    { icon: <FaJs />, name: "JavaScript", level: 85, color: "from-yellow-400 to-yellow-600" },
    { icon: <FaHtml5 />, name: "HTML5", level: 95, color: "from-orange-500 to-red-500" },
    { icon: <FaCss3Alt />, name: "CSS3 / Tailwind", level: 90, color: "from-blue-500 to-blue-600" },
  ],
  Database: [
    { icon: <FaDatabase />, name: "MySQL", level: 88, color: "from-blue-600 to-cyan-600" },
    { icon: <FaDatabase />, name: "PostgreSQL", level: 80, color: "from-blue-400 to-blue-500" },
    { icon: <FaDatabase />, name: "MongoDB", level: 75, color: "from-green-500 to-green-600" },
    { icon: <FaDatabase />, name: "Redis", level: 70, color: "from-red-500 to-red-600" },
  ],
  DevOps: [
    { icon: <FaDocker />, name: "Docker", level: 85, color: "from-blue-500 to-blue-700" },
    { icon: <FaGitAlt />, name: "Git & CI/CD", level: 90, color: "from-orange-600 to-red-600" },
    { icon: <FaAws />, name: "AWS", level: 75, color: "from-orange-400 to-orange-600" },
  ]
};

export default function Skills() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTab, setActiveTab] = useState("Backend");

  return (
    <section ref={ref} id="skills" className="py-12 md:py-24 bg-gray-950 relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tools and technologies I use to build robust, scalable applications.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skillCategories).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Skill Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {skillCategories[activeTab].map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-dark rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 transition-colors group"
                >
                  <motion.div 
                    className="text-4xl mb-4 text-orange-400 group-hover:scale-110 group-hover:text-white transition-all origin-left"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-white font-medium mb-3">{skill.name}</h3>
                  <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
