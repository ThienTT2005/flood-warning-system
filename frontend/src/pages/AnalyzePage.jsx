import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PlayCircle, SlidersHorizontal, Monitor, Upload, Info } from 'lucide-react'
import { LoadingSpinner, PageHeading, StatusBadge } from '../components/common/UI'
import VideoUploader from '../components/upload/VideoUploader'
import { analyzeFlood } from '../services/floodApi'
export default function AnalyzePage({ onComplete }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const request = useRef(null)
  const navigate = useNavigate()
  useEffect(() => () => request.current?.abort(), [])
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])
  function select(next) {
    setError('')
    setPreview('')
    if (next && (!/\.mp4$/i.test(next.name) || next.size === 0)) {
      setFile(null)
      setError('Vui lòng chọn video .mp4 có nội dung. Tệp trống hoặc sai định dạng không được hỗ trợ.')
      return
    }
    setFile(next || null)
    if (next) setPreview(URL.createObjectURL(next))
  }
  async function submit(event) {
    event.preventDefault()
    if (!file || loading) return
    setLoading(true)
    setError('')
    request.current = new AbortController()
    try {
      const data = await analyzeFlood(file, request.current.signal)
      onComplete(data)
      navigate('/result')
    } catch (err) { if (err.name !== 'AbortError') setError(err.message) }
    finally { setLoading(false) }
  }
  return <><PageHeading title="Phân tích video" description="Tải video MP4 để trích xuất khung hình, phân loại dấu hiệu ngập và phân vùng nước bằng AI." /><form className="analyze-grid" onSubmit={submit}><div className="stack"><section className="card"><h2><Upload size={20} />Tải video giám sát</h2><VideoUploader file={file} disabled={loading} onSelect={select} /></section><section className="card"><h2><Monitor size={20} />Xem trước video</h2>{preview ? <video className="video-preview" src={preview} controls preload="metadata" onError={() => setError('Trình duyệt không thể phát video này. Hãy kiểm tra tệp và codec; backend sẽ kiểm tra khả năng đọc khi phân tích.')} /> : <div className="preview-empty"><FilePreview /><span>Video đã chọn sẽ xuất hiện tại đây</span></div>}<p className="subtle">Xem lại nội dung trước khi gửi video đến máy chủ phân tích.</p></section></div><div className="stack"><section className="card"><div className="section-heading"><h2><SlidersHorizontal size={20} />Cấu hình phân tích AI</h2><StatusBadge>{loading ? 'Đang xử lý' : 'Chờ gửi video'}</StatusBadge></div><div className="config-block"><small>MÔ HÌNH PHÂN LOẠI · cls_r18_v1</small><h3>ResNet18</h3><p>Xác định từng khung hình có dấu hiệu ngập và trả về độ tin cậy.</p></div><div className="config-block"><small>MÔ HÌNH PHÂN ĐOẠN · unet_r34_v1</small><h3>U-Net ResNet34</h3><p>Tạo mặt nạ vùng nước/ngập và tính tỷ lệ diện tích trong khung hình.</p></div><div className="config-block"><small>QUY TRÌNH BACKEND</small><p>Lấy mẫu 1 frame/giây. Kết luận có ngập khi ít nhất 3 trong cửa sổ 5 frame dương tính.</p></div><button className="button full" type="submit" disabled={!file || loading}><PlayCircle size={20} />{loading ? 'Đang phân tích…' : 'Bắt đầu phân tích'}</button><p className="subtle">Thời gian xử lý phụ thuộc độ dài video và phần cứng máy chủ.</p></section>{loading && <LoadingSpinner>Vui lòng chờ và giữ trang mở. API trả về kết quả sau khi hoàn tất, không cung cấp phần trăm tiến độ.</LoadingSpinner>}{error && <div className="error-message" role="alert"><strong>Không thể hoàn tất thao tác</strong><p>{error}</p></div>}<section className="card help-card"><h2><Info size={19} />Lưu ý khi phân tích</h2><p>Chỉ chọn video MP4 có hình ảnh đọc được. Tên tệp đúng định dạng chưa đảm bảo nội dung video hợp lệ.</p><p>Nếu kết nối thất bại, kiểm tra backend và thử lại. Không có kết quả giả được tạo khi xảy ra lỗi.</p><Link className="text-link" to="/model">Tìm hiểu quy trình mô hình →</Link></section></div></form></>
}
function FilePreview() { return <Monitor size={42} /> }
