import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/brand/logo6.png";
import "../styles/Sidebar.css";

import {
  FaTachometerAlt,
  FaUserCog,
  FaIdCard,
  FaFileContract,
  FaExchangeAlt,
  FaGraduationCap,
  FaAward,
  FaGavel,
  FaRoad,
  FaCertificate,
  FaUserClock,
  FaFileSignature,
  FaBusinessTime,
  FaUserCheck,
  FaClock,
  FaMoneyBillWave,
  FaCalendarDay,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaFileInvoiceDollar,
  FaCalculator,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    requirements: true,
    personnel: true,
    structure: true,
    attendance: true,
  });

  const toggleSection = (key) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const active = (path) => (location.pathname === path ? "active" : "");

  const Item = ({ to, icon: Icon, text }) => (
    <Link
      to={to}
      title={text}
      className={`menu-item ${active(to)}`}
      onClick={() => navigate(to)}
    >
      <Icon className="menu-icon" />
      <span className="menu-text">{text}</span>
    </Link>
  );

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Header Logo */}
      <div className="sidebar-header">
        <div
          className="sidebar-header-left"
          onClick={() => navigate("/dashboard")}
        >
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
      </div>

      <div className="sidebar-content">
        {/* 1. Yêu cầu */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => isOpen && toggleSection("requirements")}
          >
            <h3 className="section-title">Yêu cầu</h3>
            {expandedSections.requirements ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </div>
          {(isOpen ? expandedSections.requirements : true) && (
            <div className="menu-items">
              <Item to="/dashboard" icon={FaTachometerAlt} text="Dashboard" />
              <Item to="/self-service" icon={FaUserCog} text="Self Service" />
            </div>
          )}
        </div>

        {/* 2. Nhân sự */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => isOpen && toggleSection("personnel")}
          >
            <h3 className="section-title">Nhân sự</h3>
            {expandedSections.personnel ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </div>
          {(isOpen ? expandedSections.personnel : true) && (
            <div className="menu-items">
              <Item
                to="/employee-profiles"
                icon={FaIdCard}
                text="Hồ sơ nhân sự"
              />
              <Item to="/hr/contracts" icon={FaFileContract} text="Hợp đồng" />
              <Item to="/hr/transfers" icon={FaExchangeAlt} text="Điều động" />
              <Item to="/hr/training" icon={FaGraduationCap} text="Đào tạo" />
              <Item to="/hr/rewards" icon={FaAward} text="Khen thưởng" />
              <Item to="/hr/disciplines" icon={FaGavel} text="Kỷ luật" />
              <Item to="/hr/career" icon={FaRoad} text="Lộ trình" />
              <Item
                to="/hr/certificates"
                icon={FaCertificate}
                text="Chứng chỉ"
              />
              <Item to="/hr/probation" icon={FaUserClock} text="Thử việc" />
            </div>
          )}
        </div>

        {/* 3. Tuyển dụng */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => isOpen && toggleSection("structure")}
          >
            <h3 className="section-title">Tuyển dụng</h3>
            {expandedSections.structure ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </div>
          {(isOpen ? expandedSections.structure : true) && (
            <div className="menu-items">
              <Item
                to="/recruit/request"
                icon={FaFileSignature}
                text="Yêu cầu tuyển dụng"
              />
              <Item
                to="/recruit/proposal"
                icon={FaBusinessTime}
                text="Ứng viên"
              />
              <Item
                to="/recruit/interview"
                icon={FaUserCheck}
                text="Phỏng vấn"
              />
            </div>
          )}
        </div>

        {/* 4. Chấm công & Lương */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => isOpen && toggleSection("attendance")}
          >
            <h3 className="section-title">Chấm công & Lương</h3>
            {expandedSections.attendance ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </div>
          {(isOpen ? expandedSections.attendance : true) && (
            <div className="menu-items">
              <Item to="/attendance" icon={FaClock} text="Chấm công" />
              <Item to="/salary" icon={FaMoneyBillWave} text="Lương" />
              <Item
                to="/daily-work"
                icon={FaCalendarDay}
                text="Công theo ngày"
              />
              <Item
                to="/attendance-check"
                icon={FaCheckCircle}
                text="Kiểm tra công"
              />
              <Item to="/leave" icon={FaUmbrellaBeach} text="Nghỉ phép" />
              <Item to="/overtime" icon={FaBusinessTime} text="Tăng ca" />
              <Item
                to="/payroll"
                icon={FaFileInvoiceDollar}
                text="Bảng lương"
              />
              <Item
                to="/salary-calculation"
                icon={FaCalculator}
                text="Tính lương"
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
