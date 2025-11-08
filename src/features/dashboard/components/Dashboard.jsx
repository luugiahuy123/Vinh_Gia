// Dashboard.js
import React from "react";

/* =========================
 * DỮ LIỆU CỨNG (mock)
 * ========================= */
const KPIs = {
  totalEmployees: 1470,
  totalAttrition: 237,
  firstYearAttrition: 16,
  gender: { male: 150, female: 87 },
};

export const monthlyAttrition = [
  { m: "T4", v: 12 }, { m: "T5", v: 18 }, { m: "T6", v: 15 }, { m: "T7", v: 22 },
  { m: "T8", v: 19 }, { m: "T9", v: 17 }, { m: "T10", v: 24 }, { m: "T11", v: 20 },
  { m: "T12", v: 21 }, { m: "T1", v: 25 }, { m: "T2", v: 16 }, { m: "T3", v: 28 },
];
const workLifeImpact = [
  { label: "Tác động thấp", value: 10.5 },
  { label: "Tác động trung bình", value: 53.6 },
  { label: "Tác động cao", value: 24.9 },
  { label: "Tác động nghiêm trọng", value: 11.4 },
];

const commute = [
  { label: "0–5 km", value: 48.3 },
  { label: "6–10 km", value: 27.9 },
  { label: "11–20 km", value: 17.9 },
  { label: "21–30 km", value: 5.9 },
];

const travel = [
  { label: "Không đi công tác", value: 156 },
  { label: "Đi công tác thỉnh thoảng", value: 12 },
  { label: "Đi công tác thường xuyên", value: 8 },
];

const durationWithMgr = [
  { label: "0–3 năm", value: 116 },
  { label: "4–7 năm", value: 59 },
  { label: "8–10 năm", value: 31 },
  { label: "11–15 năm", value: 13 },
];

const incomeImpact = [
  { label: "0–10k", value: 42 },
  { label: "10–20k", value: 28 },
  { label: "20–30k", value: 16 },
  { label: "30–40k", value: 7 },
  { label: "40k+", value: 3 },
];

const ageBands = [
  { label: "18–25", value: 18.9 },
  { label: "26–35", value: 49.0 },
  { label: "36–45", value: 16.3 },
  { label: "46–55", value: 10.1 },
  { label: "56–60", value: 5.7 },
];

/* === Dữ liệu cứng cho biểu đồ đường (30 ngày) === */
const deptWise = [
  {
    dept: "Nhân sự",
    role: "Trưởng phòng nhân sự",
    tech: 5,
    other: 2,
    medical: 2,
    marketing: 2,
    life: 3,
    it: 7,
    total: 21,
  },
  {
    dept: "Nghiên cứu & Phát triển",
    role: "Nhân viên chăm sóc sức khỏe",
    tech: 6,
    other: 1,
    medical: 9,
    marketing: 2,
    life: 7,
    it: 33,
    total: 69,
  },
  {
    dept: "Nghiên cứu & Phát triển",
    role: "Kỹ thuật viên phòng thí nghiệm",
    tech: 11,
    other: 5,
    medical: 17,
    marketing: 0,
    life: 33,
    it: 9,
    total: 75,
  },
  {
    dept: "Nghiên cứu & Phát triển",
    role: "Quản lý R&D",
    tech: 4,
    other: 2,
    medical: 1,
    marketing: 1,
    life: 1,
    it: 0,
    total: 8,
  },
  {
    dept: "Sản xuất",
    role: "Giám đốc sản xuất",
    tech: 1,
    other: 0,
    medical: 0,
    marketing: 0,
    life: 1,
    it: 6,
    total: 8,
  },
];


/* =========================
 * TIỆN ÍCH VẼ CHART BẰNG DIV/SVG
 * ========================= */
const MiniBar = ({ items, max = Math.max(...Array.from(items, i => i.v ?? i.value)), height = 90 }) => (
  <div className="bars">
    {items.map((it, idx) => {
      const val = it.v ?? it.value;
      const h = Math.round((val / max) * height);
      return (
        <div key={idx} className="barWrap">
          <div className="bar" style={{ height: h }} />
          {"m" in it ? <span className="barLbl">{it.m}</span> : null}
        </div>
      );
    })}
  </div>
);

