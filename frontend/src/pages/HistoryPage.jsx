import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Search, RotateCcw } from 'lucide-react'
import { DemoNotice, EmptyState, PageHeading } from '../components/common/UI'
import AnalysisTable from '../components/common/AnalysisTable'
import { mockHistory } from '../data/mockHistory'
import { floodState } from '../utils/format'
export default function HistoryPage({ history }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const matches = row => String(row.video_name || '').toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi').trim()) && (filter === 'all' || floodState(row) === filter)
  const real = history.filter(item => item && typeof item === 'object').filter(matches)
  const demo = mockHistory.filter(matches)
  return <><PageHeading title="Lịch sử phân tích video" description="Tra cứu kết quả trong phiên làm việc và các bản ghi minh họa."><Link className="button" to="/analyze"><PlusCircle size={18} />Phân tích video mới</Link></PageHeading><section className="card"><h2><Search size={20} />Bộ lọc tìm kiếm và tra cứu</h2><div className="filters"><label>Tìm kiếm theo tên video<input type="search" placeholder="Nhập tên video..." value={search} onChange={event => setSearch(event.target.value)} /></label><label>Kết luận<select value={filter} onChange={event => setFilter(event.target.value)}><option value="all">Tất cả kết luận</option><option value="danger">Có dấu hiệu ngập</option><option value="safe">Không phát hiện ngập</option><option value="neutral">Chưa có kết luận</option></select></label><button type="button" className="button secondary" onClick={() => { setSearch(''); setFilter('all') }}><RotateCcw size={16} />Đặt lại</button></div></section><section className="card table-card"><div className="section-heading"><div><h2>Kết quả thật trong phiên hiện tại</h2><p>Lưu thông tin tóm tắt trong sessionStorage; không lưu ảnh vào localStorage.</p></div><Link className="text-link" to="/result">Kết quả gần nhất →</Link></div>{real.length ? <AnalysisTable records={real} /> : <EmptyState title="Chưa có kết quả phù hợp" description="Phân tích video mới hoặc thay đổi bộ lọc để xem kết quả." to="/analyze" action="Phân tích video" />}</section><DemoNotice /><section className="card table-card"><div className="section-heading"><h2>Lịch sử minh họa</h2><span>{demo.length} kết quả phù hợp</span></div>{demo.length ? <AnalysisTable records={demo} /> : <EmptyState title="Không tìm thấy bản ghi minh họa" description="Hãy thử tên video hoặc kết luận khác." />}</section></>
}
