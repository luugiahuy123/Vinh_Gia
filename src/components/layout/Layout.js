import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Dashboard from '../pages/Dashboard';
import EmployeeManagement from '../pages/EmployeeManagement';
import Attendance from '../pages/Attendance';
import Salary from '../pages/Salary';
import KPI from '../pages/KPI';
import '../../styles/Layout.css'

const Layout = ({ onLogout, isLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
      />
      <div className="main-container">
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/kpi" element={<KPI />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;