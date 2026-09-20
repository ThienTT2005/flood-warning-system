# Decision Log

## Đã thống nhất

### DEC-001 Phạm vi hệ thống

- **Quyết định:** Xây dựng hệ thống phát hiện ngập từ video và cảnh báo theo thời gian.
- **Không bao gồm:** Dự báo thủy văn trước khi ngập xuất hiện.
- **Lý do:** Phù hợp dữ liệu, năng lực nhóm và thời gian môn học.

### DEC-002 Hướng AI chính

- **Quyết định:** Dùng semantic segmentation làm hướng mục tiêu.
- **Baseline:** ResNet18 classification để xác nhận pipeline huấn luyện.
- **Lý do:** Segmentation cho phép ước lượng tỷ lệ vùng ngập.

### DEC-003 Chiến lược dữ liệu

- **Quyết định:** Ưu tiên Flood Amateur Video và dùng FloodNet để bổ sung.
- **Lý do:** Video nghiệm thu nhiều khả năng có góc nhìn mặt đất, trong khi FloodNet chủ yếu là UAV.

### DEC-004 Logic cảnh báo

- **Quyết định:** Dùng sliding window thay vì tạo cảnh báo từ một frame.
- **Lý do:** Giảm cảnh báo giả do phản xạ, sông, hồ hoặc nhiễu ngắn hạn.

### DEC-005 Cách làm song song

- **Quyết định:** Backend và dashboard dùng mock data trước khi model hoàn thiện.
- **Lý do:** Tránh việc hai thành viên phải chờ người phụ trách AI.

## Cần xác nhận

### DEC-P01 Backend

- Phương án đề xuất: FastAPI.
- Phương án thay thế: Node.js.
- Trạng thái: Chưa chốt.

### DEC-P02 Database

- Phương án đề xuất: SQLite cho demo, PostgreSQL khi tích hợp.
- Trạng thái: Chưa chốt.

### DEC-P03 Cập nhật dashboard

- Phương án đề xuất: Polling cho phiên bản cơ sở.
- Phương án mở rộng: WebSocket.
- Trạng thái: Chưa chốt.

### DEC-P04 Ngưỡng cảnh báo

- Giá trị hiện tại chỉ là tham chiếu thử nghiệm.
- Cần xác nhận sau khi có kết quả trên tập validation và video demo.

