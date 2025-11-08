// src/views/dashboard/components/HireLeaveChart.jsx
import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function HireLeaveChart({ dataByYear }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const years = Object.keys(dataByYear);
  const [year, setYear] = useState(years[0]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) chartRef.current.destroy();

    const months = dataByYear[year].map((x) => x.m); // ["T1","T2",...]
    const hires = dataByYear[year].map((x) => x.hire); // data chiều ngang
    const leaves = dataByYear[year].map((x) => x.leave);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Tuyển dụng",
            data: hires,
            backgroundColor: "rgba(76, 125, 255, 0.9)",
            borderRadius: 6,
          },
          {
            label: "Nghỉ việc",
            data: leaves,
            backgroundColor: "rgba(239, 71, 111, 0.9)",
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y", // ✅ chuyển trục X ↔ Y (biểu đồ nằm ngang)
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0 } },
        },
        plugins: {
          legend: { position: "top" },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
            },
          },
        },
      },
    });
  }, [year, dataByYear]);

  return (
    <div>
      <div
        className="cardHead"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="title">Tuyển dụng & Nghỉ việc theo tháng </div>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 6 }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div style={{ height: "400px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
