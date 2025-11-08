// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/brand/logo6.png';
import '../styles/Sidebar.css';

// React Icons
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
  FaIndustry,
  FaChartLine,
  FaBuilding,
  FaFileSignature,
  FaCalendarCheck,
  FaChartBar,
  FaClock,
  FaMoneyBillWave,
  FaCalendarDay,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaBusinessTime,
  FaFileInvoiceDollar,
  FaCalculator,
  FaChevronDown,
  FaChevronRight,
   FaUserCheck,
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Trạng thái mở/đóng của từng phần
  const [expandedSections, setExpandedSections] = useState({
    requirements: true,     // Yêu cầu
    personnel: true,        // Nhân sự
    structure: true,        // Cơ cấu nhân sự (đang dùng nhãn "Tuyển Dụng")
    attendance: true,       // Chấm công & Lương
    shortcuts: true         // Lối tắt
  });

  const goToDashboard = () => navigate('/dashboard');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const active = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div
          className="sidebar-header-left"
          onClick={goToDashboard}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Logo" className="sidebar-logo" />
          {/* <span className="sidebar-company-name">Vinh Gia Pottery</span> */}
        </div>
        {/* Nếu muốn hiện nút toggle:
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>☰</button> 
        */}
      </div>

      {/* Nội dung */}
      <div className="sidebar-content">
        {/* Yêu cầu */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => toggleSection("requirements")}
          >
            <h3 className="section-title">Yêu cầu</h3>
            <span className="section-toggle">
              {expandedSections.requirements ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </span>
          </div>
          {expandedSections.requirements && (
            <div className="menu-items">
              <Link
                to="/dashboard"
                className={`menu-item ${active("/dashboard")}`}
              >
                <FaTachometerAlt className="menu-icon" />
                <span className="menu-text">Dashboard</span>
              </Link>
              <Link
                to="/self-service"
                className={`menu-item ${active("/self-service")}`}
              >
                <FaUserCog className="menu-icon" />
                <span className="menu-text">Self-Service</span>
              </Link>
            </div>
          )}
        </div>

        {/* Nhân sự */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => toggleSection("personnel")}
          >
            <h3 className="section-title">Nhân sự</h3>
            <span className="section-toggle">
              {expandedSections.personnel ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </span>
          </div>
          {expandedSections.personnel && (
            <div className="menu-items">
              <Link
                to="/employee-profiles"
                className={`menu-item ${active("/employee-profiles")}`}
              >
                <FaIdCard className="menu-icon" />
                <span className="menu-text">Hồ sơ nhân sự</span>
              </Link>

              <Link
                to="/hr/contracts"
                className={`menu-item ${active("/hr/contracts")}`}
              >
                <FaFileContract className="menu-icon" />
                <span className="menu-text">Hợp đồng</span>
              </Link>

              <Link
                to="/hr/transfers"
                className={`menu-item ${active("/hr/transfers")}`}
              >
                <FaExchangeAlt className="menu-icon" />
                <span className="menu-text">Điều động/Điều chuyển</span>
              </Link>

              <Link
                to="/hr/training"
                className={`menu-item ${active("/hr/training")}`}
              >
                <FaGraduationCap className="menu-icon" />
                <span className="menu-text">Đào tạo</span>
              </Link>

              <Link
                to="/hr/rewards"
                className={`menu-item ${active("/hr/rewards")}`}
              >
                <FaAward className="menu-icon" />
                <span className="menu-text">Khen thưởng</span>
              </Link>

              <Link
                to="/hr/disciplines"
                className={`menu-item ${active("/hr/disciplines")}`}
              >
                <FaGavel className="menu-icon" />
                <span className="menu-text">Kỷ luật</span>
              </Link>

              <Link
                to="/hr/career"
                className={`menu-item ${active("/hr/career")}`}
              >
                <FaRoad className="menu-icon" />
                <span className="menu-text">Lộ trình phát triển</span>
              </Link>

              <Link
                to="/hr/certificates"
                className={`menu-item ${active("/hr/certificates")}`}
              >
                <FaCertificate className="menu-icon" />
                <span className="menu-text">Chứng chỉ</span>
              </Link>

              <Link
                to="/hr/probation"
                className={`menu-item ${active("/hr/probation")}`}
              >
                <FaUserClock className="menu-icon" />
                <span className="menu-text">Thử việc & ĐGTV</span>
              </Link>
            </div>
          )}
        </div>

        {/* Cơ cấu/Tuyển dụng */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => toggleSection("structure")}
          >
            <h3 className="section-title">Tuyển Dụng</h3>
            <span className="section-toggle">
              {expandedSections.structure ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </span>
          </div>
          {expandedSections.structure && (
            <div className="menu-items">
              {/* YÊU CẦU TUYỂN DỤNG */}
              <Link
                to="/recruit/request"
                className={`menu-item ${active("/recruit/request")}`}
              >
                <FaFileSignature className="menu-icon" />
                <span className="menu-text">Yêu cầu tuyển dụng</span>
              </Link>

              {/* ĐỀ NGHỊ TUYỂN DỤNG */}
              <Link
                to="/recruit/proposal"
                className={`menu-item ${active("/recruit/proposal")}`}
              >
                <FaBusinessTime className="menu-icon" />
                <span className="menu-text">Ứng viên</span>
              </Link>
              <Link
                to="/recruit/interview"
                className={`menu-item ${active("/recruit/interview")}`}
              >
                <FaUserCheck className="menu-icon" />
                <span className="menu-text">Phỏng vấn và đánh giá</span>
              </Link>
            </div>
          )}
        </div>

        {/* Chấm công & Lương */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => toggleSection("attendance")}
          >
            <h3 className="section-title">Chấm công & Lương</h3>
            <span className="section-toggle">
              {expandedSections.attendance ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </span>
          </div>
          {expandedSections.attendance && (
            <div className="menu-items">
              <Link
                to="/attendance"
                className={`menu-item ${active("/attendance")}`}
              >
                <FaClock className="menu-icon" />
                <span className="menu-text">Chấm công</span>
              </Link>
              <Link to="/salary" className={`menu-item ${active("/salary")}`}>
                <FaMoneyBillWave className="menu-icon" />
                <span className="menu-text">Lương</span>
              </Link>
              <Link
                to="/daily-work"
                className={`menu-item ${active("/daily-work")}`}
              >
                <FaCalendarDay className="menu-icon" />
                <span className="menu-text">Công theo ngày</span>
              </Link>
              <Link
                to="/attendance-check"
                className={`menu-item ${active("/attendance-check")}`}
              >
                <FaCheckCircle className="menu-icon" />
                <span className="menu-text">Kiểm tra công</span>
              </Link>
              <Link to="/leave" className={`menu-item ${active("/leave")}`}>
                <FaUmbrellaBeach className="menu-icon" />
                <span className="menu-text">Nghỉ phép</span>
              </Link>
              <Link
                to="/overtime"
                className={`menu-item ${active("/overtime")}`}
              >
                <FaBusinessTime className="menu-icon" />
                <span className="menu-text">Tăng ca</span>
              </Link>
              <Link to="/payroll" className={`menu-item ${active("/payroll")}`}>
                <FaFileInvoiceDollar className="menu-icon" />
                <span className="menu-text">Bảng lương</span>
              </Link>
              <Link
                to="/salary-calculation"
                className={`menu-item ${active("/salary-calculation")}`}
              >
                <FaCalculator className="menu-icon" />
                <span className="menu-text">Tính lương</span>
              </Link>
            </div>
          )}
        </div>

        {/* Lối tắt */}
        <div className="sidebar-section framed-section">
          <div
            className="section-header"
            onClick={() => toggleSection("shortcuts")}
          >
            <h3 className="section-title">Lối tắt</h3>
            <span className="section-toggle">
              {expandedSections.shortcuts ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </span>
          </div>
          {expandedSections.shortcuts && (
            <div className="menu-items">
              <Link
                to="/contract-management"
                className={`menu-item ${active("/contract-management")}`}
              >
                <FaFileSignature className="menu-icon" />
                <span className="menu-text">Quản lý Hợp đồng →</span>
              </Link>
              <Link
                to="/leave-approval"
                className={`menu-item ${active("/leave-approval")}`}
              >
                <FaCalendarCheck className="menu-icon" />
                <span className="menu-text">Duyệt Nghỉ phép →</span>
              </Link>
              <Link
                to="/kpi-evaluation"
                className={`menu-item ${active("/kpi-evaluation")}`}
              >
                <FaChartBar className="menu-icon" />
                <span className="menu-text">Đánh giá KPI →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
