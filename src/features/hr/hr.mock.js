import dayjs from "dayjs";

/* =========================
 * MOCK SEED (đồng bộ field)
 * ========================= */
export const mockDB = {
  contracts: [
    {
      id: 1,
      empCode: "NV001",
      empName: "Nguyễn Văn A",
      type: "Xác định thời hạn",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      status: "Hiệu lực",
    },
    {
      id: 2,
      empCode: "NV002",
      empName: "Trần Thị B",
      type: "Thử việc",
      startDate: "2024-11-01",
      endDate: "2025-01-01",
      status: "Sắp hết hạn",
    },
    {
      id: 3,
      empCode: "NV003",
      empName: "Lê Văn C",
      type: "Không xác định thời hạn",
      startDate: "2022-07-15",
      endDate: "9999-12-31",
      status: "Hiệu lực",
    },
  ],

  // TransfersPage: empCode, empName, fromDept, toDept, transferDate, status, note
  transfers: [
    {
      id: 1,
      empCode: "NV003",
      empName: "Lê Văn C",
      fromDept: "Kinh doanh",
      toDept: "Sản xuất",
      transferDate: "2024-12-01",
      status: "Hoàn tất",
      note: "Điều chuyển theo dự án quý IV",
    },
    {
      id: 2,
      empCode: "NV004",
      empName: "Phạm D",
      fromDept: "Văn phòng",
      toDept: "Kinh doanh",
      transferDate: "2025-01-10",
      status: "Đang xử lý",
      note: "",
    },
  ],

  // TrainingPage: empCode, empName, course, date, hours, result
  training: [
    {
      id: 1,
      empCode: "NV001",
      empName: "Nguyễn Văn A",
      course: "An toàn lao động",
      date: "2024-10-10",
      hours: 4,
      result: "Đạt",
    },
    {
      id: 2,
      empCode: "NV002",
      empName: "Trần Thị B",
      course: "5S tại xưởng",
      date: "2024-11-20",
      hours: 3,
      result: "Không đạt",
    },
  ],

  // RewardsPage: empCode, empName, rewardType, date, reason
  rewards: [
    {
      id: 1,
      empCode: "NV002",
      empName: "Trần Thị B",
      rewardType: "Khen thưởng tháng",
      date: "2024-09-02",
      reason: "Hoàn thành chỉ tiêu 120%",
    },
    {
      id: 2,
      empCode: "NV001",
      empName: "Nguyễn Văn A",
      rewardType: "Sáng kiến cải tiến",
      date: "2024-12-15",
      reason: "Đề xuất tối ưu quy trình đóng gói",
    },
  ],

  // DisciplinesPage: empCode, empName, disType, level, date, reason
  disciplines: [
    {
      id: 1,
      empCode: "NV004",
      empName: "Phạm D",
      disType: "Khiển trách",
      level: "Cấp 1",
      date: "2024-08-15",
      reason: "Đi muộn nhiều lần",
    },
    {
      id: 2,
      empCode: "NV005",
      empName: "Võ E",
      disType: "Cảnh cáo",
      level: "Cấp 2",
      date: "2024-11-05",
      reason: "Không tuân thủ nội quy an toàn",
    },
  ],

  // CareerPathPage: empCode, empName, currentPos, targetPos, planDate, status
  career: [
    {
      id: 1,
      empCode: "NV001",
      empName: "Nguyễn Văn A",
      currentPos: "Nhân viên",
      targetPos: "Tổ trưởng",
      planDate: "2025-06-30",
      status: "Đang phát triển",
    },
    {
      id: 2,
      empCode: "NV003",
      empName: "Lê Văn C",
      currentPos: "Tổ trưởng",
      targetPos: "Quản đốc",
      planDate: "2025-12-31",
      status: "Đang phát triển",
    },
  ],

  // CertificatesPage: empCode, empName, name, issuedBy, issueDate, expiryDate, status
  certificates: [
    {
      id: 1,
      empCode: "NV001",
      empName: "Nguyễn Văn A",
      name: "An toàn điện",
      issuedBy: "Sở LĐTBXH",
      issueDate: "2024-03-01",
      expiryDate: "2026-03-01",
      status: "Còn hạn",
    },
    {
      id: 2,
      empCode: "NV002",
      empName: "Trần Thị B",
      name: "ISO 9001:2015",
      issuedBy: "Tổ chức A",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      status: "Còn hạn",
    },
    {
      id: 3,
      empCode: "NV004",
      empName: "Phạm D",
      name: "PCCC cơ bản",
      issuedBy: "Cảnh sát PCCC",
      issueDate: "2022-01-20",
      expiryDate: "2024-01-20",
      status: "Hết hạn",
    },
  ],

  // ProbationPage: empCode, empName, startDate, endDate, result, status
  probation: [
    {
      id: 1,
      empCode: "STT0001",
      empName: "Võ E",
      startDate: "2024-11-01",
      endDate: "2025-01-01",
      result: "Đang đánh giá",
      status: "Đang thử việc",
    },
    {
      id: 2,
      empCode: "STT0002",
      empName: "Đào G",
      startDate: "2024-08-15",
      endDate: "2024-10-15",
      result: "Đạt",
      status: "Hoàn tất",
    },
  ],
};

/* =========================
 * CRUD GIẢ LẬP
 * ========================= */
let seq = 1000;
export const hrRepo = {
  list: (key) => [...(mockDB[key] || [])],
  create: (key, payload) => {
    const row = { id: ++seq, ...payload };
    mockDB[key].push(row);
    return row;
  },
  update: (key, id, payload) => {
    const i = mockDB[key].findIndex((x) => x.id === id);
    if (i >= 0) mockDB[key][i] = { ...mockDB[key][i], ...payload };
    return mockDB[key][i];
  },
  remove: (key, id) => {
    mockDB[key] = mockDB[key].filter((x) => x.id !== id);
  },
};

/* =========================
 * Helpers
 * ========================= */
export const fmtDate = (d) => (d ? dayjs(d).format("DD/MM/YYYY") : "");

export const contractStatusColor = (status) =>
  ({
    "Hiệu lực": "green",
    "Sắp hết hạn": "orange",
    "Hết hạn": "red",
  }[status] || "default");
