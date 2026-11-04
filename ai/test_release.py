"""Kiểm thử chấp nhận gói flood_ai_v2 — chạy như backend: import độc lập, CPU.
Dùng: python test_release.py [thư_mục_video nhãn.csv [kết_quả_gpu.csv]]"""
import os, sys, time, json, csv, numpy as np, cv2
from predictor import FloodPredictor
W = os.path.join(os.path.dirname(os.path.abspath(__file__)), "weights")
R = []
def check(name, ok, detail=""):
    R.append({"test": name, "pass": bool(ok), "detail": str(detail)})
    print(("PASS" if ok else "FAIL"), "|", name, "|", detail)

t0 = time.time()
p = FloodPredictor(os.path.join(W, "seg_segformer_b2_v1.pt"), os.path.join(W, "cls_siglip_lp_v1.pt"), device="cpu")
check("Load model trên CPU", True, f"{time.time() - t0:.1f}s, {p.model_version}")
check("SigLIP có sẵn cục bộ (chạy không cần internet)", os.path.isdir(os.path.join(W, "siglip")))

rng = np.random.default_rng(0)
img = (rng.random((720, 1280, 3)) * 255).astype(np.uint8)
r = p.predict(img)
need = {"is_flood", "confidence", "flood_area_ratio", "water_area_ratio", "model_version", "mask"}
check("Đủ trường output (SRS 5.3)", need <= set(r), sorted(r))
check("Kiểu dữ liệu đúng", isinstance(r["is_flood"], bool) and isinstance(r["confidence"], float)
      and isinstance(r["flood_area_ratio"], float) and isinstance(r["model_version"], str))
check("confidence trong [0, 1]", 0 <= r["confidence"] <= 1, r["confidence"])
check("flood_area_ratio trong [0, 1]", 0 <= r["flood_area_ratio"] <= 1, r["flood_area_ratio"])
check("mask cùng kích thước frame, uint8, chỉ 0/255", r["mask"].shape == img.shape[:2] and r["mask"].dtype == np.uint8
      and set(np.unique(r["mask"]).tolist()) <= {0, 255})
check("is_flood=False thì area = 0 và mask rỗng", r["is_flood"] or (r["flood_area_ratio"] == 0 and r["mask"].max() == 0))
r2 = p.predict(img)
check("Kết quả tất định (2 lần như nhau)", r2["confidence"] == r["confidence"] and r2["water_area_ratio"] == r["water_area_ratio"])
check("return_mask=False thì không trả mask", "mask" not in p.predict(img, return_mask=False))

for shape, label in [((1920, 1080, 3), "video dọc 1080x1920"), ((2160, 3840, 3), "frame 4K"),
                     ((120, 160, 3), "ảnh rất nhỏ 160x120"), ((480, 640), "ảnh xám 1 kênh"), ((480, 640, 4), "ảnh 4 kênh")]:
    try:
        o = p.predict((rng.random(shape) * 255).astype(np.uint8)); check(f"Chạy được với {label}", o["mask"].shape == shape[:2])
    except Exception as e:
        check(f"Chạy được với {label}", False, repr(e))
for bad, label in [(None, "None"), (np.zeros((0, 0, 3), np.uint8), "mảng rỗng")]:
    try:
        p.predict(bad); check(f"Báo ValueError với frame {label}", False, "không báo lỗi")
    except ValueError as e:
        check(f"Báo ValueError với frame {label}", True, e)
    except Exception as e:
        check(f"Báo ValueError với frame {label}", False, repr(e))

p.predict(img); t = time.time()
for _ in range(5): p.predict(img, return_mask=False)
ms = (time.time() - t) / 5 * 1000
check("Latency CPU < 1000 ms/frame (kịp 1 frame/giây)", ms < 1000, f"{ms:.0f} ms/frame, {os.cpu_count()} core")

def frames(path, rate=1.0):
    cap = cv2.VideoCapture(path); fps = cap.get(cv2.CAP_PROP_FPS) or 25; step = max(1, round(fps / rate)); i = 0
    while True:
        if i % step == 0:
            ok, f = cap.read()
            if not ok: break
            yield i / fps, f
        elif not cap.grab(): break
        i += 1
    cap.release()

def first_alert(flags, times, window=5, need=3):
    buf = []
    for f, t in zip(flags, times):
        buf = (buf + [f])[-window:]
        if sum(buf) >= need: return t
    return None

if len(sys.argv) > 2:
    expect = {}
    if len(sys.argv) > 3:
        expect = {row["video"]: row["kết quả"] for row in csv.DictReader(open(sys.argv[3], encoding="utf-8"))
                  if row["hệ thống"] == "v4 SigLIP"}
    out, miss = [], []
    for row in csv.DictReader(open(sys.argv[2], encoding="utf-8")):
        fr = list(frames(os.path.join(sys.argv[1], row["video"])))
        a = first_alert([p.predict(f, return_mask=False)["is_flood"] for _, f in fr], [t for t, _ in fr])
        start = float(row["flood_start_s"]) if row["flood_start_s"] not in ("", "nan", "None") else None
        if row["group"] == "nonflood": res = "Đúng" if a is None else "BÁO GIẢ"
        elif a is None: res = "BỎ SÓT"
        elif a < start - 1: res = "CẢNH BÁO SỚM SAI"
        else: res = "Đúng"
        out.append((row["group"], res)); print(f"   {row['group']:10s} {row['video'][:34]:34s} → {res}")
        if expect and expect.get(row["video"][:30]) not in (None, res): miss.append(row["video"])
    pos = [r_ for g, r_ in out if g != "nonflood"]; neg = [r_ for g, r_ in out if g == "nonflood"]
    check("Video: không báo giả trên video không ngập", neg.count("BÁO GIẢ") == 0, f"{neg.count('BÁO GIẢ')}/{len(neg)}")
    check("Video: không cảnh báo sớm sai", all(r_ != "CẢNH BÁO SỚM SAI" for _, r_ in out))
    print(f"   (thông tin) phát hiện đúng {pos.count('Đúng')}/{len(pos)} video ngập/chuyển tiếp")
    if expect: check("Video: kết quả CPU khớp kết quả GPU (Cell 51)", not miss, miss or "khớp toàn bộ")

n_fail = sum(not x["pass"] for x in R)
print(f"\n=== {len(R) - n_fail}/{len(R)} PASS ===")
json.dump(R, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "test_report.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
sys.exit(1 if n_fail else 0)
