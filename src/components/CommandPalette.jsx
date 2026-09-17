import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { FaTerminal, FaHome, FaCode, FaEnvelope, FaAdjust } from 'react-icons/fa';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleDarkMode } = useDarkMode();

  const commands = [
    { id: 'home', name: 'Go to Home', icon: <FaHome />, action: () => handleNavigate('/') },
    { id: 'projects', name: 'View Projects', icon: <FaCode />, action: () => handleNavigate('/#projects') },
    { id: 'skills', name: 'View Skills', icon: <FaTerminal />, action: () => handleNavigate('/#skills') },
    { id: 'contact', name: 'Contact Me', icon: <FaEnvelope />, action: () => handleNavigate('/#contact') },
    { id: 'theme', name: 'Toggle Theme', icon: <FaAdjust />, action: () => { toggleDarkMode(); setIsOpen(false); } },
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleNavigate = (path) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(path.substring(2))?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(path.substring(2))?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center px-4 py-3 border-b border-gray-800">
                <FaTerminal className="text-gray-500 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                />
                <span className="text-xs text-gray-500 font-mono bg-gray-800 px-2 py-1 rounded">ESC</span>
              </div>
              
              <div className="max-h-72 overflow-y-auto py-2 custom-scrollbar">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full text-left px-4 py-3 flex items-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors gap-3 group"
                    >
                      <span className="text-gray-500 group-hover:text-orange-400 transition-colors">{cmd.icon}</span>
                      <span>{cmd.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No results found.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
