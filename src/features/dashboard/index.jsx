// src/features/dashboard/index.jsx
import { useState } from "react";
import "../../styles/Dashboard1.css";

// Components
import MonthPicker from "./components/MonthPicker";
import KpiCard from "./components/KpiCard";
import ExpiringList from "./components/ExpiringList";
import Donut from "./components/Donut";
import DualColumns from "./components/DualColumns"; // đây là component biểu đồ của bạn
import HBar from "./components/HBar";

/* ====== MOCK DATA ====== */
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

/* --- thêm định nghĩa monthly ở đây --- */
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

/* guard: nếu monthly undefined thì dùng mảng rỗng */
const dataByYear = {
  [currentYear]: monthly || [],
};

const expiringContracts = [
  { name: "Nguyễn Văn A", dept: "Sản xuất", due: "15/11/2025", daysLeft: 10 },
  { name: "Trần Thị B", dept: "Kinh doanh", due: "28/11/2025", daysLeft: 23 },
  { name: "Lê Văn C", dept: "Văn phòng", due: "05/12/2025", daysLeft: 30 },
  { name: "Phạm Thị D", dept: "Sản xuất", due: "08/12/2025", daysLeft: 33 },
  { name: "Phạm Văn E", dept: "Sản xuất", due: "30/12/2025", daysLeft: 45 },
];

const ageBands = [
  { label: "18–25", value: 23.9 },
  { label: "26–35", value: 39.0 },
  { label: "36–45", value: 19.3 },
  { label: "46–55", value: 12.1 },
  { label: "56–60", value: 5.7 },
];

export default function Dashboard() {
  const [monthValue, setMonthValue] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  return (
    <div>
      {/* Hàng 1: chọn tháng (bên trái) */}
      <MonthPicker value={monthValue} onChange={setMonthValue} />

      <div className="hrdash grid-hr">
        {/* Hàng 2: KPI */}
        <KpiCard
          icon="users"
          label="Tổng nhân sự"
          value={128}
          trend={[100, 105, 110, 112, 115, 118, 120, 123, 125, 126, 127, 128]}
        />{" "}
        <KpiCard
          trend={[3, 5, 6, 4, 8, 7, 9, 11, 10, 8, 6, 7]}
          icon="users"
          label="Nhân sự hiện hữu"
          value={KPIs.totaleEmploy}
          accent="qq"
        />
        <KpiCard
          icon="hire"
          label="Nhân sự mới (Tháng)"
          value={6}
          trend={[2, 3, 4, 5, 7, 6, 5, 8, 9, 6, 7, 6]}
          accent="chart"

        />
        <KpiCard
          icon="leave"
          label="Nhân sự nghỉ việc (Tháng)"
          value={2}
          trend={[1, 1, 2, 0, 1, 2, 1, 2, 3, 1, 1, 2]}
          accent="warn"

        />
        {/* Hàng 3: 2 ô lớn */}
        <div className="card bigCard">
          <div className="cardHead">
            <div className="title">Hợp đồng sắp hết hạn</div>
            <button
              className="btn link"
              onClick={() => alert("Đi tới danh sách hợp đồng hết hạn")}
            >
              Xem tất cả
            </button>
          </div>
          <ExpiringList items={expiringContracts} />
        </div>
        <div className="card bigCard">
          <DualColumns dataByYear={dataByYear} />
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
    </div>
  );
}
