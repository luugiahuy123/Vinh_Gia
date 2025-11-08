import React from "react";
export default function Field({ label, value }) {
  return (
    <div className="emp-field">
      <div className="emp-label">{label}</div>
      <div className="emp-value">{value || "—"}</div>
    </div>
  );
}
