// Dùng lại axios instance có Bearer token từ auth.api.jsx
import { http } from "../auth/auth.api.jsx";

/** Lấy ID người dùng từ localStorage/JWT (giống UserDropdown) */
export function resolveUserId() {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.id) return parsed.id;
      if (parsed?.user?.id) return parsed.user.id;
    }
  } catch {}

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(json);
    const nameId =
      payload?.[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    return nameId || payload?.sub || payload?.nameid || payload?.NameId || null;
  } catch {
    return null;
  }
}

export async function getMyProfile() {
  const id = resolveUserId();
  if (!id) throw new Error("Không xác định được User ID.");
  const res = await http.get(`/Users/${id}`); // baseURL = .../api
  return res.data;
}

export async function updateMyProfile(payload) {
  const id = resolveUserId();
  if (!id) throw new Error("Không xác định được User ID.");
  const res = await http.put(`/Users/${id}`, payload);
  return res.data;
}

export async function deleteMyAccount() {
  const id = resolveUserId();
  if (!id) throw new Error("Không xác định được User ID.");
  const res = await http.delete(`/Users/${id}`);
  return res.data;
}
