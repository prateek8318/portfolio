import React from "react";
import { motion } from "framer-motion";
import { animations } from "../../utils/helpers";

export function SectionWrapper({ children, className = "", id }) {
  return (
    <section id={id} className={`py-20 bg-gray-950 relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

export function Container({ children, className = "" }) {
  return (
    <div className={`relative z-10 max-w-6xl mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function GlassCard({ children, className = "", padding = "p-6 md:p-8" }) {
  return (
    <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl ${padding} border border-white/20 shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ title, subtitle, isInView, delay = 0 }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function AnimatedBackground({ children, style }) {
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={style}>
      <motion.div
        className="absolute top-20 left-20 w-52 h-52 bg-orange-500/25 rounded-full blur-3xl will-change-transform"
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-44 h-44 bg-orange-600/25 rounded-full blur-3xl will-change-transform"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 0.7, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {children}
    </motion.div>
  );
}
