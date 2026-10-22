"""FloodPredictor: ResNet18 classifier (cổng lọc có lũ/không) + U-Net ResNet34 (phân đoạn vùng nước).
Output theo hợp đồng SRS 5.3. Backend bổ sung frame_index, timestamp_ms, mask_path."""
import cv2, numpy as np, torch, torchvision
import segmentation_models_pytorch as smp


def _load(path):
    ck = torch.load(path, map_location='cpu', weights_only=False)
    sd = {k: (v.float() if v.is_floating_point() else v) for k, v in ck['model'].items()}
    return sd, ck['model_cfg']


class FloodPredictor:
    def __init__(self, seg_path, cls_path, device=None, conf_threshold=0.70, min_area=0.05):
        self.device = device or ('cuda' if torch.cuda.is_available() else 'cpu')
        sd, self.seg_cfg = _load(seg_path)
        self.seg = smp.Unet(encoder_name=self.seg_cfg['encoder'], encoder_weights=None, in_channels=3, classes=1)
        self.seg.load_state_dict(sd); self.seg.to(self.device).eval()
        sd, self.cls_cfg = _load(cls_path)
        self.cls = torchvision.models.resnet18(weights=None)
        self.cls.fc = torch.nn.Linear(self.cls.fc.in_features, 1)
        self.cls.load_state_dict(sd); self.cls.to(self.device).eval()
        self.conf_threshold, self.min_area = conf_threshold, min_area
        self.model_version = f"{self.seg_cfg['model_version']}+{self.cls_cfg['model_version']}"

    def _tensor(self, rgb, cfg):
        s = cfg['img_size']
        x = cv2.resize(rgb, (s, s), interpolation=cv2.INTER_LINEAR).astype(np.float32) / 255.0
        x = (x - np.array(cfg['mean'], np.float32)) / np.array(cfg['std'], np.float32)
        return torch.from_numpy(x.transpose(2, 0, 1)).unsqueeze(0).to(self.device)

    @torch.no_grad()
    def predict(self, frame_bgr, return_mask=True):
        """frame_bgr: ảnh đọc bằng cv2 (BGR). Trả về dict theo SRS 5.3 (+ water_area_ratio, mask)."""
        rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        flood_prob = float(torch.sigmoid(self.cls(self._tensor(rgb, self.cls_cfg))))
        prob = torch.sigmoid(self.seg(self._tensor(rgb, self.seg_cfg)))[0, 0].cpu().numpy()
        water = prob > self.seg_cfg['threshold']
        water_ratio = float(water.mean())
        is_flood = flood_prob >= self.conf_threshold and water_ratio >= self.min_area
        out = {'is_flood': bool(is_flood), 'confidence': round(flood_prob, 4),
               'flood_area_ratio': round(water_ratio if is_flood else 0.0, 4),
               'water_area_ratio': round(water_ratio, 4), 'model_version': self.model_version}
        if return_mask:
            m = (water if is_flood else np.zeros_like(water)).astype(np.uint8) * 255
            out['mask'] = cv2.resize(m, (frame_bgr.shape[1], frame_bgr.shape[0]), interpolation=cv2.INTER_NEAREST)
        return out


if __name__ == '__main__':
    import sys, json
    p = FloodPredictor('weights/unet_r34_v1.pt', 'weights/cls_r18_v1.pt')
    r = p.predict(cv2.imread(sys.argv[1]), return_mask=False)
    print(json.dumps(r, indent=2))
