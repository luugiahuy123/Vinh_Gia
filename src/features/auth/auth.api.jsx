// src/features/auth/auth.api.jsx
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://172.23.13.102:8080/api";

export const http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ---- READ token vào mỗi request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Chuẩn hoá lỗi
function normalizeError(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.data?.error) return err.response.data.error;
  if (err?.response) return `HTTP ${err.response.status}`;
  if (err?.request) return "Không thể kết nối đến máy chủ.";
  return "Lỗi không xác định.";
}

// ---- API
export async function loginApi({ username, password }) {
  try {
    const res = await http.post("/Auth/login", { username, password });
    return res.data;
  } catch (err) {
    throw new Error(normalizeError(err));
  }
}

export async function registerApi({ username, password, email }) {
  try {
    const res = await http.post("/Auth/register", { username, password, email });
    return res.data;
  } catch (err) {
    throw new Error(normalizeError(err));
  }
}

// (tuỳ chọn) xác thực phiên từ token hiện có
export async function meApi() {
  const res = await http.get("/Auth/me"); // nếu backend có endpoint này
  return res.data;
}

// ---- Lưu & xoá
export function saveAuth(data) {
  if (!data?.accessToken) return;
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// ---- Helpers
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// ---- Auto-logout khi 401
http.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuth();
      // Tránh vòng lặp vô hạn, chỉ redirect khi không đang ở /login
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
