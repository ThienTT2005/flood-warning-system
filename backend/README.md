# Bàn giao Backend & Xử lý Video (Cập nhật AI v1: ResNet18 + U-Net) — Người B

## File sản phẩm bàn giao
- `main.py` — Mã nguồn FastAPI hoàn chỉnh tích hợp OpenCV, thuật toán Sliding Window và mô hình AI mới nhất từ Người A (`unet_r34_v1 + cls_r18_v1`).

---

## API Endpoint dành cho Người C (Frontend)
- **Method:** `POST`
- **Endpoint:** `/api/analyze-flood`
- **Content-Type:** `multipart/form-data`
- **Param:** `file` (File video định dạng `.mp4`)

### Cấu trúc JSON Phản hồi (Response mẫu)
```json
{
  "status": "Hoàn thành",
  "video_name": "flood_test.mp4",
  "model_version": "unet_r34_v1+cls_r18_v1",
  "total_frames_analyzed": 30,
  "flood_frames": 24,
  "average_confidence": 92.4,
  "average_flood_area_pct": 66.39,
  "conclusion": "CÓ DẤU HIỆU NGẬP",
  "evidence_frames": [
    "/9j/4AAQSkZJRgABAQEAYABgAAD..." 
  ],
  "evidence_masks": [
    "/9j/4AAQSkZJRgABAQEAYABgAAD..."
  ],
  "frames_log": [
    {
      "is_flood": true,
      "confidence": 0.95,
      "flood_area_ratio": 0.65,
      "water_area_ratio": 0.65,
      "model_version": "unet_r34_v1+cls_r18_v1",
      "frame_index": 30,
      "timestamp_ms": 1000,
      "mask_path": "masks/mask_f30_abc123.png"
    }
  ]
}