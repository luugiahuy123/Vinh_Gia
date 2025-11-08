import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import "../../hr/hr.css";

export default function CertificatesPage(){
  const [rows, setRows] = useState(() => hrRepo.list("certificates"));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [menu, setMenu] = useState({ open:false, x:0, y:0, row:null });

  const data = useMemo(()=> rows.filter(r =>
    [r.empCode, r.empName, r.name, r.issuedBy, r.status].join(" ").toLowerCase().includes(q.toLowerCase())
  ), [rows, q]);

  const columns = [
    { title:"Mã NV", dataIndex:"empCode",  },
    { title:"Họ tên", dataIndex:"empName" },
    { title:"Chứng chỉ", dataIndex:"name",  },
    { title:"Đơn vị cấp", dataIndex:"issuedBy", },
    { title:"Cấp ngày", dataIndex:"issueDate", render:v=>fmtDate(v) },
    { title:"Hết hạn", dataIndex:"expiryDate",  render:v=>fmtDate(v) },
    { title:"Trạng thái", dataIndex:"status",},
  ];

  const handleRowClick = (row)=> setDetail(row);
  const handleRowContextMenu = (e,row)=>{ e.preventDefault(); setMenu({open:true,x:e.clientX,y:e.clientY,row}); };

  const onCreate = ()=>{ setEditing(null); form.resetFields(); setOpen(true); };
  const onEdit = (row)=>{
    setEditing(row);
    form.setFieldsValue({
      ...row,
      issueDate: dayjs(row.issueDate),
      expiryDate: dayjs(row.expiryDate),
    });
    setOpen(true);
  };
  const onDelete = (id)=>{ hrRepo.remove("certificates", id); setRows(hrRepo.list("certificates")); };
  const onSubmit = async ()=>{
    const v = await form.validateFields();
    const payload = {
      ...v,
      issueDate: v.issueDate.format("YYYY-MM-DD"),
      expiryDate: v.expiryDate.format("YYYY-MM-DD"),
    };
    editing ? hrRepo.update("certificates", editing.id, payload) : hrRepo.create("certificates", payload);
    setRows(hrRepo.list("certificates")); setOpen(false);
  };

  return (
    <BasePageClassic
      title="Chứng chỉ"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}><span className="btn-ic">＋</span> Thêm</button>
          <button className="btn-pill" onClick={()=>setImportOpen(true)}><span className="btn-ic">⤴</span> Import</button>
          <input className="emp-search" placeholder="Tìm: NV / Chứng chỉ / Đơn vị cấp" value={q} onChange={e=>setQ(e.target.value)} />
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

      <Modal open={open} onOk={onSubmit} onCancel={()=>setOpen(false)} title={editing?"Sửa chứng chỉ":"Thêm chứng chỉ"}>
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="name" label="Chứng chỉ" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="issuedBy" label="Đơn vị cấp"><Input/></Form.Item>
          <Form.Item name="issueDate" label="Cấp ngày" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="expiryDate" label="Hết hạn" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{required:true}]}><Select options={[
            {value:"Còn hạn",label:"Còn hạn"},{value:"Sắp hết hạn",label:"Sắp hết hạn"},{value:"Hết hạn",label:"Hết hạn"}]}/></Form.Item>
        </Form>
      </Modal>

      <Modal open={!!detail} onCancel={()=>setDetail(null)} footer={null} title="Chi tiết chứng chỉ">
        {detail && (
          <table className="emp-detail-table"><tbody>
            <tr><th>Mã NV</th><td>{detail.empCode}</td></tr>
            <tr><th>Họ tên</th><td>{detail.empName}</td></tr>
            <tr><th>Chứng chỉ</th><td>{detail.name}</td></tr>
            <tr><th>Đơn vị cấp</th><td>{detail.issuedBy || "-"}</td></tr>
            <tr><th>Cấp ngày</th><td>{fmtDate(detail.issueDate)}</td></tr>
            <tr><th>Hết hạn</th><td>{fmtDate(detail.expiryDate)}</td></tr>
            <tr><th>Trạng thái</th><td>{detail.status}</td></tr>
          </tbody></table>
        )}
      </Modal>

      <Modal open={importOpen} onOk={()=>setImportOpen(false)} onCancel={()=>setImportOpen(false)} title="Import chứng chỉ (demo)">
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon"><UploadOutlined/></p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
