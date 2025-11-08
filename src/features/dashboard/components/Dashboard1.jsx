// src/views/dashboard/Dashboard1.jsx
import React, { useState } from "react";
import "../../../styles/Dashboard1.css";
import { FaUsers, FaUserPlus, FaUserTimes } from "react-icons/fa";

/* ==== Chart.js (cho cột kép) ==== */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/* =========================
 * MOCK DATA (cứng)
 * ========================= */
const KPIs = { totalEmployees: 128, hiredThisMonth: 6, leftThisMonth: 2, totaleEmploy: 126 };

const deptShare = [
  { label: "Sản xuất", value: 66 },
  { label: "Kinh doanh", value: 36 },
  { label: "Văn phòng", value: 26 },
];

const monthly = [
  { m: "T1", hire: 15, leave: 1 },
  { m: "T2", hire: 1, leave: 1 },
  { m: "T3", hire: 20, leave: 1 },
  { m: "T4", hire: 4, leave: 3 },
  { m: "T5", hire: 2, leave: 2 },
  { m: "T6", hire: 2, leave: 1 },
  { m: "T7", hire: 1, leave: 1 },
  { m: "T8", hire: 1, leave: 0 },
  { m: "T9", hire: 1, leave: 0 },
  { m: "T10", hire: 2, leave: 1 },
  { m: "T11", hire: 4, leave: 3 },
  { m: "T12", hire: 0, leave: 0 },
];

const expiringContracts = [
  { name: "Nguyễn Văn A", dept: "Sản xuất", due: "15/11/2025", daysLeft: 10 },
  { name: "Trần Thị B", dept: "Kinh doanh", due: "28/11/2025", daysLeft: 23 },
  { name: "Lê Văn C", dept: "Văn phòng", due: "05/12/2025", daysLeft: 30 },
  { name: "Phạm Thị D", dept: "Sản xuất", due: "08/12/2025", daysLeft: 33 },
];

const ageBands = [
  { label: "18–25", value: 23.9 },
  { label: "26–35", value: 39.0 },
  { label: "36–45", value: 19.3 },
  { label: "46–55", value: 12.1 },
  { label: "56–60", value: 5.7 },
];

/* =========================
 * Donut
 * ========================= */
