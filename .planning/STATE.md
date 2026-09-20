# Current Project State

## Trạng thái tổng thể

**Giai đoạn hiện tại:** Phân tích yêu cầu và chuẩn bị triển khai.

## Đã hoàn thành

- Xác định đề tài và mục tiêu nghiệm thu.
- Phân tích classification, detection và segmentation.
- Chọn semantic segmentation làm hướng chính.
- Xác định Flood Amateur Video là nguồn dữ liệu chính và FloodNet là nguồn bổ sung.
- Đề xuất pipeline xử lý video và Alert Engine.
- Phân công ba mảng AI, video/backend và dashboard/báo cáo.
- Soạn BRD phiên bản 1.0.
- Soạn SRS phiên bản 1.0.
- Tạo thư mục `.planning` và bộ tài liệu lập kế hoạch.

## Đang thực hiện

- Khám phá cấu trúc dataset.
- Chuẩn bị baseline classification bằng ResNet18.
- Thống nhất công nghệ backend và cơ sở dữ liệu.

## Bước tiếp theo ưu tiên

1. Tạo repository và cấu trúc mã nguồn.
2. Chốt FastAPI và SQLite/PostgreSQL.
3. Người A tạo notebook khám phá dữ liệu.
4. Người B tạo video pipeline với `predict()` giả.
5. Người C tạo dashboard với mock data.
6. Thống nhất JSON đầu ra AI trước khi tích hợp.

## Blocker hiện tại

- Chưa có kết quả kiểm tra thực tế cấu trúc các dataset.
- Chưa có model và metrics thực nghiệm.
- Chưa chốt giới hạn video upload.
- Chưa xác định ngưỡng cảnh báo cuối cùng.

## Cập nhật gần nhất

- **Ngày:** 20/09/2026
- **Nội dung:** Hoàn thành BRD, SRS và khởi tạo planning workspace.

