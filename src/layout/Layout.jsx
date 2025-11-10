import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import Dashboard from "../features/dashboard/index.jsx";
 import SelfHome from "../features/selfService/components/SelfHome.jsx";
 import EmployeeManagement from "../features/employees/EmployeeManagement";
import ContractsPage from "../features/hr/contracts/ContractsPage.jsx";
import TrainingPage from "../features/hr/training/TrainingPage.jsx";
import TransfersPage from "../features/hr/transfers/TransfersPage";
import RewardsPage from "../features/hr/rewards/RewardsPage";
import DisciplinesPage from "../features/hr/disciplines/DisciplinesPage";
import CareerPathPage from "../features/hr/career/CareerPathPage";
import CertificatesPage from "../features/hr/certificates/CertificatesPage";
import ProbationPage from "../features/hr/probation/ProbationPage";
import SecurityPage from "../features/security/pages/SecurityPage";

import ProfileModal from "../features/profile/components/ProfileModal";
import BreadcrumbsBar from "../components/common/BreadcrumbsBar"; // <- breadcrumbs

import "../styles/layout/Layout.css";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MonthPicker from "../features/dashboard/components/MonthPicker"; // ⚠️ thêm dòng này
import { useLocation } from "react-router-dom"; // ⚠️ thêm dòng này


ReactModal.setAppElement("#root");

const Placeholder = ({ title }) => (
  <div style={{ padding: 24 }}>
    <h2 style={{ marginBottom: 8 }}>{title}</h2>
    <p>Trang đang được xây dựng.</p>
  </div>
);

const Layout = ({ onLogout, isLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileTick, setProfileTick] = useState(0);

  

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const handleProfileUpdated = () => setProfileTick((t) => t + 1);

  // ⚠️ Thêm state cho MonthPicker
  const [monthValue, setMonthValue] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  // ⚠️ Lấy đường dẫn hiện tại để xác định đang ở Dashboard
  const loc = useLocation();
  const isDashboard = loc.pathname === "/dashboard";

  
  return (
    <div className={`layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Header
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        userInfo={{ name: "Nguyễn Văn A", email: "nguyenvana@company.com" }}
        onOpenProfileModal={() => setProfileOpen(true)}
        profileTick={profileTick}
      />

      <div className="main-container">
        <div className="main-content">
          {/* Breadcrumbs toàn app */}
          <div className="page-head">
  <BreadcrumbsBar />
  {isDashboard && <MonthPicker value={monthValue} onChange={setMonthValue} />}
</div>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/self-service" element={<SelfHome />} />
            <Route path="/employee-profiles" element={<EmployeeManagement />} />
            {/* HR */}
            <Route path="/hr/contracts" element={<ContractsPage />} />
            <Route path="/hr/transfers" element={<TransfersPage />} />
            <Route path="/hr/training" element={<TrainingPage />} />
            <Route path="/hr/rewards" element={<RewardsPage />} />
            <Route path="/hr/disciplines" element={<DisciplinesPage />} />
            <Route path="/hr/career" element={<CareerPathPage />} />
            <Route path="/hr/certificates" element={<CertificatesPage />} />
            <Route path="/hr/probation" element={<ProbationPage />} />

            {/* Khác */}
            <Route path="/settings" element={<Placeholder title="Cài đặt tài khoản" />} />
            <Route path="/notifications" element={<Placeholder title="Thông báo" />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/help" element={<Placeholder title="Trợ giúp & Hỗ trợ" />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>

      <Footer />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onUpdated={handleProfileUpdated}
      />

      <ToastContainer position="top-right" newestOnTop autoClose={1800} />
    </div>
  );
};

export default Layout;