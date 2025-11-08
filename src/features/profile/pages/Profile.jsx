import React, { useEffect, useState } from "react";
import "../../../styles/Login.css"; // tái dùng style form hiện có
import {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} from "../profile.api";
import ProfileForm from "../components/ProfileModal";

export default function Profile() {
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ error: "", success: "" });

  async function load() {
    setLoading(true);
    setMsg({ error: "", success: "" });
    try {
      const me = await getMyProfile();
      setData(me);
    } catch (e) {
      setMsg({ error: e.message || "Không tải được dữ liệu.", success: "" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(payload) {
    setLoading(true);
    setMsg({ error: "", success: "" });
    try {
      const updated = await updateMyProfile(payload);
      setData(updated);
      setMode("view");
      setMsg({ error: "", success: "Đã cập nhật thông tin." });
    } catch (e) {
      setMsg({ error: e.message || "Cập nhật thất bại.", success: "" });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const ok = window.confirm(
      "Bạn chắc chắn muốn xoá tài khoản này? Hành động không thể hoàn tác."
    );
    if (!ok) return;

    setLoading(true);
    setMsg({ error: "", success: "" });
    try {
      await deleteMyAccount();
      // Xoá token & chuyển về login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setMsg({ error: "", success: "Tài khoản đã bị xoá. Vui lòng đăng nhập lại." });
      setTimeout(() => (window.location.href = "/login"), 1000);
    } catch (e) {
      setMsg({ error: e.message || "Xoá thất bại.", success: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Thông tin cá nhân</h2>
        </div>

        {msg.error && <div className="error-message">{msg.error}</div>}
        {msg.success && <div className="success-message">{msg.success}</div>}

        {mode === "view" && (
          <div className="card" style={{ background: "#fff", borderRadius: 10, padding: 16 }}>
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              <>
                <div className="form-group">
                  <label>Họ tên</label>
                  <div>{data?.name || "-"}</div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <div>{data?.email || "-"}</div>
                </div>
                <div className="form-group">
                  <label>SĐT</label>
                  <div>{data?.phone || "-"}</div>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <button className="login-btn" onClick={() => setMode("edit")}>
                    Sửa thông tin
                  </button>
                  <button
                    type="button"
                    className="login-btn"
                    onClick={handleDelete}
                    style={{ background: "#ef4444" }}
                    disabled={loading}
                  >
                    {loading ? "Đang xoá..." : "Xoá tài khoản"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {mode === "edit" && (
          <ProfileForm
            value={data}
            loading={loading}
            onSubmit={handleSave}
            onCancel={() => setMode("view")}
          />
        )}
      </div>
    </div>
  );
}
