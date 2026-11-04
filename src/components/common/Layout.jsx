import React from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

// Fade + lift when scrolled into view
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

// Text that slides up from behind a mask, line by line
// The in-view trigger sits on the wrapper: the hidden lines themselves are clipped,
// so they'd never register as visible.
export function MaskLines({ lines, className = "", delay = 0, animateOnMount = false }) {
  const trigger = animateOnMount
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, margin: "-60px" } };
  return (
    <motion.span className={`block ${className}`} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              shown: { y: "0%", transition: { duration: 1.1, delay: delay + i * 0.08, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Section opener: a hairline rule with index + label on the left,
 * and an optional note on the right.
 */
export function SectionLabel({ index, label, note }) {
  return (
    <Reveal className="mb-12 flex items-baseline justify-between gap-6 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:mb-20">
      <span>
        <span className="text-faint">{index}</span>
        <span className="mx-3 text-faint">/</span>
        {label}
      </span>
      {note && <span className="hidden text-right sm:block">{note}</span>}
    </Reveal>
  );
}
