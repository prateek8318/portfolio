import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { featuredProjects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';
import { useSectionNav } from '../hooks/useSectionNav';

const FALLBACK_IMG = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function Section({ num, title, children }) {
  return (
    <motion.section {...reveal}>
      <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-white sm:text-2xl">
        <span className="font-mono text-sm text-orange-400">{num}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

const HtmlCard = ({ html }) => (
  <div
    className="glass-luxury rounded-2xl p-5 text-base leading-relaxed text-gray-300 sm:p-6 sm:text-lg [&_strong]:text-white"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default function ProjectDetails() {
  const { slug } = useParams();
  const goTo = useSectionNav();
  const index = featuredProjects.findIndex((p) => p.slug === slug);
  const project = featuredProjects[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSEO({
    title: project ? `${project.name} - Case Study` : 'Project',
    description: project?.description,
  });

  if (!project) return <Navigate to="/" replace />;

  const prev = featuredProjects[(index - 1 + featuredProjects.length) % featuredProjects.length];
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const cs = project.caseStudy;

  return (
    <motion.div
      className="relative min-h-screen pb-20 pt-28 md:pt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] overflow-hidden">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-orange-500/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        {/* Header */}
        <button
          onClick={() => goTo('projects')}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
        >
          <FaArrowLeft size={12} /> Back to all projects
        </button>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-md border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 font-mono text-xs text-orange-300">
              {t}
            </span>
          ))}
          {project.isPrivate && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-400">
              <FaLock size={10} /> Private codebase
            </span>
          )}
        </div>

        <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">{project.name}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">{project.description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary keep-white inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
              <FaExternalLinkAlt size={12} /> {project.isPlayable ? 'Play in new tab' : 'Visit live site'}
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-luxury inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
              <FaGithub /> Source code
            </a>
          )}
        </div>

        {/* Hero media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative my-12 aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-2xl md:my-16"
        >
          {project.isPlayable && project.liveUrl ? (
            <>
              <span className="keep-white pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white">
                Interactive demo 🎮
              </span>
              <iframe src={project.liveUrl} title={project.name} className="h-full w-full border-0" allowFullScreen loading="lazy" />
            </>
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
            />
          )}
        </motion.div>

        {/* Case study */}
        <div className="space-y-12 md:space-y-16">
          <Section num="01" title="Overview"><HtmlCard html={cs.problem} /></Section>
          <Section num="02" title="Objective"><HtmlCard html={cs.objective} /></Section>

          <Section num="03" title="Architecture">
            <pre className="terminal custom-scrollbar overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c12] p-5 font-mono text-xs leading-relaxed text-emerald-400 sm:p-6 sm:text-sm">
              {cs.architecture}
            </pre>
          </Section>

          <Section num="04" title="My contribution"><HtmlCard html={cs.contribution} /></Section>

          <Section num="05" title="Technical challenges">
            <ul className="space-y-3">
              {cs.challenges.map((c, i) => (
                <li key={i} className="glass-luxury flex gap-4 rounded-2xl p-4 sm:p-5">
                  <span className="keep-white flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 font-mono text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section num="06" title="Results & impact">
            <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-pink-500/10 p-6 text-center text-lg font-medium leading-relaxed text-white sm:p-8 sm:text-xl">
              “{cs.result}”
            </div>
          </Section>
        </div>

        {/* Prev / next */}
        <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-white/5 pt-10 sm:grid-cols-2" aria-label="More projects">
          <Link to={`/project/${prev.slug}`} className="glass-luxury card-glow group rounded-2xl p-5">
            <span className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
              <FaArrowLeft size={10} /> Previous
            </span>
            <span className="font-display text-lg font-bold text-white transition-colors group-hover:text-orange-400">{prev.name}</span>
          </Link>
          <Link to={`/project/${next.slug}`} className="glass-luxury card-glow group rounded-2xl p-5 text-right">
            <span className="mb-1 flex items-center justify-end gap-2 text-xs uppercase tracking-wider text-gray-500">
              Next <FaArrowRight size={10} />
            </span>
            <span className="font-display text-lg font-bold text-white transition-colors group-hover:text-orange-400">{next.name}</span>
          </Link>
        </nav>

        <div className="mt-10 text-center">
          <button onClick={() => goTo('contact')} className="btn-primary keep-white inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white">
            Want something similar? Let's talk <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
