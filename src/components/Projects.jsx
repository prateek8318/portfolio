import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Background 3D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
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
          className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
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
      </div>

      <div className="relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            My Projects
          </h2>
          <p className="text-gray-400 text-lg">Explore my latest work and contributions</p>
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
          {repos.map((proj, idx) => (
            <Tilt
              key={proj.id}
              className="parallax-effect-glare-scale"
              perspective={1000}
              glareEnable={true}
              glareMaxOpacity={0.3}
              scale={1.05}
              gyroscope={true}
            >
              <motion.div
                className="relative w-[320px] min-h-[200px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaCode className="text-white text-lg" />
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-1 text-yellow-400"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaStar className="text-sm" />
                    <span className="text-sm font-medium">{proj.stargazers_count}</span>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {proj.description || "No description available"}
                  </p>
                </div>

                {/* Tech Stack Badge */}
                {proj.language && (
                  <motion.div
                    className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full mb-4 border border-blue-500/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    {proj.language}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex space-x-3">
                    {proj.homepage && (
                      <motion.a
                        href={proj.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Demo
                      </motion.a>
                    )}

                    <motion.a
                      href={proj.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-xs" />
                      Code
                    </motion.a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
