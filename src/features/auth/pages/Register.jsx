import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../auth.api.jsx";
import logo from "../../../assets/brand/logo.jpeg";
import "../../../styles/auth/Login.css";

export default function Register() {
  const [username, setUsername]               = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail]                     = useState("");
  const [error, setError]                     = useState("");
  const [success, setSuccess]                 = useState("");
  const [loading, setLoading]                 = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (username.trim().length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
    if (password !== confirmPassword) return "Mật khẩu xác nhận không khớp";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Email không hợp lệ";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) { setError(v); return; }

    setLoading(true);
    try {
      await registerApi({ username, password, email });
      setSuccess("Đăng ký thành công! Đang chuyển về trang đăng nhập...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (e) {
      setError(e.message || "Đăng ký thất bại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Đăng ký tài khoản</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="reg-username">Tên đăng nhập</label>
            <input
              id="reg-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập (tối thiểu 3 ký tự)"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Mật khẩu</label>
            <input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm">Xác nhận mật khẩu</label>
            <input
              id="reg-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required
              autoComplete="new-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <div className="form-footer">
            <p>
              Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
