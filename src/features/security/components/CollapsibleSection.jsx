import React, { useState } from "react";

/**
 * CollapsibleSection
 * Props:
 *  - title: string (text của nút)
 *  - defaultOpen?: boolean (mặc định đóng)
 *  - children: nội dung section (bảng, form...)
 */
export default function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <section className="sec-card">
      <div className="sec-card-header">
        <button
          type="button"
          className="sec-toggle"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          <span className="sec-toggle-icon">{open ? "▾" : "▸"}</span>
          <span>{title}</span>
        </button>
      </div>

      {open && <div className="sec-card-body">{children}</div>}
    </section>
  );
}
