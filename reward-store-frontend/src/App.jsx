import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RewardStore from "./pages/RewardStore";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<RewardStore />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
