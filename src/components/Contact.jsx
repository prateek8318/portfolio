import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-8 bg-gray-100 dark:bg-gray-800 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Get In Touch</h2>
      <p className="text-lg max-w-xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
        I'm open to new opportunities, collaborations, or just a friendly chat. Feel free to connect through any of the platforms below:
      </p>
      <div className="flex justify-center gap-6 text-2xl text-blue-500 dark:text-blue-400">
        <a href="mailto:prateekpandey2580@gmail.com" className="hover:text-blue-600" target="_blank"><FaEnvelope /></a>
        <a href="https://github.com/prateek8318" className="hover:text-blue-600" target="_blank"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/prateek-pandey-6087b624b/" className="hover:text-blue-600" target="_blank"><FaLinkedin /></a>
        <a href="https://www.instagram.com/prateekamanpandey?igsh=ZHIzaHduMWZienYx" className="hover:text-pink-500" target="_blank"><FaInstagram /></a>
      </div>
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">© 2025 Prateek Kumar Pandey. All rights reserved.</p>
    </section>
  );
}
