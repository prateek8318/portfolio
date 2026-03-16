import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../common/Layout";

export function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <GlassCard className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
        <div className="text-gray-400 text-sm mb-3">{skill.category}</div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
        <div className="text-gray-400 text-sm mt-2">{skill.level}%</div>
      </GlassCard>
    </motion.div>
  );
}

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <GlassCard className="overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-6xl text-white/50">📁</div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex space-x-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Live Demo
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function TimelineItem({ item, index, isLast = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-2"></div>
      {!isLast && <div className="flex-shrink-0 w-0.5 h-full bg-gray-700 ml-1.5"></div>}
      <div className="flex-1 pb-8">
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-gray-400 mb-2">{item.company}</p>
        <p className="text-gray-500 text-sm mb-2">{item.period}</p>
        <p className="text-gray-300">{item.description}</p>
      </div>
    </motion.div>
  );
}
