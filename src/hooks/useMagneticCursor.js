import { useState, useEffect, useRef } from 'react';

export const useMagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const applyMagneticEffect = (element, strength = 0.3) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (mousePosition.x - centerX) * strength;
    const deltaY = (mousePosition.y - centerY) * strength;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const removeMagneticEffect = (element) => {
    if (!element) return;
    element.style.transform = 'translate(0px, 0px)';
  };

  return {
    mousePosition,
    applyMagneticEffect,
    removeMagneticEffect,
    cursorRef
  };
};
