---
name: FloodGuard AI
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4850'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-metric:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  code-num:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

Hệ thống được thiết kế dành riêng cho trung tâm điều hành đô thị thông minh (IOC) và ban chỉ huy phòng chống thiên tai tại các đô thị Việt Nam. Trọng tâm cốt lõi là tính chính xác khoa học, năng lực phản ứng khẩn cấp tức thì và độ tin cậy tuyệt đối trong môi trường giám sát thời gian thực 24/7.

Phong cách chủ đạo là **Modern Scientific Dashboard**:
- Không sử dụng hiệu ứng kính (glassmorphism), chuyển màu trang trí (gradients) hay các chi tiết trực quan dư thừa gây xao nhãng.
- Cấu trúc giao diện tĩnh, tập trung vào mật độ dữ liệu cao (high-density), phân cấp thông tin rõ ràng và khả năng xử lý nhanh các luồng tín hiệu từ trạm quan trắc thủy văn, camera AI và cảm biến áp suất ngập.
- Thẩm mỹ công nghệ hiện đại, kỷ luật với đường nét sắc gọn, phân tách lớp dữ liệu bằng đường viền tinh tế (clean borders) kết hợp đổ bóng nhẹ (subtle ambient shadows).

## Colors

Hệ màu được xây dựng dựa trên tiêu chuẩn hiển thị trực quan thông tin kỹ thuật, cân bằng giữa khu vực điều hướng tối (dark navigation) và không gian phân tích dữ liệu sáng (light canvas) nhằm tối ưu thị giác khi quan sát liên tục nhiều giờ.

### Bảng màu cấu trúc & giao diện
- **Nền ứng dụng (App Background):** `#F8FAFC` — Sắc xám sáng dịu mắt, làm nổi bật các khối thẻ dữ liệu.
- **Thẻ nội dung (Surface Canvas):** `#FFFFFF` — Trắng tinh khiết với đường biên chuẩn mực.
- **Thanh điều hướng bên (Sidebar Navigation):** `#0F172A` (Nền chính) và `#1E293B` (Bề mặt phụ/hover/active) mang lại vẻ trang trọng, tập trung.
- **Đường viền ngăn cách (Borders & Dividers):** `#E2E8F0` cho vùng nội dung sáng và `#334155` cho vùng thanh điều hướng.

### Màu hành động & Nhận diện
- **Màu chính (Primary Blue):** `#0284C7` dùng cho các nút tương tác chính, điểm đánh dấu dữ liệu bản đồ, trạng thái chọn và biểu đồ xu hướng.
- **Màu phụ (Secondary Teal):** `#0D9488` dùng cho hệ số đo lường thủy triều/dòng chảy, bộ lọc nâng cao và các chỉ số AI phân tích.

### Hệ thống mã màu cảnh báo tiêu chuẩn (Alert & Status System)
Phản ánh mức độ nghiêm trọng của mực nước và sự cố theo quy chuẩn khí tượng thủy văn:
- **Bình thường (Normal):** `#16A34A` — Mực nước an toàn, trạm hoạt động ổn định.
- **Cảnh báo (Advisory):** `#CA8A04` — Mực nước xấp xỉ mép vỉa hè, nguy cơ ngập cục bộ.
- **Nguy hiểm (Warning):** `#EA580C` — Ngập diện rộng (10–30cm), ảnh hưởng phương tiện giao thông.
- **Khẩn cấp (Critical):** `#DC2626` — Ngập nghiêm trọng (>30cm), nguy cơ sạt lở/triều cường tràn đê, kích hoạt còi báo động.
- **Mất tín hiệu / Chưa xác định (Offline/Unknown):** `#64748B` — Lỗi kết nối cảm biến hoặc thiết bị đang bảo trì.

## Typography

Toàn bộ hệ thống văn bản áp dụng phông chữ **Be Vietnam Pro** với sự tối ưu vượt trội cho các ký tự dấu thanh tiếng Việt dài, giúp các thuật ngữ chuyên ngành khí tượng, tên địa bàn hành chính không bị đè dấu hoặc biến dạng.

### Quy tắc hiển thị
- **Độ chính xác kỹ thuật:** Với các số liệu quan trắc mực nước (cm, m), lượng mưa (mm) và tọa độ GPS, sử dụng biến thể số liền hàng (tabular figures) để dữ liệu gióng thẳng tuyệt đối trong bảng và thẻ số liệu.
- **Tiêu đề bảng điều khiển (Headlines):** Dùng nét bán đậm (SemiBold 600) nhằm phân định khu vực mà không cần kích thước quá lớn, giữ không gian cho đồ thị và bản đồ GIS.
- **Hệ thống nhãn cảnh báo (Labels):** Viết hoa toàn bộ nhãn mức độ rủi ro (ví dụ: `KHẨN CẤP`, `CẢNH BÁO`), font weight 600, kích thước 11px–12px với khoảng cách chữ dãn nhẹ (+0.5px) để nhận diện tức thì trong bảng giám sát.

