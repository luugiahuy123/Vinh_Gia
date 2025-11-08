import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import "../../hr/hr.css";

export default function TransfersPage() {
  const [rows, setRows] = useState(() => hrRepo.list("transfers"));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [menu, setMenu] = useState({ open: false, x: 0, y: 0, row: null });

  const data = useMemo(
    () => rows.filter(r =>
      [r.empCode, r.empName, r.fromDept, r.toDept, r.status].join(" ").toLowerCase().includes(q.toLowerCase())
    ), [rows, q]
  );

  const columns = [
    { title: "Mã NV", dataIndex: "empCode",},
    { title: "Họ tên", dataIndex: "empName" },
    { title: "Từ bộ phận", dataIndex: "fromDept", },
    { title: "Đến bộ phận", dataIndex: "toDept",  },
    { title: "Ngày điều chuyển", dataIndex: "transferDate", render: v => fmtDate(v) },
    { title: "Trạng thái", dataIndex: "status", },
  ];

  const handleRowClick = (row) => setDetail(row);
  const handleRowContextMenu = (e, row) => { e.preventDefault(); setMenu({ open:true, x:e.clientX, y:e.clientY, row}); };

  const onCreate = () => { setEditing(null); form.resetFields(); setOpen(true); };
  const onEdit = (row) => {
    setEditing(row);
    form.setFieldsValue({ ...row, transferDate: dayjs(row.transferDate) });
    setOpen(true);
  };
  const onDelete = (id) => { hrRepo.remove("transfers", id); setRows(hrRepo.list("transfers")); };
  const onSubmit = async () => {
    const v = await form.validateFields();
    const payload = { ...v, transferDate: v.transferDate.format("YYYY-MM-DD") };
    editing ? hrRepo.update("transfers", editing.id, payload) : hrRepo.create("transfers", payload);
    setRows(hrRepo.list("transfers")); setOpen(false);
  };

  return (
    <BasePageClassic
      title="Điều động/Điều chuyển"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}><span className="btn-ic">＋</span> Thêm</button>
          <button className="btn-pill" onClick={() => setImportOpen(true)}><span className="btn-ic">⤴</span> Import</button>
          <input className="emp-search" placeholder="Tìm: Mã NV / Họ tên / Từ phòng / Sang phòng" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
      }
    >
      <EmpTable columns={columns} data={data} onRowClick={handleRowClick} onRowContextMenu={handleRowContextMenu} />

      <RowContextMenu
        open={menu.open} x={menu.x} y={menu.y}
        onEdit={() => { setMenu(m=>({...m,open:false})); onEdit(menu.row); }}
        onDelete={() => { setMenu(m=>({...m,open:false})); onDelete(menu.row.id); }}
        onClose={() => setMenu(m=>({...m,open:false}))}
      />

      <Modal open={open} onOk={onSubmit} onCancel={()=>setOpen(false)} title={editing?"Sửa điều chuyển":"Thêm điều chuyển"}>
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="fromDept" label="Từ phòng" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="toDept" label="Sang phòng" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="transferDate" label="Ngày điều chuyển" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{required:true}]}>
            <Select options={[{value:"Đang xử lý",label:"Đang xử lý"},{value:"Hoàn tất",label:"Hoàn tất"}]} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={!!detail} onCancel={()=>setDetail(null)} footer={null} title="Chi tiết điều chuyển">
        {detail && (
          <table className="emp-detail-table">
            <tbody>
              <tr><th>Mã NV</th><td>{detail.empCode}</td></tr>
              <tr><th>Họ tên</th><td>{detail.empName}</td></tr>
              <tr><th>Từ phòng</th><td>{detail.fromDept}</td></tr>
              <tr><th>Sang phòng</th><td>{detail.toDept}</td></tr>
              <tr><th>Ngày điều chuyển</th><td>{fmtDate(detail.transferDate)}</td></tr>
              <tr><th>Trạng thái</th><td>{detail.status}</td></tr>
              <tr><th>Ghi chú</th><td>{detail.note || "-"}</td></tr>
            </tbody>
          </table>
        )}
      </Modal>

      <Modal open={importOpen} onOk={()=>setImportOpen(false)} onCancel={()=>setImportOpen(false)} title="Import điều chuyển (demo)">
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon"><UploadOutlined/></p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
