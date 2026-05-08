import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Premium Ambient Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating gradient orbs */}
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-pink-500/30 rounded-full mix-blend-screen filter blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full mix-blend-screen filter blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 40, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full mix-blend-screen filter blur-2xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            {/* Premium Logo/Name Animation */}
            <motion.div
              className="mb-12"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="text-7xl md:text-9xl font-bold text-hero">
                <div className="overflow-hidden">
                  <motion.span 
                    className="block bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    PK
                  </motion.span>
                </div>
              </h1>
            </motion.div>

            {/* Premium Loading Bar */}
            <motion.div
              className="w-80 h-2 glass-luxury rounded-full overflow-hidden mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              >
                {/* Progress glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Premium Loading Text */}
            <motion.div
              className="text-premium text-gray-300 text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
                >
                  {progress < 100 ? 'Crafting Experience...' : 'Ready!'}
                </motion.span>
              </div>
            </motion.div>

            {/* Premium Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-orange-400/60 to-pink-500/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -150, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Premium Status Badge */}
            <motion.div
              className="absolute top-8 right-8 glass-luxury px-4 py-2 rounded-full border border-white/10"
              initial={{ scale: 0, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-subtitle text-orange-400 font-medium">Loading</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
