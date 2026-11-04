import React from "react";
import { Link } from "react-router-dom";
import { Container, Reveal, SectionLabel } from "./common/Layout";
import { testimonials } from "../data/testimonials";

// Hidden until real quotes are added in src/data/testimonials.js
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="relative py-24 md:py-36">
      <Container>
        <SectionLabel index="—" label="Kind words" note={`${testimonials.length} from clients`} />
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={i} delay={(i % 2) * 0.08} className="flex flex-col">
              <blockquote className="text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.3] tracking-[-0.02em]">
                <span className="serif text-accent">“</span>
                {t.quote}
                <span className="serif text-accent">”</span>
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[14px]">
                <span>
                  {t.name}
                  <span className="text-muted"> — {t.role}</span>
                </span>
                {t.project && (
                  <Link to={`/project/${t.project}`} className="link-u text-muted hover:text-fg">
                    Case study ↗
                  </Link>
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
