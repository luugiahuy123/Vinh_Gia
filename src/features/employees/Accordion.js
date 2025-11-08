import React, { useState } from "react";
export default function Accordion({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="emp-acc">
      <button className="emp-acc-head" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`emp-acc-caret ${open ? "open" : ""}`}>▾</span>
      </button>
      {open && <div className="emp-acc-body">{children}</div>}
    </div>
  );
}
