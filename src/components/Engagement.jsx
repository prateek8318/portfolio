import React from "react";
import { Container, Reveal, SectionLabel, MaskLines } from "./common/Layout";
import { useSectionNav } from "../hooks/useSectionNav";

const MODELS = [
  {
    name: "Fixed-scope project",
    fit: "You know what you need built",
    body: "A new product, an admin panel, or a backend for an app you already have. Scope is agreed up front and paid against milestones.",
    points: ["Written scope & timeline", "Milestone-based payments", "Weekly demo builds", "Full source code handed over"],
  },
  {
    name: "Monthly retainer",
    fit: "You need a developer on call",
    body: "Ongoing features, fixes and upkeep for a live product, without hiring full-time. A set number of hours each month, rolled into a monthly plan.",
    points: ["Priority on bugs & outages", "New features each month", "Server & dependency upkeep", "Pause or stop anytime"],
    highlight: true,
  },
  {
    name: "Rescue & audit",
    fit: "Your codebase is in trouble",
    body: "Slow APIs, a half-finished app from a previous developer, or code nobody wants to touch. I review it, tell you plainly what's wrong, and fix it.",
    points: ["Code & architecture review", "Performance & security fixes", "Clear written report", "Fix it, or hand it back documented"],
  },
];

export default function Engagement() {
  const goTo = useSectionNav();

  return (
    <section id="engagement" className="relative py-24 md:py-36">
      <Container>
        <SectionLabel index="03" label="Working together" note="Pricing shared after a short call" />

        <h2 className="mb-14 max-w-4xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.04em] md:mb-20">
          <MaskLines
            lines={[
              <>Three ways to</>,
              <>
                <span className="serif">work</span> with me.
              </>,
            ]}
          />
        </h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line lg:grid-cols-3">
          {MODELS.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className={`flex flex-col p-6 sm:p-8 ${m.highlight ? "bg-surface" : "bg-bg"}`}>
              <div className="mb-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                <span>0{i + 1}</span>
                {m.highlight && <span className="text-accent">For live products</span>}
              </div>
              <h3 className="text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight tracking-[-0.03em]">{m.name}</h3>
              <p className="mt-1 text-[14px] italic text-muted">{m.fit}</p>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">{m.body}</p>
              <ul className="mt-8 flex-1 space-y-2.5 border-t border-line pt-6 text-[14px]">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="text-faint">—</span>
                    {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goTo("contact")}
                className={`group mt-10 inline-flex w-fit items-center gap-3 rounded-full px-5 py-2.5 text-[14px] transition-colors ${
                  m.highlight ? "bg-fg text-bg" : "border border-line hover:border-fg"
                }`}
              >
                Ask about this
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
