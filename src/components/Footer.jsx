import React from "react";
import { FaHeart } from "react-icons/fa";
import { socialLinks, personalInfo } from "../data/constants";
import { iconMap } from "../utils/helpers";
import { useSectionNav } from "../hooks/useSectionNav";

const LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const goTo = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-sm">
            <div className="mb-3 flex items-center justify-center gap-3 md:justify-start">
              <span className="keep-white flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 font-display text-lg font-bold text-white">
                P
              </span>
              <span className="font-display text-lg font-bold text-white">{personalInfo.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Full Stack Developer building scalable backends, admin panels and modern web experiences.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button onClick={() => goTo(l.id)} className="text-sm text-gray-400 transition-colors hover:text-orange-400">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-2">
            {socialLinks.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-colors hover:text-orange-400"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>© {year} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with React & Tailwind <FaHeart className="text-pink-500" />
            <span className="hidden sm:inline">· Press <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">Ctrl K</kbd></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
