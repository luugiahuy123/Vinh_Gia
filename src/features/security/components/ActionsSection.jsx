import React, { useState } from "react";
import useCrud from "../hooks/useCrud";
import { listActions, createAction, updateAction, deleteAction } from "../security.api";
import "../../../styles/security/ActionsSection.css"

export default function ActionsSection() {
  const actions = useCrud(listActions, createAction, updateAction, deleteAction);
  const [f, setF] = useState({ code:"", name:"" });

  return (
    <div>
      <div className="inline-form">
        <input placeholder="code" value={f.code} onChange={e=>setF({...f, code:e.target.value})}/>
        <input placeholder="name" value={f.name} onChange={e=>setF({...f, name:e.target.value})}/>
        <button onClick={()=>{ actions.create(f); setF({ code:"", name:"" }); }}>Thêm</button>
      </div>

      {actions.err && <div className="err">{actions.err}</div>}
      <table className="tbl">
        <thead><tr><th>ID</th><th>Code</th><th>Name</th><th></th></tr></thead>
        <tbody>
          {actions.items.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.code}</td><td>{a.name}</td>
              <td className="act">
                <button className="danger" onClick={()=>actions.remove(a.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
