import React, { useEffect, useState } from "react";
import { listRoles, listUserRoles, addUserRole, removeUserRole } from "../security.api";
import "../../../styles/security/RoleAssignPanel.css"


export default function RoleAssignPanel({ user }) {
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [roleId, setRoleId] = useState("");

  async function load() {
    const [r, ur] = await Promise.all([listRoles(), listUserRoles(user.id)]);
    setRoles(r); setUserRoles(ur);
  }

  useEffect(()=>{ if(user?.id) load(); }, [user?.id]);

  if (!user) return <p>Chọn 1 user để gán quyền.</p>;

  return (
    <div>
      <div className="inline-form">
        <select value={roleId} onChange={e=>setRoleId(e.target.value)}>
          <option value="">-- chọn role --</option>
          {roles.map(r => <option key={r.id} value={r.id}>{r.code} - {r.name}</option>)}
        </select>
        <button disabled={!roleId} onClick={async ()=>{
          await addUserRole(user.id, Number(roleId));
          setRoleId("");
          setUserRoles(await listUserRoles(user.id));
        }}>Thêm quyền</button>
      </div>

      <table className="tbl">
        <thead><tr><th>RoleID</th><th>Code</th><th>Name</th><th></th></tr></thead>
        <tbody>
          {userRoles.map(ur => (
            <tr key={ur.roleId}>
              <td>{ur.roleId}</td>
              <td>{ur.role?.code || ""}</td>
              <td>{ur.role?.name || ""}</td>
              <td className="act">
                <button className="danger" onClick={async ()=>{
                  await removeUserRole(user.id, ur.roleId);
                  setUserRoles(await listUserRoles(user.id));
                }}>Bỏ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
