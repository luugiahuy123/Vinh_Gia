import { useEffect, useMemo, useState } from "react";
import "../../../styles/selfService/SelfService.css"; // ✅ Ensure this file exists exactly at this path

/**
 * SelfHome.jsx — build-safe version (static CSS import)
 *
 * Changes from previous canvas:
 *  - Removed the runtime CSS loader + FALLBACK_CSS to fix ESLint `no-undef`.
 *  - Keep a single, explicit static CSS import to your stylesheet above.
 *  - Renamed component to `SelfHome` to match your file name & import from Layout.jsx.
 */

export default function SelfHome() {
  /* ----------------------------------- State ----------------------------------- */
  // const base = (typeof import.meta !== "undefined" && import.meta?.env?.BASE_URL) || "/";
  //   useRuntimeCss(`${base}SelfService.css`);
  
    /* ----------------------------------- State ----------------------------------- */
    const user = { id: 7, username: "Nguyễn Văn A", roles: ["employee", "manager"] };
    const isManager = user.roles.includes("manager");
    const now = new Date();
    const yyyyMmNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const [month, setMonth] = useState(yyyyMmNow);
  
    /* ---------------------------------- Mock data -------------------------------- */
    const overview = useMemo(
      () => ({
        leaveBalance: 6,
        otHours: 12,
        latestPayslipMonth: "2025-10",
        nextEvents: [{ title: "Team building", date: "2025-11-15" }],
      }),
      []
    );
  
    const attendance = [
      { d: "Mon", date: "2025-11-10", status: "Present", in: "08:03", out: "17:12" },
      { d: "Tue", date: "2025-11-11", status: "Present", in: "08:05", out: "17:18" },
      { d: "Wed", date: "2025-11-12", status: "Late", in: "08:21", out: "17:10" },
      { d: "Thu", date: "2025-11-13", status: "Leave", in: "-", out: "-" },
      { d: "Fri", date: "2025-11-14", status: "Present", in: "08:02", out: "17:03" },
    ];
  
    const myRequests = [
      { id: 101, type: "Leave", createdAt: "2025-11-02", status: "Approved", approver: "Trưởng phòng" },
      { id: 102, type: "OT", createdAt: "2025-11-07", status: "Pending", approver: "Trưởng ca" },
      { id: 103, type: "WFH", createdAt: "2025-11-09", status: "Rejected", approver: "Manager" },
    ];
  
    const myTraining = [
      { id: 1, course: "An toàn lao động", status: "Completed", score: 92 },
      { id: 2, course: "5S xưởng sản xuất", status: "In progress", score: null },
    ];
  
    const notifications = [
      { id: "n1", title: "Cập nhật quy định nghỉ bù", time: "2h trước" },
      { id: "n2", title: "Mời đăng ký khoá 5S", time: "Hôm qua" },
    ];
  
    const actions = [
      { key: "leave", label: "Xin nghỉ phép", onClick: () => alert("Open Leave Form (mock)") },
      { key: "ot", label: "Đăng ký OT", onClick: () => alert("Open OT Form (mock)") },
      { key: "trip", label: "Đăng ký công tác", onClick: () => alert("Open Business Trip Form (mock)") },
      { key: "wfh", label: "Làm việc từ xa", onClick: () => alert("Open WFH Form (mock)") },
      { key: "profile", label: "Cập nhật hồ sơ", onClick: () => alert("Open Profile (mock)") },
      { key: "payslip", label: "Xem phiếu lương", onClick: () => alert("Open Payslip (mock)") },
    ];
  
    const monthOptions = useMemo(() => {
      const yStart = 2023;
      const yEnd = now.getFullYear() + 1;
      const opts = [];
      for (let y = yStart; y <= yEnd; y++) {
        for (let m = 1; m <= 12; m++) {
          opts.push({ value: `${y}-${String(m).padStart(2, "0")}`, text: `${String(m).padStart(2, "0")}/${y}` });
        }
      }
      return opts.reverse();
    }, []);
  
    /* ------------------------------ Runtime tests ------------------------------ */
    useEffect(() => {
      // ✅ Existing tests (do not remove unless clearly wrong)
      console.assert(document.querySelector('.self-home.container'), "[TEST] Root container missing");
      console.assert(document.querySelectorAll('.kpi-card').length === 4, "[TEST] Expect 4 KPI cards");
      console.assert(attendance.length === 5, "[TEST] Attendance should have 5 items (Mon–Fri)");
      console.assert(myRequests.length >= 3, "[TEST] Expect at least 3 requests in mock data");
      console.assert(myTraining.length >= 2, "[TEST] Expect at least 2 training items");
  
      // ➕ New tests
      const cssAttached = !!document.getElementById('self-service-external') || !!document.getElementById('self-service-css');
      console.assert(cssAttached, "[TEST] CSS not attached: ensure /SelfService.css exists OR fallback injected");
  
      const qaBtns = document.querySelectorAll('.quick-btn').length;
      console.assert(qaBtns === 6, `[TEST] Expect 6 quick actions, got ${qaBtns}`);
  
      const reqRows = document.querySelectorAll('table tbody tr').length;
      console.assert(reqRows >= myRequests.length, "[TEST] Request rows should be >= myRequests length");
    }, []);
  
    /* ---------------------------------- Render ---------------------------------- */
    return (
      <div className="self-home container">
        <header className="topbar">
          <div className="greeting">
            <h1>Xin chào, {user.username}</h1>
            <p className="muted">Trang Self Service · Tháng {month.replace("-", "/")}</p>
          </div>
          <div className="top-actions">
            <div className="month-picker">
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {monthOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.text}</option>
                ))}
              </select>
            </div>
          </div>
        </header>
  
        <section className="kpi-strip">
          <KpiCard title="Ngày phép còn lại" value={`${overview.leaveBalance} ngày`} icon="🌿" />
          <KpiCard title="OT tháng này" value={`${overview.otHours} giờ`} icon="⏱" />
          <KpiCard title="Phiếu lương mới" value={overview.latestPayslipMonth.replace("-", "/")} icon="💳" />
          <KpiCard title="Sự kiện sắp tới" value={`${overview.nextEvents[0].title} · ${overview.nextEvents[0].date}`} icon="📅" />
        </section>
  
        <section className="grid-3">
          <aside className="rail left">
            <Card title="Tác vụ nhanh">
              <div className="quick-grid">
                {actions.map((a) => (
                  <button key={a.key} className="quick-btn" onClick={a.onClick}>
                    <span className="ico">⚡</span>
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </Card>
  
            <Card title="Liên kết nhanh">
              <ul className="link-list">
                <li><a href="#">Hồ sơ cá nhân</a></li>
                <li><a href="#">Tài sản được cấp</a></li>
                <li><a href="#">Chính sách & Biểu mẫu</a></li>
              </ul>
            </Card>
  
            <Card title="Tài liệu hữu ích">
              <ul className="doc-list">
                <li>Quy định nghỉ phép (PDF)</li>
                <li>Hướng dẫn chấm công</li>
                <li>Mẫu đề xuất (DOCX)</li>
              </ul>
            </Card>
          </aside>
  
          <main className="center">
            <Card title="Chấm công tuần này">
              <div className="attendance">
                {attendance.map((d) => (
                  <div key={d.date} className={`att-item status-${d.status.toLowerCase()}`}>
                    <div className="att-day">{d.d}</div>
                    <div className="att-time">{d.in} – {d.out}</div>
                    <div className="att-status">{d.status}</div>
                  </div>
                ))}
              </div>
            </Card>
  
            <Card title="Dòng thời gian Nghỉ/OT">
              <div className="timeline">
                <div className="tl-item approved"><div className="dot" /> 02/11 · Nghỉ phép · Approved</div>
                <div className="tl-item pending"><div className="dot" /> 07/11 · OT · Pending</div>
                <div className="tl-item rejected"><div className="dot" /> 09/11 · WFH · Rejected</div>
              </div>
            </Card>
  
            <Card title="Tự đánh giá (KPI)" badge="Mở">
              <div className="eval">
                <p>Hãy tự đánh giá kết quả tháng này.</p>
                <button className="primary" onClick={() => alert("Open Self-Evaluation (mock)")}>Bắt đầu</button>
              </div>
            </Card>
          </main>
  
          <aside className="rail right">
            <Card title="Thông báo">
              <ul className="notif-list">
                {notifications.map((n) => (
                  <li key={n.id}>
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-time">{n.time}</div>
                  </li>
                ))}
              </ul>
            </Card>
  
            <Card title="Lịch công ty">
              <div className="calendar-mini">
                <div className="cal-header">11/2025</div>
                <div className="cal-grid">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <div key={d} className={`cal-cell ${d === 15 ? "has-event" : ""}`}>{d}</div>
                  ))}
                </div>
              </div>
            </Card>
  
            {isManager && (
              <Card title="Phê duyệt (Manager)">
                <ul className="approve-list">
                  <li>Đơn OT #102 · Pending <button className="link" onClick={() => alert("Approve #102 (mock)")}>Duyệt</button></li>
                  <li>Nghỉ phép #104 · Pending <button className="link" onClick={() => alert("Approve #104 (mock)")}>Duyệt</button></li>
                </ul>
              </Card>
            )}
          </aside>
        </section>
  
        <section className="bottom">
          <Card title="Yêu cầu của tôi">
            <table className="table">
              <thead>
                <tr><th>#</th><th>Loại</th><th>Ngày tạo</th><th>Trạng thái</th><th>Người duyệt</th></tr>
              </thead>
              <tbody>
                {myRequests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td><td>{r.type}</td><td>{r.createdAt}</td>
                    <td><span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span></td>
                    <td>{r.approver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
  
          <Card title="Đào tạo của tôi">
            <table className="table">
              <thead>
                <tr><th>#</th><th>Khoá học</th><th>Trạng thái</th><th>Điểm</th></tr>
              </thead>
              <tbody>
                {myTraining.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td><td>{t.course}</td><td>{t.status}</td><td>{t.score ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      </div>
    );
  }
  
  /* -------------------------------- Subcomponents ------------------------------- */
  function KpiCard({ title, value, icon }) {
    return (
      <div className="kpi-card">
        <div className="kpi-ico" aria-hidden>{icon}</div>
        <div className="kpi-meta">
          <div className="title">{title}</div>
          <div className="value">{value}</div>
        </div>
      </div>
    );
  }
  
  function Card({ title, children, badge }) {
    return (
      <div className="card">
        <div className="card-hd">
          <h3>{title}</h3>
          {badge && <span className="chip">{badge}</span>}
        </div>
        <div className="card-bd">{children}</div>
      </div>
    );
  }
