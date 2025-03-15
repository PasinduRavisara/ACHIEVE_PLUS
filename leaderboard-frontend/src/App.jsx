import React from "react";
import Sidebar from "./components/Sidebar";
import LeaderboardCard from "./components/LeaderboardCard";
import "./styles/App.scss";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="header">{/* Header content if needed */}</div>
        <LeaderboardCard />
      </div>
    </div>
  );
}

export default App;
