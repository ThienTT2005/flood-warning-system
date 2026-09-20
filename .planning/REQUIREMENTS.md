# Project Requirements

## Yêu cầu bắt buộc

- `REQ-01`: Hệ thống cho phép tải file video hợp lệ lên để xử lý.
- `REQ-02`: Hệ thống tạo một processing job cho mỗi lần xử lý video.
- `REQ-03`: Video được tách thành frame theo tần suất cấu hình.
- `REQ-04`: Mỗi frame lấy mẫu được đưa qua mô hình AI.
- `REQ-05`: Kết quả AI có confidence, trạng thái ngập và tỷ lệ vùng ngập khi dùng segmentation.
- `REQ-06`: Alert Engine tổng hợp nhiều frame liên tiếp trước khi tạo cảnh báo.
- `REQ-07`: Cảnh báo được phân mức và lưu vào cơ sở dữ liệu.
- `REQ-08`: Mỗi cảnh báo có thời gian, nguồn, mức độ, confidence và flood area.
- `REQ-09`: Dashboard hiển thị tổng quan, lịch sử và chi tiết cảnh báo.
- `REQ-10`: Job lỗi phải có trạng thái `failed` và thông báo nguyên nhân.
- `REQ-11`: Job và cảnh báo phải lưu phiên bản mô hình và cấu hình.
- `REQ-12`: Hệ thống có dữ liệu đánh giá trên tập test tách biệt.

## Yêu cầu nên có

- Tạo video hoặc frame có overlay kết quả.
- Lưu frame bằng chứng cho cảnh báo.
- Cho phép thay đổi ngưỡng mà không sửa mã nguồn.
- Hạn chế cảnh báo trùng trong khoảng cooldown.
- Cho phép lọc lịch sử theo nguồn, mức độ và thời gian.
- Dashboard cập nhật tiến độ xử lý bằng polling.

## Yêu cầu phi chức năng

- File upload phải được kiểm tra định dạng và dung lượng.
- Một job lỗi không được làm dừng toàn bộ backend.
- Các module AI, video, alert và API phải tách biệt.
- Tham số phải đặt trong cấu hình, không hard-code trong logic nghiệp vụ.
- Màu cảnh báo phải đi kèm chữ hoặc biểu tượng.
- Video và dữ liệu có yếu tố cá nhân không được công khai tùy tiện.
- Model tốt nhất, cấu hình và kết quả đánh giá phải được lưu lại.

## Trạng thái processing job

| Trạng thái | Ý nghĩa |
|---|---|
| `queued` | Video đã được tiếp nhận và đang chờ xử lý. |
| `processing` | Hệ thống đang tách frame và chạy mô hình. |
| `completed` | Video đã được xử lý thành công. |
| `failed` | Quá trình xử lý gặp lỗi và đã dừng. |

## Dữ liệu cảnh báo tối thiểu

```json
{
  "camera_id": "CAM-01",
  "job_id": "JOB-001",
  "severity": "WARNING",
  "confidence": 0.93,
  "flood_area_ratio": 0.41,
  "model_version": "unet-v1",
  "created_at": "2026-09-20T15:32:21Z"
}
```

