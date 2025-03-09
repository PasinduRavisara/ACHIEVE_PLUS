
// Adding App.jsx to tie everything together
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminTaskManagement } from './components/AdminTaskManagement';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  // In a real app, you'd get this from your auth system
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const userId = parseInt(localStorage.getItem('userId')) || 2;

  return (
    <Router>
      <Routes>
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminTaskManagement /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={<EmployeeDashboard userId={userId} />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAdmin ? "/admin" : "/dashboard"} />} 
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};
