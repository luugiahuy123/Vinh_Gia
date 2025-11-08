import React, { useMemo, useState, useEffect, useRef } from "react";
import "../../styles/employee/EmployeeCommon.css";
import "../../styles/employee/EmployeeTable.css";
import "../../styles/employee/EmployeeDrawer.css";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetailModal from "./EmployeeDetailModal";
import Swal from "sweetalert2";
import { FiPlus, FiUpload } from "react-icons/fi";

export default function EmployeeManagement() {
  // ===== DỮ LIỆU CỨNG (ví dụ) =====
  const employeeSeed = [
    {
      thong_tin_ca_nhan: {
        ho_ten: "Nguyễn Văn A",
        gioi_tinh: "Nam",
        ngay_sinh: "1992-05-21",
        noi_sinh: "TP. Hồ Chí Minh",
        quoc_tich: "Việt Nam",
        dan_toc: "Kinh",
        so_cmnd_cccd_ho_chieu: "079123456789",
        ngay_cap: "2020-01-15",
        noi_cap: "CA TP. Hồ Chí Minh",
        dia_chi_thuong_tru: "123 Nguyễn Trãi, Q1, TPHCM",
        dia_chi_tam_tru: "456 Nguyễn Đình Chiểu, Q3, TPHCM",
        so_dien_thoai: "0909000111",
      },
      thong_tin_cong_viec: {
        ma_nhan_vien: "NV001",
        phong_ban: "Kế toán",
        chuc_danh: "Kế toán tổng hợp",
        ngay_vao_lam: "2022-02-01",
        loai_hop_dong: "Chính thức",
        tinh_trang_lam_viec: "Đang làm",
      },
      thong_tin_luong: {
        muc_luong_co_ban: 15000000,
        tai_khoan_ngan_hang: { so_tai_khoan: "0123456789", ngan_hang: "Vietcombank", chi_nhanh: "Q1 TPHCM" },
        ma_so_bhxh: "BHXH012345",
        thue_tncn: { ma_so_thue: "MST123456789", nguoi_phu_thuoc: [{ ho_ten: "Nguyễn Thị B", quan_he: "Con", nam_sinh: 2020 }] },
      },
      trinh_do_kinh_nghiem: { trinh_do_hoc_van: "Đại học", chuyen_nganh: "Kế toán", truong_dao_tao: "ĐH Kinh tế TPHCM" },
      danh_gia_phat_trien: {
        dinh_huong: "Phát triển lên vị trí trưởng nhóm kế toán",
        thanh_tich_khen_thuong_ky_luat: ["Nhân viên xuất sắc 2023"],
        lich_su_tang_luong_thuong_phat: [{ ngay: "2023-01-01", noi_dung: "Tăng lương lên 15tr" }],
      },
      ho_so_tai_lieu: { hop_dong_lao_dong: "HDLD/2022/NV001", so_ho_so_ung_tuyen: "HS001" },
      thong_tin_he_thong: { email_cong_ty: "nguyenvana@company.com" },
    },
    {
      thong_tin_ca_nhan: {
        ho_ten: "Trần Thị B",
        gioi_tinh: "Nữ",
        ngay_sinh: "1995-09-10",
        noi_sinh: "Hà Nội",
        quoc_tich: "Việt Nam",
        dan_toc: "Kinh",
        so_cmnd_cccd_ho_chieu: "012345678900",
        ngay_cap: "2021-06-20",
        noi_cap: "CA Hà Nội",
        dia_chi_thuong_tru: "12 Láng Hạ, Đống Đa, Hà Nội",
        dia_chi_tam_tru: "55 Kim Mã, Ba Đình, Hà Nội",
        so_dien_thoai: "0912000222",
      },
      thong_tin_cong_viec: {
        ma_nhan_vien: "NV002",
        phong_ban: "Nhân sự",
        chuc_danh: "Chuyên viên tuyển dụng",
        ngay_vao_lam: "2023-03-15",
        loai_hop_dong: "Chính thức",
        tinh_trang_lam_viec: "Đang làm",
      },
      thong_tin_luong: {
        muc_luong_co_ban: 12000000,
        tai_khoan_ngan_hang: { so_tai_khoan: "111122223333", ngan_hang: "TPBank", chi_nhanh: "Ba Đình" },
        ma_so_bhxh: "BHXH111222",
        thue_tncn: { ma_so_thue: "MST111222333", nguoi_phu_thuoc: [] },
      },
      trinh_do_kinh_nghiem: { trinh_do_hoc_van: "Đại học", chuyen_nganh: "Quản trị nhân lực", truong_dao_tao: "ĐH Thương Mại" },
      danh_gia_phat_trien: { dinh_huong: "HRBP", thanh_tich_khen_thuong_ky_luat: [], lich_su_tang_luong_thuong_phat: [] },
      ho_so_tai_lieu: { hop_dong_lao_dong: "HDLD/2023/NV002", so_ho_so_ung_tuyen: "HS002" },
      thong_tin_he_thong: { email_cong_ty: "tranthib@company.com" },
    },
    {
      thong_tin_ca_nhan: {
        ho_ten: "Lê Văn C",
        gioi_tinh: "Nam",
        ngay_sinh: "1988-12-01",
        noi_sinh: "Đà Nẵng",
        quoc_tich: "Việt Nam",
        dan_toc: "Kinh",
        so_cmnd_cccd_ho_chieu: "079999888877",
        ngay_cap: "2019-09-09",
        noi_cap: "CA Đà Nẵng",
        dia_chi_thuong_tru: "45 Nguyễn Văn Linh, Hải Châu",
        dia_chi_tam_tru: "85 Ông Ích Khiêm, Hải Châu",
        so_dien_thoai: "0933000333",
      },
      thong_tin_cong_viec: {
        ma_nhan_vien: "NV003",
        phong_ban: "Sản xuất",
        chuc_danh: "Tổ trưởng",
        ngay_vao_lam: "2018-07-01",
        loai_hop_dong: "Chính thức",
        tinh_trang_lam_viec: "Đang làm",
      },
      thong_tin_luong: {
        muc_luong_co_ban: 10000000,
        tai_khoan_ngan_hang: { so_tai_khoan: "222233334444", ngan_hang: "VietinBank", chi_nhanh: "ĐN" },
        ma_so_bhxh: "BHXH222333",
        thue_tncn: { ma_so_thue: "MST222333444", nguoi_phu_thuoc: [{ ho_ten: "Lê Thị D", quan_he: "Vợ", nam_sinh: 1990 }] },
      },
      trinh_do_kinh_nghiem: { trinh_do_hoc_van: "Cao đẳng", chuyen_nganh: "Cơ khí", truong_dao_tao: "CĐ Công nghệ" },
      danh_gia_phat_trien: { dinh_huong: "Quản đốc", thanh_tich_khen_thuong_ky_luat: ["Sáng kiến cải tiến 2022"], lich_su_tang_luong_thuong_phat: [] },
      ho_so_tai_lieu: { hop_dong_lao_dong: "HDLD/2018/NV003", so_ho_so_ung_tuyen: "HS003" },
      thong_tin_he_thong: { email_cong_ty: "levanc@company.com" },
    },
  ];

  const [employees, setEmployees] = useState(employeeSeed);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  // ----- TÌM KIẾM -----
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return employees;
    return employees.filter((e) => {
      const c = e.thong_tin_ca_nhan;
      const w = e.thong_tin_cong_viec;
      return (
        (w.ma_nhan_vien || "").toLowerCase().includes(s) ||
        (c.ho_ten || "").toLowerCase().includes(s) ||
        (w.phong_ban || "").toLowerCase().includes(s) ||
        (w.chuc_danh || "").toLowerCase().includes(s)
      );
    });
  }, [q, employees]);

  // ----- PHÂN TRANG 10 DÒNG -----
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // ----- FORMAT / HANDLERS -----
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "");

  const handleView = (row) => setSelected(row);

  const handleEdit = (row) => {
    Swal.fire({
      icon: "info",
      title: "Chế độ Sửa (demo)",
      text: `${row.thong_tin_ca_nhan.ho_ten} — ${row.thong_tin_cong_viec.ma_nhan_vien}`,
    });
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Xác nhận xoá nhân sự?",
      html: `<b>${row.thong_tin_ca_nhan.ho_ten}</b> (Mã NV: ${row.thong_tin_cong_viec.ma_nhan_vien})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
      confirmButtonColor: "#d33",
    }).then((r) => {
      if (r.isConfirmed) {
        setEmployees((prev) =>
          prev.filter((x) => x.thong_tin_cong_viec.ma_nhan_vien !== row.thong_tin_cong_viec.ma_nhan_vien)
        );
        Swal.fire({ icon: "success", title: "Đã xoá", timer: 1400, showConfirmButton: false });
      }
    });
  };

  // ----- ADD & IMPORT -----
  const fileRef = useRef(null);

  const handleAdd = () => {
    Swal.fire("Thêm nhân sự", "Mở form thêm mới (demo)!", "info");
  };

  const triggerImport = () => fileRef.current?.click();

  const handleImportFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    Swal.fire({
      icon: "success",
      title: "Đã chọn file",
      text: `${f.name} (${Math.round(f.size / 1024)} KB)`,
    });
    e.target.value = "";
  };

  return (
    <div className="emp-wrap">
      <div className="emp-header">
        <h2>Hồ sơ nhân sự</h2>

        <div className="emp-actions">
          <button className="btn-pill is-primary" onClick={handleAdd}>
            <FiPlus className="btn-ic" /> Thêm
          </button>
          <button className="btn-pill is-info" onClick={triggerImport}>
            <FiUpload className="btn-ic" /> Import
          </button>

          <input
            className="emp-search"
            placeholder="Tìm: Mã NV / Họ tên / Phòng ban / Chức danh"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {/* input file ẩn cho Import */}
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            ref={fileRef}
            onChange={handleImportFile}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <EmployeeTable
        employees={paged}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fmtDate={fmtDate}
      />

      <Pager page={page} totalPages={totalPages} onChange={setPage} />

      {selected && (
        <EmployeeDetailModal
          open={!!selected}
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

/** Thanh phân trang đơn giản: « ‹ 1 2 3 › » */
function Pager({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const go = (p) => onChange(Math.min(Math.max(1, p), totalPages));

  // render dãy trang ngắn gọn (tối đa ~7 nút)
  const pages = [];
  const maxBtns = 7;
  let start = Math.max(1, page - 3);
  let end = Math.min(totalPages, start + maxBtns - 1);
  start = Math.max(1, end - maxBtns + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="emp-pager" style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 12 }}>
      <button className="emp-page-btn" onClick={() => go(1)} disabled={page === 1}>«</button>
      <button className="emp-page-btn" onClick={() => go(page - 1)} disabled={page === 1}>‹</button>

      {start > 1 && (
        <>
          <button className="emp-page-btn" onClick={() => go(1)}>1</button>
          {start > 2 && <span className="emp-ellipsis">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`emp-page-btn ${p === page ? "active" : ""}`}
          onClick={() => go(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="emp-ellipsis">…</span>}
          <button className="emp-page-btn" onClick={() => go(totalPages)}>{totalPages}</button>
        </>
      )}

      <button className="emp-page-btn" onClick={() => go(page + 1)} disabled={page === totalPages}>›</button>
      <button className="emp-page-btn" onClick={() => go(totalPages)} disabled={page === totalPages}>»</button>

      <span style={{ marginLeft: 8, opacity: .7 }}>
        Trang {page}/{totalPages}
      </span>
    </div>
  );
}
