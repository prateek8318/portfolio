import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={ref} id="projects" className="py-12 md:py-24 bg-gray-950 relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl cinematic-float"
          style={{ mixBlendMode: 'screen' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl cinematic-float"
          style={{ 
            mixBlendMode: 'screen',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Premium Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div className="inline-block mb-6">
            <div className="glass-luxury px-6 py-3 rounded-full border border-white/10 inline-block">
              <span className="text-sm tracking-widest uppercase text-orange-400 font-semibold">Portfolio</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Work</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            A selection of my best projects, including enterprise applications and private repositories.
          </p>
        </motion.div>

        <div className="space-y-24">
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"; // Abstract placeholder
                      }}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {project.isPrivate && (
                      <div className="absolute top-4 right-4 glass-luxury px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 backdrop-blur-md">
                        <FaLock className="text-orange-400 text-xs" />
                        <span className="text-xs text-white font-medium">Private Project</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
                  <div className="flex gap-2 flex-wrap mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs font-semibold tracking-wider uppercase text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {project.name}
                  </h3>
                  
                  <div className="glass-luxury p-6 rounded-2xl border border-white/5 mb-8 relative z-10 shadow-xl">
                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-2">
                    <Link
                      to={`/project/${project.slug}`}
                      className="btn-luxury px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read Case Study <FaArrowRight size={14} />
                    </Link>
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Subtle decorative element at bottom */}
        <div className="mt-32 text-center">
          <p className="text-gray-500 font-light tracking-widest uppercase text-sm">More projects coming soon</p>
          <div className="w-1 h-12 bg-gradient-to-b from-orange-500/50 to-transparent mx-auto mt-4 rounded-full" />
        </div>
      </div>
    </section>
  );
}
