import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RewardStore from "./pages/RewardStore";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <RewardStore />
      </div>
    </div>
  );
}

export default App;
