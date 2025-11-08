import React, { useEffect } from "react";
import "../../hr/hr.css";

export default function RowContextMenu({ open, x, y, onEdit, onDelete, onClose }) {
  useEffect(() => {
    if (!open) return;
    const close = () => onClose?.();
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    setTimeout(() => document.addEventListener("click", close), 0);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="context-menu fixed-menu"
      style={{ position: "fixed", left: x, top: y, minWidth: 180 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="context-item edit" onClick={onEdit}>Sửa</button>
      <button className="context-item delete" onClick={onDelete}>Xoá</button>
    </div>
  );
}
