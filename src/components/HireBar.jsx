import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useSectionNav } from "../hooks/useSectionNav";
import { whatsappLink } from "../data/constants";

// Small floating call-to-action. Shows after the hero, hides once the contact form is on screen.
export default function HireBar() {
  const [show, setShow] = useState(false);
  const goTo = useSectionNav();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.7;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4 sm:inset-x-auto sm:right-6"
        >
          <div className="flex items-center gap-1 rounded-full border border-line bg-surface/90 p-1 pl-4 text-[14px] shadow-2xl shadow-black/30 backdrop-blur-md">
            <span className="relative mr-2 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="mr-2 hidden text-muted md:inline">Available for projects</span>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-2 text-muted transition-colors hover:text-fg"
            >
              WhatsApp
            </a>
            <button onClick={() => goTo("contact")} className="rounded-full bg-fg px-4 py-2 text-bg transition-transform hover:scale-[1.03]">
              Start a project
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
