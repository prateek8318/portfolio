import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";
import { Container, Reveal, MaskLines } from "./common/Layout";

const FILTERS = ["All", "Client", "Personal"];
const EASE = [0.22, 1, 0.36, 1];

// Floating image that follows the cursor and slides between project shots
function Preview({ items, index, x, y }) {
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[230px] w-[340px] overflow-hidden lg:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: index === null ? 0 : 1, opacity: index === null ? 0 : 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        animate={{ y: `${-(index ?? 0) * 100}%` }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {items.map((p) => (
          <img key={p.id} src={p.image} alt="" className="h-full w-full object-cover" />
        ))}
      </motion.div>
    </motion.div>
  );
}

function Row({ project, i, hovered, setHovered }) {
  const dim = hovered !== null && hovered !== i;
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="border-b border-line"
    >
      <Link
        to={`/project/${project.slug}`}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        className={`group block py-6 transition-opacity duration-500 md:py-8 ${dim ? "lg:opacity-30" : ""}`}
      >
        {/* Mobile / tablet thumbnail */}
        <div className="mb-5 aspect-[16/10] overflow-hidden bg-surface lg:hidden">
          <img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover" />
        </div>

        <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2">
          <span className="col-span-2 font-mono text-[11px] text-faint md:col-span-1">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="col-span-10 transition-transform duration-500 ease-out group-hover:translate-x-3 md:col-span-5">
            <h3 className="text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
              {project.name.replace(" Admin Panel", "")}
              {project.isPrivate && <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.14em] text-faint">NDA</span>}
            </h3>
            {project.impact && (
              <p className="mt-2 flex items-center gap-2 text-[13px] text-muted">
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                {project.impact}
              </p>
            )}
          </div>
          <span className="col-span-5 col-start-3 text-sm text-muted md:col-span-2 md:col-start-auto">{project.sector}</span>
          <span className="col-span-5 text-sm text-muted md:col-span-3">{project.role}</span>
          <span className="hidden text-right text-xl text-faint transition-all duration-500 group-hover:-rotate-45 group-hover:text-accent md:col-span-1 md:block">
            →
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);

  const list = useMemo(
    () => (filter === "All" ? featuredProjects : featuredProjects.filter((p) => p.category === filter)),
    [filter]
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <section
      id="work"
      className="relative py-24 md:py-36"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 border-t border-line pt-5 md:mb-16 md:flex-row md:items-start">
          <Reveal className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="text-faint">01</span>
            <span className="mx-3 text-faint">/</span>Selected work
          </Reveal>
          <div className="flex gap-5 text-sm" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const count = f === "All" ? featuredProjects.length : featuredProjects.filter((p) => p.category === f).length;
              const on = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f)}
                  className={`transition-colors ${on ? "text-fg" : "text-faint hover:text-muted"}`}
                >
                  {f}
                  <sup className="ml-0.5 font-mono text-[10px]">{count}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <h2 className="mb-14 max-w-4xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.04em] md:mb-20">
          <MaskLines
            lines={[
              <>Products that went live,</>,
              <>
                not <span className="serif text-muted">just</span> side projects.
              </>,
            ]}
          />
        </h2>

        <div className="hidden grid-cols-12 gap-x-4 border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-5">Project</span>
          <span className="col-span-2">Sector</span>
          <span className="col-span-3">What I built</span>
        </div>

        <ul onMouseLeave={() => setHovered(null)}>
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Row key={p.id} project={p} i={i} hovered={hovered} setHovered={setHovered} />
            ))}
          </AnimatePresence>
        </ul>
      </Container>

      <Preview items={list} index={hovered} x={x} y={y} />
    </section>
  );
}
