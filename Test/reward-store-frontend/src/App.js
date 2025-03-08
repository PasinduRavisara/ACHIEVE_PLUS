import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RewardStore from "./pages/RewardStore";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<RewardStore />} />
          {/* Add more routes here as your application grows */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
