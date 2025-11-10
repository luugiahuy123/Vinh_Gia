import { useMemo } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaUserTimes,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "../../../styles/layout/SizeCard.css";

export default function KpiCard({
  icon = "users",
  label,
  value,
  accent,
  trend = [],
  // Desktop ≥1200px: mỗi KPI chiếm 3/12 → 4 cái = đủ 1 hàng
  // MD: 6 cột → span 3 = nửa hàng (2 KPI mỗi hàng)
  // SM: 4 cột → span 4 = full
  // XS: 12 cột → span 12 = full
  gridClass = "card-12 sm-card-4 md-card-3 lg-card-3",
}) {
  const Icon =
    icon === "hire" ? FaUserPlus : icon === "leave" ? FaUserTimes : FaUsers;

  const iconClass =
    icon === "hire"
      ? "kpiIco hire"
      : icon === "leave"
      ? "kpiIco leave"
      : "kpiIco";

  const { diffPct, isUp } = useMemo(() => {
    if (!trend?.length || trend.length < 2) return { diffPct: 0, isUp: null };
    const last = Number(trend[trend.length - 1] ?? 0);
    const prev = Number(trend[trend.length - 2] ?? 0);
    if (prev === 0) return { diffPct: 0, isUp: null };
    const pct = ((last - prev) / prev) * 100;
    return { diffPct: pct, isUp: pct >= 0 };
  }, [trend]);

  return (
    <div className={`card kpi ${gridClass}`}>
      <div className={`kpiIcon ${accent || ""}`}>
        <Icon className={iconClass} />
      </div>

      <div className="kpiBody">
        <div className="kpiLabel">{label}</div>

        <div className="kpiMainRow">
          <div className="kpiNumber">{value}</div>

          {isUp !== null && (
            <div
              className={`kpiDelta ${isUp ? "up" : "down"}`}
              title="Biến động so với tháng trước"
            >
              {isUp ? <FaArrowUp /> : <FaArrowDown />}
              <span>{Math.abs(diffPct).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
