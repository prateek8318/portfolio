import { useEffect } from "react";
import Lenis from "lenis";

// Smooth (inertia) scrolling for mouse/trackpad. Touch devices keep native scroll.
// The instance is exposed on window so other code can scroll through it.
export const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    window.__lenis = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
};

export const scrollToTarget = (target, opts = {}) => {
  const lenis = window.__lenis;
  if (lenis) return lenis.scrollTo(target, { offset: -64, duration: 1.4, ...opts });
  if (typeof target === "number") return window.scrollTo({ top: target, behavior: opts.immediate ? "auto" : "smooth" });
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const lockScroll = (locked) => {
  const lenis = window.__lenis;
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.body.style.overflow = locked ? "hidden" : "";
};
