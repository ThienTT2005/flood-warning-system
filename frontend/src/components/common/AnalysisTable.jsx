import { FileVideo } from 'lucide-react'
import { dateTime, floodState, number, percent } from '../../utils/format'
import { StatusBadge } from './UI'
export default function AnalysisTable({ records }) {
  return <div className="table-scroll" role="region" aria-label="Danh sách phân tích" tabIndex={0}><table><thead><tr><th>Tên video</th><th>Thời gian</th><th>Tổng frame</th><th>Frame ngập</th><th>Độ tin cậy</th><th>Vùng ngập TB</th><th>Kết luận</th><th>Trạng thái</th></tr></thead><tbody>{records.map(item => <tr key={item.id}><td><div className="file-name"><FileVideo size={18} /><span>{item.video_name || 'Không rõ tên'}</span></div><small>{item.source === 'demo' ? 'Minh họa' : 'Phiên hiện tại'}</small></td><td>{dateTime(item.analyzed_at)}</td><td>{number(item.total_frames_analyzed)}</td><td className={floodState(item)}>{number(item.flood_frames)}</td><td>{percent(item.average_confidence)}</td><td>{percent(item.average_flood_area_pct)}</td><td><StatusBadge tone={floodState(item)}>{item.conclusion || 'Chưa có kết luận'}</StatusBadge></td><td>{item.status || '—'}</td></tr>)}</tbody></table></div>
}
