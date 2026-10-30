import React from "react";
import { motion } from "framer-motion";
import { FaServer, FaLaptopCode, FaMobileAlt, FaChartLine, FaDatabase, FaCloud } from "react-icons/fa";
import { SectionWrapper, Container, SectionHeader } from "./common/Layout";

const SERVICES = [
  {
    Icon: FaServer,
    title: "Backend & API Development",
    desc: "Secure, scalable REST APIs and microservices with Node.js, PHP/Laravel and .NET — built to handle real traffic.",
    tags: ["Node.js", "Laravel", "REST"],
  },
  {
    Icon: FaChartLine,
    title: "Admin Panels & Dashboards",
    desc: "Feature-rich React admin panels for operations teams — live tracking, KYC review, analytics and settlements.",
    tags: ["React", "Charts", "RBAC"],
  },
  {
    Icon: FaLaptopCode,
    title: "Websites & Web Apps",
    desc: "Fast, responsive, SEO-friendly websites and web apps with modern UI and smooth animations.",
    tags: ["React", "Tailwind", "SEO"],
  },
  {
    Icon: FaMobileAlt,
    title: "Mobile App Backends",
    desc: "Real-time backends for React Native apps — sockets, push notifications, payments and auth.",
    tags: ["React Native", "Socket.io"],
  },
  {
    Icon: FaDatabase,
    title: "Database Design",
    desc: "Well-modelled schemas in MySQL, PostgreSQL and MongoDB, with caching via Redis for speed.",
    tags: ["MySQL", "PostgreSQL", "Redis"],
  },
  {
    Icon: FaCloud,
    title: "Deployment & DevOps",
    desc: "Dockerised services, CI/CD pipelines and AWS deployments so releases are boring (in a good way).",
    tags: ["Docker", "AWS", "CI/CD"],
  },
];

export default function Services() {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <SectionWrapper id="services">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px]" />
      <Container>
        <SectionHeader
          eyebrow="What I do"
          title="Services I"
          highlight="offer"
          subtitle="End-to-end product development — from the database to the pixels."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map(({ Icon, title, desc, tags }, i) => (
            <motion.article
              key={title}
              onMouseMove={handleMove}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-luxury card-glow group relative overflow-hidden rounded-3xl p-6 sm:p-7"
            >
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <span className="keep-white flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-xl text-white shadow-lg shadow-orange-500/25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon />
                  </span>
                  <span className="font-mono text-sm text-gray-500">0{i + 1}</span>
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-white">{title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-400 sm:text-base">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
