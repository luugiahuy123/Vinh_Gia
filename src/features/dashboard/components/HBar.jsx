export default function HBar({ items = [] }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="hbars">
      {items.map((it, i) => (
        <div className="hrow" key={i}>
          <span className="hlabel">{it.label}</span>
          <div className="htrack">
            <div className={`hfill seg-${i % 6}`} style={{ width: `${(it.value / max) * 100}%` }} />
            <span className="hval">{it.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
