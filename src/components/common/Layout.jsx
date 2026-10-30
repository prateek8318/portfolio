import React from "react";
import { motion } from "framer-motion";

export function SectionWrapper({ children, className = "", id }) {
  return (
    <section id={id} className={`relative overflow-hidden py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Container({ children, className = "" }) {
  return (
    <div className={`relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function GlassCard({ children, className = "", padding = "p-6 md:p-8" }) {
  return (
    <div className={`glass-luxury rounded-3xl ${padding} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Consistent section heading.
 * eyebrow: small label above, title: string, highlight: gradient part of title
 */
export function SectionHeader({ eyebrow, title, highlight, subtitle, align = "center" }) {
  const alignCls = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <motion.div
      className={`mb-12 flex max-w-2xl flex-col md:mb-16 ${alignCls}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
