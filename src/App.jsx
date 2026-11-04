import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CommandPalette from "./components/CommandPalette";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Intro from "./components/Intro";
import HireBar from "./components/HireBar";
import { useLenis } from "./hooks/useLenis";

const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));

const AppContent = () => {
  const location = useLocation();
  useLenis();

  return (
    <>
      <Navbar />
      <main className="relative">
        <React.Suspense fallback={<div className="min-h-screen" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
            </Routes>
          </AnimatePresence>
        </React.Suspense>
      </main>
      <HireBar />
      <CommandPalette />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Intro />
      <div className="grain" aria-hidden="true" />
      <div className="min-h-screen bg-bg font-sans text-fg antialiased">
        <AppContent />
      </div>
    </Router>
  );
}
