# Flood AI v1 (unet_r34_v1+cls_r18_v1)

## Cài đặt
pip install -r requirements.txt

## Sử dụng
```python
import cv2
from predictor import FloodPredictor
p = FloodPredictor('weights/unet_r34_v1.pt', 'weights/cls_r18_v1.pt')   # tự chọn GPU nếu có
r = p.predict(cv2.imread('frame.jpg'))   # frame BGR từ cv2.VideoCapture cũng được
```

## Output (SRS 5.3)
| Trường | Ý nghĩa |
|---|---|
| is_flood | True khi confidence >= 0.70 VÀ water_area_ratio >= 0.05 |
| confidence | Xác suất có lũ của classifier (0..1) |
| flood_area_ratio | Tỷ lệ pixel ngập (0..1); = 0 nếu is_flood = False |
| water_area_ratio | (bổ sung) tỷ lệ nước thô của U-Net, dùng debug |
| model_version | unet_r34_v1+cls_r18_v1 |
| mask | ảnh uint8 0/255 cùng kích thước frame (bỏ bằng return_mask=False) |

Backend bổ sung: frame_index, timestamp_ms, mask_path.

## Kết quả đánh giá (tập test tách biệt)
- U-Net: IoU 0.828, mIoU 0.856, F1 0.906, area MAE 0.034
- Classifier: Acc 0.950, Precision 0.938, Recall 0.932, F1 0.935
- Latency U-Net: GPU L4 ~8 ms/frame, CPU ~760 ms/frame (12 core)

## Giới hạn đã biết
- Ngập rất nông (đường ướt, vũng nhỏ) dễ bị bỏ sót.
- Kết quả từng frame có thể nhiễu lẻ, cần temporal filtering của Alert Engine (window=5, positive_count=3).
