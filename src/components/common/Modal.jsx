import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import "../../styles/atoms/modals.css";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  variant = "center",
  closeOnBackdrop = true,
  closeOnEsc = true,
  level = 1,
}) {
  const rootRef = useRef(null);
  const lastActive = useRef(null);

  // Mount root element for portal
  if (!rootRef.current && typeof document !== "undefined") {
    const div = document.createElement("div");
    div.className = "modal-root";
    rootRef.current = div;
  }

  // lock body scroll
  useLockBodyScroll(open);

  // focus handling
  useEffect(() => {
    if (open) {
      lastActive.current = document.activeElement;
      // chuyển focus vào modal
      setTimeout(() => {
        const el =
          rootRef.current?.querySelector("[data-autofocus]") ||
          rootRef.current?.querySelector(
            ".modal-content, .drawer-panel, .sheet-panel"
          );
        el?.focus?.();
      }, 0);
    } else if (lastActive.current) {
      // trả focus về nút trước đó
      lastActive.current.focus?.();
    }
  }, [open]);

  // esc close
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeOnEsc, onClose]);

  useLayoutEffect(() => {
    if (!rootRef.current || !open) return;
    rootRef.current.setAttribute("data-level", String(level || 1));
    document.body.appendChild(rootRef.current);
    return () => {
      rootRef.current?.parentNode?.removeChild(rootRef.current);
    };
  }, [open, level]);

  if (!open) return null;

  const overlayProps = {
    className: "modal-overlay",
    onMouseDown: (e) => {
      if (!closeOnBackdrop) return;
      // click nền thì đóng, nhưng nếu click vào panel thì không
      if (e.target === e.currentTarget) onClose?.();
    },
  };

  if (variant === "center") {
    return createPortal(
      <div className="modal-overlay" {...overlayProps}>
        <div
          className={`modal-content modal-${size}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          tabIndex={-1}
        >
          {(title || onClose) && (
            <div className="modal-header">
              <div id="modal-title" className="modal-title">
                {title}
              </div>
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
          )}
          <div className="modal-body">{children}</div>
          {footer !== undefined && <div className="modal-footer">{footer}</div>}
        </div>
      </div>,
      rootRef.current
    );
  }

  if (variant === "drawer-right" || variant === "drawer-left") {
    return createPortal(
      <div className="modal-drawer">
        <div {...overlayProps} />
        <div
          className={`drawer-panel ${
            variant === "drawer-right" ? "drawer-right" : "drawer-left"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "drawer-title" : undefined}
          tabIndex={-1}
          style={{ width: "var(--drawer-w)" }}
        >
          {(title || onClose) && (
            <div className="modal-header">
              <div id="drawer-title" className="modal-title">
                {title}
              </div>
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
          )}
          <div className="modal-body">{children}</div>
          {footer !== undefined && <div className="modal-footer">{footer}</div>}
        </div>
      </div>,
      rootRef.current
    );
  }

  /* bottom sheet */
  return createPortal(
    <div className="modal-sheet">
      <div {...overlayProps} />
      <div
        className="sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sheet-title" : undefined}
        tabIndex={-1}
      >
        {(title || onClose) && (
          <div className="modal-header">
            <div id="sheet-title" className="modal-title">
              {title}
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Đóng">
              ×
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer !== undefined && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    rootRef.current
  );
}

/* ===== Hook: lock scroll khi mở modal ===== */
function useLockBodyScroll(lock) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lock]);
}
