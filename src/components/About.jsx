import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, Reveal, SectionLabel } from "./common/Layout";

const STATEMENT =
  "Most of my work happens where users never look — APIs, sockets, data models and background jobs — plus the admin tools that let a business actually run on top of them. I care about systems that stay boring under load.";

const FACTS = [
  ["Currently", "Full-stack developer, client products"],
  ["Focus", "Backend systems, real-time, admin tooling"],
  ["Stack I reach for", "Node.js, Laravel, React, MySQL / Mongo"],
  ["Languages", "Hindi, English"],
];

const NUMBERS = [
  ["2.5+", "Years shipping production code"],
  ["15+", "Projects delivered end-to-end"],
  ["7", "Client platforms shipped"],
];

// Each word brightens as the paragraph scrolls through the viewport
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function ScrollText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.2] tracking-[-0.025em]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <Container>
        <SectionLabel index="04" label="About" note="Varanasi, Uttar Pradesh — IST (UTC+5:30)" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <ScrollText text={STATEMENT} />
          </div>

          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <p className="max-w-xs text-[15px] leading-relaxed text-muted">
              I like owning a feature from the database table to the button that triggers it. It's the easiest way
              to make sure nothing gets lost between the layers.
            </p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-u mt-6 inline-block text-[15px]"
            >
              Download résumé (PDF) ↗
            </a>
          </Reveal>

          <dl className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-4">
            {FACTS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.05} className="grid grid-cols-5 gap-4 border-t border-line py-4 text-[15px]">
                <dt className="col-span-2 text-faint">{k}</dt>
                <dd className="col-span-3">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="mt-24 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {NUMBERS.map(([n, label], i) => (
            <Reveal
              key={label}
              delay={i * 0.08}
              className={`py-8 sm:px-6 sm:py-10 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}
            >
              <div className="text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-[-0.05em]">{n}</div>
              <div className="mt-3 text-sm text-muted">{label}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
