import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RewardStore from "./pages/RewardStore";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RewardStore />} />
      </Routes>
    </Router>
  );
}

export default App;
