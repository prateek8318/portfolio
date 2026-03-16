import { useScroll, useTransform, useInView } from "framer-motion";

export function useParallax() {
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  return { backgroundY, contentY };
}

export function useInViewAnimation(ref, options = { once: true, margin: "-100px" }) {
  const { scrollYProgress } = useScroll();
  const isInView = useInView(ref, options);
  
  return { isInView, scrollYProgress };
}