const Donut = ({ series }) => {
  const total = series.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const radius = 44, stroke = 16, C = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 120 120" className="donut">
      <circle cx="60" cy="60" r={radius} className="donutBase" strokeWidth={stroke} fill="none" />
      {series.map((s, i) => {
        const frac = s.value / total;
        const dash = `${C * frac} ${C * (1 - frac)}`;
        const rot = (acc / total) * 360;
        acc += s.value;
        return (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={dash}
            transform={`rotate(${rot} 60 60)`}
            className={`seg seg-${i}`}
          />
        );
      })}
      <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" className="donutText">
        {Math.round((series[2]?.value ?? 0) + (series[3]?.value ?? 0))}%
      </text>
    </svg>
  );
};

const HBar = ({ items, max = Math.max(...items.map(i => i.value)) }) => (
  <div className="hbars">
    {items.map((it, i) => (
      <div className="hrow" key={i}>
        <span className="hlabel">{it.label}</span>
        <div className="htrack">
          <div className="hfill" style={{ width: `${(it.value / max) * 100}%` }} />
          <span className="hval">{it.value}</span>
        </div>
      </div>
    ))}
  </div>
);

const Columns = ({ items, max = Math.max(...items.map(i => i.value)) }) => (
  <div className="columns">
    {items.map((it, i) => (
      <div className="col" key={i}>
        <div className="colBar" style={{ height: `${(it.value / max) * 100}%` }} />
        <span className="colLbl">{it.label}</span>
      </div>
    ))}
  </div>
);

/* ==== Biểu đồ đường mượt (SVG + Bezier) ==== */
function SmoothLineChart({ data, height = 220, padding = 28 }) {
  const { labels, series } = data; // series: [{name,color,values,unit}]
  const W = 820;
  const H = height;
  const maxY = Math.max(...series.flatMap(s => s.values), 1);
  const minY = 0;
  const innerW = W - padding * 2;
  const innerH = H - padding * 2;
  const stepX = innerW / (labels.length - 1);

  const yScale = v => padding + innerH - (v - minY) * innerH / (maxY - minY);
  const xScale = i => padding + i * stepX;

  const buildPath = values => {
    const pts = values.map((v, i) => [xScale(i), yScale(v)]);
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };

  const pickLabels = values => {
    const maxIdx = values.indexOf(Math.max(...values));
    const minIdx = values.indexOf(Math.min(...values));
    const lastIdx = values.length - 1;
    return Array.from(new Set([maxIdx, minIdx, lastIdx]));
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="lineSvg">
      {/* lưới ngang nhẹ */}
      <g className="grid">
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padding + innerH * (1 - t);
          return <line key={i} x1={padding} y1={y} x2={W - padding} y2={y} />;
        })}
      </g>

      {/* đường + bóng */}
      {series.map((s, idx) => (
        <g key={idx}>
          <path d={buildPath(s.values)} className="line" style={{ stroke: s.color }} />
          <path d={buildPath(s.values)} className="lineShadow" style={{ stroke: s.color }} />
          {pickLabels(s.values).map(i => (
            <g key={`${idx}-${i}`} className="pointGroup" transform={`translate(${xScale(i)},${yScale(s.values[i])})`}>
              <circle r="4" className="pt" style={{ stroke: s.color }} />
              <g transform={`translate(${i > labels.length / 2 ? -90 : 10}, -22)`}>
                <rect className="tag" rx="8" ry="8" />
                <text className="tagText">
                  {s.values[i].toLocaleString()} {s.unit}
                </text>
                <path d={`M ${i > labels.length/2 ? 90 : 0} 16 l ${i > labels.length/2 ? 8 : -8} 8`} className="tagArrow" />
              </g>
            </g>
          ))}
        </g>
      ))}

      {/* nhãn ngày dưới trục */}
      <g className="xlabels">
        {labels.map((d, i) => (
          <text key={i} x={xScale(i)} y={H - 6} textAnchor="middle">{String(d).padStart(2, "0")}</text>
        ))}
      </g>
    </svg>
  );
}

/* =========================
 * DASHBOARD
 * ========================= */
