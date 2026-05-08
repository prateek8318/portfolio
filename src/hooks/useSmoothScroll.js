import { useEffect, useRef, useState } from 'react';

export const useSmoothScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(null);
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const easing = 0.08; // Slightly smoother

  useEffect(() => {
    targetScrollY.current = window.scrollY;
    currentScrollY.current = window.scrollY;

    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    const smoothScroll = () => {
      const diff = targetScrollY.current - currentScrollY.current;
      
      if (Math.abs(diff) > 0.1) {
        currentScrollY.current += diff * easing;
        
        // Only update progress state for consumers who need it
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? currentScrollY.current / maxScroll : 0;
        
        // Use a small threshold to avoid tiny state updates
        setScrollProgress(prev => Math.abs(prev - progress) > 0.001 ? progress : prev);
      }

      rafId.current = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const scrollTo = (target, duration = 800) => {
    const startY = window.scrollY;
    const targetY = typeof target === 'number' ? target : 
      target.offsetTop ? target.offsetTop - 80 : 0;
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return {
    scrollY: currentScrollY.current,
    scrollProgress,
    scrollTo
  };
};

// ScrollTrigger-like functionality
export const useScrollTrigger = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollY } = useSmoothScroll();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateTrigger = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in view
      const top = rect.top;
      const bottom = rect.bottom;
      const triggerPoint = options.trigger || windowHeight * 0.8; // 80% from top
      
      const inView = top < triggerPoint && bottom > 0;
      setIsInView(inView);

      // Calculate progress within viewport
      if (inView) {
        const elementProgress = Math.max(0, Math.min(1, 
          (triggerPoint - top) / (rect.height + triggerPoint)
        ));
        setProgress(elementProgress);
      }
    };

    updateTrigger();

    // Add resize listener
    window.addEventListener('resize', updateTrigger);
    return () => window.removeEventListener('resize', updateTrigger);
  }, [scrollY, options.trigger]);

  return {
    isInView,
    progress
  };
};
