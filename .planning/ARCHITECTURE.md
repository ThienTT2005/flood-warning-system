# System Architecture

## Luồng xử lý tổng thể

```text
Video hoặc Camera mô phỏng
            ↓
      Video Service
      kiểm tra và tách frame
            ↓
       AI Inference
  confidence mask flood area
            ↓
       Alert Engine
 sliding window và phân mức
            ↓
       Backend API
            ↓
   Database và File Storage
            ↓
        Dashboard
```

## Các thành phần

| Thành phần | Trách nhiệm | Công nghệ dự kiến |
|---|---|---|
| AI | Huấn luyện và chạy mô hình | Python, PyTorch |
| Video Service | Đọc video, lấy mẫu frame, overlay | OpenCV |
| Alert Engine | Lọc theo thời gian, phân mức cảnh báo | Python |
| Backend | Quản lý job, API và lịch sử | FastAPI |
| Database | Lưu metadata và cảnh báo | SQLite hoặc PostgreSQL |
| Dashboard | Hiển thị trạng thái và kết quả | React hoặc HTML/CSS/JS |

## Hợp đồng đầu ra AI

```json
{
  "frame_index": 120,
  "timestamp_ms": 4000,
  "is_flood": true,
  "confidence": 0.93,
  "flood_area_ratio": 0.41,
  "mask_path": "evidence/job-001/frame-120.png",
  "model_version": "unet-v1"
}
```

## API cơ sở

| Phương thức | Endpoint | Mục đích |
|---|---|---|
| `POST` | `/api/videos` | Upload video và tạo job |
| `GET` | `/api/jobs/{id}` | Xem trạng thái xử lý |
| `GET` | `/api/cameras` | Danh sách nguồn video |
| `POST` | `/api/cameras` | Tạo nguồn video |
| `GET` | `/api/alerts` | Lọc và phân trang cảnh báo |
| `GET` | `/api/alerts/{id}` | Xem chi tiết cảnh báo |
| `GET` | `/api/dashboard/summary` | Lấy dữ liệu tổng quan |
| `GET` | `/api/config` | Đọc cấu hình |
| `PUT` | `/api/config` | Cập nhật cấu hình |

## Thực thể dữ liệu chính

- `Camera`
- `VideoJob`
- `FrameResult`
- `Alert`
- `AlertEvidence`
- `SystemConfig`

## Logic cảnh báo khởi tạo

Các giá trị này chỉ phục vụ thử nghiệm và phải được hiệu chỉnh:

- Lấy mẫu: 1 frame/giây.
- Confidence threshold: 0,70.
- Sliding window: 5 frame.
- Số frame dương tính tối thiểu: 3.
- Cooldown giữa hai cảnh báo trùng: 30 giây.

