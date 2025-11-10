import { useMemo } from "react";
import "../../../styles/button/MonthPicker.css"

export default function MonthPicker({
  value, // "YYYY-MM"
  onChange,
  minYear = 2020,
  maxYear, // mặc định: năm hiện tại + 1
}) {
  const now = new Date();
  const _maxYear = maxYear ?? now.getFullYear() + 1;

  const { year, month } = useMemo(() => {
    const [y, m] = (value || "").split("-");
    return {
      year: Number(y) || now.getFullYear(),
      month: Number(m) || now.getMonth() + 1,
    };
  }, [value]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: _maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const setVal = (y, m) => {
    const mm = String(m).padStart(2, "0");
    onChange?.(`${y}-${mm}`);
  };

  return (
    <div
      className="month-picker"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "flex-start",
      }}
    >
      {/* Tháng */}
      <select
        value={month}
        onChange={(e) => setVal(year, Number(e.target.value))}
        aria-label="Tháng"
      >
        {months.map((m) => (
          <option key={m} value={m}>{`Tháng ${m}`}</option>
        ))}
      </select>

      {/* Năm */}
      <select
        value={year}
        onChange={(e) => setVal(Number(e.target.value), month)}
        aria-label="Năm"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
