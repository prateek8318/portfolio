import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, MaskLines } from "./common/Layout";
import { useSectionNav } from "../hooks/useSectionNav";
import { scrollToTarget } from "../hooks/useLenis";
import { personalInfo, whatsappLink } from "../data/constants";
import ClientStrip from "./ClientStrip";
import Projects from "./Projects";
import About from "./About";
import Capabilities from "./Capabilities";
import Engagement from "./Engagement";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "./Footer";

const EASE = [0.22, 1, 0.36, 1];
const firstVisit = () => !sessionStorage.getItem("seenIntro");

const META = [
  ["Role", "Full-stack engineer"],
  ["Based in", "Varanasi, India"],
  ["Experience", "2.5+ years in production"],
  ["Status", "Open for freelance projects"],
];

function Hero() {
  const ref = useRef(null);
  const goTo = useSectionNav();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Wait for the intro curtain on first visit
  const d = useRef(firstVisit() ? 1.5 : 0.1).current;

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] flex-col pb-10 pt-24 md:pt-28">
      <Container className="flex flex-1 flex-col">
        {/* Meta row */}
        <motion.dl
          className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4 text-[13px] md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: d + 0.5 }}
        >
          {META.map(([k, v], i) => (
            <div key={k}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{k}</dt>
              <dd className="mt-1 flex items-center gap-2 text-muted">
                {i === 3 && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                )}
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Headline */}
        <motion.h1
          style={{ y: headlineY, opacity: fade }}
          className="my-auto py-12 text-[clamp(2rem,8.4vw,3.5rem)] md:text-[clamp(2.6rem,6.6vw,7rem)] font-normal leading-[0.98] tracking-[-0.045em] md:py-14"
        >
          <span className="sr-only">{personalInfo.name}, full-stack engineer. </span>
          <MaskLines
            animateOnMount
            delay={d}
            lines={[
              <>I build the <span className="serif">backends,</span></>,
              <>admin panels <span className="text-muted">&amp;</span> apps</>,
              <>that real products <span className="serif text-accent">run on.</span></>,
            ]}
          />
        </motion.h1>

        {/* Bottom row */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <motion.figure
            className="col-span-5 sm:col-span-3 lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: d + 0.35, ease: EASE }}
          >
            <div className="group relative aspect-[4/5] overflow-hidden bg-surface">
              <motion.img
                style={{ y: imgY }}
                src="/image.png"
                alt="Portrait of Prateek Kumar Pandey"
                fetchpriority="high"
                className="h-[115%] w-full object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              Fig. 01 — Prateek
            </figcaption>
          </motion.figure>

          <motion.p
            className="col-span-12 max-w-md text-[15px] leading-relaxed text-muted sm:col-span-9 sm:col-start-4 lg:col-span-4 lg:col-start-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d + 0.5, ease: EASE }}
          >
            I'm {personalInfo.name.split(" ")[0]}, a freelance full-stack developer. Startups and businesses hire me
            to build the whole thing — API, admin panel, website and app backend — so there's one person
            accountable instead of three. Recent work: ride-hailing, telemedicine and exam-prep platforms.
          </motion.p>

          <motion.div
            className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] lg:col-span-5 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d + 0.6, ease: EASE }}
          >
            <button
              onClick={() => goTo("contact")}
              className="group inline-flex items-center gap-3 rounded-full bg-fg px-6 py-3 text-bg transition-transform hover:scale-[1.03]"
            >
              Start a project
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
            <button onClick={() => goTo("work")} className="link-u text-muted hover:text-fg">
              See my work ↓
            </button>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-u text-muted hover:text-fg">
              WhatsApp ↗
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  const location = useLocation();

  // Coming back from a case study: land on the work list, otherwise start at the top
  useEffect(() => {
    const target = location.state?.to && document.getElementById(location.state.to);
    scrollToTarget(target || 0, { immediate: true });
  }, [location.state]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <Hero />
      <ClientStrip />
      <Projects />
      <Capabilities />
      <Engagement />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </motion.div>
  );
}
