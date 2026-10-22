import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Video, Waves, ShieldCheck, ChartPie, Server, Cpu, RefreshCw, ArrowRight } from 'lucide-react'
import { DemoNotice, PageHeading, StatCard, StatusBadge } from '../components/common/UI'
import AnalysisTable from '../components/common/AnalysisTable'
import { mockDashboard as data } from '../data/mockDashboard'
import { mockHistory } from '../data/mockHistory'
import { percent } from '../utils/format'
import { checkBackend } from '../services/floodApi'

export default function DashboardPage() {
  const [backend, setBackend] = useState('checking')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    checkBackend(controller.signal).then(ok => setBackend(ok ? 'online' : 'offline')).catch(() => setBackend('offline'))
    return () => { clearTimeout(timer); controller.abort() }
  }, [attempt])
  return <><PageHeading title="Tổng quan hệ thống" description="Trung tâm theo dõi và phân tích ngập úng bằng thị giác máy tính."><Link className="button" to="/analyze"><PlusCircle size={19} />Phân tích video mới</Link></PageHeading><DemoNotice /><div className="stats-grid">
    <StatCard label="Video đã phân tích" value={data.total} note="Tổng lượt phân tích minh họa" icon={Video} />
    <StatCard label="Video phát hiện ngập" value={data.flood} note="Kết quả thống kê minh họa" icon={Waves} tone="danger" />
    <StatCard label="Tỷ lệ phát hiện ngập" value={percent(data.flood / data.total, true)} note="Video có ngập / Tổng video" icon={ChartPie} />
    <StatCard label="Độ tin cậy trung bình" value={percent(data.confidence)} note="Dữ liệu minh họa, không phải độ chính xác AI" icon={ShieldCheck} tone="safe" />
  </div><div className="dashboard-charts"><section className="card"><h2>Số video được phân tích trong 7 ngày gần nhất</h2><p>Thống kê minh họa lượng video tiếp nhận</p><div className="bar-chart" role="img" aria-label="Video từ 16 đến 22 tháng 10: 2, 3, 5, 4, 6, 5, 3"><div className="chart-grid" />{data.daily.map((value, index) => <div className="bar-column" key={data.dates[index]}><span>{value}</span><div className="bar" style={{ height: `${value * 25}px` }} /><small>{data.dates[index]}</small></div>)}</div><div className="card-foot">Dữ liệu minh họa · 16–22/10/2026<span>Trung bình: 4 video/ngày</span></div></section><section className="card"><h2>Phân bố kết quả phân tích</h2><p>Tổng số {data.total} lượt phân tích minh họa</p><div className="donut" role="img" aria-label="17 video có dấu hiệu ngập, 11 video không phát hiện ngập"><div><strong>{data.total}</strong><small>Tổng video</small></div></div><div className="legend-row"><span><i className="dot danger" />Có dấu hiệu ngập</span><strong>17 <small>60,7%</small></strong></div><div className="legend-row"><span><i className="dot safe" />Không phát hiện ngập</span><strong>11 <small>39,3%</small></strong></div></section></div>
    <section className="card system-card"><div><h2>Trạng thái hệ thống</h2><p>Kết nối API được kiểm tra trực tiếp; mô hình chưa có API kiểm tra riêng.</p></div><div className="system-item"><Server size={22} /><div><strong>Backend API</strong><br /><StatusBadge tone={backend === 'online' ? 'safe' : 'neutral'}>{backend === 'checking' ? 'Đang kiểm tra…' : backend === 'online' ? 'Kết nối thành công' : 'Không thể kết nối'}</StatusBadge></div></div><div className="system-item"><Cpu size={22} /><div><strong>Mô hình AI</strong><br /><StatusBadge>Chưa xác minh trạng thái</StatusBadge></div></div><button className="button secondary" type="button" disabled={backend === 'checking'} onClick={() => { setBackend('checking'); setAttempt(attempt + 1) }}><RefreshCw size={16} />Kiểm tra lại</button></section>
    <section className="card table-card"><div className="section-heading"><div><h2>Các lần phân tích gần nhất</h2><p>Dữ liệu minh họa từ pipeline ResNet18 & U-Net</p></div><Link className="text-link" to="/history">Xem toàn bộ lịch sử <ArrowRight size={16} /></Link></div><AnalysisTable records={mockHistory} /><div className="table-footer">Hiển thị {mockHistory.length} bản ghi minh họa</div></section></>
}
