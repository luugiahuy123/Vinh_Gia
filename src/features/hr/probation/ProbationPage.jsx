import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import "../../hr/hr.css";

export default function ProbationPage(){
  const [rows, setRows] = useState(() => hrRepo.list("probation"));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [menu, setMenu] = useState({ open:false, x:0, y:0, row:null });

  const data = useMemo(()=> rows.filter(r =>
    [r.empCode, r.empName, r.result, r.status].join(" ").toLowerCase().includes(q.toLowerCase())
  ), [rows, q]);

  const columns = [
    { title:"STT", dataIndex:"empCode", },
    { title:"Họ tên", dataIndex:"empName" },
    { title:"Bắt đầu", dataIndex:"startDate", render:v=>fmtDate(v) },
    { title:"Kết thúc", dataIndex:"endDate",  render:v=>fmtDate(v) },
    { title:"Kết quả", dataIndex:"result",  },
    { title:"Trạng thái", dataIndex:"status", },
  ];

  const handleRowClick = (row)=> setDetail(row);
  const handleRowContextMenu = (e,row)=>{ e.preventDefault(); setMenu({open:true,x:e.clientX,y:e.clientY,row}); };

  const onCreate = ()=>{ setEditing(null); form.resetFields(); setOpen(true); };
  const onEdit = (row)=>{
    setEditing(row);
    form.setFieldsValue({
      ...row,
      startDate: dayjs(row.startDate),
      endDate: dayjs(row.endDate),
    });
    setOpen(true);
  };
  const onDelete = (id)=>{ hrRepo.remove("probation", id); setRows(hrRepo.list("probation")); };
  const onSubmit = async ()=>{
    const v = await form.validateFields();
    const payload = {
      ...v,
      startDate: v.startDate.format("YYYY-MM-DD"),
      endDate: v.endDate.format("YYYY-MM-DD"),
    };
    editing ? hrRepo.update("probation", editing.id, payload) : hrRepo.create("probation", payload);
    setRows(hrRepo.list("probation")); setOpen(false);
  };

  return (
    <BasePageClassic
      title="Thử việc & ĐGTV"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}><span className="btn-ic">＋</span> Thêm</button>
          <button className="btn-pill" onClick={()=>setImportOpen(true)}><span className="btn-ic">⤴</span> Import</button>
          <input className="emp-search" placeholder="Tìm: NV / Kết quả / Trạng thái" value={q} onChange={e=>setQ(e.target.value)} />
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

      <Modal open={open} onOk={onSubmit} onCancel={()=>setOpen(false)} title={editing?"Sửa thử việc":"Thêm thử việc"}>
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="startDate" label="Bắt đầu" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="endDate" label="Kết thúc" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="result" label="Kết quả" rules={[{required:true}]}>
            <Select options={[{value:"Đạt",label:"Đạt"},{value:"Không đạt",label:"Không đạt"},{value:"Gia hạn",label:"Gia hạn"}]} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{required:true}]}>
            <Select options={[{value:"Đang thử việc",label:"Đang thử việc"},{value:"Hoàn tất",label:"Hoàn tất"}]} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={!!detail} onCancel={()=>setDetail(null)} footer={null} title="Chi tiết thử việc">
        {detail && (
          <table className="emp-detail-table"><tbody>
            <tr><th>Mã NV</th><td>{detail.empCode}</td></tr>
            <tr><th>Họ tên</th><td>{detail.empName}</td></tr>
            <tr><th>Bắt đầu</th><td>{fmtDate(detail.startDate)}</td></tr>
            <tr><th>Kết thúc</th><td>{fmtDate(detail.endDate)}</td></tr>
            <tr><th>Kết quả</th><td>{detail.result}</td></tr>
            <tr><th>Trạng thái</th><td>{detail.status}</td></tr>
          </tbody></table>
        )}
      </Modal>

      <Modal open={importOpen} onOk={()=>setImportOpen(false)} onCancel={()=>setImportOpen(false)} title="Import thử việc (demo)">
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon"><UploadOutlined/></p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
