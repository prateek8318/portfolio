import { useState, useEffect, useCallback } from 'react';

const EVENT = 'themechange';

const getInitial = () => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return true; // Portfolio is designed dark-first
};

const apply = (isDark) => {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0c0c0b' : '#f2f1ec');
};

// Shared across every component that uses it (Navbar, CommandPalette, ...)
export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(getInitial);

  useEffect(() => {
    apply(isDark);
  }, [isDark]);

  useEffect(() => {
    const sync = (e) => setIsDark(e.detail);
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', String(next));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  }, []);

  return { isDark, toggleDarkMode };
};
