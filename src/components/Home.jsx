import React from "react";
import { motion } from "framer-motion";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";


export default function Home() {
  return (
    <>
    <motion.section
    id="home"
      className="min-h-screen flex flex-col justify-center bg-[url(./src/assets/1.jpg)] bg-cover items-center text-center p-8 bg-gradient-to-br from-white to-blue-100 dark:from-gray-900 dark:to-black"
      
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
     <motion.h1
  className="text-4xl md:text-6xl font-bold mb-4"
  initial={{ y: -200, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 10,
    duration: 0.8,
  }}
>
  <span className="text-blue-500">Prateek Kumar Pandey</span>
</motion.h1>
      <p className="text-xl text-gray-700 dark:text-gray-300">
        Full Stack Developer | PHP & React Specialist
      </p>
      <div className="mt-6">
        <a
          href="#projects"
          className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition"
        >
          View My Work
        </a>
        <a
          href="./src/assets/Prateek_resume.pdf"
          download
          className="ml-4 px-6 py-3 border border-blue-500 text-blue-500 rounded-2xl hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        >
          Resume
        </a>
      </div>
       
    </motion.section>
    
    <About />
      <Projects />
      <Skills />
      <Contact />
      
      </>       
  );
 
}
