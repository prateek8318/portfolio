import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Reveal, SectionLabel } from "./common/Layout";
import { whatsappLink } from "../data/constants";

const FAQS = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope, so I don't publish fixed prices. After a short call I send a written quote with a breakdown by milestone. You'll know the full cost before any work starts — no surprise invoices.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused admin panel or API is usually a few weeks; a full product with apps, panels and a website is a few months. You get a timeline with the quote, and a working demo build every week so you can see real progress.",
  },
  {
    q: "How do payments work?",
    a: "Milestone-based: an advance to start, then the rest split across agreed milestones. Retainers are billed monthly. I work with clients in India and abroad.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The full source code, repository and deployment access are handed over to you. Happy to sign an NDA before we discuss anything sensitive.",
  },
  {
    q: "Can you work on an existing codebase?",
    a: "Yes — a lot of my work is picking up projects someone else started. I begin with a quick review so we both know what we're dealing with before committing to a plan.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a period of bug-fix support after go-live. After that you can move to a monthly retainer, or take it in-house — I'll document things so your team can run it.",
  },
  {
    q: "How do we stay in touch during the project?",
    a: "WhatsApp or Slack for day-to-day questions, a short weekly update with what shipped, and a call whenever it's easier to talk. I work in IST but overlap with UK, EU and US mornings.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  // FAQ structured data so Google can show these as rich results
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <section id="faq" className="relative py-24 md:py-36">
      <Container>
        <SectionLabel index="05" label="Questions" note="Before you get in touch" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-4">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.04em]">
              Things clients <span className="serif">usually</span> ask.
            </h2>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">
              Something else on your mind?{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-u text-fg">
                Ask on WhatsApp
              </a>
              .
            </p>
          </Reveal>

          <ul className="col-span-12 border-t border-line lg:col-span-7 lg:col-start-6">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-baseline justify-between gap-6 py-5 text-left text-[17px] md:text-lg"
                  >
                    <span className="transition-colors group-hover:text-accent">{f.q}</span>
                    <span className={`text-xl font-light text-muted transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
