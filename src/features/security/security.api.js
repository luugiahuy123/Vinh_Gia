import { http } from "../auth/auth.api.jsx";

/* ================= Users ================= */
export const listUsers   = (q="")          => http.get(`/Users`, { params:{ q } }).then(r=>r.data);
export const getUser     = (id)            => http.get(`/Users/${id}`).then(r=>r.data);
export const createUser  = (payload)       => http.post(`/Users`, payload).then(r=>r.data);
export const updateUser  = (id, payload)   => http.put(`/Users/${id}`, payload).then(r=>r.data);
export const deleteUser  = (id)            => http.delete(`/Users/${id}`).then(r=>r.data);

/* ================ Modules ================ */
export const listModules   = ()                 => http.get(`/Modules`).then(r=>r.data);
export const createModule  = (payload)          => http.post(`/Modules`, payload).then(r=>r.data);
export const updateModule  = (id, payload)      => http.put(`/Modules/${id}`, payload).then(r=>r.data);
export const deleteModule  = (id)               => http.delete(`/Modules/${id}`).then(r=>r.data);

/* ================ Actions ================ */
export const listActions   = ()                 => http.get(`/Actions`).then(r=>r.data);
export const createAction  = (payload)          => http.post(`/Actions`, payload).then(r=>r.data);
export const updateAction  = (id, payload)      => http.put(`/Actions/${id}`, payload).then(r=>r.data);
export const deleteAction  = (id)               => http.delete(`/Actions/${id}`).then(r=>r.data);

/* ================= Roles ================= */
export const listRoles   = ()                   => http.get(`/Roles`).then(r=>r.data);
export const createRole  = (payload)            => http.post(`/Roles`, payload).then(r=>r.data);
export const updateRole  = (id, payload)        => http.put(`/Roles/${id}`, payload).then(r=>r.data);
export const deleteRole  = (id)                 => http.delete(`/Roles/${id}`).then(r=>r.data);

/* =============== UserRoles =============== */
export const listUserRoles = (userId)           => http.get(`/UserRoles/by-user/${userId}`).then(r=>r.data);
export const addUserRole   = (userId, roleId)   => http.post(`/UserRoles`, { userId, roleId }).then(r=>r.data);
export const removeUserRole= (userId, roleId)   => http.delete(`/UserRoles`, { data:{ userId, roleId } }).then(r=>r.data);

/* ======= (tuỳ chọn) đổi mật khẩu của chính mình ======= */
export const changeMyPassword = (oldPass, newPass) =>
  http.post(`/Auth/change-password`, { oldPassword: oldPass, newPassword: newPass }).then(r=>r.data);
