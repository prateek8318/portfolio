import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Reveal, SectionLabel, MaskLines } from "./common/Layout";

const SERVICES = [
  {
    title: "Backend & APIs",
    body: "REST APIs and services in Node.js, Laravel or .NET. Auth, payments, file uploads, queues, sockets — the parts that have to work at 2am without anyone watching.",
    stack: ["Node.js / Express", "PHP / Laravel", ".NET Core", "Socket.io", "REST & microservices"],
  },
  {
    title: "Admin panels & internal tools",
    body: "Dashboards that ops teams live in: live tracking, KYC review, ticket workflows, settlements, role-based access. Dense with data, but still fast and calm to use.",
    stack: ["React", "Role-based access", "Tables & filters", "Charts", "Audit trails"],
  },
  {
    title: "Web & mobile front-ends",
    body: "Marketing sites, customer web apps and React Native apps, wired to the backend I built so there's no hand-off gap.",
    stack: ["React", "React Native", "Tailwind CSS", "Framer Motion", "SEO"],
  },
  {
    title: "Data & deployment",
    body: "Schemas that won't need rewriting in six months, caching where it matters, and Dockerised deploys so a release is a non-event.",
    stack: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "CI/CD"],
  },
];

const PROCESS = [
  ["Understand the business", "Before any code, I learn how the operation actually runs — who uses what, and where it breaks today."],
  ["Model the data first", "Most bugs are really schema problems. Getting tables and states right early saves weeks later."],
  ["Ship in thin slices", "A working end-to-end flow in the first week, then iterate. You see progress, not promises."],
  ["Hand over cleanly", "Docs, env setup and a walkthrough, so your team can run it without me in the room."],
];

function ServiceRow({ s, i, open, onToggle }) {
  return (
    <li className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group grid w-full grid-cols-12 items-baseline gap-4 py-6 text-left md:py-8"
      >
        <span className="col-span-2 font-mono text-[11px] text-faint md:col-span-1">0{i + 1}</span>
        <span className="col-span-9 text-[clamp(1.5rem,3.2vw,2.75rem)] leading-tight tracking-[-0.03em] transition-colors group-hover:text-accent md:col-span-10">
          {s.title}
        </span>
        <span
          className={`col-span-1 justify-self-end text-2xl font-light text-muted transition-transform duration-500 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-8">
              <p className="col-span-12 max-w-xl text-[15px] leading-relaxed text-muted md:col-span-6 md:col-start-2">{s.body}</p>
              <ul className="col-span-12 flex flex-wrap content-start gap-2 md:col-span-5">
                {s.stack.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Capabilities() {
  const [open, setOpen] = useState(0);

  return (
    <section id="capabilities" className="relative py-24 md:py-36">
      <Container>
        <SectionLabel index="02" label="Services" note="What I can take off your plate" />

        <h2 className="mb-14 max-w-4xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.04em] md:mb-20">
          <MaskLines
            lines={[
              <>One person for the</>,
              <>
                <span className="serif">whole</span> stack — not a relay.
              </>,
            ]}
          />
        </h2>

        <ul className="border-t border-line">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.title} s={s} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>

        {/* Process */}
        <div className="mt-28 md:mt-40">
          <Reveal className="mb-10 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:mb-14">
            How a project usually goes
          </Reveal>
          <ol className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="flex flex-col bg-bg p-6 md:p-8">
                <span className="mb-16 font-mono text-[11px] text-faint md:mb-24">Step {i + 1}</span>
                <h3 className="mb-3 text-xl tracking-[-0.02em]">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
