import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaSun, FaMoon, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useSectionNav } from "../hooks/useSectionNav";
import { socialLinks } from "../data/constants";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SOCIAL_ICONS = { FaGithub, FaLinkedin, FaEnvelope, FaInstagram };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { isDark, toggleDarkMode } = useDarkMode();
  const goTo = useSectionNav();
  const location = useLocation();

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on Escape / when the screen becomes desktop-sized
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    if (location.pathname !== "/") return;
    let observer;
    const setup = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((s) => observer.observe(s));
    };
    // Sections are lazy-loaded, give them a moment to mount
    const t = setTimeout(setup, 800);
    return () => {
      clearTimeout(t);
      observer?.disconnect();
    };
  }, [location.pathname]);

  const handleNav = (id) => {
    setMenuOpen(false);
    setTimeout(() => goTo(id), menuOpen ? 250 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`mt-3 flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "glass-luxury border-white/10"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button onClick={() => handleNav("home")} className="group flex items-center gap-3" aria-label="Go to top">
            <span className="keep-white relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 font-display text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-transform duration-500 group-hover:rotate-[360deg]">
              P
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block font-display text-base font-bold text-white">Prateek</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400">Full Stack Dev</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === "/" && active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/25 to-pink-500/25 ring-1 ring-orange-400/40"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-colors hover:text-orange-400"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary keep-white hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex"
            >
              Resume <FaArrowRight size={11} />
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current text-white transition-all duration-300 ${menuOpen ? "top-1.5 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current text-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-3 h-0.5 w-5 rounded bg-current text-white transition-all duration-300 ${menuOpen ? "top-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-[#07070b]/95 px-6 pb-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] pt-28 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-pink-500/15 blur-[100px]" />

            <ul className="relative flex flex-1 flex-col justify-center gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <button
                    onClick={() => handleNav(item.id)}
                    className="group flex w-full items-baseline gap-4 py-2 text-left"
                  >
                    <span className="font-mono text-xs text-orange-400">0{i + 1}</span>
                    <span className={`font-display text-4xl font-bold transition-colors sm:text-5xl ${
                      active === item.id && location.pathname === "/" ? "text-gradient" : "text-white group-hover:text-orange-400"
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="relative space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary keep-white flex items-center justify-center gap-2 rounded-2xl py-4 text-lg font-semibold text-white"
              >
                Download Resume <FaArrowRight size={14} />
              </a>
              <div className="flex justify-center gap-4">
                {socialLinks.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-gray-300 transition-colors hover:text-orange-400"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
