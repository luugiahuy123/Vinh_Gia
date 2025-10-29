import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/brand/logo2.png';
import '../../styles/Header.css'

const Header = ({ toggleSidebar, sidebarOpen, onLogout, isLoggedIn }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Hiển thị nút toggle và logo */}
      
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <span className="company-name">NHÂN SỰ</span>

        {/* Ô tìm kiếm - chỉ hiển thị khi đã đăng nhập */}
        {isLoggedIn && (
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      <div className="user-menu">
        {isLoggedIn ? (
          <button onClick={handleLogoutClick} className="logout-btn">
            Đăng xuất
          </button>
        ) : (
          <button onClick={handleLogin} className="login-btn">
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;