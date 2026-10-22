import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock3, Menu, Search, ShieldCheck } from 'lucide-react'
import { dateTime } from '../../utils/format'
const titles = { '/': 'Tổng quan hệ thống', '/analyze': 'Phân tích video', '/result': 'Chi tiết kết quả', '/history': 'Lịch sử phân tích', '/model': 'Thông tin mô hình' }
export default function Header({ onMenu, open }) {
  const { pathname } = useLocation()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer) }, [])
  return <header className="topbar"><button type="button" className="icon-button menu-button" aria-label="Mở menu" aria-expanded={open} aria-controls="navigation" onClick={onMenu}><Menu /></button><div className="breadcrumb"><Link to="/">Trang chủ</Link><span>/</span><strong>{titles[pathname] || 'Không tìm thấy trang'}</strong></div><Link to="/history" className="header-search"><Search size={17} />Tìm kiếm video trong lịch sử...</Link><time dateTime={now.toISOString()}><Clock3 size={16} />{dateTime(now)}</time><span className="header-mark"><ShieldCheck size={21} /><span>Giám sát<br /><small>Phân tích bằng AI</small></span></span></header>
}
