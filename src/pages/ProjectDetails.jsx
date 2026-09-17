import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { featuredProjects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = featuredProjects.find(p => p.slug === slug);
    if (found) {
      setProject(found);
    } else {
      // Could redirect to 404
      navigate('/');
    }
  }, [slug, navigate]);

  useSEO({
    title: project ? `${project.name} - Case Study` : 'Project',
    description: project?.description
  });

  if (!project) return <div className="h-screen flex items-center justify-center bg-gray-950">Loading...</div>;

  return (
    <motion.div 
      className="min-h-screen bg-gray-950 text-gray-200 pt-24 pb-12"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/#projects" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8 font-medium">
            <FaArrowLeft /> Back to Portfolio
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map(t => (
              <span key={t} className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400">{t}</span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{project.name}</h1>
          <p className="text-xl text-gray-400 font-light">{project.description}</p>
          
          <div className="flex gap-4 mt-8">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-luxury px-6 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-medium">
                <FaGithub /> Source Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="glass-luxury px-6 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-medium border border-white/10 hover:bg-white/5">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Image or Playable iframe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl overflow-hidden border border-white/10 mb-16 shadow-2xl bg-gray-900 aspect-video relative group"
        >
          {project.isPlayable && project.liveUrl ? (
            <>
              {/* Overlay hint to let user know it's interactive */}
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="bg-orange-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-orange-400">
                  Interactive Demo 🎮
                </span>
              </div>
              <iframe 
                src={project.liveUrl} 
                title={project.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          ) : (
            <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                 onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"; }} />
          )}
        </motion.div>

        {/* Case Study Content */}
        <div className="space-y-16">
          
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">01.</span> Problem Statement
            </h2>
            <div 
              className="glass-dark p-6 rounded-2xl border border-white/5 text-lg leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.caseStudy.problem }}
            />
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">02.</span> Objective
            </h2>
            <div 
              className="glass-dark p-6 rounded-2xl border border-white/5 text-lg leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.caseStudy.objective }}
            />
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">03.</span> Architecture Overview
            </h2>
            <div className="bg-black/50 p-6 rounded-2xl border border-white/10 font-mono text-sm text-green-400 whitespace-pre overflow-x-auto">
              {project.caseStudy.architecture}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">04.</span> My Contribution
            </h2>
            <div 
              className="glass-dark p-6 rounded-2xl border border-white/5 text-lg leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.caseStudy.contribution }}
            />
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">05.</span> Technical Challenges
            </h2>
            <ul className="space-y-4">
              {project.caseStudy.challenges.map((challenge, i) => (
                <li key={i} className="flex gap-4 glass-dark p-4 rounded-xl border border-white/5">
                  <div className="text-orange-500 font-bold">»</div>
                  <div className="text-gray-300">{challenge}</div>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">06.</span> Results & Impact
            </h2>
            <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-8 rounded-2xl border border-orange-500/20 text-xl font-medium text-white text-center">
              "{project.caseStudy.result}"
            </div>
          </motion.section>

        </div>
      </div>
    </motion.div>
  );
}
