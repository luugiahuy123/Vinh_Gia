import React, { useState } from "react";
import useCrud from "../hooks/useCrud";
import { listModules, createModule, updateModule, deleteModule } from "../security.api";
import "../../../styles/security/ModulesSection.css"


export default function ModulesSection() {
  const modules = useCrud(listModules, createModule, updateModule, deleteModule);
  const [f, setF] = useState({ code:"", name:"", description:"", isActive:true });

  return (
    <div>
      <div className="inline-form">
        <input placeholder="code" value={f.code} onChange={e=>setF({...f, code:e.target.value})}/>
        <input placeholder="name" value={f.name} onChange={e=>setF({...f, name:e.target.value})}/>
        <input placeholder="description" value={f.description} onChange={e=>setF({...f, description:e.target.value})}/>
        <label className="switch">
          <input type="checkbox" checked={f.isActive} onChange={e=>setF({...f, isActive:e.target.checked})}/>
          <span>Kích hoạt</span>
        </label>
        <button onClick={()=>{ modules.create(f); setF({ code:"", name:"", description:"", isActive:true }); }}>Thêm</button>
      </div>

      {modules.err && <div className="err">{modules.err}</div>}
      <table className="tbl">
        <thead><tr><th>ID</th><th>Code</th><th>Name</th><th>Mô tả</th><th>Active</th><th></th></tr></thead>
        <tbody>
          {modules.items.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td><td>{m.code}</td><td>{m.name}</td><td>{m.description}</td>
              <td>{m.isActive ? "✓":"-"}</td>
              <td className="act">
                <button onClick={()=>modules.update(m.id, { ...m, isActive: !m.isActive })}>Toggle</button>
                <button className="danger" onClick={()=>modules.remove(m.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
