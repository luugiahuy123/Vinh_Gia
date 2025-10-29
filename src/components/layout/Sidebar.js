// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/brand/logo.jpeg';
import '../../styles/Sidebar.css'


// Import React Icons
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
  FaExclamationCircle,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaMoneyBillWave,
  FaCalendarDay,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaBusinessTime,
  FaFileInvoiceDollar,
  FaCalculator,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // State để quản lý trạng thái mở/đóng của từng phần
  const [expandedSections, setExpandedSections] = useState({
    requirements: true,     // Yêu cầu
    personnel: true,        // Nhân sự
    structure: true,        // Cơ cấu nhân sự
    attendance: true,       // Chấm công & Lương
    shortcuts: true         // Lối tắt
  });

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  // Hàm toggle mở/đóng từng phần
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Header của sidebar với logo, tên công ty và nút toggle */}
      <div className="sidebar-header">
        <div className="sidebar-header-left" onClick={goToDashboard} style={{cursor: 'pointer'}}>
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <span className="sidebar-company-name">VINH GIA HR</span>
        </div>
        {/* Nút toggle nằm trên sidebar khi mở */}
        {/* <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button> */}
      </div>
      
      {/* Nội dung sidebar */}
      <div className="sidebar-content">
        {/* Phần Yêu cầu với toggle và khung */}
        <div className="sidebar-section framed-section">
          <div className="section-header" onClick={() => toggleSection('requirements')}>
            <h3 className="section-title">Yêu cầu</h3>
            <span className="section-toggle">
              {expandedSections.requirements ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {expandedSections.requirements && (
            <div className="menu-items">
              <Link to="/dashboard" className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <FaTachometerAlt className="menu-icon" />
                <span className="menu-text">Dashboard</span>
              </Link>
              <Link to="/self-service" className={`menu-item ${location.pathname === '/self-service' ? 'active' : ''}`}>
                <FaUserCog className="menu-icon" />
                <span className="menu-text">Self-Service</span>
              </Link>
            </div>
          )}
        </div>

        {/* Phần Nhân sự với toggle và khung */}
        <div className="sidebar-section framed-section">
          <div className="section-header" onClick={() => toggleSection('personnel')}>
            <h3 className="section-title">Nhân sự</h3>
            <span className="section-toggle">
              {expandedSections.personnel ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {expandedSections.personnel && (
            <div className="menu-items">
              <Link to="/employee-profiles" className={`menu-item ${location.pathname === '/employee-profiles' ? 'active' : ''}`}>
                <FaIdCard className="menu-icon" />
                <span className="menu-text">Hồ sơ nhân sự</span>
              </Link>
              <Link to="/contracts" className={`menu-item ${location.pathname === '/contracts' ? 'active' : ''}`}>
                <FaFileContract className="menu-icon" />
                <span className="menu-text">Hợp đồng</span>
              </Link>
              <Link to="/transfers" className={`menu-item ${location.pathname === '/transfers' ? 'active' : ''}`}>
                <FaExchangeAlt className="menu-icon" />
                <span className="menu-text">Điều động/Điều chuyển</span>
              </Link>
              <Link to="/training" className={`menu-item ${location.pathname === '/training' ? 'active' : ''}`}>
                <FaGraduationCap className="menu-icon" />
                <span className="menu-text">Đào tạo</span>
              </Link>
              <Link to="/rewards" className={`menu-item ${location.pathname === '/rewards' ? 'active' : ''}`}>
                <FaAward className="menu-icon" />
                <span className="menu-text">Khen thưởng</span>
              </Link>
              <Link to="/disciplines" className={`menu-item ${location.pathname === '/disciplines' ? 'active' : ''}`}>
                <FaGavel className="menu-icon" />
                <span className="menu-text">Kỷ luật</span>
              </Link>
              <Link to="/development-path" className={`menu-item ${location.pathname === '/development-path' ? 'active' : ''}`}>
                <FaRoad className="menu-icon" />
                <span className="menu-text">Lộ trình phát triển</span>
              </Link>
              <Link to="/certificates" className={`menu-item ${location.pathname === '/certificates' ? 'active' : ''}`}>
                <FaCertificate className="menu-icon" />
                <span className="menu-text">Chứng chỉ</span>
              </Link>
              <Link to="/probation" className={`menu-item ${location.pathname === '/probation' ? 'active' : ''}`}>
                <FaUserClock className="menu-icon" />
                <span className="menu-text">Thử việc & ĐGTV</span>
              </Link>
            </div>
          )}
        </div>

        {/* Phần Cơ cấu nhân sự với toggle và khung */}
        <div className="sidebar-section framed-section">
          <div className="section-header" onClick={() => toggleSection('structure')}>
            <h3 className="section-title">Cơ cấu nhân sự</h3>
            <span className="section-toggle">
              {expandedSections.structure ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {expandedSections.structure && (
            <div className="menu-items">
              <Link to="/production" className={`menu-item ${location.pathname === '/production' ? 'active' : ''}`}>
                <FaIndustry className="menu-icon" />
                <span className="menu-text">Sản xuất</span>
              </Link>
              <Link to="/business" className={`menu-item ${location.pathname === '/business' ? 'active' : ''}`}>
                <FaChartLine className="menu-icon" />
                <span className="menu-text">Kinh doanh</span>
              </Link>
              <Link to="/office" className={`menu-item ${location.pathname === '/office' ? 'active' : ''}`}>
                <FaBuilding className="menu-icon" />
                <span className="menu-text">Văn phòng</span>
              </Link>
            </div>
          )}
        </div>

        {/* Phần Chấm công & Lương với toggle và khung */}
        <div className="sidebar-section framed-section">
          <div className="section-header" onClick={() => toggleSection('attendance')}>
            <h3 className="section-title">Chấm công & Lương</h3>
            <span className="section-toggle">
              {expandedSections.attendance ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {expandedSections.attendance && (
            <div className="menu-items">
              <Link to="/attendance" className={`menu-item ${location.pathname === '/attendance' ? 'active' : ''}`}>
                <FaClock className="menu-icon" />
                <span className="menu-text">Chấm công</span>
              </Link>
              <Link to="/salary" className={`menu-item ${location.pathname === '/salary' ? 'active' : ''}`}>
                <FaMoneyBillWave className="menu-icon" />
                <span className="menu-text">Lương</span>
              </Link>
              <Link to="/daily-work" className={`menu-item ${location.pathname === '/daily-work' ? 'active' : ''}`}>
                <FaCalendarDay className="menu-icon" />
                <span className="menu-text">Công theo ngày</span>
              </Link>
              <Link to="/attendance-check" className={`menu-item ${location.pathname === '/attendance-check' ? 'active' : ''}`}>
                <FaCheckCircle className="menu-icon" />
                <span className="menu-text">Kiểm tra công</span>
              </Link>
              <Link to="/leave" className={`menu-item ${location.pathname === '/leave' ? 'active' : ''}`}>
                <FaUmbrellaBeach className="menu-icon" />
                <span className="menu-text">Nghỉ phép</span>
              </Link>
              <Link to="/overtime" className={`menu-item ${location.pathname === '/overtime' ? 'active' : ''}`}>
                <FaBusinessTime className="menu-icon" />
                <span className="menu-text">Tăng ca</span>
              </Link>
              <Link to="/payroll" className={`menu-item ${location.pathname === '/payroll' ? 'active' : ''}`}>
                <FaFileInvoiceDollar className="menu-icon" />
                <span className="menu-text">Bảng lương</span>
              </Link>
              <Link to="/salary-calculation" className={`menu-item ${location.pathname === '/salary-calculation' ? 'active' : ''}`}>
                <FaCalculator className="menu-icon" />
                <span className="menu-text">Tính lương</span>
              </Link>
            </div>
          )}
        </div>

        {/* Phần Lối tắt với toggle và khung */}
        <div className="sidebar-section framed-section">
          <div className="section-header" onClick={() => toggleSection('shortcuts')}>
            <h3 className="section-title">Lối tắt</h3>
            <span className="section-toggle">
              {expandedSections.shortcuts ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {expandedSections.shortcuts && (
            <div className="menu-items">
              <Link to="/contract-management" className={`menu-item ${location.pathname === '/contract-management' ? 'active' : ''}`}>
                <FaFileSignature className="menu-icon" />
                <span className="menu-text">Quản lý Hợp đồng →</span>
              </Link>
              <Link to="/leave-approval" className={`menu-item ${location.pathname === '/leave-approval' ? 'active' : ''}`}>
                <FaCalendarCheck className="menu-icon" />
                <span className="menu-text">Duyệt Nghỉ phép →</span>
              </Link>
              <Link to="/kpi-evaluation" className={`menu-item ${location.pathname === '/kpi-evaluation' ? 'active' : ''}`}>
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