import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CommandPalette from "./components/CommandPalette";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));

const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main className="scroll-smooth pt-20">
        <React.Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
            </Routes>
          </AnimatePresence>
        </React.Suspense>
      </main>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <LoadingScreen />
      <div className="font-sans bg-gray-950 text-white transition-colors duration-300">
        <AppContent />
      </div>
    </Router>
  );
}
