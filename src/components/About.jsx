import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCode, FaServer, FaMobileAlt } from "react-icons/fa";
import Lottie from "./common/Lottie";
import { SectionWrapper, Container, SectionHeader } from "./common/Layout";
import TerminalIntro from "./TerminalIntro";

const STATS = [
  { number: "2.5+", label: "Years of experience", icon: "💎" },
  { number: "15+", label: "Projects delivered", icon: "🚀" },
  { number: "9", label: "Featured case studies", icon: "📁" },
  { number: "100%", label: "Client satisfaction", icon: "⭐" },
];

const FOCUS = [
  { Icon: FaServer, text: "Backend & APIs" },
  { Icon: FaCode, text: "Admin Panels" },
  { Icon: FaMobileAlt, text: "Mobile Apps" },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]" />

      <Container>
        <SectionHeader
          eyebrow="About me"
          title="Turning ideas into"
          highlight="shipped products"
          subtitle="I enjoy owning the full journey — database design, APIs, admin tooling and the polished UI on top."
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-5">
          {/* Bio card */}
          <motion.div {...reveal(0)} className="glass-luxury card-glow relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-3">
            <div className="pointer-events-none absolute -right-6 -top-6 hidden h-36 w-36 opacity-70 md:block">
              <Lottie src="/STUDENT.lottie" />
            </div>

            <div className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400">
              <FaMapMarkerAlt className="text-orange-400" /> Varanasi, India
            </div>

            <h3 className="mb-4 max-w-md font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              Hi, I'm Prateek — a <span className="text-gradient">Full Stack Developer</span>.
            </h3>

            <div className="space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              <p>
                I build dynamic, high-performance web and mobile applications. Most of my work lives on the
                backend — designing APIs, real-time systems and microservices — paired with clean React admin
                panels that teams actually enjoy using.
              </p>
              <p className="text-gray-400">
                I've engineered products like a ride-booking platform with live GPS tracking, an exam-prep platform
                serving thousands of concurrent students, and automated KYC pipelines for driver onboarding.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {FOCUS.map(({ Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-gray-300">
                  <Icon className="text-orange-400" /> {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div {...reveal(0.1)} className="lg:col-span-2">
            <TerminalIntro />
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-5 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...reveal(0.1 + i * 0.08)}
                className="glass-luxury card-glow group rounded-3xl p-5 text-center sm:p-6"
              >
                <div className="mb-2 text-2xl sm:text-3xl">{stat.icon}</div>
                <div className="font-display text-3xl font-bold text-white transition-colors group-hover:text-orange-400 sm:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.blockquote
            {...reveal(0.2)}
            className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-pink-500/5 to-transparent p-6 sm:p-8 lg:col-span-5"
          >
            <span className="absolute -top-4 left-4 font-display text-8xl leading-none text-orange-500/20">“</span>
            <p className="relative text-center text-lg italic leading-relaxed text-gray-200 sm:text-xl">
              I believe in writing clean, maintainable code that solves real-world problems while
              providing a seamless user experience.
            </p>
          </motion.blockquote>
        </div>
      </Container>
    </SectionWrapper>
  );
}
