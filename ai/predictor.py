"""FloodPredictor v2: classifier (SigLIP linear probe / timm / ResNet18) làm cổng lọc + segmentation (smp).
Kiến trúc đọc từ checkpoint nên load được cả model v1. Output theo SRS 5.3."""
import os, cv2, numpy as np, torch, torch.nn.functional as F, torchvision, timm
import segmentation_models_pytorch as smp
from PIL import Image


def _tensor(rgb, cfg, device):
    s = cfg["img_size"]
    x = cv2.resize(rgb, (s, s), interpolation=cv2.INTER_LINEAR).astype(np.float32) / 255.0
    x = (x - np.array(cfg["mean"], np.float32)) / np.array(cfg["std"], np.float32)
    return torch.from_numpy(x.transpose(2, 0, 1)).unsqueeze(0).to(device)


def _state(ck):
    return {k: (v.float() if v.is_floating_point() else v) for k, v in ck["model"].items()}


def _load_cls(path, device):
    ck = torch.load(path, map_location="cpu", weights_only=False); cfg = ck["model_cfg"]
    if cfg.get("type") == "siglip_linear_probe":
        from transformers import AutoModel, AutoProcessor
        local = os.path.join(os.path.dirname(path), "siglip")
        src = local if os.path.isdir(local) else ck["sig_id"]
        m = AutoModel.from_pretrained(src).float().to(device).eval(); proc = AutoProcessor.from_pretrained(src)
        w, b = ck["coef"].float().to(device), float(ck["intercept"])
        def prob(rgb):
            x = proc(images=[Image.fromarray(rgb)], return_tensors="pt")["pixel_values"].to(device)
            o = m.get_image_features(pixel_values=x); o = o if torch.is_tensor(o) else o.pooler_output
            o = o.float() / o.float().norm(dim=-1, keepdim=True)
            return float(torch.sigmoid(o[0] @ w + b))
        return prob, cfg
    if "timm_id" in cfg:
        net = timm.create_model(cfg["timm_id"], pretrained=False, num_classes=1)
    else:
        net = torchvision.models.resnet18(weights=None); net.fc = torch.nn.Linear(net.fc.in_features, 1)
    net.load_state_dict(_state(ck)); net.to(device).eval()
    return (lambda rgb: float(torch.sigmoid(net(_tensor(rgb, cfg, device))).squeeze())), cfg


class FloodPredictor:
    def __init__(self, seg_path, cls_path, device=None, conf_threshold=0.70, min_area=0.05):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        ck = torch.load(seg_path, map_location="cpu", weights_only=False); self.seg_cfg = ck["model_cfg"]
        self.seg = getattr(smp, self.seg_cfg["arch"])(encoder_name=self.seg_cfg["encoder"], encoder_weights=None,
                                                      in_channels=3, classes=1)
        self.seg.load_state_dict(_state(ck)); self.seg.to(self.device).eval()
        self.cls_prob, self.cls_cfg = _load_cls(cls_path, self.device)
        self.conf_threshold, self.min_area = conf_threshold, min_area
        self.model_version = f"{self.seg_cfg['model_version']}+{self.cls_cfg['model_version']}"

    @torch.no_grad()
    def predict(self, frame_bgr, return_mask=True):
        if frame_bgr is None or not isinstance(frame_bgr, np.ndarray) or frame_bgr.size == 0:
            raise ValueError("frame_bgr rỗng hoặc không phải ảnh numpy (frame hỏng)")
        if frame_bgr.ndim == 2:
            frame_bgr = cv2.cvtColor(frame_bgr, cv2.COLOR_GRAY2BGR)
        elif frame_bgr.shape[2] == 4:
            frame_bgr = cv2.cvtColor(frame_bgr, cv2.COLOR_BGRA2BGR)
        rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        flood_prob = self.cls_prob(rgb)
        s = self.seg_cfg["img_size"]
        logits = self.seg(_tensor(rgb, self.seg_cfg, self.device))
        if logits.shape[-2:] != (s, s):
            logits = F.interpolate(logits, size=(s, s), mode="bilinear", align_corners=False)
        water = torch.sigmoid(logits)[0, 0].cpu().numpy() > self.seg_cfg["threshold"]
        water_ratio = float(water.mean())
        is_flood = flood_prob >= self.conf_threshold and water_ratio >= self.min_area
        out = {"is_flood": bool(is_flood), "confidence": round(flood_prob, 4),
               "flood_area_ratio": round(water_ratio if is_flood else 0.0, 4),
               "water_area_ratio": round(water_ratio, 4), "model_version": self.model_version}
        if return_mask:
            m = (water if is_flood else np.zeros_like(water)).astype(np.uint8) * 255
            out["mask"] = cv2.resize(m, (frame_bgr.shape[1], frame_bgr.shape[0]), interpolation=cv2.INTER_NEAREST)
        return out
