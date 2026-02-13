import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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
    <section className="py-20  bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">My Projects</h2>

      {loading && <p className="text-center">Loading projects...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {repos.map((proj, idx) => (
          <motion.div
            key={proj.id}
            className="relative w-[320px] min-h-[160px] flex flex-col justify-between overflow-hidden rounded shadow-md cursor-pointer group bg-white dark:bg-gray-900 p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-300 mb-1">{proj.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{proj.description || "No description"}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <div>Language: {proj.language || "—"}</div>
                <div>Stars: {proj.stargazers_count}</div>
              </div>

              <div className="flex space-x-3">
                {proj.homepage && (
                  <a href={proj.homepage} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                    <FaExternalLinkAlt /> Demo
                  </a>
                )}

                <a href={proj.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-200 flex items-center gap-1">
                  <FaGithub /> Repo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>
        {`\n          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\n        `}
      </style>
    </section>
  );
}
