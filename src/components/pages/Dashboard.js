// Dashboard.js
import React from 'react';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* Phần NHÂN SỰ */}
        <div className="personnel-section">
          <div className="section-header">
            <h1>NHÂN SỰ</h1>
            <div className="total-employees">
              <span className="total-number">128</span>
              <span className="total-label">TỔNG NV</span>
            </div>
          </div>
        </div>

        {/* Phần Cơ cấu nhân sự */}
        <div className="structure-section">
          <h2>Cơ cấu nhân sự</h2>
          <div className="structure-list">
            <div className="structure-item">
              <span className="structure-name">Sản xuất</span>
            </div>
            <div className="structure-item">
              <span className="structure-name">Kinh doanh</span>
            </div>
            <div className="structure-item">
              <span className="structure-name">Văn phòng</span>
            </div>
          </div>
        </div>

        {/* Phần Lối tắt */}
        <div className="shortcuts-section">
          <h2>Lối tắt</h2>
          <div className="shortcuts-list">
            <div className="shortcut-item">Quản lý Hợp đồng →</div>
            <div className="shortcut-item">Duyệt Nghỉ phép →</div>
            <div className="shortcut-item">Đánh giá KPI →</div>
          </div>
        </div>

        {/* Phần Thông báo */}
        <div className="notice-section">
          <h2>Thông báo</h2>
          <div className="notice-list">
            <div className="notice-item">
              5 hợp đồng sắp hết hạn trong 30 ngày tới.
            </div>
            <div className="notice-item">
              Chu kỳ KPI Q3 sẽ bắt đầu ngày 01/07.
            </div>
          </div>
        </div>

        {/* Phần Toàn thể */}
        <div className="overall-section">
          <h2>Toàn thể</h2>
          <div className="overall-content">
            <div className="overall-item">
              <span className="overall-label"></span>
              <span className="overall-value"></span>
            </div>
          </div>
        </div>

        {/* Phần Biểu đồ Tuyển dụng & Nghỉ việc */}
        <div className="chart-section">
          <h2>Tuyển dụng & Nghỉ việc theo tháng</h2>
          <div className="chart-container">
            <div className="chart-y-axis">
              <div className="y-label">4.0</div>
              <div className="y-label">3.5</div>
              <div className="y-label">3.0</div>
              <div className="y-label">2.5</div>
              <div className="y-label">2.0</div>
              <div className="y-label">1.5</div>
              <div className="y-label">1.0</div>
              <div className="y-label">0.5</div>
              <div className="y-label">0</div>
            </div>
            <div className="chart-content">
              <div className="chart-bars">
                <div className="chart-bar hiring-bar">
                  <div className="bar-label">Tuyển mới</div>
                </div>
                <div className="chart-bar leaving-bar">
                  <div className="bar-label">Nghỉ việc</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phần Sự kiện */}
        <div className="event-section">
          <h2>Sự kiện</h2>
          <div className="event-content">
            <div className="event-item">
              Team building 20/07 tại Vũng Tàu.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;