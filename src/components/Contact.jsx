import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Container, Reveal, SectionLabel, MaskLines } from "./common/Layout";
import { socialLinks, personalInfo, whatsappLink } from "../data/constants";

const NEEDS = ["Backend / API", "Admin panel", "Website", "Mobile app backend", "Fix an existing app", "Monthly support"];
const BUDGETS = ["Under ₹50k", "₹50k – 1.5L", "₹1.5L – 5L", "₹5L+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within a month", "1–3 months", "Flexible"];

// Single-select chip row
function ChipGroup({ legend, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              type="button"
              key={o}
              onClick={() => onChange(on ? "" : o)}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                on ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [needs, setNeeds] = useState([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleNeed = (n) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const details = [
      needs.length && `Looking for: ${needs.join(", ")}`,
      budget && `Budget: ${budget}`,
      timeline && `Timeline: ${timeline}`,
    ].filter(Boolean);
    const header = details.map((d) => `[${d}]`).join("\n");
    const message = header ? `${header}\n\n${form.message}` : form.message;
    try {
      await emailjs.send(
        "service_cyl658l",
        "template_mvz4azj",
        { user_name: form.name, user_email: form.email, message },
        "tnj-hQDTFjQZB72fa"
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setNeeds([]);
      setBudget("");
      setTimeline("");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <Container>
        <SectionLabel index="06" label="Start a project" note="Replies usually within a day" />

        <h2 className="text-[clamp(2.75rem,8.5vw,9rem)] leading-[0.95] tracking-[-0.05em]">
          <MaskLines
            lines={[
              <>Have something</>,
              <>
                in <span className="serif text-accent">mind?</span>
              </>,
            ]}
          />
        </h2>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-14">
          <a
            href={`mailto:${personalInfo.email}`}
            className="link-u break-all text-[clamp(1.25rem,3vw,2.25rem)] tracking-[-0.02em]"
          >
            {personalInfo.email}
          </a>
          <button
            onClick={copyEmail}
            className="rounded-full border border-line px-4 py-1.5 text-[13px] text-muted transition-colors hover:border-fg hover:text-fg"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-28">
          {/* Side info */}
          <Reveal className="col-span-12 flex flex-col gap-10 text-[15px] lg:col-span-4">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Fastest reply</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-2.5 transition-colors hover:border-fg"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Chat on WhatsApp
                <span className="text-muted transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">What happens next</p>
              <ol className="space-y-2 text-muted">
                <li><span className="mr-2 font-mono text-[11px] text-faint">1</span>I reply within a day</li>
                <li><span className="mr-2 font-mono text-[11px] text-faint">2</span>A short free call to understand the project</li>
                <li><span className="mr-2 font-mono text-[11px] text-faint">3</span>Written scope, timeline & quote</li>
              </ol>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Elsewhere</p>
              <ul className="space-y-1.5">
                {socialLinks
                  .filter((s) => s.label !== "Email")
                  .map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-muted hover:text-fg">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Phone</p>
              <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="link-u text-muted hover:text-fg">
                {personalInfo.phone}
              </a>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Works with</p>
              <p className="max-w-xs text-muted">
                Startups, agencies and product teams — remote, or on-site in Varanasi.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
            <form onSubmit={submit} className="space-y-10">
              <fieldset>
                <legend className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  I need help with
                </legend>
                <div className="flex flex-wrap gap-2">
                  {NEEDS.map((n) => {
                    const on = needs.includes(n);
                    return (
                      <button
                        type="button"
                        key={n}
                        onClick={() => toggleNeed(n)}
                        aria-pressed={on}
                        className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                          on ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-fg hover:text-fg"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <ChipGroup legend="Rough budget" options={BUDGETS} value={budget} onChange={setBudget} />
              <ChipGroup legend="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />

              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input className="field" placeholder="Your name" autoComplete="name" required value={form.name} onChange={update("name")} />
                </label>
                <label className="block">
                  <span className="sr-only">Your email</span>
                  <input className="field" type="email" placeholder="Email address" autoComplete="email" required value={form.email} onChange={update("email")} />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  className="field resize-none"
                  rows={4}
                  placeholder="What are you building, and where are you stuck?"
                  required
                  value={form.message}
                  onChange={update("message")}
                  data-lenis-prevent
                />
              </label>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 rounded-full bg-fg px-7 py-3.5 text-[15px] text-bg transition-transform hover:scale-[1.03] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
                <AnimatePresence mode="wait">
                  {(status === "sent" || status === "error") && (
                    <motion.p
                      key={status}
                      role="status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm ${status === "sent" ? "text-emerald-500" : "text-accent"}`}
                    >
                      {status === "sent"
                        ? "Thanks — got it. I'll get back to you soon."
                        : "That didn't go through. Please email me directly."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
