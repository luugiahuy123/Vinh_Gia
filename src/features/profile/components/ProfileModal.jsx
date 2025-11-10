import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import "../../../styles/auth/Modal.css";
import {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} from "../profile.api";

// Ảnh avatar cứng (placeholder)
import avatarDefault from "../../../assets/brand/bg.png";

export default function ProfileModal({ isOpen, onClose, onUpdated }) {
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit
  const [loading, setLoading] = useState(false);
  const msgRef = useRef({ error: "", success: "" });

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      setLoading(true);
      msgRef.current = { error: "", success: "" };
      try {
        const me = await getMyProfile();
        setData(me);
      } catch (e) {
        msgRef.current = { error: e.message || "Không tải được dữ liệu.", success: "" };
        toast.error(msgRef.current.error);
      } finally {
        setLoading(false);
      }
    })();
  }, [isOpen]);

  const roles   = useMemo(() => data?.roles   || [], [data]);
  const modules = useMemo(() => data?.modules || [], [data]);
  const actions = useMemo(() => data?.actions || data?.permissions || [], [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        name:  form.get("name")  || "",
        email: form.get("email") || "",
        phone: form.get("phone") || "",
      };
      const updated = await updateMyProfile(payload);
      setData(updated);
      setMode("view");
      toast.success("Cập nhật hồ sơ thành công");
      onUpdated?.();
    } catch (e) {
      toast.error(e.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Xoá tài khoản? Hành động không thể hoàn tác.")) return;
    setLoading(true);
    try {
      await deleteMyAccount();
      toast.success("Đã xoá tài khoản");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => (window.location.href = "/login"), 900);
    } catch (e) {
      toast.error(e.message || "Xoá thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="emp-modal-overlay"
      className="emp-modal-content emp-modal-sm"
      shouldCloseOnOverlayClick={!loading}
      contentLabel="Thông tin cá nhân"
    >
      {/* Header */}
      <div className="emp-modal-head">
        <div className="emp-modal-title">Thông tin cá nhân</div>
        <div className="emp-modal-sub">hồ sơ & quyền truy cập</div>
        <button className="icon-btn" onClick={onClose} aria-label="Đóng">✕</button>
      </div>

      {/* Body */}
      <div className="emp-modal-body">
        {/* Row 1: Avatar + Form */}
        <div className="emp-form-grid">
          {/* Avatar cứng */}
          <div className="emp-card">
            <div className="avatar-wrap">
              <div className="avatar">
                <img src={data?.avatarUrl || avatarDefault} alt="avatar" />
              </div>
              <div className="avatar-hint">Ảnh mẫu (chưa bật upload)</div>
            </div>
          </div>

          {/* Form / View */}
          <div className="emp-card">
            {mode === "view" ? (
              <div className="emp-form-grid">
                <div className="emp-field"><label>Họ tên</label><div>{data?.name || "-"}</div></div>
                <div className="emp-field"><label>Email</label><div>{data?.email || "-"}</div></div>
                <div className="emp-field"><label>SĐT</label><div>{data?.phone || "-"}</div></div>
              </div>
            ) : (
              <form className="emp-form-grid" onSubmit={handleSave} id="profile-edit-form">
                <div className="emp-field">
                  <label>Họ tên</label>
                  <input className="emp-input" name="name" defaultValue={data?.name || ""} required />
                </div>
                <div className="emp-field">
                  <label>Email</label>
                  <input className="emp-input" name="email" type="email" defaultValue={data?.email || ""} required />
                </div>
                <div className="emp-field">
                  <label>Số điện thoại</label>
                  <input className="emp-input" name="phone" defaultValue={data?.phone || ""} />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Row 2: Bảng quyền */}
        {!!roles?.length && (
          <div className="emp-section" style={{ marginTop: 12 }}>
            <h4 style={{ margin: "0 0 8px 0" }}>Vai trò (Roles)</h4>
            <table className="emp-table">
              <thead><tr><th>Tên</th><th>Mã</th><th>Ngày tạo</th></tr></thead>
              <tbody>
                {roles.map((r, i) => (
                  <tr key={i}>
                    <td>{r?.name || "-"}</td>
                    <td><span className="badge">{r?.code || "-"}</span></td>
                    <td>{r?.created_at || r?.createdAt || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!!modules?.length && (
          <div className="emp-section" style={{ marginTop: 12 }}>
            <h4 style={{ margin: "0 0 8px 0" }}>Modules</h4>
            <table className="emp-table">
              <thead><tr><th>Tên</th><th>Mã</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {modules.map((m, i) => (
                  <tr key={i}>
                    <td>{m?.name || "-"}</td>
                    <td><span className="badge">{m?.code || "-"}</span></td>
                    <td>{m?.is_active ? "Active" : "Inactive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!!actions?.length && (
          <div className="emp-section" style={{ marginTop: 12 }}>
            <h4 style={{ margin: "0 0 8px 0" }}>Actions / Permissions</h4>
            <table className="emp-table">
              <thead><tr><th>Tên</th><th>Mã</th></tr></thead>
              <tbody>
                {actions.map((a, i) => (
                  <tr key={i}>
                    <td>{a?.name || a}</td>
                    <td><span className="badge">{a?.code || a}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="emp-modal-footer">
        {mode === "view" ? (
          <>
          
            <button className="btn btn-primary" onClick={() => setMode("edit")} disabled={loading}>
              Sửa
            </button>
            <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Đóng</button>
          </>
        ) : (
          <>
            <button className="btn btn-primary" type="submit" form="profile-edit-form" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button className="btn btn-ghost" onClick={() => setMode("view")} disabled={loading}>Huỷ</button>
          </>
        )}
      </div>
    </ReactModal>
  );
}
