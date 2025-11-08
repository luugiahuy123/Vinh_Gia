import { useEffect, useState } from "react";

function toArray(data) {
  if (Array.isArray(data)) return data;
  // các cấu trúc kết quả phổ biến
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.records)) return data.records;
  if (Array.isArray(data?.result)) return data.result;
  // không khớp gì -> trả mảng rỗng
  return [];
}

export default function useCrud(listFn, createFn, updateFn, deleteFn) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const reload = async () => {
    setLoading(true); setErr("");
    try {
      const data = await listFn();
      setItems(toArray(data));
    } catch (e) {
      setErr(e?.message || "Không tải được dữ liệu.");
      setItems([]); // đảm bảo luôn là mảng
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload) => { await createFn?.(payload); await reload(); };
  const update = async (id, payload) => { await updateFn?.(id, payload); await reload(); };
  const remove = async (id) => { await deleteFn?.(id); await reload(); };

  useEffect(() => { reload(); }, []); // mount

  return { items, loading, err, reload, create, update, remove, setItems };
}
