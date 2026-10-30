import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSectionNav } from '../hooks/useSectionNav';
import { featuredProjects } from '../data/projects';
import { FaSearch, FaHome, FaUser, FaCode, FaEnvelope, FaAdjust, FaFileDownload, FaBriefcase, FaTools, FaFolderOpen } from 'react-icons/fa';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const goTo = useSectionNav();
  const { toggleDarkMode } = useDarkMode();

  const commands = useMemo(() => [
    { id: 'home', name: 'Go to Home', group: 'Navigate', icon: <FaHome />, run: () => goTo('home') },
    { id: 'about', name: 'About me', group: 'Navigate', icon: <FaUser />, run: () => goTo('about') },
    { id: 'services', name: 'Services', group: 'Navigate', icon: <FaTools />, run: () => goTo('services') },
    { id: 'projects', name: 'View projects', group: 'Navigate', icon: <FaBriefcase />, run: () => goTo('projects') },
    { id: 'skills', name: 'View skills', group: 'Navigate', icon: <FaCode />, run: () => goTo('skills') },
    { id: 'contact', name: 'Contact me', group: 'Navigate', icon: <FaEnvelope />, run: () => goTo('contact') },
    { id: 'theme', name: 'Toggle theme', group: 'Actions', icon: <FaAdjust />, run: toggleDarkMode },
    { id: 'resume', name: 'Open resume', group: 'Actions', icon: <FaFileDownload />, run: () => window.open('/resume.pdf', '_blank') },
    ...featuredProjects.map((p) => ({
      id: `p-${p.slug}`, name: p.name, group: 'Projects', icon: <FaFolderOpen />,
      run: () => { navigate(`/project/${p.slug}`); },
    })),
  ], [goTo, toggleDarkMode, navigate]);

  const filtered = commands.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const runCommand = (cmd) => {
    setIsOpen(false);
    setTimeout(cmd.run, 50);
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [isOpen]);

  useEffect(() => setSelected(0), [query]);

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) runCommand(filtered[selected]);
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-start justify-center p-4 pt-[12vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c12] shadow-2xl"
              role="dialog"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3.5">
                <FaSearch className="text-gray-500" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search sections, projects, actions..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  className="w-full bg-transparent text-base text-white placeholder-gray-500 focus:outline-none"
                />
                <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-gray-500">ESC</kbd>
              </div>

              <div className="custom-scrollbar max-h-[60vh] overflow-y-auto p-2">
                {filtered.length === 0 && <div className="px-4 py-10 text-center text-sm text-gray-500">No results found.</div>}
                {filtered.map((cmd, i) => {
                  const header = cmd.group !== lastGroup ? cmd.group : null;
                  lastGroup = cmd.group;
                  return (
                    <React.Fragment key={cmd.id}>
                      {header && <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{header}</div>}
                      <button
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setSelected(i)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          selected === i ? 'bg-white/10 text-white' : 'text-gray-300'
                        }`}
                      >
                        <span className={selected === i ? 'text-orange-400' : 'text-gray-500'}>{cmd.icon}</span>
                        {cmd.name}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
