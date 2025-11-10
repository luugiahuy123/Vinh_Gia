// src/features/auth/components/UserDropdown.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/auth/UserDropdown.css';

import {
  FaUserCircle, FaCog, FaSignOutAlt, FaChevronDown, FaChevronRight,
  FaUserEdit, FaShieldAlt, FaQuestionCircle
} from 'react-icons/fa';

const API_BASE = 'http://172.23.13.102:8080';

// Giải mã payload JWT (base64url) để lấy claim nameidentifier/sub
function parseJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const axiosAuth = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Props:
 * - onLogout(): function
 * - userInfo: { name?: string, email?: string, id?: string }
 * - onOpenProfileModal(): function  // mở modal "Thông tin cá nhân"
 * - profileTick: number             // tăng mỗi lần profile cập nhật => dropdown refetch
 */
const UserDropdown = ({ onLogout, userInfo, onOpenProfileModal, profileTick = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const [profile, setProfile] = useState(null); // dữ liệu /api/Users/{id}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lấy userId từ props / localStorage / JWT
  const resolveUserId = () => {
    if (userInfo?.id) return userInfo.id;

    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.id) return parsed.id;
        if (parsed?.user?.id) return parsed.user.id;
      }
    } catch {}

    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      const nameId = payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return nameId || payload?.sub || payload?.nameid || payload?.NameId || null;
    }
    return null;
  };

  // Fetch hồ sơ từ API /api/Users/{id}
  const fetchProfile = async () => {
    const id = resolveUserId();
    if (!id) {
      setError('Không xác định được User ID.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axiosAuth.get(`/api/Users/${id}`);
      setProfile(res.data);
    } catch (err) {
      console.error('Fetch user error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Không lấy được thông tin người dùng.');
      } else if (err.request) {
        setError('Không thể kết nối đến máy chủ.');
      } else {
        setError('Lỗi không xác định.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Tự đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Đóng menu khi đổi route
  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Lấy profile sau khi mount
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔁 Khi hồ sơ cập nhật (ProfileModal báo lên), tự refetch
  useEffect(() => {
    if (profileTick > 0) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileTick]);

  const handleLogoutClick = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {}
    onLogout?.();
    navigate('/login');
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => setUserMenuOpen((v) => !v);

  const handleMenuItemClick = (action) => {
    setUserMenuOpen(false);
    switch (action) {
      case 'profile':
        if (typeof onOpenProfileModal === 'function') onOpenProfileModal();
        else navigate('/profile'); // fallback nếu không truyền prop
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'security':
        navigate('/security');
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  // Ưu tiên hiển thị: profile (API) > userInfo (prop) > fallback
  const displayName = profile?.name || userInfo?.name || 'Người dùng';
  const displayEmail = profile?.email || userInfo?.email || 'user@example.com';

  return (
    <div className="user-dropdown" ref={userMenuRef}>
      <button className="user-avatar-btn" onClick={toggleUserMenu} title="Tài khoản">
        <div className="user-avatar">
          <FaUserCircle size={20} />
        </div>
        <span className="dropdown-arrow">
          {userMenuOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
        </span>
      </button>

      {userMenuOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="user-avatar-small">
                <FaUserCircle size={24} />
              </div>
              <div className="user-details">
                <div className="user-name">
                  {loading ? 'Đang tải...' : displayName}
                </div>
                <div className="user-email">
                  {loading ? '' : displayEmail}
                </div>
                {error && <div className="user-error">{error}</div>}
              </div>
            </div>
          </div>

          {/* Thông tin cá nhân (mở modal) */}
          <button className="dropdown-item" onClick={() => handleMenuItemClick('profile')}>
            <FaUserEdit className="menu-icon" />
            <span className="menu-text">Thông tin cá nhân</span>
          </button>

          {/* Cài đặt */}
          <button className="dropdown-item" onClick={() => handleMenuItemClick('settings')}>
            <FaCog className="menu-icon" />
            <span className="menu-text">Cài đặt tài khoản</span>
          </button>

          {/* Bảo mật */}
          <button className="dropdown-item" onClick={() => handleMenuItemClick('security')}>
            <FaShieldAlt className="menu-icon" />
            <span className="menu-text">Bảo mật</span>
          </button>

          <div className="dropdown-divider"></div>

          {/* Trợ giúp */}
          <button className="dropdown-item" onClick={() => handleMenuItemClick('help')}>
            <FaQuestionCircle className="menu-icon" />
            <span className="menu-text">Trợ giúp & Hỗ trợ</span>
          </button>

          <div className="dropdown-divider"></div>

          {/* Đăng xuất */}
          <button className="dropdown-item logout-item" onClick={handleLogoutClick}>
            <FaSignOutAlt className="menu-icon" />
            <span className="menu-text">Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
