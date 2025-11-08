import React, { useMemo, useState } from "react";
import ReactModal from "react-modal";
import "../../styles/employee/EmployeeModal.css";

// Nếu bạn CHƯA gọi setAppElement ở index.js, có thể bật dòng dưới:
// ReactModal.setAppElement('#root');

export default function EmployeeDetailModal({ open, data, onClose }) {
  // Không early return. Thay vào đó:
  const hasData = !!data;
  const d = data ?? {};
  const fmtDate = (x) => (x ? new Date(x).toLocaleDateString("vi-VN") : "");
  const tk = d.thong_tin_luong?.tai_khoan_ngan_hang || {};

  // Trạng thái mở/đóng theo từng section (mặc định mở mục 1)
  const [openMap, setOpenMap] = useState({
    sec1: true, sec2: false, sec3: false, sec4: false, sec5: false, sec6: false, sec7: false,
  });
  const toggle = (key) => setOpenMap((m) => ({ ...m, [key]: !m[key] }));

  // Danh sách section — luôn khởi tạo qua useMemo (không phụ thuộc vào early return)
  const sections = useMemo(
    () => [
      {
  key: "sec1",
  title: "1. Thông tin cá nhân",
  content: (
    
    <table className="emp-detail-table">
      <tbody>
        {/* Hàng tiêu đề giữa bảng */}
       <tr>
  <th colSpan="2" className="emp-subtitle">Thông tin cá nhân</th>
</tr>

        <tr><th>Giới tính</th><td>{d.thong_tin_ca_nhan?.gioi_tinh || "—"}</td></tr>
        <tr><th>Ngày sinh</th><td>{fmtDate(d.thong_tin_ca_nhan?.ngay_sinh)}</td></tr>
        <tr><th>Nơi sinh</th><td>{d.thong_tin_ca_nhan?.noi_sinh || "—"}</td></tr>
        <tr><th>Quốc tịch / Dân tộc</th><td>{d.thong_tin_ca_nhan?.quoc_tich || "—"} / {d.thong_tin_ca_nhan?.dan_toc || "—"}</td></tr>
        <tr><th>CMND/CCCD/Hộ chiếu</th><td>{d.thong_tin_ca_nhan?.so_cmnd_cccd_ho_chieu || "—"}</td></tr>
        <tr><th>Ngày cấp / Nơi cấp</th><td>{fmtDate(d.thong_tin_ca_nhan?.ngay_cap)} • {d.thong_tin_ca_nhan?.noi_cap || "—"}</td></tr>
        <tr><th>Địa chỉ thường trú</th><td>{d.thong_tin_ca_nhan?.dia_chi_thuong_tru || "—"}</td></tr>
        <tr><th>Địa chỉ tạm trú</th><td>{d.thong_tin_ca_nhan?.dia_chi_tam_tru || "—"}</td></tr>
        <tr><th>Số điện thoại</th><td>{d.thong_tin_ca_nhan?.so_dien_thoai || "—"}</td></tr>
      </tbody>
    </table>
  ),
},

      {
        key: "sec2",
        title: "2. Thông tin công việc",
        content: (
          <table className="emp-detail-table">
            <tbody>
              {/* Hàng tiêu đề giữa bảng */}
       
       <tr>
  <th colSpan="2" className="emp-subtitle"> Thông tin công việc</th>
</tr>
              <tr><th>Phòng ban</th><td>{d.thong_tin_cong_viec?.phong_ban || "—"}</td></tr>
              <tr><th>Chức danh</th><td>{d.thong_tin_cong_viec?.chuc_danh || "—"}</td></tr>
              <tr><th>Ngày vào làm</th><td>{fmtDate(d.thong_tin_cong_viec?.ngay_vao_lam)}</td></tr>
              <tr><th>Loại hợp đồng</th><td>{d.thong_tin_cong_viec?.loai_hop_dong || "—"}</td></tr>
              <tr><th>Tình trạng</th><td>{d.thong_tin_cong_viec?.tinh_trang_lam_viec || "—"}</td></tr>
            </tbody>
          </table>
        ),
      },
      {
        key: "sec3",
        title: "3. Thông tin lương",
        content: (
          <table className="emp-detail-table">
            <tbody>
              {/* Hàng tiêu đề giữa bảng */}
       <tr>
  <th colSpan="2" className="emp-subtitle">Thông tin lương</th>
</tr>
              <tr>
            
                <th>Mức lương cơ bản</th>
                <td>
                  {d.thong_tin_luong?.muc_luong_co_ban != null
                    ? new Intl.NumberFormat("vi-VN").format(d.thong_tin_luong.muc_luong_co_ban) + " ₫"
                    : "—"}
                </td>
              </tr>
              <tr>
                <th>Tài khoản ngân hàng</th>
                <td>
                  {tk.so_tai_khoan ? (
                    <>
                      {tk.so_tai_khoan} • {tk.ngan_hang || "—"} {tk.chi_nhanh ? `(${tk.chi_nhanh})` : ""}
                    </>
                  ) : "—"}
                </td>
              </tr>
              <tr><th>Mã số BHXH</th><td>{d.thong_tin_luong?.ma_so_bhxh || "—"}</td></tr>
              <tr><th>MST cá nhân</th><td>{d.thong_tin_luong?.thue_tncn?.ma_so_thue || "—"}</td></tr>
              <tr>
                <th>Người phụ thuộc</th>
                <td>
                  {d.thong_tin_luong?.thue_tncn?.nguoi_phu_thuoc?.length
                    ? d.thong_tin_luong.thue_tncn.nguoi_phu_thuoc.map((n, i, arr) => (
                        <span key={i}>
                          {n.ho_ten} ({n.quan_he})
                          {i < arr.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        key: "sec4",
        title: "4. Trình độ & Kinh nghiệm",
        content: (
          <table className="emp-detail-table">
            <tr>
  <th colSpan="2" className="emp-subtitle">Trình độ & Kinh nghiệm</th>
</tr>
            <tbody>
              <tr><th>Trình độ học vấn</th><td>{d.trinh_do_kinh_nghiem?.trinh_do_hoc_van || "—"}</td></tr>
              <tr><th>Chuyên ngành</th><td>{d.trinh_do_kinh_nghiem?.chuyen_nganh || "—"}</td></tr>
              <tr><th>Trường / Đơn vị đào tạo</th><td>{d.trinh_do_kinh_nghiem?.truong_dao_tao || "—"}</td></tr>
            </tbody>
          </table>
        ),
      },
      {
        key: "sec5",
        title: "5. Đánh giá & phát triển",
        content: (
          <table className="emp-detail-table">
            <tr>
  <th colSpan="2" className="emp-subtitle">Đánh giá & phát triển</th>
</tr>
            <tbody>
              <tr><th>Định hướng</th><td>{d.danh_gia_phat_trien?.dinh_huong || "—"}</td></tr>
              <tr>
                <th>Thành tích / Khen thưởng / Kỷ luật</th>
                <td>
                  {d.danh_gia_phat_trien?.thanh_tich_khen_thuong_ky_luat?.length ? (
                    <ul className="emp-ul">
                      {d.danh_gia_phat_trien.thanh_tich_khen_thuong_ky_luat.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  ) : "—"}
                </td>
              </tr>
              <tr>
                <th>Lịch sử tăng lương / thưởng / phạt</th>
                <td>
                  {d.danh_gia_phat_trien?.lich_su_tang_luong_thuong_phat?.length ? (
                    <ul className="emp-ul">
                      {d.danh_gia_phat_trien.lich_su_tang_luong_thuong_phat.map((l, i) => (
                        <li key={i}>{fmtDate(l.ngay)} – {l.noi_dung}</li>
                      ))}
                    </ul>
                  ) : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        key: "sec6",
        title: "6. Hồ sơ & tài liệu",
        content: (
          <table className="emp-detail-table">
            <tr>
  <th colSpan="2" className="emp-subtitle">Hồ sơ & tài liệu</th>
</tr>
            <tbody>
              <tr><th>Hợp đồng lao động</th><td>{d.ho_so_tai_lieu?.hop_dong_lao_dong || "—"}</td></tr>
              <tr><th>Số hồ sơ ứng tuyển</th><td>{d.ho_so_tai_lieu?.so_ho_so_ung_tuyen || "—"}</td></tr>
            </tbody>
          </table>
        ),
      },
      {
        key: "sec7",
        title: "7. Thông tin hệ thống",
        content: (
          <table className="emp-detail-table">
            <tr>
  <th colSpan="2" className="emp-subtitle">Thông tin hệ thống</th>
</tr>
            <tbody>
              <tr><th>Email công ty</th><td>{d.thong_tin_he_thong?.email_cong_ty || "—"}</td></tr>
            </tbody>
          </table>
        ),
      },
    ],
    [d]
  );

  return (
    <ReactModal
      isOpen={open && hasData}
      onRequestClose={onClose}
      contentLabel="Chi tiết nhân sự"
      overlayClassName="emp-modal-overlay"
      className="emp-modal-content"
      closeTimeoutMS={150}
      ariaHideApp={false}
    >
      <div className="emp-modal-head">
        <div>
          <div className="emp-modal-title">{d.thong_tin_ca_nhan?.ho_ten || "—"}</div>
          <div className="emp-modal-sub">Mã NV: {d.thong_tin_cong_viec?.ma_nhan_vien || "—"}</div>
        </div>
        <button className="emp-close" onClick={onClose} aria-label="Đóng">×</button>
      </div>

      <div className="emp-modal-body">
        {/* Thanh nút section */}
        <div className="emp-section-bar">
          {sections.map((s) => (
            <button
              key={s.key}
              type="button"
              className={`emp-section-btn ${openMap[s.key] ? "is-active" : ""}`}
              onClick={() => toggle(s.key)}
            >
              {s.title}
              <span className="emp-caret">{openMap[s.key] ? "▾" : "▸"}</span>
            </button>
          ))}
        </div>

        {/* Nội dung từng section */}
        {sections.map((s) => (
          <div key={s.key} className={`emp-section-panel ${openMap[s.key] ? "open" : "closed"}`}>
            {openMap[s.key] && s.content}
          </div>
        ))}
      </div>
    </ReactModal>
  );
}
