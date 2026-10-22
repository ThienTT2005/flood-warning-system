import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
export default function EvidenceModal({ image, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    const element = dialog.current
    const previous = document.activeElement
    element.showModal()
    return () => { element.close(); previous?.focus() }
  }, [])
  return <dialog ref={dialog} className="evidence-modal" aria-labelledby="image-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === dialog.current) onClose() }}><div className="modal-content"><div className="section-heading"><h2 id="image-title">{image.title}</h2><button type="button" className="icon-button" aria-label="Đóng ảnh" onClick={onClose}><X /></button></div><img src={image.src} alt={image.title} /></div></dialog>
}
