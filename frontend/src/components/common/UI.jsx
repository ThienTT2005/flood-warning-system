import { FileSearch, LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
export function StatusBadge({ children, tone = 'neutral' }) { return <span className={`badge ${tone}`}><span className="dot" />{children}</span> }
export function StatCard({ label, value, note, icon: Icon, tone = 'primary' }) { return <article className="card stat"><div className="stat-top"><span>{label}</span>{Icon && <span className={`stat-icon ${tone}`}><Icon size={21} /></span>}</div><strong>{value}</strong><small>{note}</small></article> }
export function PageHeading({ title, description, children }) { return <section className="page-heading"><div><p className="eyebrow">FLOODGUARD AI / GIÁM SÁT NGẬP ÚNG</p><h1>{title}</h1><p>{description}</p></div>{children}</section> }
export function EmptyState({ title = 'Chưa có dữ liệu', description, to, action }) { return <section className="card empty"><FileSearch size={42} /><h2>{title}</h2><p>{description}</p>{to && <Link className="button" to={to}>{action}</Link>}</section> }
export function LoadingSpinner({ children }) { return <div className="notice" role="status"><LoaderCircle className="spin" size={24} /><div><strong>AI đang phân tích video</strong><p>{children}</p></div></div> }
export function DemoNotice() { return <div className="demo-notice">Dữ liệu minh họa · Backend chưa cung cấp API thống kê và lịch sử. Kết quả phân tích video thật được hiển thị riêng.</div> }
