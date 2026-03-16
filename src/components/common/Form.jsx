import React from "react";
import { motion } from "framer-motion";
import { gradientColors } from "../../utils/helpers";

export function Button({ 
  children, 
  type = "button", 
  className = "", 
  gradient = gradientColors.primary,
  whileHover = { scale: 1.02, y: -2 },
  whileTap = { scale: 0.98 },
  initial,
  whileInView,
  transition,
  viewport,
  ...props 
}) {
  return (
    <motion.button
      type={type}
      className={`w-full py-3 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function Input({ 
  placeholder, 
  type = "text", 
  className = "",
  ...props 
}) {
  const baseClasses = "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-600 transition-all duration-300";
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function EmailInput({ className = "", ...props }) {
  const baseClasses = "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300";
  
  return (
    <input
      type="email"
      placeholder="Your Email"
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function Textarea({ 
  placeholder = "Your Message",
  rows = 4,
  className = "",
  ...props 
}) {
  const baseClasses = "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 resize-none";
  
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function FormField({ children, delay = 0, isInView = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
