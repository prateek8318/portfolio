import React, { useState, useEffect } from 'react';

const ROLES = [
  "scalable web apps.",
  "REST APIs & microservices.",
  "admin dashboards.",
  "React Native mobile apps.",
  "fast, clean UIs.",
];

export const TypewriterText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex];
    let delay = deleting ? 35 : 70;

    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setRoleIndex((i) => (i + 1) % ROLES.length);
      }
      setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  return (
    <p className="min-h-[2em] font-mono text-base text-gray-300 sm:text-lg md:text-xl" aria-live="polite">
      <span className="text-orange-400">&gt;</span> I build{" "}
      <span className="text-white">{text}</span>
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-orange-400" />
    </p>
  );
};
