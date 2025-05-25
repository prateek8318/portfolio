import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaPhp, FaLaravel, FaGitAlt, FaDatabase
} from "react-icons/fa";

const skills = [
  { icon: <FaHtml5 />, name: "HTML" },
  { icon: <FaCss3Alt />, name: "CSS" },
  { icon: <FaJs />, name: "JavaScript" },
  { icon: <FaReact />, name: "React" },
  { icon: <FaPhp />, name: "PHP" },
  { icon: <FaLaravel />, name: "Laravel" },
  { icon: <FaDatabase />, name: "MySQL" },
  { icon: <FaGitAlt />, name: "Git" },
];

export default function Skills() {
  return (
    <section className="py-20 px-8 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
        Skills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center perspective-1000">
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            className="group w-28 h-28 bg-white dark:bg-gray-800 shadow-xl rounded-xl flex flex-col items-center justify-center transition-transform duration-300 transform hover:rotate-x-6 hover:rotate-y-6 hover:scale-105"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transformOrigin: "center",
            }}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl text-blue-500 dark:text-blue-400">
              {skill.icon}
            </div>
            <span className="mt-2 text-sm font-medium text-center text-gray-800 dark:text-gray-200">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
