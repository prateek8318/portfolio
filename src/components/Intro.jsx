import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Short curtain shown once per browser session.
export default function Intro() {
  const [show, setShow] = useState(() => !sessionStorage.getItem("seenIntro"));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1300;
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          sessionStorage.setItem("seenIntro", "1");
          document.body.style.overflow = "";
          setShow(false);
        }, 250);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[400] flex flex-col justify-between bg-bg p-5 text-fg sm:p-8 lg:p-12"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>Prateek Kumar Pandey</span>
            <span>Portfolio — {new Date().getFullYear()}</span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              className="text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-[-0.04em]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Building <span className="serif">quietly</span>, shipping loudly.
            </motion.p>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 bg-line">
              <div className="h-px bg-fg" style={{ width: `${count}%` }} />
            </div>
            <span className="font-mono text-[clamp(2.5rem,8vw,6rem)] leading-none tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
