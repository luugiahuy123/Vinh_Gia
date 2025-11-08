import React, { useState } from "react";
import ModulesSection from "../components/ModulesSection";
import ActionsSection from "../components/ActionsSection";
import RolesSection from "../components/RolesSection";
import UsersSection from "../components/UsersSection";
import RoleAssignPanel from "../components/RoleAssignPanel";
import "../../../styles/security/SecurityPage.css";
import "../../../styles/security/UsersSection.css";
import "../../../styles/security/ModulesSection.css";
import "../../../styles/security/ActionsSection.css";
import "../../../styles/security/RolesSection.css";
import "../../../styles/security/RoleAssignPanel.css";
import "../../../styles/security/_common.css";


export default function SecurityPage() {
  const [open, setOpen] = useState({
    modules: false,
    actions: false,
    roles: false,
    users: false,
  });
  const [pickedUser, setPickedUser] = useState(null);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="security-page">
      <h2>Bảo mật hệ thống</h2>

      {/* ===== Hàng nút ===== */}
      <div className="security-tabs">
        <button
          className={`sec-tab ${open.modules ? "active" : ""}`}
          onClick={() => toggle("modules")}
        >
           Modules
        </button>
        <button
          className={`sec-tab ${open.actions ? "active" : ""}`}
          onClick={() => toggle("actions")}
        >
           Actions
        </button>
        <button
          className={`sec-tab ${open.roles ? "active" : ""}`}
          onClick={() => toggle("roles")}
        >
           Roles
        </button>
        <button
          className={`sec-tab ${open.users ? "active" : ""}`}
          onClick={() => toggle("users")}
        >
           Users
        </button>
      </div>

      {/* ===== Các phần mở tương ứng ===== */}
      <div className="security-content">
        {open.modules && (
          <div className="sec-section">
            <h3>Modules</h3>
            <ModulesSection />
          </div>
        )}

        {open.actions && (
          <div className="sec-section">
            <h3>Actions</h3>
            <ActionsSection />
          </div>
        )}

        {open.roles && (
          <div className="sec-section">
            <h3>Roles (Module × Action)</h3>
            <RolesSection />
          </div>
        )}

        {open.users && (
          <div className="sec-section">
            <h3>Users & Role Assign</h3>
            <div className="two-col">
              <div className="users-section">
                <UsersSection pickedId={pickedUser?.id} onPick={setPickedUser} />
              </div>
              <div className="role-assign-panel">
                <h4>
                  Gán Role cho:{" "}
                  {pickedUser ? `#${pickedUser.id} - ${pickedUser.name}` : "(chưa chọn)"}
                </h4>
                <RoleAssignPanel user={pickedUser} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
