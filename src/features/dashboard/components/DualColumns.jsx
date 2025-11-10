import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import UiSelect from "../../../components/common/Select"; // <-- đường dẫn tới UiSelect của bạn

export default function HireLeaveChart({ dataByYear }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const years = Object.keys(dataByYear); // ["2023","2024",...]
  const [year, setYear] = useState(years[0]); // UiSelect dùng string là hợp lý

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const months = dataByYear[year].map((x) => x.m); // ["T1","T2",...]
    const hires = dataByYear[year].map((x) => x.hire);
    const leaves = dataByYear[year].map((x) => x.leave);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Tuyển dụng",
            data: hires,
            backgroundColor: "rgba(76,125,255,.9)",
            borderRadius: 6,
          },
          {
            label: "Nghỉ việc",
            data: leaves,
            backgroundColor: "rgba(239,71,111,.9)",
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y", // biểu đồ ngang
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
        plugins: {
          legend: { position: "top" },
          tooltip: {
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}` },
          },
        },
      },
    });
  }, [year, dataByYear]);

  const yearOptions = years.map((y) => ({ value: y, label: String(y) }));

  return (
    <div>
      <div
        className="cardHead"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="title">Tuyển dụng & Nghỉ việc theo tháng</div>

        {/* UiSelect thay cho <select> */}
        <UiSelect
          value={year}
          onChange={setYear} // UiSelect trả về string -> khớp với state year
          options={yearOptions}
          className="sm" // cao ~32px (tuỳ CSS của bạn)
          align="right" // menu canh phải theo nút (tuỳ gu)
        />
      </div>

      <div style={{ height: "400px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
