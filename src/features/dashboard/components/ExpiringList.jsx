export default function ExpiringList({ items = [] }) {
  return (
    <ul className="alertList">
      {items.map((x, i) => (
        <li
          key={i}
          onClick={() => alert(`Xem hợp đồng của ${x.name}`)}
          className={`alertItem clickable ${
            x.daysLeft <= 10 ? "danger" : x.daysLeft <= 20 ? "warning" : "info"
          }`}
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
  );
}
