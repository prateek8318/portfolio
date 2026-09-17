import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const lines = [
  { text: "prateek@portfolio:~  [Online]", type: "prompt" },
  { text: "$ whoami", type: "cmd", action: "whoami" },
  { text: "> PHP Developer | React.js | .NET Developer", type: "output", id: "whoami" },
  { text: "$ cat skills.txt", type: "cmd", action: "skills" },
  { text: "> Laravel, MySQL, REST APIs, Docker, React", type: "output", id: "skills" },
  { text: "$ status", type: "cmd" },
  { text: "> Building something awesome...", type: "output", className: "text-green-400 font-bold animate-pulse" }
];

export default function TerminalIntro() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, lines[visibleLines]?.type === 'cmd' ? 800 : 400);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  const handleCommandClick = (action) => {
    if (action === 'whoami') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'skills') {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-gray-950 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-[#1e1e1e]"
        >
          {/* Terminal Header */}
          <div className="bg-[#323233] px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-400 font-mono">prateek@dev-machine:~</div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm md:text-base h-64 overflow-y-auto custom-scrollbar">
            {lines.slice(0, visibleLines).map((line, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-2 ${line.type === 'prompt' ? 'text-green-400' : line.type === 'cmd' ? 'text-white cursor-pointer hover:text-orange-400 transition-colors' : 'text-gray-400'} ${line.className || ''}`}
                onClick={() => line.action ? handleCommandClick(line.action) : null}
              >
                {line.text}
              </motion.div>
            ))}
            {visibleLines < lines.length && (
              <div className="w-2 h-4 bg-gray-400 animate-pulse inline-block mt-1"></div>
            )}
            {visibleLines === lines.length && (
              <div className="mt-2 text-green-400">
                prateek@portfolio:~ $ <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block ml-1"></span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
