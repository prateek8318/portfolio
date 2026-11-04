import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useSectionNav } from "../hooks/useSectionNav";
import { lockScroll } from "../hooks/useLenis";
import { featuredProjects } from "../data/projects";
import { personalInfo, whatsappLink } from "../data/constants";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const goTo = useSectionNav();
  const { toggleDarkMode } = useDarkMode();

  const commands = useMemo(
    () => [
      { id: "home", name: "Home", group: "Go to", run: () => goTo("home") },
      { id: "work", name: "Selected work", group: "Go to", run: () => goTo("work") },
      { id: "about", name: "About", group: "Go to", run: () => goTo("about") },
      { id: "capabilities", name: "Services", group: "Go to", run: () => goTo("capabilities") },
      { id: "engagement", name: "How to hire me", group: "Go to", run: () => goTo("engagement") },
      { id: "faq", name: "FAQ", group: "Go to", run: () => goTo("faq") },
      { id: "contact", name: "Start a project", group: "Go to", run: () => goTo("contact") },
      ...featuredProjects.map((p) => ({
        id: `p-${p.slug}`,
        name: p.name,
        hint: p.sector,
        group: "Case studies",
        run: () => navigate(`/project/${p.slug}`),
      })),
      { id: "whatsapp", name: "Chat on WhatsApp", group: "Actions", run: () => window.open(whatsappLink(), "_blank") },
      { id: "email", name: "Copy email address", group: "Actions", run: () => navigator.clipboard?.writeText(personalInfo.email) },
      { id: "theme", name: "Toggle light / dark", group: "Actions", run: toggleDarkMode },
      { id: "resume", name: "Open résumé", group: "Actions", run: () => window.open("/resume.pdf", "_blank") },
    ],
    [goTo, toggleDarkMode, navigate]
  );

  const filtered = commands.filter((c) => `${c.name} ${c.hint || ""}`.toLowerCase().includes(query.toLowerCase()));

  const run = (cmd) => {
    setIsOpen(false);
    setTimeout(cmd.run, 60);
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    const onOpen = () => setIsOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    lockScroll(isOpen);
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [isOpen]);

  useEffect(() => setSelected(0), [query]);

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" && filtered[selected]) run(filtered[selected]);
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
            className="fixed inset-0 z-[100] bg-bg/70 backdrop-blur-sm"
          />
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-start justify-center p-4 pt-[14vh]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/30"
              role="dialog"
              aria-label="Command menu"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  className="w-full bg-transparent py-4 text-[15px] text-fg placeholder:text-faint focus:outline-none"
                />
                <kbd className="font-mono text-[10px] text-faint">ESC</kbd>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2" data-lenis-prevent>
                {filtered.length === 0 && <div className="px-4 py-10 text-center text-sm text-faint">Nothing matches.</div>}
                {filtered.map((cmd, i) => {
                  const header = cmd.group !== lastGroup ? cmd.group : null;
                  lastGroup = cmd.group;
                  const on = selected === i;
                  return (
                    <React.Fragment key={cmd.id}>
                      {header && (
                        <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{header}</div>
                      )}
                      <button
                        onClick={() => run(cmd)}
                        onMouseEnter={() => setSelected(i)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[14px] transition-colors ${
                          on ? "bg-fg/[0.07] text-fg" : "text-muted"
                        }`}
                      >
                        <span>{cmd.name}</span>
                        <span className="text-[12px] text-faint">{on ? "↵" : cmd.hint}</span>
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
