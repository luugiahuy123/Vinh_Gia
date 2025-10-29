import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/brand/logo.jpeg';
import '../../styles/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra admin mặc định
    if (username === 'admin' && password === '1') {
      onLogin();
      navigate('/dashboard');
      return;
    }

    // Kiểm tra tài khoản đã đăng ký
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
           <img src={logo} alt="Logo" className="login-logo" />
          <h2>Đăng nhập hệ thống</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
          <button 
            type="button" 
            className="register-btn"
            onClick={handleRegisterClick}
          >
            Tạo tài khoản mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;