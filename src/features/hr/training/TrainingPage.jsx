import React, { useMemo, useState } from "react";
import BasePageClassic from "../components/BasePageClassic";
import EmpTable from "../components/EmpTable";
import RowContextMenu from "../components/RowContextMenu";
import { Modal, Form, Input, DatePicker, Select, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hrRepo, fmtDate } from "../hr.mock";
import dayjs from "dayjs";
import "../../hr/hr.css";

export default function TrainingPage(){
  const [rows, setRows] = useState(() => hrRepo.list("training"));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [menu, setMenu] = useState({ open:false, x:0, y:0, row:null });

  const data = useMemo(() => rows.filter(r =>
    [r.empCode, r.empName, r.course, r.result, r.status].join(" ").toLowerCase().includes(q.toLowerCase())
  ), [rows, q]);

  const columns = [
    { title:"Mã NV", dataIndex:"empCode",  },
    { title:"Họ tên", dataIndex:"empName" },
    { title:"Khoá học", dataIndex:"course",  },
    { title:"Ngày học", dataIndex:"date",  render:v=>fmtDate(v) },
    { title:"Số giờ", dataIndex:"hours", },
    { title:"Kết quả", dataIndex:"result",  },
  ];

  const handleRowClick = (row)=> setDetail(row);
  const handleRowContextMenu = (e,row)=>{ e.preventDefault(); setMenu({open:true,x:e.clientX,y:e.clientY,row}); };

  const onCreate = ()=>{ setEditing(null); form.resetFields(); setOpen(true); };
  const onEdit = (row)=>{
    setEditing(row);
    form.setFieldsValue({ ...row, date: dayjs(row.date) });
    setOpen(true);
  };
  const onDelete = (id)=>{ hrRepo.remove("training", id); setRows(hrRepo.list("training")); };
  const onSubmit = async ()=>{
    const v = await form.validateFields();
    const payload = { ...v, date: v.date.format("YYYY-MM-DD") };
    editing ? hrRepo.update("training", editing.id, payload) : hrRepo.create("training", payload);
    setRows(hrRepo.list("training")); setOpen(false);
  };

  return (
    <BasePageClassic
      title="Đào tạo"
      extra={
        <div className="emp-actions">
          <button className="btn-pill is-fill" onClick={onCreate}><span className="btn-ic">＋</span> Thêm</button>
          <button className="btn-pill" onClick={()=>setImportOpen(true)}><span className="btn-ic">⤴</span> Import</button>
          <input className="emp-search" placeholder="Tìm: NV / Khoá học / Kết quả" value={q} onChange={e=>setQ(e.target.value)} />
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

      <Modal open={open} onOk={onSubmit} onCancel={()=>setOpen(false)} title={editing?"Sửa đào tạo":"Thêm đào tạo"}>
        <Form form={form} layout="vertical">
          <Form.Item name="empCode" label="Mã NV" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="empName" label="Họ tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="course" label="Khoá học" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="date" label="Ngày học" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="hours" label="Số giờ" rules={[{required:true}]}><InputNumber min={1} style={{width:"100%"}}/></Form.Item>
          <Form.Item name="result" label="Kết quả" rules={[{required:true}]}>
            <Select options={[{value:"Đạt",label:"Đạt"},{value:"Không đạt",label:"Không đạt"}]} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={!!detail} onCancel={()=>setDetail(null)} footer={null} title="Chi tiết đào tạo">
        {detail && (
          <table className="emp-detail-table"><tbody>
            <tr><th>Mã NV</th><td>{detail.empCode}</td></tr>
            <tr><th>Họ tên</th><td>{detail.empName}</td></tr>
            <tr><th>Khoá học</th><td>{detail.course}</td></tr>
            <tr><th>Ngày học</th><td>{fmtDate(detail.date)}</td></tr>
            <tr><th>Số giờ</th><td>{detail.hours}</td></tr>
            <tr><th>Kết quả</th><td>{detail.result}</td></tr>
          </tbody></table>
        )}
      </Modal>

      <Modal open={importOpen} onOk={()=>setImportOpen(false)} onCancel={()=>setImportOpen(false)} title="Import đào tạo (demo)">
        <Upload.Dragger multiple={false} accept=".xlsx,.xls,.csv">
          <p className="ant-upload-drag-icon"><UploadOutlined/></p>
          <p>Kéo thả file vào đây hoặc bấm để chọn</p>
        </Upload.Dragger>
      </Modal>
    </BasePageClassic>
  );
}
