import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi, saveAuth } from "../auth.api.jsx";
import bgImage from "../../../assets/brand/bg.png";
import "../../../styles/Login.css";
import logo from "../../../assets/brand/logo6.png";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginApi({ username, password });
      if (!data?.accessToken) {
        setError("Không nhận được token hợp lệ từ máy chủ.");
        return;
      }
      saveAuth(data);
      onLogin?.(data);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-overlay">
        <div className="login-container">
          <div className="login-header">
            <img src={logo} alt="Logo" className="login-logo" />
            <h2>HUMAN RESOURCES</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập Email"
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
            <div className="form-footer"> <p><Link to="/">Quên mật khẩu</Link> </p> </div>
          </form>
        </div>
      </div>
    </div>
  );
}
