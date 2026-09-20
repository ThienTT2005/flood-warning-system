# Project Overview

## Thông tin dự án

- **Tên đề tài:** Hệ thống cảnh báo ngập úng dựa trên video
- **Môn học:** Phát triển hệ thống thông minh
- **Nhân sự:** Nhóm 3 thành viên
- **Loại hệ thống:** Computer Vision kết hợp xử lý video và dashboard giám sát

## Mục tiêu

Xây dựng hệ thống có khả năng nhận video, tự động phân tích các khung hình, phát hiện vùng có dấu hiệu ngập và tạo cảnh báo để hiển thị trên dashboard.

Hệ thống tập trung vào **phát hiện nhanh dấu hiệu ngập đang xuất hiện**, không dự báo ngập trước khi xảy ra bằng dữ liệu thủy văn.

## Đầu vào và đầu ra

### Đầu vào

- File video ngập lụt, lũ quét hoặc video không ngập dùng để đối chứng.
- Thông tin nguồn video hoặc camera mô phỏng.
- Cấu hình ngưỡng nhận diện và luật cảnh báo.

### Đầu ra

- Xác suất xuất hiện ngập.
- Mask phân đoạn vùng ngập.
- Tỷ lệ diện tích vùng ngập.
- Mức cảnh báo và thời điểm phát hiện.
- Frame bằng chứng hoặc video có overlay.
- Lịch sử cảnh báo trên dashboard.

## Phạm vi phiên bản cơ sở

- Upload và kiểm tra video.
- Tách frame bằng OpenCV.
- Chạy mô hình AI trên frame.
- Tổng hợp kết quả bằng sliding window.
- Tạo và lưu cảnh báo.
- Hiển thị dashboard và lịch sử.
- Đánh giá mô hình bằng các chỉ số phù hợp.

## Ngoài phạm vi

- Dự báo thủy văn trước khi ngập xuất hiện.
- Triển khai thực tế trên quy mô thành phố.
- Tích hợp SMS, cuộc gọi hoặc cơ quan chức năng.
- Cam kết sử dụng như một hệ thống an toàn khẩn cấp thực tế.

## Tiêu chí hoàn thành

- Luồng `Video → Frame → AI → Alert Engine → Database → Dashboard` hoạt động xuyên suốt.
- Demo được tối thiểu một video có ngập và một video không ngập.
- Cảnh báo không được tạo chỉ từ một frame nhiễu nếu cấu hình yêu cầu nhiều frame.
- Có số liệu Accuracy, Precision, Recall, F1 hoặc IoU, mIoU và Pixel Accuracy.
- Có số đo thời gian xử lý và độ trễ cảnh báo.
- Có BRD, SRS, báo cáo và hướng dẫn chạy hệ thống.

