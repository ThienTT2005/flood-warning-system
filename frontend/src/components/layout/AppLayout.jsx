import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}><a className="skip-link" href="#main-content">Đến nội dung chính</a><Sidebar open={open} collapsed={collapsed} onClose={() => setOpen(false)} onCollapse={() => setCollapsed(!collapsed)} />{open && <button type="button" className="sidebar-backdrop" aria-label="Đóng menu" onClick={() => setOpen(false)} />}<div className="workspace"><Header onMenu={() => setOpen(!open)} open={open} /><main id="main-content" tabIndex={-1}><Outlet /></main><footer>FloodGuard AI · Hệ thống cảnh báo ngập úng</footer></div></div>
}
