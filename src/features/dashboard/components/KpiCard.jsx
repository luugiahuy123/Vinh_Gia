import { useMemo } from "react";
import { FaUsers, FaUserPlus, FaUserTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function KpiCard({ icon = "users", label, value, accent, trend = [] }) {
  const Icon =
    icon === "hire"  ? FaUserPlus :
    icon === "leave" ? FaUserTimes : FaUsers;

  const iconClass =
    icon === "hire"  ? "kpiIco hire"  :
    icon === "leave" ? "kpiIco leave" : "kpiIco";

  // Tính % thay đổi giữa 2 tháng gần nhất
  const { diffPct, isUp } = useMemo(() => {
    if (!trend?.length || trend.length < 2) return { diffPct: 0, isUp: null };
    const last = Number(trend[trend.length - 1] ?? 0);
    const prev = Number(trend[trend.length - 2] ?? 0);
    if (prev === 0) return { diffPct: 0, isUp: null }; // tránh chia 0
    const pct = ((last - prev) / prev) * 100;
    return { diffPct: pct, isUp: pct >= 0 };
  }, [trend]);

  return (
    <div className="card kpi">
      <div className={`kpiIcon ${accent || ""}`}>
        <Icon className={iconClass} />
      </div>

      <div className="kpiBody">
        <div className="kpiLabel">{label}</div>

        <div className="kpiMainRow">
          <div className="kpiNumber">{value}</div>

          {/* Chỉ còn chỉ số tăng/giảm */}
          {isUp !== null && (
            <div className={`kpiDelta ${isUp ? "up" : "down"}`} title="Biến động so với tháng trước">
              {isUp ? <FaArrowUp /> : <FaArrowDown />}
              <span>{Math.abs(diffPct).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
