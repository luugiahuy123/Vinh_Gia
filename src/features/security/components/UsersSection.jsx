import React, { useMemo, useState } from "react";
import useCrud from "../hooks/useCrud";
import { listUsers, createUser, updateUser, deleteUser } from "../security.api";
import "../../../styles/security/UsersSection.css"


/**
 * Props:
 *  - onPick(user): chọn 1 user để gán quyền
 *  - pickedId: id user đang được chọn
 */
export default function UsersSection({ onPick, pickedId }) {
  // ⚠️ API /Users (Swagger) -> GET /api/Users
  // useCrud đã tự ép kiểu output về mảng (items/data/records/...)
  const users = useCrud(() => listUsers(""), createUser, updateUser, deleteUser);

  // form tạo mới
  const [addF, setAddF] = useState({
    name: "",
    email: "",
    msnv: "",
    phone: "",
    password: "",
    isActive: true,
    isAdmin: false,
    passChangeFirst: true,
  });

  // trạng thái sửa theo dòng
  const [editId, setEditId] = useState(null);
  const editInit = useMemo(
    () => (id) => {
      const u = (Array.isArray(users.items) ? users.items : []).find(x => x.id === id) || {};
      return {
        name: u.name || "",
        email: u.email || "",
        msnv: u.msnv || "",
        phone: u.phone || "",
        password: "",
        isActive: !!u.isActive,
        isAdmin: !!u.isAdmin,
        passChangeFirst: !!u.passChangeFirst,
      };
    },
    [users.items]
  );
  const [editF, setEditF] = useState({});

  const rows = Array.isArray(users.items) ? users.items : [];

  return (
    <>
      {/* ========== Tạo mới tài khoản ========== */}
      <div className="inline-form">
        <input
          placeholder="name"
          value={addF.name}
          onChange={(e) => setAddF({ ...addF, name: e.target.value })}
        />
        <input
          placeholder="email"
          value={addF.email}
          onChange={(e) => setAddF({ ...addF, email: e.target.value })}
        />
        <input
          placeholder="msnv"
          value={addF.msnv}
          onChange={(e) => setAddF({ ...addF, msnv: e.target.value })}
        />
        <input
          placeholder="phone"
          value={addF.phone}
          onChange={(e) => setAddF({ ...addF, phone: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={addF.password}
          onChange={(e) => setAddF({ ...addF, password: e.target.value })}
        />

        <label className="switch">
          <input
            type="checkbox"
            checked={addF.isActive}
            onChange={(e) => setAddF({ ...addF, isActive: e.target.checked })}
          />
          <span>Active</span>
        </label>
        <label className="switch">
          <input
            type="checkbox"
            checked={addF.isAdmin}
            onChange={(e) => setAddF({ ...addF, isAdmin: e.target.checked })}
          />
          <span>Admin</span>
        </label>
        <label className="switch">
          <input
            type="checkbox"
            checked={addF.passChangeFirst}
            onChange={(e) =>
              setAddF({ ...addF, passChangeFirst: e.target.checked })
            }
          />
          <span>Buộc đổi MK</span>
        </label>

        <button
          onClick={async () => {
            await users.create(addF);
            setAddF({
              name: "",
              email: "",
              msnv: "",
              phone: "",
              password: "",
              isActive: true,
              isAdmin: false,
              passChangeFirst: true,
            });
          }}
        >
          + Thêm
        </button>
      </div>

      {users.err && <div className="err">{users.err}</div>}

      {/* ========== Danh sách tài khoản ========== */}
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 60 }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>MSNV</th>
            <th>Phone</th>
            <th>Active</th>
            <th>Admin</th>
            <th style={{ width: 220 }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => {
            const isPicked = pickedId === u.id;
            const isEditing = editId === u.id;
            return (
              <tr key={u.id} className={isPicked ? "row-picked" : ""}>
                <td>{u.id}</td>

                {/* Name */}
                <td>
                  {isEditing ? (
                    <input
                      className="emp-input"
                      value={editF.name}
                      onChange={(e) =>
                        setEditF({ ...editF, name: e.target.value })
                      }
                    />
                  ) : (
                    u.name
                  )}
                </td>

                {/* Email */}
                <td>
                  {isEditing ? (
                    <input
                      className="emp-input"
                      value={editF.email}
                      onChange={(e) =>
                        setEditF({ ...editF, email: e.target.value })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>

                {/* MSNV */}
                <td>
                  {isEditing ? (
                    <input
                      className="emp-input"
                      value={editF.msnv}
                      onChange={(e) =>
                        setEditF({ ...editF, msnv: e.target.value })
                      }
                    />
                  ) : (
                    u.msnv
                  )}
                </td>

                {/* Phone */}
                <td>
                  {isEditing ? (
                    <input
                      className="emp-input"
                      value={editF.phone}
                      onChange={(e) =>
                        setEditF({ ...editF, phone: e.target.value })
                      }
                    />
                  ) : (
                    u.phone || ""
                  )}
                </td>

                {/* Active */}
                <td style={{ textAlign: "center" }}>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={!!editF.isActive}
                      onChange={(e) =>
                        setEditF({ ...editF, isActive: e.target.checked })
                      }
                    />
                  ) : u.isActive ? (
                    "✓"
                  ) : (
                    "-"
                  )}
                </td>

                {/* Admin */}
                <td style={{ textAlign: "center" }}>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={!!editF.isAdmin}
                      onChange={(e) =>
                        setEditF({ ...editF, isAdmin: e.target.checked })
                      }
                    />
                  ) : u.isAdmin ? (
                    "✓"
                  ) : (
                    "-"
                  )}
                </td>

                {/* Actions */}
                <td className="act">
                  {!isEditing ? (
                    <>
                      <button onClick={() => onPick?.(u)}>Chọn</button>
                      <button
                        onClick={() => {
                          setEditId(u.id);
                          setEditF(editInit(u.id));
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="danger"
                        onClick={() => users.remove(u.id)}
                      >
                        Xoá
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={async () => {
                          const payload = { ...editF };
                          // nếu không muốn đổi mật khẩu khi sửa → bỏ trường password nếu rỗng
                          if (!payload.password) delete payload.password;
                          await users.update(u.id, payload);
                          setEditId(null);
                          setEditF({});
                        }}
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditF({});
                        }}
                      >
                        Huỷ
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
          {!rows.length && (
            <tr>
              <td colSpan={8} className="empty">
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
