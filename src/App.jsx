import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  return (
    <Router>
      <LoadingScreen />
      <div className="font-sans bg-gray-950 text-white transition-colors duration-300">
        <Navbar />
        <main className="scroll-smooth pt-20">
          <Home />
        </main>
      </div>
    </Router>
  );
}
