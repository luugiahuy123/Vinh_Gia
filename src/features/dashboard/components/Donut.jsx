import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto"; // auto register ArcElement/Legend/Tooltip

export default function Donut({ series = [], excludeLabels = [] }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Lọc dữ liệu theo excludeLabels
  const dataSource = useMemo(() => {
    const excl = new Set(
      excludeLabels.map((s) => (s || "").trim().toLowerCase())
    );
    return (series || []).filter(
      (x) => !excl.has((x.label || "").trim().toLowerCase())
    );
  }, [series, excludeLabels]);

  const total = useMemo(
    () => dataSource.reduce((sum, x) => sum + Number(x.value || 0), 0),
    [dataSource]
  );

  // Chuẩn bị labels, values, màu
  const { labels, values, colors } = useMemo(() => {
    const labels = dataSource.map((x) => x.label);
    const values = dataSource.map((x) => Number(x.value || 0));

    // Chart.js không hiểu var(--*), ta đọc từ CSS:
    const css = getComputedStyle(document.documentElement);
    const pick = (name, fb) => (css.getPropertyValue(name) || "").trim() || fb;

    const palette = [
      pick("--seg0", "#c06252"),
      pick("--seg1", "#ffd166"),
      pick("--seg2", "#06d6a0"),
      pick("--seg3", "#118ab2"),
      pick("--seg4", "#ef476f"),
      pick("--seg5", "#8338ec"),
      pick("--brand-2", "#0e6481"),
      pick("--hire", "#4c7dff"),
      pick("--brand", "#c06252"),
    ];
    const colors = values.map((_, i) => palette[i % palette.length]);

    return { labels, values, colors };
  }, [dataSource]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Destroy chart cũ nếu có
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Plugin vẽ tổng ở giữa
    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const x = (chartArea.left + chartArea.right) / 2;
        const y = (chartArea.top + chartArea.bottom) / 2;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // số lớn
        ctx.fillStyle =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--ink")
            ?.trim() || "#1f2937";
        ctx.font =
          "700 30px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
        ctx.fillText(String(total), x, y - 6);
        // nhãn nhỏ
        ctx.fillStyle =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--muted")
            ?.trim() || "#6b7280";
        ctx.font =
          "12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
        ctx.fillText("nhân sự", x, y + 14);
        ctx.restore();
      },
    };

    // Tạo chart
    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            borderColor: "#fff",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: "rectRounded",
              color: "#374151",
              font: { size: 12 },
              padding: 12,
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const label = ctx.label ?? "";
                const val = ctx.parsed ?? 0;
                const pct = total ? ((val / total) * 100).toFixed(1) : "0.0";
                return `${label}: ${val} (${pct}%)`;
              },
            },
          },
        },
      },
      plugins: [centerTextPlugin],
    });

    // Cleanup
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [labels, values, colors, total]);

  return (
    <div
      className="donutWrap"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          height: 280,
          margin: "0 auto",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
