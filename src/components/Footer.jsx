import React from "react";
import { socialLinks, personalInfo } from "../data/constants";
import { useLocalTime } from "../hooks/useLocalTime";
import { scrollToTarget } from "../hooks/useLenis";
import { Container } from "./common/Layout";

export default function Footer() {
  const time = useLocalTime();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 border-t border-line pt-6 text-[13px] md:grid-cols-4">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Local time</p>
            <p className="text-muted">{time} IST, Varanasi</p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Socials</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {socialLinks
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-muted hover:text-fg">
                    {s.label}
                  </a>
                ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Shortcut</p>
            <p className="text-muted">
              Press <kbd className="rounded border border-line px-1.5 font-mono text-[11px]">Ctrl K</kbd> to jump around
            </p>
          </div>
          <div className="md:text-right">
            <button onClick={() => scrollToTarget(0)} className="link-u text-muted hover:text-fg">
              Back to top ↑
            </button>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark */}
      <div className="mt-14 select-none px-3 sm:px-6" aria-hidden="true">
        <p className="whitespace-nowrap text-center text-[clamp(3rem,15.5vw,15rem)] leading-[0.8] tracking-[-0.06em]">
          Prateek <span className="serif">Pandey</span>
        </p>
      </div>

      <Container className="mt-14 flex flex-col justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:flex-row">
        <span>© {year} {personalInfo.name}</span>
        <span>Designed &amp; built by hand</span>
      </Container>
    </footer>
  );
}