const Donut = ({ series }) => {
  const total = series.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const r = 54, sw = 18, C = 2 * Math.PI * r;
  const percentFor = (v) => Math.round((v / (total || 1)) * 100);

  return (
    <div className="donutWrap">
      <svg viewBox="0 0 160 160" className="donut" aria-hidden>
        <circle cx="80" cy="80" r={r} className="donutBase" strokeWidth={sw} fill="none" />
        {series.map((s, i) => {
          const frac = s.value / (total || 1);
          const dash = `${C * frac} ${C * (1 - frac)}`;
          const rot = (acc / (total || 1)) * 360;
          acc += s.value;
          return (
            <circle
              key={i}
              cx="80" cy="80" r={r}
              strokeWidth={sw} fill="none"
              strokeDasharray={dash}
              transform={`rotate(${rot} 80 80)`}
              className={`seg seg-${i}`}
            />
          );
        })}
        <text x="80" y="74" textAnchor="middle" dominantBaseline="middle" className="donutText" style={{ fontSize: 18 }}>
          {total}
        </text>
        <text x="80" y="96" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 11, fill: 'var(--muted)' }}>
          nhân sự
        </text>
      </svg>
      <div className="legend">
        {series.map((x, i) => (
          <div key={i} className="litem">
            <span className={`dot seg-${i}`} />
            {x.label} – {percentFor(x.value)}%
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================
 * Cột kép Chart.js
 * ========================= */
const DualColumns = ({ items }) => {
  const styles = getComputedStyle(document.documentElement);
  const hireColor  = styles.getPropertyValue("--hire")?.trim()  || "#4c7dff";
  const leaveColor = styles.getPropertyValue("--leave")?.trim() || "#ef476f";

  const labels = items.map(i => i.m);
  const maxY = Math.max(...items.flatMap(i => [i.hire, i.leave]), 1);

  const CATEGORY_PERCENT = 0.55;
  const BAR_PERCENT      = 0.75;
  const BAR_THICK        = 15;

  const data = {
    labels,
    datasets: [
      { label: "Tuyển mới", data: items.map(i => i.hire), backgroundColor: hireColor,  borderColor: hireColor,  barThickness: BAR_THICK, categoryPercentage: CATEGORY_PERCENT, barPercentage: BAR_PERCENT },
      { label: "Nghỉ việc", data: items.map(i => i.leave), backgroundColor: leaveColor, borderColor: leaveColor, barThickness: BAR_THICK, categoryPercentage: CATEGORY_PERCENT, barPercentage: BAR_PERCENT },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 12, right: 8, bottom: 8, left: 8 } },
    plugins: {
      legend: { position: "bottom", labels: { usePointStyle: true, pointStyle: "rect", boxWidth: 10 } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6b7280", font: { size: 11 }, padding: 8 }, offset: true },
      y: { beginAtZero: true, grid: { color: "#eef0f3" }, ticks: { color: "#9ca3af", stepSize: 1, precision: 0 }, suggestedMax: maxY + 1 },
    },
  };

  return (
    <div className="chartContainer">
      <Bar data={data} options={options} />
    </div>
  );
};

/* =========================
 * HBar (tuổi)
 * ========================= */
const HBar = ({ items }) => {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="hbars">
      {items.map((it, i) => (
        <div className="hrow" key={i}>
          <span className="hlabel">{it.label}</span>
          <div className="htrack">
            <div className={`hfill seg-${i % 6}`} style={{ width: `${(it.value / max) * 100}%` }} />
            <span className="hval">{it.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* =========================
 * DASHBOARD
 * ========================= */
export default function Dashboard1() {
  // ✅ Hooks phải nằm trong component
  const [isEditing, setIsEditing] = useState(false);
  const [monthValue, setMonthValue] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [year, month] = monthValue.split("-");
  const formattedText = `Tháng ${parseInt(month, 10)} năm ${year}`;

  return (
    <div className="hrdash grid-hr">

      {/* Hàng 1: Tháng/Năm tiếng Việt (click để chỉnh) */}
      <div className="month-picker">
        {!isEditing ? (
          <span className="month-text" onClick={() => setIsEditing(true)}>
            🗓️ {formattedText}
          </span>
        ) : (
          <div className="month-edit">
            <input
              type="month"
              value={monthValue}
              onChange={(e) => setMonthValue(e.target.value)}
            />
            <button onClick={() => setIsEditing(false)}>OK</button>
          </div>
        )}
      </div>

      {/* Hàng 2: KPI */}
      <div className="card kpi">
        <div className="kpiIcon">
          <FaUsers className="kpiIco" />
        </div>
        <div>
          <div className="kpiLabel">Tổng nhân sự</div>
          <div className="kpiNumber">{KPIs.totalEmployees}</div>
        </div>
      </div>

      <div className="card kpi">
        <div className="kpiIcon qq">
          <FaUsers className="kpiIco qq" />
        </div>
        <div>
          <div className="kpiLabel">Nhân sự hiện hữu</div>
          <div className="kpiNumber">{KPIs.totaleEmploy}</div>
        </div>
      </div>

      <div className="card kpi">
        <div className="kpiIcon chart">
          <FaUserPlus className="kpiIco hire" />
        </div>
        <div>
          <div className="kpiLabel">Nhân sự mới (Tháng)</div>
          <div className="kpiNumber">{KPIs.hiredThisMonth}</div>
        </div>
      </div>

      <div className="card kpi">
        <div className="kpiIcon warn">
          <FaUserTimes className="kpiIco leave" />
        </div>
        <div>
          <div className="kpiLabel">Nhân sự nghỉ việc (Tháng)</div>
          <div className="kpiNumber">{KPIs.leftThisMonth}</div>
        </div>
      </div>

      {/* Hàng 3: 2 ô lớn */}
      <div className="card bigCard">
        <div className="cardHead">
          <div className="title">Hợp đồng sắp hết hạn</div>
          <button className="btn link" onClick={() => alert("Đi tới danh sách hợp đồng hết hạn")}>
            Xem tất cả
          </button>
        </div>

        <ul className="alertList">
          {expiringContracts.map((x, i) => (
            <li
              key={i}
              onClick={() => alert(`Xem hợp đồng của ${x.name}`)}
              className={`alertItem clickable ${
                x.daysLeft <= 10 ? "danger" : x.daysLeft <= 20 ? "warning" : "info"
              }`}
            >
              <div className="aTop">
                <strong className="aName">{x.name}</strong>
                <span className="aDue">{x.due}</span>
              </div>
              <div className="aBot">
                <span className="aDept">{x.dept}</span>
                <span className="aDays">Còn {x.daysLeft} ngày</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card bigCard">
        <div className="title">Tuyển dụng & Nghỉ việc theo tháng</div>
        <DualColumns items={monthly} />
      </div>

      {/* Hàng 4: 2 ô nửa */}
      <div className="card bigHalf">
        <div className="title">Tỷ lệ nhân sự theo phòng ban</div>
        <Donut series={deptShare} />
      </div>

      <div className="card listCard bigHalf">
        <div className="title">Tỷ lệ độ tuổi lao động</div>
        <HBar items={ageBands} />
      </div>
    </div>
  );
}
