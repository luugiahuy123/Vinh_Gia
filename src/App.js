// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

import Layout from './layout/Layout';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

import { isAuthenticated /*, meApi*/ } from './features/auth/auth.api.jsx';

function App() {
  // ✅ Lấy trạng thái đăng nhập từ localStorage ngay lần render đầu tiên
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());
  const [booting, setBooting] = useState(true);

  // ✅ “Boot” app: (tuỳ chọn) gọi /Auth/me để xác thực token còn hợp lệ
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (isAuthenticated()) {
          // Nếu backend có /Auth/me thì bật dòng dưới:
          // await meApi();
          if (mounted) setIsLoggedIn(true);
        } else {
          if (mounted) setIsLoggedIn(false);
        }
      } finally {
        if (mounted) setBooting(false);
      }
    })();

    // Đồng bộ khi user login/logout từ tab khác
    const onStorage = () => setIsLoggedIn(isAuthenticated());
    window.addEventListener('storage', onStorage);
    return () => {
      mounted = false;
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    // bạn có thể gọi clearAuth() ở nơi xử lý logout
    setIsLoggedIn(false);
  };

  // Trong lúc boot (tránh chớp chuyển về /login)
  if (booting) return null; // hoặc loader tuỳ ý

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />}
          />

          {/* Private: toàn bộ app nằm trong Layout */}
          <Route
            path="/*"
            element={
              isLoggedIn
                ? <Layout onLogout={handleLogout} isLoggedIn={isLoggedIn} />
                : <Navigate to="/login" replace />
            }
          />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