## Layout & Spacing

Bố cục giao diện được thiết kế tối ưu hóa cố định cho màn hình hiển thị trung tâm điều hành tiêu chuẩn **1440px Desktop**, với khả năng co giãn chất lượng cao trên các hệ thống màn hình tường (Video Wall) lớn hơn.

### Cấu trúc khung hiển thị
- **Thanh bên điều hướng (Left Rail / Sidebar):** Cố định chiều rộng `260px` ở chế độ đầy đủ và `72px` ở chế độ thu gọn.
- **Thanh trạng thái khẩn cấp trên cùng (Top Utility Bar):** Chiều cao cố định `56px`, chứa chỉ số tổng hợp toàn thành phố, đồng hồ thời gian thực và nút kích hoạt quy trình ứng phó.
- **Vùng làm việc trung tâm:** Lưới 12 cột linh hoạt (fluid 12-column grid) với gutter `20px` (`1.25rem`) và biên lề nội dung `24px` (`1.5rem`).
- **Phân chia khu vực thông tin:**
  - Bản đồ ngập GIS chiếm 6 đến 8 cột tại màn hình chính.
  - Cột bên phải (4 đến 6 cột) bố trí danh sách cảnh báo thời gian thực và biểu đồ trạm trọng điểm.
  - Hàng thẻ số liệu tóm tắt (KPI cards) xếp 4 cột đều nhau ở hàng trên cùng.

### Nhịp điệu không gian (Spacing Rhythm)
Ưu tiên nhịp mật độ cao (tight rhythm): padding trong thẻ chỉ từ `12px` đến `16px`, khoảng cách dòng biểu mẫu `8px`, khoảng cách giữa các khối dữ liệu trong bảng `4px` đến `8px` nhằm hiển thị lượng thông tin tối đa mà không gây cảm giác ngột ngạt.

## Elevation & Depth

Thiết kế loại bỏ hoàn toàn các hiệu ứng nổi khối (skeuomorphic) nặng nề và bóng mờ phức tạp để tránh việc giảm độ tương phản của các điểm báo động ngập. Chiều sâu được xây dựng dựa trên sự tương phản giữa các lớp bề mặt và viền nét kỹ thuật.

### Các tầng giao diện (Surface Levels)
- **Tầng 0 (Background):** Nền `#F8FAFC`, đóng vai trò sàn định vị.
- **Tầng 1 (Content Surfaces):** Các thẻ theo dõi, bảng dữ liệu sử dụng nền trắng `#FFFFFF`, bao bọc bởi đường viền kỹ thuật `1px solid #E2E8F0` kết hợp bóng đổ tán xạ cực mịn: `0 1px 3px rgba(15, 23, 42, 0.05)`.
- **Tầng 2 (Hover & Focus States):** Khi rê chuột qua một trạm quan trắc hoặc điểm ngập, thẻ được nâng nhẹ bằng bóng `0 4px 12px rgba(15, 23, 42, 0.08)` và viền chuyển sang `#CBD5E1`.
- **Tầng 3 (Overlays, Modals, Popovers):** Cửa sổ chi tiết camera AI hoặc bảng điều khiển máy bơm dâng lên với bóng sâu `0 12px 24px -4px rgba(15, 23, 42, 0.12)`, đường viền `#94A3B8`.

## Shapes

Ngôn ngữ hình học sử dụng cấp độ bo góc **Rounded (Level 2)** mang tính chất công nghiệp hiện đại:
- **Thẻ nội dung (Cards), Hộp biểu đồ (Chart Containers):** Bo góc `rounded-lg` (`1rem` / 16px) hoặc `rounded-md` (`0.5rem` / 8px) cho các bảng thẻ nhỏ gọn.
- **Nút tương tác (Buttons), Trường nhập liệu (Input Fields), Hộp chọn (Selects):** Bo góc chuẩn `0.5rem` (8px).
- **Huy hiệu trạng thái (Status Badges / Chips):** Bo tròn mềm mại `0.375rem` (6px) hoặc bo tròn toàn phần (pill) đối với các chỉ số báo động cần nhấn mạnh tức thì trên bản đồ.
- **Đường viền:** Đồng nhất độ dày nét `1px` trên toàn hệ thống để đảm bảo tính kỹ thuật, dứt khoát.

