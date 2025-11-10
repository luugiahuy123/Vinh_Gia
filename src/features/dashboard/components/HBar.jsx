import { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần dùng
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

// Hàm tiện lấy CSS variable
function cssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return v?.trim() || fallback;
}

export default function HBar({ items = [] }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Xóa chart cũ nếu có
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = items.map((i) => i.label);
    const values = items.map((i) => i.value);
    const palette = Array.from({ length: items.length }, (_, i) =>
      cssVar(`--seg${i % 6}`, ["#c06252","#ffd166","#06d6a0","#118ab2","#ef476f","#8338ec"][i % 6])
    );

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Tỷ lệ (%)",
            data: values,
            backgroundColor: palette,
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: "y", // 🔸 Biểu đồ ngang
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 10 },
        scales: {
          x: {
            beginAtZero: true,
            max: Math.max(100, Math.ceil(Math.max(...values, 0) / 10) * 10),
            ticks: {
              callback: (v) => `${v}%`,
              color: cssVar("--muted", "#6b7280"),
              font: { size: 11 },
            },
            grid: {
              color: cssVar("--line", "#e5e7eb"),
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: cssVar("--ink", "#1f2937"),
              font: { size: 12, weight: "600" },
            },
            grid: { display: false, drawBorder: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: cssVar("--ink", "#1f2937"),
            bodyColor: cssVar("--ink", "#1f2937"),
            borderColor: cssVar("--line", "#e5e7eb"),
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.x}%`,
            },
          },
        },
        animation: { duration: 400 },
      },
    });

    return () => chartRef.current?.destroy();
  }, [items]);

  return (
    <div className="chartContainer">
      <canvas ref={canvasRef} />
    </div>
  );
}
