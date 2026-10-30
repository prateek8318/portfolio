import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const LINES = [
  { text: "$ whoami", type: "cmd", target: "about" },
  { text: "PHP Developer | Node.js | React.js | .NET", type: "output" },
  { text: "$ cat skills.txt", type: "cmd", target: "skills" },
  { text: "Laravel, MySQL, REST APIs, Docker, React", type: "output" },
  { text: "$ ls ~/projects", type: "cmd", target: "projects" },
  { text: "mann-fleet  practly  dvagoo  olcure  ...", type: "output" },
  { text: "$ status", type: "cmd" },
  { text: "Building something awesome...", type: "success" },
];

export default function TerminalIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView || visible >= LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), LINES[visible].type === 'cmd' ? 650 : 300);
    return () => clearTimeout(t);
  }, [inView, visible]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div ref={ref} className="terminal flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-gray-500">prateek@portfolio: ~</span>
      </div>

      <div className="flex-1 overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {LINES.slice(0, visible).map((line, i) => {
          if (line.type === 'cmd') {
            return (
              <div key={i} className="mt-2 first:mt-0">
                <span className="text-emerald-400">➜</span>{" "}
                {line.target ? (
                  <button onClick={() => go(line.target)} className="text-white transition-colors hover:text-orange-400" title="Click to jump">
                    {line.text}
                  </button>
                ) : (
                  <span className="text-white">{line.text}</span>
                )}
              </div>
            );
          }
          return (
            <div key={i} className={line.type === 'success' ? 'text-emerald-400' : 'text-gray-400'}>
              {line.text}
            </div>
          );
        })}
        <div className="mt-2">
          {visible >= LINES.length && <span className="text-emerald-400">➜ </span>}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-orange-400" />
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-2.5 font-mono text-[11px] text-gray-500">
        tip: click a command to jump there
      </div>
    </div>
  );
}