## Components

### 1. Thẻ chỉ số khoa học (Scientific Metric Cards)
- **Cấu trúc:** Header gồm biểu tượng cảm biến, tên trạm hoặc loại chỉ số (mực nước, lưu lượng mưa, triều cường), góc phải đặt chip trạng thái cảnh báo tương ứng.
- **Giá trị đo lường:** Kích thước `display-metric` (32px Bold), màu `#0F172A`, kèm đơn vị đo chuẩn khoa học (`cm`, `m³/s`, `mm/h`) màu `#64748B`.
- **Chỉ số xu hướng:** Hiển thị mũi tên biến thiên kèm % hoặc giá trị chênh lệch so với giờ trước (ví dụ: `▲ +12 cm/h` bằng màu đỏ khi nước đang dâng, `▼ -5 cm/h` bằng màu xanh khi nước rút).
- **Chân thẻ:** Sparkline tối giản thể hiện xu hướng mực nước 6 giờ gần nhất.

### 2. Bảng dữ liệu mật độ cao (High-Density Data Tables)
- **Hàng tiêu đề:** Nền `#F1F5F9`, chữ in hoa nhẹ, màu `#475569`, font size `11px`, trọng số 600.
- **Chiều cao dòng:** Tối ưu hóa ở mức `40px` (Compact) và `48px` (Standard) để xem được từ 15-20 trạm đo mà không cần cuộn quá nhiều.
- **Dữ liệu cột số:** Gióng hàng phải (right-aligned), dùng phông số đồng khoảng cách.
- **Phân cách:** Đường viền ngang mỏng `1px solid #F1F5F9`. Hiệu ứng hover cả dòng với màu `#F8FAFC`.

### 3. Huy hiệu trạng thái ngập (Status Chips / Badges)
Mỗi mức độ trạng thái bao gồm một chấm tròn tín hiệu (dot indicator) kết hợp văn bản:
- **Bình thường:** Nền `#DCFCE7`, chữ và chấm `#16A34A` ("Bình thường").
- **Cảnh báo:** Nền `#FEF9C3`, chữ và chấm `#CA8A04` ("Cảnh báo ngập").
- **Nguy hiểm:** Nền `#FFEDD5`, chữ và chấm `#EA580C` ("Nguy hiểm").
- **Khẩn cấp:** Nền `#FEE2E2`, chữ và chấm `#DC2626` ("Khẩn cấp"). Chấm tròn có hiệu ứng xung nhịp (pulse animation) nhẹ để cảnh báo nguy cấp.
- **Mất tín hiệu:** Nền `#F1F5F9`, chữ và chấm `#64748B` ("Mất kết nối").

### 4. Nút bấm & Điều khiển tác vụ (Buttons & Actions)
- **Nút chính (Primary):** Nền `#0284C7`, chữ trắng, không viền, hover sang `#0369A1`. Sử dụng cho "Kích hoạt cảnh báo", "Xuất báo cáo ngập".
- **Nút kỹ thuật/Bơm thoát nước (Secondary):** Nền `#0D9488`, chữ trắng, hover sang `#0F766E`.
- **Nút phụ (Outlined / Tertiary):** Nền trong suốt, viền `1px solid #CBD5E1`, màu chữ `#334155`, hover nền `#F1F5F9`.
- **Nút trạng thái khẩn cấp (Destructive / SOS):** Nền `#DC2626`, chữ trắng, dùng cho các lệnh xả lũ khẩn cấp hoặc gửi thông báo toàn dân.

### 5. Trường nhập liệu & Bộ lọc trạm (Inputs & Filter Controls)
- Chiều cao `36px`, nền `#FFFFFF`, viền `#CBD5E1`, text `#0F172A`.
- Placeholder màu `#94A3B8`. Trạng thái focus có viền viền kép hoặc glow thanh mảnh với màu `#0284C7` (độ mờ viền 2px).
- Tích hợp ô lọc nhanh theo: Quận/Huyện, Lưu vực thoát nước, Mức độ cảnh báo và Trạng thái máy bơm.

### 6. Thẻ giám sát Camera AI (AI Stream Card)
- Khung video tỉ lệ 16:9 bo góc `rounded-lg` có nhãn lớp phủ (overlay tag) góc trên bên trái hiển thị tên ngã tư/tuyến đường kèm tọa độ.
- Nhãn dưới chân thẻ tích hợp thanh đo mực nước đo tự động bằng thị giác máy tính (Computer Vision Water Level Estimator) với vạch chia centimet thực tế.