import cv2
import base64
import shutil
import os
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# 1. IMPORT CLASS DỰ ĐOÁN MỚI CỦA NGƯỜI A
from ai.predictor import FloodPredictor
from pathlib import Path
PROJECT_ROOT = Path(__file__).resolve().parents[1]
AI_DIR = PROJECT_ROOT / "ai"
MASK_DIR = PROJECT_ROOT / "backend" / "masks"

UNET_MODEL_PATH = AI_DIR / "weights" / "unet_r34_v1.pt"
CLS_MODEL_PATH = AI_DIR / "weights" / "cls_r18_v1.pt"

app = FastAPI(title="Flood Detection API v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khởi tạo mô hình AI 1 lần duy nhất khi bật Server (tự động nhận GPU nếu có)
predictor = FloodPredictor(
    str(UNET_MODEL_PATH),
    str(CLS_MODEL_PATH)
)
# Tạo thư mục lưu mask nếu cần trả về mask_path theo SRS 5.3
MASK_DIR.mkdir(parents=True, exist_ok=True)

def encode_image_base64(img_np):
    """Hàm phụ trợ chuyển ảnh OpenCV (BGR hoặc Grayscale Mask) sang Base64"""
    _, buffer = cv2.imencode('.jpg', img_np)
    return base64.b64encode(buffer).decode('utf-8')


# 2. HÀM XỬ LÝ VIDEO VỚI BỘ AI MỚI (RESNET18 + U-NET)
def process_video(video_path: str):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception("Không thể đọc video.")
    
    fps = cap.get(cv2.CAP_PROP_FPS)
    fps = round(fps) if fps > 0 else 30
    
    frame_count = 0
    analyzed_frames = 0
    flood_frames_count = 0
    total_confidence = 0.0
    total_flood_area = 0.0
    
    sliding_window = []
    is_flooded_video = False
    
    evidence_frames = []
    evidence_masks = []
    frames_detail = [] # Lưu chi tiết từng frame theo chuẩn SRS 5.3
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        frame_count += 1
        
        # Lấy mẫu 1 frame mỗi giây
        if frame_count % fps == 0:
            analyzed_frames += 1
            timestamp_ms = int(cap.get(cv2.CAP_PROP_POS_MSEC))
            
            # GỌI HÀM PREDICT MỚI (Trả về dict)
            pred = predictor.predict(frame, return_mask=True)
            
            is_flood_frame = pred['is_flood']
            confidence = pred['confidence']
            flood_area_ratio = pred['flood_area_ratio']
            mask_img = pred.pop('mask', None) # Tách mảng numpy mask ra khỏi dict
            
            total_confidence += confidence
            total_flood_area += flood_area_ratio
            
            # Cập nhật Sliding Window (cửa sổ 5 frame, báo ngập khi >= 3 frame dương tính)
            if is_flood_frame:
                flood_frames_count += 1
                sliding_window.append(1)
            else:
                sliding_window.append(0)
                
            if len(sliding_window) > 5:
                sliding_window.pop(0)
                
            if sum(sliding_window) >= 3:
                is_flooded_video = True
                
            # Lưu tối đa 5 frame bằng chứng (kèm ảnh mask phân đoạn nước)
            mask_path = None
            if is_flood_frame and len(evidence_frames) < 5:
                evidence_frames.append(encode_image_base64(frame))
                if mask_img is not None:
                    evidence_masks.append(encode_image_base64(mask_img))
                    # Lưu file mask thực tế để tạo mask_path đúng chuẩn SRS 5.3
                    mask_filename = f"masks/mask_f{frame_count}_{uuid.uuid4().hex[:6]}.png"
                    cv2.imwrite(mask_filename, mask_img)
                    mask_path = mask_filename
            
            # Bổ sung các trường của Backend theo đúng hợp đồng SRS 5.3
            pred.update({
                "frame_index": frame_count,
                "timestamp_ms": timestamp_ms,
                "mask_path": mask_path
            })
            frames_detail.append(pred)
                
    cap.release()
    
    avg_confidence = (total_confidence / analyzed_frames) if analyzed_frames > 0 else 0.0
    avg_flood_area = (total_flood_area / analyzed_frames) if analyzed_frames > 0 else 0.0
    
    return {
        "model_version": predictor.model_version,
        "total_analyzed": analyzed_frames,
        "flood_detected": flood_frames_count,
        "average_confidence": round(avg_confidence * 100, 2),
        "average_flood_area_pct": round(avg_flood_area * 100, 2),
        "is_flooded": is_flooded_video,
        "evidence_frames": evidence_frames,
        "evidence_masks": evidence_masks,
        "frames_log": frames_detail
    }


# 3. API ENDPOINT NHẬN VIDEO TỪ NGƯỜI DÙNG
@app.post("/api/analyze-flood")
async def analyze_flood_video(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.mp4'):
        raise HTTPException(status_code=400, detail="Chỉ hỗ trợ định dạng .mp4")
        
    temp_filename = f"temp_{uuid.uuid4().hex}.mp4"
    try:
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        result = process_video(temp_filename)
        conclusion = "CÓ DẤU HIỆU NGẬP" if result["is_flooded"] else "KHÔNG PHÁT HIỆN NGẬP"
        
        return {
            "status": "Hoàn thành",
            "video_name": file.filename,
            "model_version": result["model_version"],
            "total_frames_analyzed": result["total_analyzed"],
            "flood_frames": result["flood_detected"],
            "average_confidence": result["average_confidence"],
            "average_flood_area_pct": result["average_flood_area_pct"],
            "conclusion": conclusion,
            "evidence_frames": result["evidence_frames"],
            "evidence_masks": result["evidence_masks"],
            "frames_log": result["frames_log"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)