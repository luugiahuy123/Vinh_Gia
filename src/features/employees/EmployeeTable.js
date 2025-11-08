import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function EmployeeTable({ employees, onView, onEdit, onDelete, fmtDate }) {
  const [menu, setMenu] = useState(null); // { x, y, row }
  const wrapRef = useRef(null);
  const menuRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const close = () => setMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Chuột phải: tính toạ độ tương đối trong wrapper
  const handleContextMenu = (e, row) => {
    e.preventDefault();
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    // clientX/Y là toạ độ viewport; trừ rect + KHÔNG cộng scroll
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // đẩy menu xuống phải 8px cho đẹp
    x += 8;
    y += 8;

    setMenu({ x, y, row });
  };

  // Clamp menu trong overlay để không tràn ra ngoài
  useLayoutEffect(() => {
    if (!menu || !wrapRef.current || !menuRef.current) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const mRect = menuRef.current.getBoundingClientRect();

    const wrapW = wrapRect.width;
    const wrapH = wrapRect.height;

    let nx = menu.x;
    let ny = menu.y;

    const mW = mRect.width;
    const mH = mRect.height;

    if (nx + mW > wrapW - 6) nx = Math.max(6, wrapW - mW - 6);
    if (ny + mH > wrapH - 6) ny = Math.max(6, wrapH - mH - 6);

    if (nx !== menu.x || ny !== menu.y) {
      setMenu((prev) => prev && { ...prev, x: nx, y: ny });
    }
  }, [menu]);

  return (
    <div
      className="emp-table-wrap"
      ref={wrapRef}
      style={{ position: "relative" }}
    >
      <table className="emp-table">
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Phòng ban</th>
            <th>Chức danh</th>
            <th>Ngày vào</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", opacity: 0.6, padding: 16 }}>
                Không có dữ liệu
              </td>
            </tr>
          )}

          {employees.map((row, idx) => {
            const c = row.thong_tin_ca_nhan;
            const w = row.thong_tin_cong_viec;
            return (
              <tr
                key={(w?.ma_nhan_vien || "") + idx}
                onClick={() => onView(row)}
                onContextMenu={(e) => handleContextMenu(e, row)}
                className="emp-row"
              >
                <td data-label="Mã NV">{w?.ma_nhan_vien}</td>
                <td data-label="Họ tên">{c?.ho_ten}</td>
                <td data-label="Phòng ban">{w?.phong_ban}</td>
                <td data-label="Chức danh">{w?.chuc_danh}</td>
                <td data-label="Ngày vào">{fmtDate(w?.ngay_vao_lam)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Overlay full wrapper để menu không bị cắt bởi overflow:hidden */}
      <div
        className="emp-overlay"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          pointerEvents: "none", // để click xuyên qua overlay
        }}
      >
        {menu && (
          <div
            className="context-menu"
            ref={menuRef}
            style={{
              position: "absolute",
              left: menu.x,
              top: menu.y,
              pointerEvents: "auto", // bật lại cho menu
              minWidth: 220,
            }}
          >
            <button className="context-item edit" onClick={() => onEdit(menu.row)}>
              Sửa 
            </button>
            <button className="context-item delete" onClick={() => onDelete(menu.row)}>
              Xoá 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
