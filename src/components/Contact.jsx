import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaCopy, FaCheck } from "react-icons/fa";
import { SectionWrapper, Container, SectionHeader } from "./common/Layout";
import { Field } from "./common/Form";
import { contactInfo, socialLinks, personalInfo } from "../data/constants";
import { iconMap } from "../utils/helpers";

export default function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    emailjs
      .sendForm("service_cyl658l", "template_mvz4azj", form.current, "tnj-hQDTFjQZB72fa")
      .then(
        () => {
          setStatus("success");
          form.current?.reset();
        },
        () => setStatus("error")
      )
      .finally(() => setIsSubmitting(false));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          highlight="together"
          subtitle="Have a project, a role, or just an idea? My inbox is open — I usually reply within a day."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            <div className="glass-luxury rounded-3xl p-6 sm:p-8">
              <h3 className="mb-6 font-display text-xl font-bold text-white">Contact information</h3>
              <ul className="space-y-3">
                {contactInfo.map((c) => {
                  const Icon = iconMap[c.icon];
                  const isLink = c.href && c.href !== "#";
                  const Tag = isLink ? "a" : "div";
                  return (
                    <li key={c.label}>
                      <Tag
                        {...(isLink ? { href: c.href } : {})}
                        className="group flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-colors hover:border-white/10 hover:bg-white/5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                          <Icon />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs uppercase tracking-wider text-gray-500">{c.label}</span>
                          <span className="block break-words font-medium text-white transition-colors group-hover:text-orange-400">
                            {c.value}
                          </span>
                        </span>
                      </Tag>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={copyEmail}
                className="btn-luxury mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
              >
                {copied ? <><FaCheck className="text-emerald-400" /> Email copied!</> : <><FaCopy /> Copy email address</>}
              </button>
            </div>

            <div className="glass-luxury rounded-3xl p-6 sm:p-8">
              <h3 className="mb-5 font-display text-xl font-bold text-white">Find me online</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((s) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:-translate-y-0.5 hover:border-orange-400/40 hover:text-orange-400"
                    >
                      <Icon className="text-lg" /> {s.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-luxury card-glow rounded-3xl p-6 sm:p-8 lg:col-span-3"
          >
            <h3 className="mb-2 font-display text-xl font-bold text-white sm:text-2xl">Send me a message</h3>
            <p className="mb-6 text-sm text-gray-400">Fill in the form and I'll get back to you soon.</p>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your name" name="user_name" autoComplete="name" required />
                <Field label="Your email" name="user_email" type="email" autoComplete="email" required />
              </div>
              <Field label="Tell me about your project..." name="message" textarea rows={6} required />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary keep-white inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane size={13} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                      status === "success"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {status === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
                    {status === "success"
                      ? "Message sent successfully! I'll reply soon."
                      : "Failed to send. Please try again or email me directly."}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
