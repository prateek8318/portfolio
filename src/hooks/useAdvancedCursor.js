import { useState, useEffect, useRef } from 'react';

export const useAdvancedCursor = () => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother cursor tracking
      requestAnimationFrame(() => {
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
        }
        
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
        }
      });
    };

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const addMagneticEffect = (element, strength = 0.3) => {
    if (!element || typeof window === 'undefined') return () => {};

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  };

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(249, 115, 22, 0.3)',
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.8 }
    },
    click: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(236, 72, 153, 0.8)',
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 600, damping: 30, mass: 0.3 }
    }
  };

  return {
    cursorVariant,
    addMagneticEffect,
    cursorRef,
    followerRef,
    variants
  };
};
