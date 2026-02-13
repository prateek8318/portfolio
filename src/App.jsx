import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-900 text-white transition-colors duration-300">
        <Navbar />
        <main className="scroll-smooth">
          <Home />
        </main>
      </div>
    </Router>
  );
}
