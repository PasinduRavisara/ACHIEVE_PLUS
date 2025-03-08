import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UserAnalytics from './components/UserAnalytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:userId" element={<UserAnalytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;