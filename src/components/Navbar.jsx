import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useSectionNav } from "../hooks/useSectionNav";
import { useLocalTime } from "../hooks/useLocalTime";
import { lockScroll } from "../hooks/useLenis";
import { socialLinks } from "../data/constants";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Services" },
  { id: "engagement", label: "How to hire" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

const EASE = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { isDark, toggleDarkMode } = useDarkMode();
  const goTo = useSectionNav();
  const location = useLocation();
  const time = useLocalTime();

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 300 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 300) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    lockScroll(menuOpen);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Track which section is in view
  useEffect(() => {
    if (location.pathname !== "/") return setActive("");
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNav = (id) => {
    const wasOpen = menuOpen;
    setMenuOpen(false);
    setTimeout(() => goTo(id), wasOpen ? 500 : 0);
  };

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"));

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !menuOpen ? "border-b border-line bg-bg/75 backdrop-blur-md" : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 text-[13px] sm:px-8 lg:px-12"
          aria-label="Main"
        >
          <button onClick={() => handleNav("home")} className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
            <span className="font-medium tracking-tight">Prateek Pandey</span>
            <span className="hidden text-muted xl:inline">— Full-stack engineer</span>
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`link-u transition-colors ${active === item.id ? "text-fg" : "text-muted hover:text-fg"}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted 2xl:inline">
              Varanasi {time}
            </span>
            <button onClick={toggleDarkMode} className="link-u hidden text-muted transition-colors hover:text-fg sm:inline">
              {isDark ? "Light" : "Dark"}
            </button>
            <button
              onClick={openPalette}
              className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg xl:inline-flex"
              aria-label="Open command menu"
            >
              Ctrl K
            </button>
            <button
              onClick={() => handleNav("contact")}
              className="hidden rounded-full bg-fg px-4 py-2 text-bg transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Start a project
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="relative z-[60] flex items-center gap-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative h-2.5 w-4">
                <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${menuOpen ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-bg px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 sm:px-8 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="flex flex-1 flex-col justify-center">
              {[{ id: "home", label: "Home" }, ...NAV_ITEMS, { id: "contact", label: "Start a project" }].map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-line">
                  <motion.button
                    onClick={() => handleNav(item.id)}
                    className="flex w-full items-baseline justify-between py-3 text-left"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-[clamp(2.25rem,10vw,4rem)] leading-tight tracking-[-0.03em]">{item.label}</span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </motion.button>
                </li>
              ))}
            </ul>

            <motion.div
              className="flex items-end justify-between gap-6 pt-8 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col gap-1.5">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <button onClick={toggleDarkMode} className="text-muted hover:text-fg">
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                  Résumé ↗
                </a>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Varanasi {time}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
