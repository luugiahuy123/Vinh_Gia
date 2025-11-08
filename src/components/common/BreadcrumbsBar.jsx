import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TITLE_MAP = {
  "": "Dashboard", dashboard: "Dashboard",
  hr: "Nhân sự", "employee-profiles": "Hồ sơ nhân viên",
  contracts: "Hợp đồng", transfers: "Điều chuyển", training: "Đào tạo",
  rewards: "Khen thưởng", disciplines: "Kỷ luật", career: "Lộ trình",
  certificates: "Chứng chỉ", probation: "Thử việc",
  settings: "Cài đặt", notifications: "Thông báo", security: "Bảo mật", help: "Trợ giúp",
};
const isParamLike = (s) => /^\d+$|^[0-9a-f-]{6,}$/i.test(s);

export default function BreadcrumbsBar({ separator = " / " }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const segs = pathname.split("/").filter(Boolean).filter((s) => !isParamLike(s));

  // 🔧 QUY TẮC MỚI:
  // - Nếu đang ở "/" hoặc "/dashboard" -> chỉ 1 crumb "Dashboard"
  // - Ngược lại: thêm "dashboard" làm crumb đầu (thay vì "" như trước)
  const crumbs =
    segs.length === 0 || (segs.length === 1 && segs[0] === "dashboard")
      ? ["dashboard"]
      : ["dashboard", ...segs.filter((s, i) => !(i === 0 && s === "dashboard"))];

  return (
    <nav className="app-breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((seg, i) => {
        const isLast = i === crumbs.length - 1;
        const to = "/" + crumbs.slice(0, i + 1).join("/"); // tích lũy từ dashboard
        const label =
          TITLE_MAP[seg] ||
          seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        return isLast ? (
          <span key={i} className="crumb active" aria-current="page">
            {label}
          </span>
        ) : (
          <button
            key={i}
            type="button"
            className="crumb link"
            onClick={() => navigate(to)}
            title={label}
          >
            {label}
            <span className="sep">{separator}</span>
          </button>
        );
      })}
    </nav>
  );
}
