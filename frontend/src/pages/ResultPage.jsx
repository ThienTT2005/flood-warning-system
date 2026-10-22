import { Link } from 'react-router-dom'
import { AlertTriangle, BadgeCheck, Film, Waves, ShieldCheck, Layers, PlusCircle, Download } from 'lucide-react'
import { EmptyState, PageHeading, StatCard, StatusBadge } from '../components/common/UI'
import EvidenceGallery from '../components/result/EvidenceGallery'
import FrameLogTable from '../components/result/FrameLogTable'
import { floodState, number, percent } from '../utils/format'
function downloadResult(result) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'ket-qua-phan-tich.json'
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
export default function ResultPage({ result, storageWarning }) {
  if (!result || typeof result !== 'object' || Array.isArray(result)) return <EmptyState title="Chưa có kết quả phân tích" description="Chọn và phân tích một video MP4 để xem kết luận, bằng chứng và chi tiết từng frame." to="/analyze" action="Phân tích video" />
  const tone = floodState(result)
  const Icon = tone === 'danger' ? AlertTriangle : BadgeCheck
  return <><PageHeading title="Kết quả phân tích chi tiết" description={`Video: ${result.video_name || 'Không rõ tên video'}`}><div className="actions"><Link className="button secondary" to="/analyze"><PlusCircle size={17} />Phân tích video khác</Link><button className="button" type="button" onClick={() => downloadResult(result)}><Download size={17} />Xuất JSON</button></div></PageHeading>{storageWarning && <div className="demo-notice" role="status">{storageWarning}</div>}<section className={`conclusion ${tone}`}><Icon size={34} /><div><small>KẾT LUẬN TỪ BACKEND</small><h2>{result.conclusion || 'Chưa có kết luận'}</h2><p>Kết quả nhận diện dấu hiệu ngập trong video. API không cung cấp cấp độ nguy hiểm hay độ sâu nước.</p></div><StatusBadge tone="neutral">{result.status || 'Chưa rõ trạng thái'}</StatusBadge></section><div className="stats-grid"><StatCard label="Tổng frame phân tích" value={number(result.total_frames_analyzed)} icon={Film} /><StatCard label="Frame phát hiện ngập" value={number(result.flood_frames)} icon={Waves} tone="danger" /><StatCard label="Độ tin cậy trung bình" value={percent(result.average_confidence)} icon={ShieldCheck} tone="safe" /><StatCard label="Diện tích ngập trung bình" value={percent(result.average_flood_area_pct)} icon={Layers} /></div><section className="card result-meta"><div><small>TÊN VIDEO</small><strong>{result.video_name || '—'}</strong></div><div><small>PHIÊN BẢN MÔ HÌNH</small><strong>{result.model_version || '—'}</strong></div><div><small>TRẠNG THÁI</small><strong>{result.status || '—'}</strong></div></section><section><div className="section-heading"><div><h2>Bằng chứng thị giác & mặt nạ phân vùng</h2><p>Hiển thị toàn bộ ảnh API trả về, ghép ảnh gốc và mask theo vị trí trong mảng.</p></div></div><EvidenceGallery frames={result.evidence_frames} masks={result.evidence_masks} /></section><FrameLogTable logs={result.frames_log} /></>
}
