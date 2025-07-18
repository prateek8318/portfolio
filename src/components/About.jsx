import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-8 text-center bg-white dark:bg-gray-900"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h2
  className="text-4xl md:text-4xl font-bold mb-4"
  initial={{ y: -200, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 10,
    duration: 0.8,
  }}
>
  <span className="text-blue-500">About</span>
</motion.h2>
      <p className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        I'm a passionate Full Stack Developer with hands-on experience in building dynamic and responsive web applications.
        Proficient in PHP, React.js, MySQL, and Tailwind CSS, I’ve built real-world projects like blog systems, parking management tools,
        and text analyzers. I enjoy creating fast, accessible, and beautiful interfaces, and I’m always eager to collaborate and
        contribute to a tech-driven team.
      </p>
    </section>
  );
}