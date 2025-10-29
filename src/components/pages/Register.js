import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'
import logo from '../../assets/brand/logo.jpeg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    if (username.length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }

    // Lưu tài khoản (giả lập - trong thực tế cần gọi API)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Kiểm tra username đã tồn tại
    if (users.find(u => u.username === username)) {
      setError('Tên đăng nhập đã tồn tại');
      return;
    }

    users.push({ username, password, email });
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Đăng ký thành công! Đang chuyển về trang đăng nhập...');
    
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Đăng ký tài khoản</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập (tối thiểu 3 ký tự)"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              required
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" className="login-btn">
            Đăng ký
          </button>
          <div className="form-footer">
            <p>Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;