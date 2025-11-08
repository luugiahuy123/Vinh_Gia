// src/features/hr/contracts/ContractsPage.jsx
import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import contractDemoImg from "../../../assets/hopdongdemo.png";
import "../../hr/hr.css";

export default function ContractsPage() {
  // dữ liệu cứng
  const [rows, setRows] = useState(() => hrRepo.list("contracts"));
  const [q, setQ] = useState("");

  // Modal thêm/sửa
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  // Xem chi tiết (ảnh)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewRow, setPreviewRow] = useState(null);

  // Import demo
  const [importOpen, setImportOpen] = useState(false);

  // Context menu (chuột phải)
  const [menu, setMenu] = useState({ open: false, x: 0, y: 0, row: null });

  // lọc tìm kiếm
  const data = useMemo(
    () =>
      rows.filter((r) =>
        [r.empCode, r.empName, r.type, r.status]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [rows, q]
  );

  const columns = [
    { title: "Mã NV", dataIndex: "empCode" },
    { title: "Họ tên", dataIndex: "empName" },
    { title: "Loại HĐ", dataIndex: "type" },
    { title: "Bắt đầu", dataIndex: "startDate", render: (v) => fmtDate(v) },
    { title: "Kết thúc", dataIndex: "endDate", render: (v) => fmtDate(v) },
    { title: "Trạng thái", dataIndex: "status",},
  ];

  // Click trái: xem chi tiết
  const handleRowClick = (row) => {
    setPreviewRow(row);
    setPreviewOpen(true);
  };

  // Chuột phải: menu Sửa/Xoá
  const handleRowContextMenu = (e, row) => {
    e.preventDefault();
    setMenu({ open: true, x: e.clientX, y: e.clientY, row });
  };

  // CRUD
  const onCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const onEdit = (row) => {
    setEditing(row);
    form.setFieldsValue({
      ...row,
      startDate: dayjs(row.startDate),
      endDate: dayjs(row.endDate),
    });
    setOpen(true);
  };

  const onDelete = (id) => {
    hrRepo.remove("contracts", id);
    setRows(hrRepo.list("contracts"));
  };

  const onSubmit = async () => {
    const v = await form.validateFields();
    const payload = {
      ...v,
      startDate: v.startDate.format("YYYY-MM-DD"),
      endDate: v.endDate.format("YYYY-MM-DD"),
    };
    if (editing) hrRepo.update("contracts", editing.id, payload);
    else hrRepo.create("contracts", payload);
    setRows(hrRepo.list("contracts"));
    setOpen(false);
  };

  return (
    <BasePageClassic
      title="Hợp đồng"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}>
            <span className="btn-ic">＋</span> Thêm
          </button>
          <button className="btn-pill" onClick={() => setImportOpen(true)}>
            <span className="btn-ic">⤴</span> Import
          </button>
          <input
            className="emp-search"
            placeholder="Tìm: Mã NV / Họ tên / Loại HĐ / Trạng thái"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      }
    >
      {/* Bảng */}
      <EmpTable
        columns={columns}
        data={data}
        onRowClick={handleRowClick}          // click trái = xem chi tiết
        onRowContextMenu={handleRowContextMenu} // click phải = menu sửa/xoá
      />

      {/* Context Menu */}
      <RowContextMenu
        open={menu.open}
        x={menu.x}
        y={menu.y}
        onEdit={() => {
          setMenu((m) => ({ ...m, open: false }));
          onEdit(menu.row);
        }}
        onDelete={() => {
          setMenu((m) => ({ ...m, open: false }));
          onDelete(menu.row.id);
        }}
        onClose={() => setMenu((m) => ({ ...m, open: false }))}
      />

      {/* Modal thêm/sửa */}
      <Modal
        open={open}
        onOk={onSubmit}
        onCancel={() => setOpen(false)}
        title={editing ? "Sửa hợp đồng" : "Thêm hợp đồng"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại hợp đồng" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "Thử việc", label: "Thử việc" },
                { value: "Xác định thời hạn", label: "Xác định thời hạn" },
                { value: "Không xác định thời hạn", label: "Không xác định thời hạn" },
              ]}
            />
          </Form.Item>
          <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "Hiệu lực", label: "Hiệu lực" },
                { value: "Sắp hết hạn", label: "Sắp hết hạn" },
                { value: "Hết hạn", label: "Hết hạn" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xem chi tiết (ảnh hợp đồng) */}
      <Modal
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width="80vw"
        title={
          previewRow
            ? `Hợp đồng: ${previewRow.empCode} - ${previewRow.empName}`
            : "Hợp đồng"
        }
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={contractDemoImg}
            alt="Hợp đồng demo"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </div>
      </Modal>

      {/* Modal Import (demo) */}
      <Modal
        open={importOpen}
        onOk={() => setImportOpen(false)}
        onCancel={() => setImportOpen(false)}
        title="Import hợp đồng (demo)"
      >
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
