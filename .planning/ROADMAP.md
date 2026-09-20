# Implementation Roadmap

## Nguyên tắc triển khai

Ba thành viên làm song song. Backend và dashboard dùng mock data trong khi mô hình AI chưa hoàn thiện, sau đó thay bằng dữ liệu thật qua hợp đồng đã thống nhất.

## Giai đoạn 1 Chuẩn bị và phân tích

- [x] Xác định mục tiêu và phạm vi.
- [x] Lựa chọn hướng semantic segmentation.
- [x] Xác định các dataset dự kiến.
- [x] Xây dựng BRD.
- [x] Xây dựng SRS.
- [ ] Tạo repository và cấu trúc thư mục dự án.
- [ ] Chốt FastAPI hoặc Node.js.
- [ ] Chốt SQLite hoặc PostgreSQL.

## Giai đoạn 2 Baseline AI

### Người A AI và Dataset

- [ ] Tải và kiểm tra Flood Area Segmentation.
- [ ] Tải và kiểm tra FloodNet.
- [ ] Tải Flood Amateur Video for Semantic Segmentation.
- [ ] Trực quan hóa ảnh và mask.
- [ ] Chia train, validation và test.
- [ ] Huấn luyện ResNet18 classification baseline.
- [ ] Báo cáo Accuracy, Precision, Recall và F1.

### Điều kiện hoàn thành

- Notebook chạy lại được từ đầu.
- Có model baseline và biểu đồ loss/accuracy.
- Có ví dụ dự đoán đúng và sai.

## Giai đoạn 3 Segmentation và video pipeline

### Người A

- [ ] Xây dựng Dataset và DataLoader cho segmentation.
- [ ] Fine-tune U-Net hoặc DeepLabV3+.
- [ ] Đánh giá IoU, mIoU, Pixel Accuracy và F1.
- [ ] Xuất model cùng hướng dẫn tiền xử lý.

### Người B Video và Backend

- [ ] Đọc video bằng OpenCV.
- [ ] Lấy mẫu frame theo cấu hình.
- [ ] Tạo hàm `predict(frame)` giả.
- [ ] Xây dựng sliding window.
- [ ] Tạo processing job và trạng thái.
- [ ] Xây API upload video.
- [ ] Thiết kế database.

### Điều kiện hoàn thành

- Một video được xử lý xuyên suốt bằng model giả.
- Backend trả được tiến độ và kết quả mẫu.
- Model segmentation thật có thể thay vào không đổi API.

## Giai đoạn 4 Dashboard và tích hợp

### Người C Dashboard và Báo cáo

- [ ] Dựng trang upload video.
- [ ] Dựng dashboard tổng quan.
- [ ] Dựng lịch sử cảnh báo.
- [ ] Dựng trang chi tiết cảnh báo.
- [ ] Kết nối mock API.
- [ ] Thay mock data bằng backend thật.

### Cả nhóm

- [ ] Tích hợp model thật vào video pipeline.
- [ ] Kiểm thử video ngập và không ngập.
- [ ] Hiệu chỉnh ngưỡng cảnh báo.
- [ ] Đo thời gian xử lý và alert latency.

## Giai đoạn 5 Hoàn thiện và nghiệm thu

- [ ] Test trên video ngoài tập huấn luyện.
- [ ] Sửa lỗi tích hợp.
- [ ] Hoàn thiện README hướng dẫn chạy.
- [ ] Cập nhật kết quả thực nghiệm vào báo cáo.
- [ ] Chuẩn bị slide và kịch bản demo.
- [ ] Tổng duyệt demo và chuẩn bị câu hỏi phản biện.

## Definition of Done cho một chức năng

- Đáp ứng yêu cầu tương ứng trong `REQUIREMENTS.md`.
- Có xử lý trường hợp thành công và lỗi chính.
- Có dữ liệu hoặc kịch bản kiểm thử.
- Không phá vỡ hợp đồng API đã thống nhất.
- Được ít nhất một thành viên khác chạy thử hoặc xem lại.
- Tài liệu liên quan đã được cập nhật.

