import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import "../../hr/hr.css";

export default function CareerPathPage(){
  const [rows, setRows] = useState(() => hrRepo.list("career"));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [menu, setMenu] = useState({ open:false, x:0, y:0, row:null });

  const data = useMemo(()=> rows.filter(r =>
    [r.empCode, r.empName, r.currentPos, r.targetPos, r.status].join(" ").toLowerCase().includes(q.toLowerCase())
  ), [rows, q]);

  const columns = [
    { title:"Mã NV", dataIndex:"empCode", },
    { title:"Họ tên", dataIndex:"empName" },
    { title:"Vị trí hiện tại", dataIndex:"currentPos",  },
    { title:"Mục tiêu", dataIndex:"targetPos",  },
    { title:"Ngày kế hoạch", dataIndex:"planDate", render:v=>fmtDate(v) },
    { title:"Trạng thái", dataIndex:"status", },
  ];

  const handleRowClick = (row)=> setDetail(row);
  const handleRowContextMenu = (e,row)=>{ e.preventDefault(); setMenu({open:true,x:e.clientX,y:e.clientY,row}); };

  const onCreate = ()=>{ setEditing(null); form.resetFields(); setOpen(true); };
  const onEdit = (row)=>{
    setEditing(row);
    form.setFieldsValue({ ...row, planDate: dayjs(row.planDate) });
    setOpen(true);
  };
  const onDelete = (id)=>{ hrRepo.remove("career", id); setRows(hrRepo.list("career")); };
  const onSubmit = async ()=>{
    const v = await form.validateFields();
    const payload = { ...v, planDate: v.planDate.format("YYYY-MM-DD") };
    editing ? hrRepo.update("career", editing.id, payload) : hrRepo.create("career", payload);
    setRows(hrRepo.list("career")); setOpen(false);
  };

  return (
    <BasePageClassic
      title="Lộ trình phát triển"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}><span className="btn-ic">＋</span> Thêm</button>
          <button className="btn-pill" onClick={()=>setImportOpen(true)}><span className="btn-ic">⤴</span> Import</button>
          <input className="emp-search" placeholder="Tìm: NV / Vị trí / Trạng thái" value={q} onChange={e=>setQ(e.target.value)} />
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

      <Modal open={open} onOk={onSubmit} onCancel={()=>setOpen(false)} title={editing?"Sửa lộ trình":"Thêm lộ trình"}>
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="currentPos" label="Vị trí hiện tại" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="targetPos" label="Mục tiêu" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="planDate" label="Ngày kế hoạch" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{required:true}]}><Select options={[
            {value:"Đang phát triển",label:"Đang phát triển"},{value:"Hoàn tất",label:"Hoàn tất"}]}/></Form.Item>
        </Form>
      </Modal>

      <Modal open={!!detail} onCancel={()=>setDetail(null)} footer={null} title="Chi tiết lộ trình">
        {detail && (
          <table className="emp-detail-table"><tbody>
            <tr><th>Mã NV</th><td>{detail.empCode}</td></tr>
            <tr><th>Họ tên</th><td>{detail.empName}</td></tr>
            <tr><th>Vị trí hiện tại</th><td>{detail.currentPos}</td></tr>
            <tr><th>Mục tiêu</th><td>{detail.targetPos}</td></tr>
            <tr><th>Ngày kế hoạch</th><td>{fmtDate(detail.planDate)}</td></tr>
            <tr><th>Trạng thái</th><td>{detail.status}</td></tr>
          </tbody></table>
        )}
      </Modal>

      <Modal open={importOpen} onOk={()=>setImportOpen(false)} onCancel={()=>setImportOpen(false)} title="Import lộ trình (demo)">
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon"><UploadOutlined/></p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
