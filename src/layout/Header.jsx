// src/layouts/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserDropdown from '../features/auth/components/UserDropdown';
import { FaBell } from 'react-icons/fa';
import '../styles/Header.css';

// Nút chuông thông báo
function NotificationsBell() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/notifications')}
      className="notif-bell-btn"
      title="Thông báo"
    >
      <FaBell size={18} />
    </button>
  );
}

const Header = ({
  toggleSidebar,
  sidebarOpen,
  onLogout,
  isLoggedIn,
  userInfo,
  onOpenProfileModal,
  profileTick,
}) => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleLogout = () => { onLogout?.(); navigate('/login'); };
  const goToDashboard = () => navigate('/dashboard');

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
        
      
      </div>

      <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {isLoggedIn ? (
          <>
            <NotificationsBell /> {/* Chuông trắng, hover mềm */}
            <UserDropdown
              onLogout={handleLogout}
              userInfo={userInfo}
              onOpenProfileModal={onOpenProfileModal}
              profileTick={profileTick}
            />
          </>
        ) : (
          <button onClick={handleLogin} className="login-btn">Đăng nhập</button>
        )}
      </div>
    </header>
  );
};

export default Header;
