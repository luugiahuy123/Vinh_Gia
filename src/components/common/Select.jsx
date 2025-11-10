import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../styles/atoms/selects.css";

export default function UiSelect({
  value,
  onChange,
  options = [],          // [{ value:'11', label:'Tháng 11', disabled?:true }]
  placeholder = "Chọn",
  className = "",        // "sm" | "full" | ""
  align = "left",        // "left" | "right" (căn menu theo nút)
}) {
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const [btnW, setBtnW] = useState(0);

  useLayoutEffect(() => {
    if (btnRef.current) setBtnW(btnRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const activeIdx = Math.max(0, options.findIndex(o => String(o.value) === String(value)));
  const move = (dir) => {
    if (!options.length) return;
    const next = ( (hoverIdx >= 0 ? hoverIdx : activeIdx) + dir + options.length ) % options.length;
    if (options[next]?.disabled) return setHoverIdx((next+dir+options.length)%options.length);
    setHoverIdx(next);
  };
  const apply = (idx) => {
    const opt = options[idx];
    if (!opt || opt.disabled) return;
    onChange?.(String(opt.value));
    setOpen(false);
    btnRef.current?.focus();
  };

  const selected = options.find(o => String(o.value) === String(value));
  const label = selected?.label ?? placeholder;

  return (
    <div ref={wrapRef} className={`ui-select-wrap ${open ? "open" : ""} ${className}`} style={{ position:"relative" }}>
      <button
        ref={btnRef}
        type="button"
        className="ui-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown"){ e.preventDefault(); setOpen(true); move(+1); }
          if (e.key === "ArrowUp"){   e.preventDefault(); setOpen(true); move(-1); }
          if (e.key === "Enter" && open){ e.preventDefault(); apply(hoverIdx >= 0 ? hoverIdx : activeIdx); }
          if (e.key === "Escape"){ setOpen(false); }
        }}
      >
        {label}
      </button>
      <i className="ui-arrow" />

      {open && (
        <div
          role="listbox"
          className="ui-select-menu"
          style={{
            minWidth: btnW || undefined,
            right: align === "right" ? 0 : "auto",
            left:  align === "right" ? "auto" : 0
          }}
        >
          {options.map((opt, idx) => {
            const selected = String(opt.value) === String(value);
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={selected}
                aria-disabled={!!opt.disabled}
                className="ui-option"
                onMouseEnter={() => setHoverIdx(idx)}
                onMouseLeave={() => setHoverIdx(-1)}
                onClick={() => apply(idx)}
                style={{ opacity: opt.disabled ? .6 : 1, pointerEvents: opt.disabled ? "none" : "auto" }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
