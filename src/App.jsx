import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CommandPalette from "./components/CommandPalette";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Chatbot from "./components/Chatbot";

const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
  </div>
);

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-noise relative">
        <React.Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
            </Routes>
          </AnimatePresence>
        </React.Suspense>
      </main>
      <Chatbot />
      <CommandPalette />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <LoadingScreen />
      <div className="min-h-screen bg-[#07070b] font-sans text-white antialiased">
        <AppContent />
      </div>
    </Router>
  );
}
