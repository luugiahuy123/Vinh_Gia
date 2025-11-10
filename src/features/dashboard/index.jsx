import { useState } from "react";
import "../../styles/dashboard/Dashboard.css";
import "../../styles/layout/SizeCard.css";
import "../../styles/atoms/tables.css"; // ← dùng Vinh Gia Tables

import KpiCard from "./components/KpiCard";
import ExpiringList from "./components/ExpiringList";
import Donut from "./components/Donut";
import DualColumns from "./components/DualColumns";
import HBar from "./components/HBar";
import Modal from "../../components/common/Modal"; // modal dùng chung

const KPIs = {
  totalEmployees: 128,
  hiredThisMonth: 6,
  leftThisMonth: 2,
  totaleEmploy: 126,
};

const deptShare = [
  { label: "Kế toán", value: 20 },
  { label: "Xuất nhập khẩu", value: 18 },
  { label: "Kho vận", value: 32 },
  { label: "Nhân sự", value: 15 },
  { label: "QA/QC", value: 21 },
  { label: "IT", value: 10 },
];

const monthly = [
  { m: "Tháng 1", hire: 15, leave: 1 },
  { m: "Tháng 2", hire: 1, leave: 1 },
  { m: "Tháng 3", hire: 20, leave: 1 },
  { m: "Tháng 4", hire: 4, leave: 3 },
  { m: "Tháng 5", hire: 2, leave: 2 },
  { m: "Tháng 6", hire: 2, leave: 1 },
  { m: "Tháng 7", hire: 1, leave: 1 },
  { m: "Tháng 8", hire: 1, leave: 0 },
  { m: "Tháng 9", hire: 1, leave: 0 },
  { m: "Tháng 10", hire: 2, leave: 1 },
  { m: "Tháng 11", hire: 4, leave: 3 },
  { m: "Tháng 12", hire: 0, leave: 0 },
];

const currentYear = new Date().getFullYear();
const dataByYear = { [currentYear]: monthly || [] };

const expiringContracts = [
  { name: "Nguyễn Văn A", dept: "Sản xuất",   due: "15/11/2025", daysLeft: 10, code: "NV001" },
  { name: "Trần Thị B",   dept: "Kinh doanh", due: "28/11/2025", daysLeft: 23, code: "NV002" },
  { name: "Lê Văn C",     dept: "Văn phòng",  due: "05/12/2025", daysLeft: 30, code: "NV003" },
  { name: "Phạm Thị D",   dept: "Sản xuất",   due: "08/12/2025", daysLeft: 33, code: "NV004" },
  { name: "Phạm Văn E",   dept: "Sản xuất",   due: "30/12/2025", daysLeft: 45, code: "NV005" },
];

const ageBands = [
  { label: "18–25", value: 23.9 },
  { label: "26–35", value: 39.0 },
  { label: "36–45", value: 19.3 },
  { label: "46–55", value: 12.1 },
  { label: "56–60", value: 5.7 },
];

export default function Dashboard() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <div className="hrdash grid-hr">
        {/* KPI */}
        <KpiCard
          icon="users"
          label="Tổng nhân sự"
          value={KPIs.totalEmployees}
          trend={[100,105,110,112,115,118,120,123,125,126,127,128]}
          gridClass="card-12 sm-card-4 md-card-3 lg-card-3"
        />
        <KpiCard
          icon="users"
          label="Nhân sự hiện hữu"
          value={KPIs.totaleEmploy}
          trend={[3,5,6,4,8,7,9,11,10,8,6,7]}
          accent="qq"
          gridClass="card-12 sm-card-4 md-card-3 lg-card-3"
        />
        <KpiCard
          icon="hire"
          label="Nhân sự mới (Tháng)"
          value={KPIs.hiredThisMonth}
          trend={[2,3,4,5,7,6,5,8,9,6,7,6]}
          accent="chart"
          gridClass="card-12 sm-card-4 md-card-3 lg-card-3"
        />
        <KpiCard
          icon="leave"
          label="Nhân sự nghỉ việc (Tháng)"
          value={KPIs.leftThisMonth}
          trend={[1,1,2,0,1,2,1,2,3,1,1,2]}
          accent="warn"
          gridClass="card-12 sm-card-4 md-card-3 lg-card-3"
        />

        {/* Hợp đồng sắp hết hạn */}
        <div className="card card-12 md-card-6 lg-card-3">
          <div className="cardHead">
            <div className="title">Hợp đồng sắp hết hạn</div>
            <button className="btn link" onClick={() => setShowAll(true)}>
              Xem tất cả
            </button>
          </div>
          <ExpiringList items={expiringContracts} />
        </div>

        {/* Dual columns */}
        <div className="card card-12 md-card-6 lg-card-9">
          <DualColumns dataByYear={dataByYear} />
        </div>

        {/* Tỷ lệ */}
        <div className="card listCard card-12 md-card-6 lg-card-6">
          <div className="title">Tỷ lệ nhân sự theo phòng ban</div>
          <Donut series={deptShare} />
        </div>

        <div className="card listCard card-12 md-card-6 lg-card-6">
          <div className="title">Tỷ lệ độ tuổi lao động</div>
          <HBar items={ageBands} />
        </div>
      </div>

      {/* Modal CHUNG cho "Xem tất cả" */}
      <Modal
        open={showAll}
        onClose={() => setShowAll(false)}
        title={`Hợp đồng sắp hết hạn (${expiringContracts.length})`}
        size="lg"
      >
        {/* wrapper + scroll để sticky header hoạt động */}
        <div data-autofocus className="vg-table-wrap vg-scroll">
          <table className="vg-table vg-cozy vg-grid vg-sticky">
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Phòng/Bộ phận</th>
                <th>Ngày hết hạn</th>
                <th className="vg-center">Còn lại</th>
              </tr>
            </thead>
            <tbody>
              {expiringContracts.map((x, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{x.name}</div>
                    {x.code && (
                      <div style={{ color: "#6b7280", fontSize: 12 }}>
                        Mã NV: {x.code}
                      </div>
                    )}
                  </td>
                  <td>{x.dept}</td>
                  <td>{x.due}</td>
                  <td className="vg-center">
                    <DaysTag daysLeft={x.daysLeft} />
                  </td>
                </tr>
              ))}
              {expiringContracts.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign:"center", color:"#6b7280", padding:16 }}>
                    Không có hợp đồng sắp hết hạn.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:12 }}>
          <button className="btn btn-primary" onClick={() => setShowAll(false)}>
            Đóng
          </button>
        </div>
      </Modal>
    </div>
  );
}

function DaysTag({ daysLeft }) {
  const sev = daysLeft <= 10 ? "danger" : daysLeft <= 20 ? "warning" : "info";
  const styleMap = {
    danger: { color: "#b91c1c", bg: "#fee2e2", bd: "#fecaca" },
    warning:{ color: "#92400e", bg: "#fef3c7", bd: "#fde68a" },
    info:   { color: "#0c4a6e", bg: "#e0f2fe", bd: "#bae6fd" },
  };
  const s = styleMap[sev];
  return (
    <span
      className={`tag ${sev}`}
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 12,
        lineHeight: "18px",
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.bd}`,
      }}
    >
      Còn {daysLeft} ngày
    </span>
  );
}
