# Frontend · Hệ thống cảnh báo ngập úng

React + Vite, JavaScript/JSX, CSS thuần, React Router DOM và Lucide React. Thiết kế dựa trên cả 5 màn hình trong `design/stitch-export/` và bảng màu/typography của `DESIGN.md`.

## Chạy frontend

Từ thư mục `frontend/` (PowerShell):

```powershell
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

Mở URL Vite in ra, thông thường `http://localhost:5173`. Trên môi trường không bị PowerShell ExecutionPolicy chặn, có thể dùng `npm` thay `npm.cmd`.

`.env` chỉ chứa cấu hình công khai, mặc định:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Khởi động lại Vite sau khi đổi `.env`. Giá trị này được đưa vào bundle khi build; không chứa bí mật. Khi dùng điện thoại hoặc máy khác, thay địa chỉ loopback bằng địa chỉ máy chạy backend và đảm bảo truy cập được qua mạng.

## Chạy backend để kiểm thử

Từ thư mục gốc repository, với môi trường Python đã cài các phụ thuộc AI/backend:

```powershell
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Hai trọng số cần có: `ai/weights/cls_r18_v1.pt` và `ai/weights/unet_r34_v1.pt`. `backend/requirements.txt` hiện rỗng, nên chưa thể cài đầy đủ môi trường Python chỉ từ tệp này. Frontend không sửa backend hoặc AI. Kiểm tra tài liệu API tại `http://127.0.0.1:8000/docs`.

Kiểm tra môi trường hiện tại cho thấy thiếu `segmentation_models_pytorch`, trong khi `ai/predictor.py` có import thư viện này. Cần bổ sung phiên bản tương thích với môi trường PyTorch của dự án trước khi chạy phân tích thật. Chưa kiểm thử end-to-end với video thật hoặc kiểm tra trực quan trong trình duyệt ở phiên triển khai này.

API thật: `POST /api/analyze-flood`, gửi `FormData` với field `file`, không đặt thủ công `Content-Type`. Nếu lỗi mạng, kiểm tra server, URL, CORS và mixed content HTTPS/HTTP. Backend hiện khai báo CORS cho mọi origin; trình duyệt vẫn có thể chặn do môi trường mạng hoặc chính sách khác. Frontend không dùng `no-cors` để che lỗi.

## Các trang

- `/`: thống kê và biểu đồ **minh họa**, kiểm tra kết nối API thật qua `/openapi.json`. Không suy diễn sức khỏe AI từ trạng thái kết nối.
- `/analyze`: kéo thả/chọn MP4, xem trước, xóa/chọn lại, phân tích thật và xử lý lỗi. Không giả lập tiến độ hay kết quả.
- `/result`: kết quả gần nhất, toàn bộ ảnh API trả về, modal phóng to, frame log có bộ lọc và xuất JSON. Truy cập khi chưa có dữ liệu sẽ hiển thị empty state.
- `/history`: kết quả tóm tắt thật trong phiên và dữ liệu minh họa được hiển thị thành hai khu vực riêng; tìm tên video và lọc kết luận.
- `/model`: mô tả ResNet18 + U-Net ResNet34, phiên bản và pipeline; không bịa chỉ số kiểm định.
- Đường dẫn khác: trạng thái 404.

## Tổ chức và nguồn dữ liệu

`src/components/layout/` chứa layout chung; `common/` chứa thẻ, trạng thái và bảng; `upload/` chứa uploader; `result/` chứa gallery, modal và frame log. `src/pages/` chứa 5 trang. `src/services/floodApi.js` quản lý URL/API; `src/utils/` xử lý ảnh, định dạng và lưu phiên; `src/styles/` chứa CSS và biến thiết kế.

Mock chỉ nằm ở `src/data/mockDashboard.js` và `src/data/mockHistory.js`, có chú thích để thay bằng API sau này. Không dùng mock trên trang kết quả. Kết quả đầy đủ được giữ trong React state và thử lưu `sessionStorage`, không lưu Base64 trong `localStorage`. Nếu vượt quota, vẫn xem được kết quả hiện tại và có thông báo tải lại có thể làm mất dữ liệu. Kết quả cũ được xóa khỏi bộ nhớ phiên nếu lưu kết quả mới thất bại. Lịch sử phiên chỉ giữ tóm tắt, không giữ ảnh hoặc log.

Backend hiện chỉ trả tối đa 5 ảnh bằng chứng; frontend không cắt số lượng và sẽ hiển thị toàn bộ khi backend trả nhiều hơn. API không có liên kết frame index cho từng bằng chứng, nên gallery chỉ ghép theo index mảng, không tự gán timestamp/frame ID. Không có API tiến độ hoặc model health. Nội dung font Be Vietnam Pro tải từ Google Fonts; nếu offline, dùng Inter, Arial, Helvetica, sans-serif.

## Kiểm tra

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd test
```

Kiểm thử tự động kiểm tra hợp đồng FormData, xử lý lỗi API, đơn vị phần trăm, Base64 và sự cố bộ nhớ phiên. Không thay thế kiểm thử end-to-end với mô hình/video thật. Khi host bản build, cấu hình máy chủ trả `index.html` cho các route React Router.

Kết quả kiểm tra khi bàn giao: lint thành công, không có lỗi/warning; build thành công với Vite 8.3.5; 5/5 kiểm thử thành công. Đã cập nhật bản vá dependency tương thích bằng `npm audit fix`; kết quả npm sau cập nhật: 0 lỗ hổng.

## Danh sách tệp triển khai

Tạo mới:

- `.env.example`, `README.md`, `tests/flood.test.mjs`.
- `src/components/layout/AppLayout.jsx`, `Sidebar.jsx`, `Header.jsx`.
- `src/components/common/UI.jsx`, `AnalysisTable.jsx`.
- `src/components/upload/VideoUploader.jsx`.
- `src/components/result/EvidenceGallery.jsx`, `EvidenceModal.jsx`, `FrameLogTable.jsx`.
- `src/pages/DashboardPage.jsx`, `AnalyzePage.jsx`, `ResultPage.jsx`, `HistoryPage.jsx`, `ModelInfoPage.jsx`.
- `src/services/floodApi.js`.
- `src/utils/format.js`, `image.js`, `storage.js`.
- `src/data/mockDashboard.js`, `mockHistory.js`.
- `src/styles/variables.css`, `global.css`.

Chỉnh sửa: `src/App.jsx`, `src/App.css`, `src/index.css`, `index.html`, `.gitignore`, `package.json`, `package-lock.json`. Giữ nguyên cấu hình Vite, ESLint và entry point hiện tại. Chỉ thay đổi bên trong `frontend/`.
