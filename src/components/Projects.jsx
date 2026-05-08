import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";
import { useScrollTrigger } from "../hooks/useSmoothScroll";
import { useAdvancedCursor } from "../hooks/useAdvancedCursor";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  const { progress: scrollProgress } = useScrollTrigger(ref, { trigger: 0.2 });
  const { addMagneticEffect } = useAdvancedCursor();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const user = "prateek8318";
    const url = `https://api.github.com/users/${user}/repos?per_page=12&sort=updated`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch repos");
        return res.json();
      })
      .then((data) => {
        // Only show top 8 projects for performance
        setRepos(
          data.slice(0, 8).map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            updated_at: r.updated_at,
          }))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} id="projects" className="py-24 md:py-32 bg-gray-950 relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl cinematic-float"
          style={{ mixBlendMode: 'screen' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl cinematic-float"
          style={{ 
            mixBlendMode: 'screen',
            animationDelay: '4s'
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/15 to-yellow-500/15 rounded-full blur-2xl cinematic-float"
          style={{ 
            mixBlendMode: 'screen',
            animationDelay: '8s'
          }}
        />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Premium Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div className="inline-block mb-6">
            <motion.div 
              className="glass-luxury px-6 py-3 rounded-full border border-white/10 inline-block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-subtitle text-orange-400 font-medium">Portfolio</span>
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-white mb-6 text-hero"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="overflow-hidden">
              <motion.span 
                className="block"
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : { y: 100 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                Featured
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : { y: 100 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                Projects
              </motion.span>
            </div>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 text-premium max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Explore my latest work and open-source contributions
          </motion.p>
        </motion.div>

        {loading && (
          <motion.div 
            className="text-center text-gray-400 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading amazing projects...
          </motion.div>
        )}
        {error && (
          <motion.div 
            className="text-center text-red-400 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Error: {error}
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.id}
              className="glass-luxury rounded-[2.5rem] p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-full shadow-2xl"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={isMobile ? {} : { y: -12 }}
            >
              {/* Floating 3D Tech Icon - Top Right */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 z-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
              >
                <img src="/projects-3d.png" alt="3D Tech" className="w-full h-full object-contain" />
              </motion.div>

              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400 group-hover:scale-110 transition-transform">
                    <FaCode size={20} />
                  </div>
                  {repo.language && (
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {repo.name}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                  {repo.description || 'Creating amazing digital experiences with clean and efficient code.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FaStar className="text-orange-400/60" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FaGithub className="hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>
                
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View <FaExternalLinkAlt size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