export default function Dashboard() {
  return (
    <div className="hrdash">
      {/* Hàng 1: KPI + xu hướng tháng */}
      <div className="card kpi">
        <div className="kpiIcon" />
        <div>
          <div className="kpiLabel">Tổng nhân sự</div>
          <div className="kpiNumber">{KPIs.totalEmployees}</div>
        </div>
      </div>

      <div className="card kpi">
        <div className="kpiIcon chart" />
        <div>
          <div className="kpiLabel">Tuyển Mới ( Tháng 11 )</div>
          <div className="kpiNumber">{KPIs.totalAttrition}</div>
        </div>
      </div>

      <div className="card kpi">
        <div>
          <div className="kpiLabel">Nghỉ Việc ( Tháng 11 )</div>
          <div className="kpiBig">{KPIs.firstYearAttrition}</div>
        </div>
      </div>

      {/* <div className="card monthly">
        <div className="title">Xu hướng nghỉ việc theo tháng</div>
        <MiniBar items={monthlyAttrition} />
      </div> */}

      {/* Hàng 2: Donut + Line */}
      <div className="card donutCard">
        <div className="title">Ảnh hưởng cân bằng công việc - cuộc sống</div>
        <Donut series={workLifeImpact} />
        <div className="legend">
          {workLifeImpact.map((x, i) => (
            <div key={i} className="litem">
              <span className={`dot seg-${i}`}></span>{x.label} – {x.value}%
            </div>
          ))}
        </div>
      </div>

      <div className="card tableCard">
  <div className="title">Phân tích tỷ lệ theo phòng ban</div>
  <div className="tableWrap">
    <table>
      <thead>
        <tr>
          <th>Phòng ban</th>
          <th>Chức vụ</th>
          <th>Kỹ thuật</th>
          <th>Khác</th>
          <th>Y tế</th>
          <th>Marketing</th>
          <th>Khoa học đời sống</th>
          <th>CNTT</th>
          <th>Tổng cộng</th>
        </tr>
      </thead>
      <tbody>
        {deptWise.map((r, i) => (
          <tr key={i}>
            <td>{r.dept}</td>
            <td>{r.role}</td>
            <td>{String(r.tech).padStart(2, "0")}</td>
            <td>{String(r.other).padStart(2, "0")}</td>
            <td>{String(r.medical).padStart(2, "0")}</td>
            <td>{String(r.marketing).padStart(2, "0")}</td>
            <td>{String(r.life).padStart(2, "0")}</td>
            <td>{String(r.it).padStart(2, "0")}</td>
            <td className="bold">{String(r.total).padStart(2, "0")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Hàng 3 */}
      <div className="card listCard">
        <div className="title">Khoảng cách đi làm </div>
        <HBar items={commute.map(x => ({ label: x.label, value: x.value }))} />
      </div>

      <div className="card pieCard">
        <div className="title">Công tác</div>
        <svg viewBox="0 0 120 120" className="pie">
          {(() => {
            const total = travel.reduce((s, x) => s + x.value, 0);
            let acc = 0;
            return travel.map((s, i) => {
              const frac = s.value / total;
              const start = acc / total * 2 * Math.PI;
              const end = (acc + s.value) / total * 2 * Math.PI;
              acc += s.value;
              const x1 = 60 + 50 * Math.cos(start), y1 = 60 + 50 * Math.sin(start);
              const x2 = 60 + 50 * Math.cos(end),   y2 = 60 + 50 * Math.sin(end);
              const large = end - start > Math.PI ? 1 : 0;
              const d = `M60,60 L${x1},${y1} A50,50 0 ${large} 1 ${x2},${y2} z`;
              return <path key={i} d={d} className={`seg seg-${i}`} />;
            });
          })()}
        </svg>
        <div className="legend">
          {travel.map((x, i) => (
            <div key={i} className="litem">
              <span className={`dot seg-${i}`}></span>{x.label} – {x.value}
            </div>
          ))}
        </div>
      </div>

      <div className="card listCard">
        <div className="title">Thâm niên với quản lý hiện tại & Nghỉ việc</div>
        <HBar items={durationWithMgr} />
      </div>

      {/* Hàng 4 */}
      {/* <div className="card columnsCard">
        <div className="title">Ảnh hưởng của thu nhập đến nghỉ việc</div>
        <Columns items={incomeImpact} />
      </div>

      <div className="card bigNote">
        <div className="note">
          <div className="noteQ">Tuổi có thật sự ảnh hưởng đến nghỉ việc?</div>
          <div className="notePercent">49%</div>
          <div className="noteTxt">Tỷ lệ nghỉ việc cao ở nhóm 26–35</div>
        </div>
      </div>

      <div className="card listCard">
        <div className="title">Nhóm tuổi & Nghỉ việc</div>
        <HBar items={ageBands} />
      </div> */}
    </div>
  );
}
