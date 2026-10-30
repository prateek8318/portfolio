import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Shown once per browser session
const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('hasSeenLoader'));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + 2.5);
      });
    }, 30);
    const done = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasSeenLoader', 'true');
    }, 1600);
    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#07070b] px-6"
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[100px]" />

          <div className="relative w-full max-w-xs text-center">
            <div className="mb-8 overflow-hidden">
              <motion.h1
                className="text-gradient font-display text-7xl font-bold sm:text-8xl"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                PK
              </motion.h1>
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex justify-between font-mono text-xs text-gray-500">
              <span>{progress < 100 ? 'Crafting experience' : 'Ready'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
