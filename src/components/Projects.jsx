import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    name: "Blog Management System",
    description: "PHP-based blog system with CKEditor, user roles, and dashboard.",
    tech: "PHP, CodeIgniter, MySQL, Bootstrap",
    github: "https://github.com/prateek8318/blog_management",
    demo: "https://yourblogdemo.com",
  },
  {
    name: "Parking Mitra",
    description: "Dynamic PHP app optimized for performance and usability.",
    tech: "PHP, MySQL, Bootstrap, JS",
    github: "https://github.com/prateek8318/Parking-Mitra",
    demo: "https://parkingmitra.netlify.app",
  },
  {
    name: "Text Analyzer",
    description: "Real-time text analysis with readability score and UI tools.",
    tech: "React, JavaScript, Tailwind",
    github: "https://github.com/prateek8318/TextAnalyzer",
    demo: "https://textanalyzer.netlify.app",
  },
  {
    name: "Tic Tac Toe Game",
    description: "Interactive game with state management and Tailwind UI.",
    tech: "React, JS, Tailwind",
    github: "https://github.com/prateek8318/Tic-Tac-Toe",
    demo: "https://tictactoegame.netlify.app",
  },
];

export default function Projects() {
  return (
    <section className="py-20  bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            className="relative w-[190 px] h-[254px] flex justify-center items-center overflow-hidden rounded shadow-md cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Animated rotating gradient */}
            <div
              className="absolute w-[80px] h-[360px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(#ff2288, #387ef0)",
                animation: "spin 8s linear infinite",
                animationPlayState: "paused",
              }}
            ></div>

            {/* Blur background overlay */}
            <div className="absolute w-[250px] h-[360px] bg-[#17171733] backdrop-blur-[50px]"></div>

            {/* Content box */}
            <div className="relative z-5 bg-[#171717] text-white w-[186px] h-[250px] rounded p-5 flex flex-col justify-center items-start text-left">
              <h3 className="text-lg font-bold text-blue-400 mb-1">{proj.name}</h3>
              <p className="text-sm text-gray-300 mb-1">{proj.description}</p>
              <p className="text-xs text-gray-400 mb-2">Tech Used: {proj.tech}</p>
              <div className="flex space-x-4 text-xs">
                <a href={proj.github} target="_blank" className="flex items-center gap-1 hover:text-blue-300">
                  <FaGithub /> GitHub
                </a>
                <a href={proj.demo} target="_blank" className="flex items-center gap-1 hover:text-blue-300">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tailwind doesn't support custom keyframes like spin pause/resume. Injecting spin manually: */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .group:hover > div:first-child {
            animation-play-state: running;
          }
        `}
      </style>
    </section>
  );
}
