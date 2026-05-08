import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();

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
    const url = `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch repos");
        return res.json();
      })
      .then((data) => {
        setRepos(
          data.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            language: r.language,
            stargazers_count: r.stargazers_count,
            updated_at: r.updated_at,
            default_branch: r.default_branch,
          }))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} id="projects" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Enhanced Background 3D elements with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-orange-500/25 rounded-full blur-2xl will-change-transform"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 bg-orange-600/25 rounded-full blur-2xl will-change-transform"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 0.7, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div className="relative z-10" style={{ y: contentY }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Projects
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore my latest work and contributions
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center px-4">
          {repos.map((repo, idx) => (
            isMobile ? (
              <motion.div
                className="relative w-[320px] min-h-[200px] bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {repo.description || 'No description available'}
                    </p>
                  </div>
                  {repo.language && (
                    <span className="px-2 py-1 bg-gray-700 text-orange-400 text-xs rounded-full ml-3">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 2 2 0 00-2.828 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
                      </svg>
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 font-medium"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View →
                  </motion.a>
                </div>
              </motion.div>
            ) : (
              <Tilt
                key={repo.id}
                className="parallax-effect-glare-scale"
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.3}
                scale={1.05}
                gyroscope={true}
              >
                <motion.div
                  className="relative w-[320px] min-h-[200px] bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {repo.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                    </div>
                    {repo.language && (
                      <span className="px-2 py-1 bg-gray-700 text-orange-400 text-xs rounded-full ml-3">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 2 2 0 00-2.828 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
                        </svg>
                        <span>{repo.forks_count || 0}</span>
                      </div>
                    </div>
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 font-medium"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View →
                    </motion.a>
                  </div>
                </motion.div>
              </Tilt>
            )
          ))}
        </div>
      </motion.div>
    </section>
  );
}
