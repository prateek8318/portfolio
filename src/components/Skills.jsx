import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiDotnet, SiPython, SiReact, SiJavascript, SiHtml5,
  SiTailwindcss, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiAmazonwebservices,
} from "react-icons/si";
import { FaServer, FaPalette, FaDatabase, FaCloud } from "react-icons/fa";
import { SectionWrapper, Container, SectionHeader } from "./common/Layout";

const CATEGORIES = {
  Backend: {
    Icon: FaServer,
    skills: [
      { Icon: SiPhp, name: "PHP", level: 92, color: "#777BB4" },
      { Icon: SiLaravel, name: "Laravel", level: 87, color: "#FF2D20" },
      { Icon: SiNodedotjs, name: "Node.js", level: 85, color: "#5FA04E" },
      { Icon: SiDotnet, name: ".NET Core", level: 78, color: "#7B61FF" },
      { Icon: SiPython, name: "Python", level: 75, color: "#3776AB" },
    ],
  },
  Frontend: {
    Icon: FaPalette,
    skills: [
      { Icon: SiReact, name: "React", level: 88, color: "#61DAFB" },
      { Icon: SiReact, name: "React Native", level: 82, color: "#61DAFB" },
      { Icon: SiJavascript, name: "JavaScript", level: 85, color: "#F7DF1E" },
      { Icon: SiHtml5, name: "HTML5", level: 95, color: "#E34F26" },
      { Icon: SiTailwindcss, name: "CSS / Tailwind", level: 90, color: "#38BDF8" },
    ],
  },
  Database: {
    Icon: FaDatabase,
    skills: [
      { Icon: SiMysql, name: "MySQL", level: 88, color: "#4479A1" },
      { Icon: SiPostgresql, name: "PostgreSQL", level: 80, color: "#4169E1" },
      { Icon: SiMongodb, name: "MongoDB", level: 75, color: "#47A248" },
      { Icon: SiRedis, name: "Redis", level: 70, color: "#FF4438" },
    ],
  },
  DevOps: {
    Icon: FaCloud,
    skills: [
      { Icon: SiDocker, name: "Docker", level: 85, color: "#2496ED" },
      { Icon: SiGit, name: "Git & CI/CD", level: 90, color: "#F05032" },
      { Icon: SiAmazonwebservices, name: "AWS", level: 75, color: "#FF9900" },
    ],
  },
};

const levelLabel = (n) => (n >= 88 ? "Expert" : n >= 80 ? "Advanced" : "Proficient");

export default function Skills() {
  const [active, setActive] = useState("Backend");

  return (
    <SectionWrapper id="skills">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[140px]" />
      <Container>
        <SectionHeader
          eyebrow="Skills"
          title="Technical"
          highlight="Arsenal"
          subtitle="Tools and technologies I use to build robust, scalable applications."
        />

        {/* Tabs — scrollable on small screens */}
        <div className="-mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="mx-auto flex w-max gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5">
            {Object.entries(CATEGORIES).map(([name, { Icon }]) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors sm:px-5 ${
                  active === name ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                aria-pressed={active === name}
              >
                {active === name && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/30 to-pink-500/30 ring-1 ring-orange-400/40"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative text-xs" />
                <span className="relative">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3"
            >
              {CATEGORIES[active].skills.map(({ Icon, name, level, color }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-luxury card-glow group rounded-2xl p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}1f`, color }}
                    >
                      <Icon />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-white">{name}</h3>
                      <p className="text-xs text-gray-500">{levelLabel(level)}</p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-gray-300">{level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${color}, #f97316)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${level}%` }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </SectionWrapper>
  );
}
