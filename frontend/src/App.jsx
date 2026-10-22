import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { EmptyState } from './components/common/UI'
import DashboardPage from './pages/DashboardPage'
import AnalyzePage from './pages/AnalyzePage'
import ResultPage from './pages/ResultPage'
import HistoryPage from './pages/HistoryPage'
import ModelInfoPage from './pages/ModelInfoPage'
import { readSession, saveSession } from './utils/storage'

export default function App() {
  const [result, setResult] = useState(() => readSession('flood-result', null))
  const [history, setHistory] = useState(() => readSession('flood-history', []))
  const [storageWarning, setStorageWarning] = useState('')
  function complete(data) {
    setResult(data)
    const entry = { ...data, id: crypto.randomUUID(), analyzed_at: new Date().toISOString(), source: 'session' }
    delete entry.evidence_frames
    delete entry.evidence_masks
    delete entry.frames_log
    const next = [entry, ...(Array.isArray(history) ? history : [])]
    setHistory(next)
    saveSession('flood-history', next)
    setStorageWarning(saveSession('flood-result', data) ? '' : 'Bộ nhớ phiên không khả dụng hoặc đã đầy. Tải lại trang có thể làm mất kết quả hiện tại.')
  }
  return <BrowserRouter><Routes><Route element={<AppLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="analyze" element={<AnalyzePage onComplete={complete} />} />
    <Route path="result" element={<ResultPage result={result} storageWarning={storageWarning} />} />
    <Route path="history" element={<HistoryPage history={Array.isArray(history) ? history : []} />} />
    <Route path="model" element={<ModelInfoPage />} />
    <Route path="*" element={<EmptyState title="404 · Không tìm thấy trang" description="Đường dẫn này không tồn tại." to="/" action="Về tổng quan" />} />
  </Route></Routes></BrowserRouter>
}
