import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Components
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import EmployeeManagement from './components/pages/EmployeeManagement';
import Attendance from './components/pages/Attendance';
import Salary from './components/pages/Salary';
import KPI from './components/pages/KPI';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              isLoggedIn ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/register" 
            element={
              isLoggedIn ? 
              <Navigate to="/dashboard" replace /> : 
              <Register />
            } 
          />
          
          <Route 
            path="/*" 
            element={
              isLoggedIn ? 
              <Layout onLogout={handleLogout} isLoggedIn={isLoggedIn} /> : 
              <Navigate to="/login" replace />
            } 
          />

          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;