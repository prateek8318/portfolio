import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FaArrowUp, FaArrowRight, FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaDownload } from "react-icons/fa";
import { SiReact, SiNodedotjs, SiPhp, SiLaravel } from "react-icons/si";
import Lottie from "./common/Lottie";
import { TypewriterText } from "./TypewriterText";
import { useSectionNav } from "../hooks/useSectionNav";
import { socialLinks } from "../data/constants";

// Lazy load below-the-fold sections
const TechMarquee = React.lazy(() => import("./TechMarquee"));
const About = React.lazy(() => import("./About"));
const Services = React.lazy(() => import("./Services"));
const Projects = React.lazy(() => import("./Projects"));
const Skills = React.lazy(() => import("./Skills"));
const Contact = React.lazy(() => import("./Contact"));
const Footer = React.lazy(() => import("./Footer"));

const SOCIAL_ICONS = { FaGithub, FaLinkedin, FaInstagram, FaEnvelope };

const HERO_STATS = [
  { value: "2.5+", label: "Years exp." },
  { value: "15+", label: "Projects" },
  { value: "10+", label: "Technologies" },
];

const FLOATING_CHIPS = [
  { Icon: SiReact, label: "React", color: "text-cyan-400", pos: "-left-4 top-[12%] sm:-left-10", delay: 0 },
  { Icon: SiNodedotjs, label: "Node.js", color: "text-green-400", pos: "-right-2 top-[28%] sm:-right-8", delay: 1 },
  { Icon: SiPhp, label: "PHP", color: "text-indigo-400", pos: "left-[38%] -bottom-3", delay: 2 },
  { Icon: SiLaravel, label: "Laravel", color: "text-red-400", pos: "right-0 bottom-[6%] sm:-right-4", delay: 1.5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const goTo = useSectionNav();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {/* Scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400"
        style={{ scaleX: progress }}
      />

      {/* ---------------- HERO ---------------- */}
      <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-grid absolute inset-0" />
          <div className="animate-blob absolute -left-32 top-10 h-[22rem] w-[22rem] rounded-full bg-orange-500/20 blur-[110px] sm:h-[30rem] sm:w-[30rem]" />
          <div className="animate-blob animation-delay-2000 absolute -right-32 top-1/3 h-[20rem] w-[20rem] rounded-full bg-pink-500/15 blur-[110px] sm:h-[26rem] sm:w-[26rem]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07070b] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-8">
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium tracking-wide text-emerald-300 sm:text-sm">Available for freelance & full-time</span>
            </motion.div>

            <motion.p variants={fadeUp} className="mb-3 font-mono text-sm text-gray-400 sm:text-base">
              Hi there 👋, I'm
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.6rem,9vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white"
            >
              Prateek Kumar
              <br />
              <span className="text-gradient">Pandey</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mt-6">
              <TypewriterText />
            </motion.div>

            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg lg:mx-0">
              Full Stack Developer from Varanasi crafting production-grade backends, admin panels and
              websites with <span className="text-gray-200">PHP, Node.js & React</span> — shipped for ride-hailing,
              ed-tech and healthcare products.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => goTo("projects")}
                className="btn-primary keep-white inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white"
              >
                View My Work <FaArrowRight size={13} />
              </button>
              <button
                onClick={() => goTo("contact")}
                className="btn-luxury inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white"
              >
                Let's Talk
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-orange-400 transition-colors hover:text-orange-300"
              >
                <FaDownload size={13} /> CV
              </a>
            </motion.div>

            {/* Stats + socials */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start"
            >
              <div className="flex divide-x divide-white/10">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="px-4 text-center first:pl-0 last:pr-0 sm:px-5 lg:text-left">
                    <div className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500 sm:text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="hidden h-10 w-px bg-white/10 sm:block" />
              <div className="flex gap-2">
                {socialLinks.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:-translate-y-1 hover:border-orange-400/40 hover:text-orange-400"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            className="relative order-1 mx-auto w-[15rem] sm:w-[19rem] md:w-[22rem] lg:order-2 lg:w-[26rem]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-square">
              {/* Glow */}
              <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-orange-500/40 to-pink-500/40 blur-3xl" />
              {/* Rotating gradient ring */}
              <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#f97316,#ec4899,transparent_40%,transparent_60%,#f97316)] p-[2px]">
                <div className="h-full w-full rounded-full bg-[#07070b]" />
              </div>
              {/* Dashed orbit */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-white/10 sm:-inset-6" />

              {/* Photo */}
              <div className="absolute inset-[6px] overflow-hidden rounded-full bg-gradient-to-b from-white/10 to-white/0">
                <img
                  src="/image.png"
                  alt="Prateek Kumar Pandey"
                  className="h-full w-full object-cover"
                  fetchpriority="high"
                />
              </div>

              {/* Floating tech chips */}
              {FLOATING_CHIPS.map(({ Icon, label, color, pos, delay }) => (
                <motion.div
                  key={label}
                  className={`glass-luxury absolute z-20 flex items-center gap-2 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 ${pos}`}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
                >
                  <Icon className={`${color} text-base sm:text-lg`} />
                  <span className="text-[11px] font-semibold text-white sm:text-xs">{label}</span>
                </motion.div>
              ))}

              {/* Lottie — desktop only to keep mobile light */}
              <div className="pointer-events-none absolute -bottom-12 -left-16 z-10 hidden h-40 w-40 xl:block">
                <Lottie src="/Developer.lottie" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SECTIONS ---------------- */}
      <React.Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
          </div>
        }
      >
        <TechMarquee />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </React.Suspense>

      {/* Back to top — sits above the chatbot button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="glass-luxury fixed bottom-[5.5rem] right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-orange-400 sm:right-6"
            aria-label="Back to top"
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
