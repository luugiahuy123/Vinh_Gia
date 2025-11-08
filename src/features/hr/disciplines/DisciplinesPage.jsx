import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import "../../hr/hr.css";

export default function DisciplinesPage(){
  const [rows, setRows] = useState(() => hrRepo.list("disciplines"));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [menu, setMenu] = useState({ open:false, x:0, y:0, row:null });

  const data = useMemo(()=> rows.filter(r =>
    [r.empCode, r.empName, r.disType, r.level, r.reason].join(" ").toLowerCase().includes(q.toLowerCase())
  ), [rows, q]);

  const columns = [
    { title:"Mã NV", dataIndex:"empCode",  },
    { title:"Họ tên", dataIndex:"empName" },
    { title:"Hình thức KL", dataIndex:"disType", },
    { title:"Cấp độ", dataIndex:"level",  },
    { title:"Ngày", dataIndex:"date", render:v=>fmtDate(v) },
    { title:"Lý do", dataIndex:"reason" },
  ];

  const handleRowClick = (row)=> setDetail(row);
  const handleRowContextMenu = (e,row)=>{ e.preventDefault(); setMenu({open:true,x:e.clientX,y:e.clientY,row}); };

  const onCreate = ()=>{ setEditing(null); form.resetFields(); setOpen(true); };
  const onEdit = (row)=>{
    setEditing(row);
    form.setFieldsValue({ ...row, date: dayjs(row.date) });
    setOpen(true);
  };
  const onDelete = (id)=>{ hrRepo.remove("disciplines", id); setRows(hrRepo.list("disciplines")); };
  const onSubmit = async ()=>{
    const v = await form.validateFields();
    const payload = { ...v, date: v.date.format("YYYY-MM-DD") };
    editing ? hrRepo.update("disciplines", editing.id, payload) : hrRepo.create("disciplines", payload);
    setRows(hrRepo.list("disciplines")); setOpen(false);
  };

  return (
    <BasePageClassic
      title="Kỷ luật"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}><span className="btn-ic">＋</span> Thêm</button>
          <button className="btn-pill" onClick={()=>setImportOpen(true)}><span className="btn-ic">⤴</span> Import</button>
          <input className="emp-search" placeholder="Tìm: NV / Hình thức / Lý do" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
      }
    >
      <EmpTable columns={columns} data={data} onRowClick={handleRowClick} onRowContextMenu={handleRowContextMenu} />

      <RowContextMenu
        open={menu.open} x={menu.x} y={menu.y}
        onEdit={()=>{ setMenu(m=>({...m,open:false})); onEdit(menu.row); }}
        onDelete={()=>{ setMenu(m=>({...m,open:false})); onDelete(menu.row.id); }}
        onClose={()=>setMenu(m=>({...m,open:false}))}
      />

      <Modal open={open} onOk={onSubmit} onCancel={()=>setOpen(false)} title={editing?"Sửa kỷ luật":"Thêm kỷ luật"}>
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="disType" label="Hình thức KL" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="level" label="Cấp độ" rules={[{required:true}]}><Select options={[
            {value:"Nhắc nhở",label:"Nhắc nhở"},{value:"Khiển trách",label:"Khiển trách"},
            {value:"Cảnh cáo",label:"Cảnh cáo"},{value:"Sa thải",label:"Sa thải"}]}/></Form.Item>
          <Form.Item name="date" label="Ngày" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="reason" label="Lý do"><Input.TextArea rows={3}/></Form.Item>
        </Form>
      </Modal>

      <Modal open={!!detail} onCancel={()=>setDetail(null)} footer={null} title="Chi tiết kỷ luật">
        {detail && (
          <table className="emp-detail-table"><tbody>
            <tr><th>Mã NV</th><td>{detail.empCode}</td></tr>
            <tr><th>Họ tên</th><td>{detail.empName}</td></tr>
            <tr><th>Hình thức KL</th><td>{detail.disType}</td></tr>
            <tr><th>Cấp độ</th><td>{detail.level}</td></tr>
            <tr><th>Ngày</th><td>{fmtDate(detail.date)}</td></tr>
            <tr><th>Lý do</th><td>{detail.reason || "-"}</td></tr>
          </tbody></table>
        )}
      </Modal>

      <Modal open={importOpen} onOk={()=>setImportOpen(false)} onCancel={()=>setImportOpen(false)} title="Import kỷ luật (demo)">
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon"><UploadOutlined/></p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
