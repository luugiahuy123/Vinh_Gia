import React from "react";


export default function SectionCard({ title, children, right }) {
  return (
    <section className="sec-card">
      <div className="sec-head">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <h3 style={{margin:0}}>{title}</h3>
          {right ?? null}
        </div>
      </div>
      <div className="sec-body">{children}</div>
    </section>
  );
}
