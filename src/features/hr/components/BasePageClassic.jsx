// BasePageClassic.jsx (tóm tắt)
export default function BasePageClassic({ title, extra, children }) {
  return (
    <div className="emp-wrap">
      <div className="emp-header">
        <h2 className="emp-title">{title}</h2>
        {extra /* -> nằm bên phải */}
      </div>
      <div className="emp-table-wrap">{children}</div>
    </div>
  );
}
