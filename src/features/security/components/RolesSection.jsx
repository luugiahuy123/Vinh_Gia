import React, { useState } from "react";
import useCrud from "../hooks/useCrud";
import { listRoles, createRole, updateRole, deleteRole, listModules, listActions } from "../security.api";
import "../../../styles/security/RolesSection.css"


export default function RolesSection() {
  const roles = useCrud(listRoles, createRole, updateRole, deleteRole);
  const modules = useCrud(listModules, ()=>Promise.resolve(), ()=>Promise.resolve(), ()=>Promise.resolve());
  const actions = useCrud(listActions, ()=>Promise.resolve(), ()=>Promise.resolve(), ()=>Promise.resolve());

  const [f, setF] = useState({ name:"", code:"", modulesId:"", actionId:"" });

  return (
    <div>
      <div className="inline-form">
        <input placeholder="name" value={f.name} onChange={e=>setF({...f, name:e.target.value})}/>
        <input placeholder="code" value={f.code} onChange={e=>setF({...f, code:e.target.value})}/>
        <select value={f.modulesId} onChange={e=>setF({...f, modulesId:e.target.value})}>
          <option value="">-- module --</option>
          {modules.items.map(m => <option key={m.id} value={m.id}>{m.code} - {m.name}</option>)}
        </select>
        <select value={f.actionId} onChange={e=>setF({...f, actionId:e.target.value})}>
          <option value="">-- action --</option>
          {actions.items.map(a => <option key={a.id} value={a.id}>{a.code}</option>)}
        </select>
        <button onClick={()=>{
          roles.create({
            name:f.name, code:f.code,
            modulesId: f.modulesId? Number(f.modulesId): null,
            actionId: f.actionId? Number(f.actionId): null
          });
          setF({ name:"", code:"", modulesId:"", actionId:"" });
        }}>Thêm</button>
      </div>

      {roles.err && <div className="err">{roles.err}</div>}
      <table className="tbl">
        <thead><tr><th>ID</th><th>Name</th><th>Code</th><th>Module</th><th>Action</th><th></th></tr></thead>
        <tbody>
          {roles.items.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.name}</td><td>{r.code}</td>
              <td>{r.module?.code || r.modulesId}</td>
              <td>{r.action?.code || r.actionId}</td>
              <td className="act">
                <button className="danger" onClick={()=>roles.remove(r.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
