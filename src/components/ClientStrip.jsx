import React from "react";
import { featuredProjects } from "../data/projects";

// "Shipped for" ticker — names of client products, set in large type
const NAMES = featuredProjects.filter((p) => p.category === "Client").map((p) => p.name.replace(" Admin Panel", ""));

export default function ClientStrip() {
  const row = [...NAMES, ...NAMES];
  return (
    <div className="relative overflow-hidden border-y border-line py-6" aria-label="Products I've worked on">
      <span className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 bg-bg py-2 pl-5 pr-6 font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:block sm:pl-8 lg:pl-12">
        Built for
      </span>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="animate-marquee flex w-max items-center">
        {row.map((name, i) => (
          <span
            key={i}
            aria-hidden={i >= NAMES.length}
            className="flex items-center whitespace-nowrap text-2xl tracking-[-0.02em] text-muted sm:text-3xl"
          >
            <span className={i % 2 ? "serif" : ""}>{name}</span>
            <span className="mx-8 text-base text-faint sm:mx-12">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
