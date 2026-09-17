import React from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: "Projects built", value: "15", suffix: "+" },
  { label: "Development", value: "Full", suffix: " Stack" },
  { label: "Database experience", value: "SQL", suffix: "" },
  { label: "Version control", value: "Git", suffix: "" },
];

export default function StatsDashboard() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 bg-gray-900 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}<span className="text-orange-500">{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
