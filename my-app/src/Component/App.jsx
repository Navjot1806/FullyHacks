import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ISS_MeteorVisualizer from "./Component/IsMeteorVisualizer";
import HomePage from "./Component/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visualizer" element={<ISS_MeteorVisualizer />} />
      </Routes>
    </Router>
  );
};

export default App;