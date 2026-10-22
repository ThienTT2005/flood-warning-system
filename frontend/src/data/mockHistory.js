// Illustrative records only. Replace this source with a history API when available.
export const mockHistory = [
  ['demo-1', 'flood_test_01.mp4', '2026-10-22T09:15:00+07:00', true, 92.4, 30, 24, 66.39],
  ['demo-2', 'street_normal.mp4', '2026-10-22T08:40:00+07:00', false, 81.2, 25, 1, 2.8],
  ['demo-3', 'flood_test_02.mp4', '2026-10-21T20:30:00+07:00', true, 94.1, 42, 35, 71.6],
  ['demo-4', 'ngatu_catlinh_cam03.mp4', '2026-10-21T18:15:00+07:00', true, 91.5, 36, 28, 58.4],
  ['demo-5', 'hamchui_kimlien_cam01.mp4', '2026-10-21T15:10:00+07:00', false, 88.3, 30, 0, 0],
].map(([id, video_name, analyzed_at, flood, average_confidence, total_frames_analyzed, flood_frames, average_flood_area_pct]) => ({ id, video_name, analyzed_at, conclusion: flood ? 'CÓ DẤU HIỆU NGẬP' : 'KHÔNG PHÁT HIỆN NGẬP', average_confidence, total_frames_analyzed, flood_frames, average_flood_area_pct, model_version: 'unet_r34_v1+cls_r18_v1', status: 'Hoàn thành', source: 'demo' }))
