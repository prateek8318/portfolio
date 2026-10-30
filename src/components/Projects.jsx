import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock, FaArrowRight, FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";
import { SectionWrapper, Container, SectionHeader } from "./common/Layout";

const FILTERS = ["All", "Client", "Personal"];
const FALLBACK_IMG = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
const INITIAL_COUNT = 5; // featured card takes 2 slots -> fills two clean rows

function ProjectCard({ project, featured, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-luxury card-glow group flex flex-col overflow-hidden rounded-3xl ${
        featured ? "md:col-span-2 lg:grid lg:grid-cols-2" : ""
      }`}
    >
      {/* Image */}
      <Link
        to={`/project/${project.slug}`}
        className={`relative block overflow-hidden bg-gray-900 ${featured ? "aspect-video lg:aspect-auto lg:h-full lg:min-h-[340px]" : "aspect-video"}`}
        aria-label={`Read ${project.name} case study`}
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        <div className="absolute left-3 top-3 flex gap-2">
          {featured && (
            <span className="keep-white rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
          {project.isPlayable && (
            <span className="keep-white inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-bold text-white">
              <FaGamepad /> Playable
            </span>
          )}
        </div>
        {project.isPrivate && (
          <span className="keep-white absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
            <FaLock className="text-orange-400" size={10} /> Private
          </span>
        )}
      </Link>

      {/* Content */}
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, featured ? 5 : 4).map((t) => (
            <span key={t} className="rounded-md border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 font-mono text-[11px] text-orange-300">
              {t}
            </span>
          ))}
        </div>

        <h3 className={`mb-2 font-display font-bold text-white ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {project.name}
        </h3>
        <p className={`mb-6 flex-1 text-sm leading-relaxed text-gray-400 sm:text-base ${featured ? "" : "line-clamp-3"}`}>
          {project.description}
        </p>

        <div className="flex items-center gap-2">
          <Link
            to={`/project/${project.slug}`}
            className="btn-primary keep-white inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white sm:flex-none"
          >
            Case Study <FaArrowRight size={11} />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-orange-400/40 hover:text-orange-400"
              aria-label={`Open ${project.name} live`}
              title="Live site"
            >
              <FaExternalLinkAlt size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-orange-400/40 hover:text-orange-400"
              aria-label={`${project.name} source code`}
            >
              <FaGithub size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (filter === "All" ? featuredProjects : featuredProjects.filter((p) => p.category === filter)),
    [filter]
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <SectionWrapper id="projects">
      <div className="pointer-events-none absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-[130px]" />
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured"
          highlight="Work"
          subtitle="Production apps I've engineered for real clients — plus a few things I built for fun."
        />

        {/* Filters */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {FILTERS.map((f) => {
              const count = f === "All" ? featuredProjects.length : featuredProjects.filter((p) => p.category === f).length;
              return (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setShowAll(false); }}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                    filter === f ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-pink-500/30 ring-1 ring-orange-400/40"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f} <span className="text-xs opacity-60">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={filter === "All" && i === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                if (showAll) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                setShowAll((s) => !s);
              }}
              className="btn-luxury inline-flex items-center gap-2 rounded-xl px-7 py-3 font-semibold text-white"
            >
              {showAll ? "Show less" : `Show all ${filtered.length} projects`}
            </button>
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
