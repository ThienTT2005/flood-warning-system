import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import { imageSource } from '../../utils/image'
import { EmptyState } from '../common/UI'
import EvidenceModal from './EvidenceModal'
export default function EvidenceGallery({ frames, masks }) {
  const [selected, setSelected] = useState(null)
  const originals = Array.isArray(frames) ? frames : []
  const segments = Array.isArray(masks) ? masks : []
  const count = Math.max(originals.length, segments.length)
  if (!count) return <EmptyState title="Không có ảnh bằng chứng" description="API không trả về ảnh bằng chứng hoặc ảnh phân vùng cho video này." />
  return <><div className="evidence-list">{Array.from({ length: count }, (_, index) => <article className="card evidence-pair" key={`evidence-${index}`}><div className="section-heading"><h3>Cặp bằng chứng {index + 1}</h3><small><ZoomIn size={14} /> Nhấn vào ảnh để phóng to</small></div><div className="image-pair">{[['Khung hình gốc', originals[index]], ['Mask phân vùng', segments[index]]].map(([label, value]) => {
    const src = imageSource(value)
    const title = `${label} · Bằng chứng ${index + 1}`
    return <figure key={label}><figcaption>{label}</figcaption>{src ? <button className="image-button" type="button" aria-label={`Phóng to ${title}`} onClick={() => setSelected({ src, title })}><img src={src} loading="lazy" alt={title} /></button> : <div className="image-missing">API không cung cấp ảnh này</div>}</figure>
  })}</div></article>)}</div>{selected && <EvidenceModal image={selected} onClose={() => setSelected(null)} />}</>
}
