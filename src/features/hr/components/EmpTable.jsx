import React from "react";
import "../../hr/hr.css";

export default function EmpTable({
  columns,
  data,
  onRowClick,          // left click -> view
  onRowContextMenu,    // right click -> context menu
}) {
  return (
    <div className="emp-table-wrap">
      <table className="emp-table">
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key || c.dataIndex} style={{ width: c.width }}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(data?.length ? data : []).map(row => (
            <tr
              key={row.id || JSON.stringify(row)}
              className="emp-row"
              onClick={() => onRowClick?.(row)}
              onContextMenu={(e) => onRowContextMenu?.(e, row)}
            >
              {columns.map(c => {
                const value = typeof c.render === "function" ? c.render(row[c.dataIndex], row) : row[c.dataIndex];
                return (
                  <td
                    key={(c.key || c.dataIndex) + "-cell"}
                    data-label={c.title}
                    style={{ width: c.width }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
          {!data?.length && (
            <tr>
              <td colSpan={columns.length} className="emp-empty">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
