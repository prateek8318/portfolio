import React, { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { featuredProjects } from "../data/projects";
import { whatsappLink } from "../data/constants";
import { useSEO } from "../hooks/useSEO";
import { scrollToTarget } from "../hooks/useLenis";
import { Container, Reveal, MaskLines } from "../components/common/Layout";
import Footer from "../components/Footer";

const EASE = [0.22, 1, 0.36, 1];

// Turns the simple mermaid-style strings in projects.js into a list of edges
function parseArchitecture(src) {
  const labels = {};
  const clean = (l) => l.trim().replace(/^\((.*)\)$/, "$1");
  for (const m of src.matchAll(/(\w+)\[(.+?)\](?=\s|$|<|-)/g)) labels[m[1]] = clean(m[2]);
  const edges = [];
  for (const line of src.split("\n").slice(1)) {
    const stripped = line.replace(/\[(.+?)\](?=\s|$|<|-)/g, "");
    const m = stripped.match(/(\w+)\s*(<-->|-->)\s*(?:\|([^|]+)\|\s*)?(\w+)/);
    if (m) edges.push({ from: labels[m[1]] || m[1], to: labels[m[4]] || m[4], both: m[2] === "<-->", via: m[3] });
  }
  return edges;
}

function Block({ label, children }) {
  return (
    <Reveal className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line py-10 md:py-14">
      <h2 className="col-span-12 font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:col-span-3">{label}</h2>
      <div className="col-span-12 md:col-span-9 lg:col-span-7">{children}</div>
    </Reveal>
  );
}

const Prose = ({ html }) => (
  <div
    className="text-[17px] leading-[1.7] text-muted md:text-lg [&_strong]:font-normal [&_strong]:text-fg"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default function ProjectDetails() {
  const { slug } = useParams();
  const index = featuredProjects.findIndex((p) => p.slug === slug);
  const project = featuredProjects[index];
  const mediaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, [slug]);

  useSEO({
    title: project ? `${project.name} — Case study` : "Project",
    description: project?.description,
  });

  if (!project) return <Navigate to="/" replace />;

  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const cs = project.caseStudy;
  const edges = parseArchitecture(cs.architecture);
  const name = project.name.replace(" Admin Panel", "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="pt-24 md:pt-28"
    >
      <Container>
        <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <Link to="/" state={{ to: "work" }} className="link-u hover:text-fg">
            ← All work
          </Link>
          <span className="text-faint">
            Case study {String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>

        <h1 className="mt-16 text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[-0.055em] md:mt-24">
          <MaskLines animateOnMount delay={0.1} lines={[name]} />
        </h1>

        <motion.p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          {project.description}
        </motion.p>

        <motion.dl
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-5 text-[14px] md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <div>
            <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Sector</dt>
            <dd>{project.sector}</dd>
          </div>
          <div>
            <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">My part</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Stack</dt>
            <dd className="text-muted">{project.tech.join(", ")}</dd>
          </div>
          <div>
            <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Link</dt>
            <dd className="space-y-1">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-u block w-fit">
                  {project.isPlayable ? "Play it" : "Visit live site"} ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-u block w-fit">
                  Source ↗
                </a>
              )}
              {project.isPrivate && <span className="block text-faint">Codebase under NDA</span>}
            </dd>
          </div>
        </motion.dl>
      </Container>

      {/* Hero media */}
      <div className="mt-16 px-3 sm:px-6 md:mt-24 lg:px-12">
        <div ref={mediaRef} className="relative mx-auto aspect-[16/10] max-w-[1400px] overflow-hidden bg-surface md:aspect-[16/9]">
          {project.isPlayable && project.liveUrl ? (
            <iframe src={project.liveUrl} title={project.name} className="h-full w-full border-0" loading="lazy" />
          ) : (
            <motion.img style={{ scale }} src={project.image} alt={`${project.name} screenshot`} className="h-full w-full object-cover" />
          )}
        </div>
      </div>

      <Container className="mt-20 md:mt-32">
        <Block label="Overview">
          <Prose html={cs.problem} />
        </Block>
        <Block label="The brief">
          <Prose html={cs.objective} />
        </Block>

        <Block label="Architecture">
          <ul className="border-b border-line">
            {edges.map((e, i) => (
              <li key={i} className="grid grid-cols-12 items-center gap-3 border-t border-line py-3.5 text-[15px]">
                <span className="col-span-5">{e.from}</span>
                <span className="col-span-2 text-center font-mono text-[11px] text-faint">
                  {e.both ? "⟷" : "→"}
                  {e.via && <span className="block text-[9px] uppercase tracking-[0.12em]">{e.via}</span>}
                </span>
                <span className="col-span-5 text-muted">{e.to}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="What I did">
          <Prose html={cs.contribution} />
        </Block>

        <Block label="Hard parts">
          <ol className="space-y-6">
            {cs.challenges.map((c, i) => (
              <li key={i} className="grid grid-cols-12 gap-3 text-[17px] leading-relaxed md:text-lg">
                <span className="col-span-1 font-mono text-[11px] leading-[2.4] text-faint">0{i + 1}</span>
                <span className="col-span-11">{c}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="Outcome">
          <p className="text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.25] tracking-[-0.02em]">
            <span className="serif text-accent">“</span>
            {cs.result}
            <span className="serif text-accent">”</span>
          </p>
        </Block>
      </Container>

      {/* Hire CTA */}
      <Container className="mt-16 md:mt-24">
        <Reveal className="flex flex-col gap-8 bg-surface p-8 sm:p-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Have a similar idea?</p>
            <p className="mt-4 max-w-xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.035em]">
              Need something like <span className="serif">{name}</span>?
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <Link
              to="/"
              state={{ to: "contact" }}
              className="group inline-flex items-center gap-3 rounded-full bg-fg px-6 py-3 text-bg transition-transform hover:scale-[1.03]"
            >
              Start a project
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={whatsappLink(`Hi Prateek, I saw your ${name} case study and want something similar.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-u text-muted hover:text-fg"
            >
              WhatsApp ↗
            </a>
          </div>
        </Reveal>
      </Container>

      {/* Next project */}
      <Container className="mt-16 md:mt-24">
        <Link to={`/project/${next.slug}`} className="group block border-t border-line pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Next case study</span>
          <div className="mt-6 flex items-end justify-between gap-6">
            <span className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.05em] transition-transform duration-700 ease-out group-hover:translate-x-4">
              {next.name.replace(" Admin Panel", "")}
            </span>
            <span className="mb-2 text-4xl text-faint transition-all duration-500 group-hover:-rotate-45 group-hover:text-accent md:text-6xl">
              →
            </span>
          </div>
        </Link>
      </Container>

      <Footer />
    </motion.div>
  );
}
