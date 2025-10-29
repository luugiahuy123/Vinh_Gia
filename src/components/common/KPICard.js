import React from 'react';

const KPICard = ({ title, value, color = '#c06252' }) => {
  return (
    <div className="kpi-card" style={{ borderLeftColor: color }}>
      <h3>{title}</h3>
      <p style={{ color: color }}>{value}</p>
    </div>
  );
};

export default KPICard;