# Flood AI v2 (seg_segformer_b2_v1 + cls_siglip_lp_v1)

## Kiến trúc
Frame → **Classifier SigLIP + linear probe** (có lũ không?) → **SegFormer-B2** (khoanh vùng nước) → kết quả.
`is_flood = True` chỉ khi confidence ≥ 0.70 **và** vùng nước ≥ 5% khung hình.

## Cài đặt
pip install -r requirements.txt
Thư mục `weights/` phải có: `seg_segformer_b2_v1.pt`, `cls_siglip_lp_v1.pt`, `siglip/` (≈400 MB, lấy từ Drive nhóm).

## Sử dụng
```python
import cv2
from predictor import FloodPredictor
p = FloodPredictor('weights/seg_segformer_b2_v1.pt', 'weights/cls_siglip_lp_v1.pt')   # tự chọn GPU nếu có
r = p.predict(frame_bgr)        # frame từ cv2.VideoCapture; frame hỏng → ValueError (bắt lỗi, bỏ qua frame)
```

## Output (SRS 5.3)
| Trường | Ý nghĩa |
|---|---|
| is_flood | True khi confidence ≥ 0.70 và water_area_ratio ≥ 0.05 |
| confidence | Xác suất có lũ của classifier (0..1) |
| flood_area_ratio | Tỷ lệ pixel ngập (0..1); = 0 nếu is_flood = False |
| water_area_ratio | (bổ sung) tỷ lệ nước thô của SegFormer, dùng debug |
| model_version | seg_segformer_b2_v1+cls_siglip_lp_v1 |
| mask | uint8 0/255 cùng kích thước frame (bỏ bằng return_mask=False) |
Backend bổ sung: frame_index, timestamp_ms, mask_path. Alert Engine: cửa sổ 5 frame, cần ≥ 3 frame ngập.

## Kết quả đánh giá
- Classifier (456 ảnh test): Acc 0.985, Precision 0.978, Recall 0.983, F1 0.980, AUC 0.999 (ResNet18 cũ: F1 0.935)
- Segmentation (44 ảnh test): IoU 0.849, mIoU 0.872, F1 0.918 (U-Net R34 cũ: IoU 0.828)
- 25 video test (cấp sự kiện): phát hiện 7/9, báo giả 0/16, cảnh báo sớm sai 0, độ trễ ≈ 2 s
  (hệ thống cũ: phát hiện 6/9, báo giả 10/16)
- CPU: ≈ 424 ms/frame (12 core)

## Kiểm thử
`python test_release.py` → 21/21 PASS (xem test_report.json).
Có thể thêm: `python test_release.py <thư_mục_video> <nhãn.csv>` để chạy kiểm thử trên video.

## Giới hạn đã biết
- Video ngập thật trong tập test còn ít (6 video), video chuyển tiếp là video ghép.
- Ngập rất nông (đường ướt, vũng nhỏ) dễ bị bỏ sót.
- Chưa có video quay tại Việt Nam.
