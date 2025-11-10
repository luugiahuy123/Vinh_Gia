import { useState, useCallback } from "react";
import Modal from "../../../components/common/Modal";

export default function ExpiringList({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const sev = useCallback(
    (x) =>
      x.daysLeft <= 10 ? "danger" : x.daysLeft <= 20 ? "warning" : "info",
    []
  );

  const openModal = (item) => {
    setCurrent(item);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <ul className="alertList">
        {items.map((x, i) => (
          <li
            key={i}
            className={`alertItem clickable ${sev(x)}`}
            title="Xem chi tiết"
            onClick={() => openModal(x)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(x);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Xem hợp đồng của ${x.name}`}
          >
            <div className="aTop">
              <strong className="aName">{x.name}</strong>
              <span className="aDue">{x.due}</span>
            </div>
            <div className="aBot">
              <span className="aDept">{x.dept}</span>
              <span className="aDays">Còn {x.daysLeft} ngày</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal cho item được click */}
      <Modal
        open={open}
        onClose={closeModal}
        title="Hợp đồng sắp hết hạn"
        size="sm"
        footer={
          <button className="btn primary" onClick={closeModal}>
            Đóng
          </button>
        }
      >
        {current ? (
          <div data-autofocus>
            <Row label="Nhân viên" value={current.name} />
            <Row label="Phòng/Bộ phận" value={current.dept} />
            <Row label="Ngày hết hạn" value={current.due} />
            <Row
              label="Còn lại"
              value={
                <span className={`tag ${sev(current)}`}>
                  {current.daysLeft} ngày
                </span>
              }
            />
            {current.type && <Row label="Loại HĐ" value={current.type} />}
            {current.code && <Row label="Mã NV" value={current.code} />}
          </div>
        ) : (
          "Không có dữ liệu."
        )}
      </Modal>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: 8,
        padding: "8px 0",
      }}
    >
      <div style={{ color: "#6b7280" }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}
