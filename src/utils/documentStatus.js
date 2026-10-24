// Presentation only. Keep API enums and the existing label-based filter values intact.
export const DOCUMENT_STATES = {
  pending: { label: 'Chờ xử lý', tone: 'warning' },
  processing: { label: 'Đang xử lý', tone: 'info' },
  verification: { label: 'Đang xử lý', detail: 'Bước xác minh', tone: 'info' },
  digitalSignature: { label: 'Chờ ký số', tone: 'signature' },
  completed: { label: 'Hoàn tất', tone: 'success' },
  rejected: { label: 'Bị từ chối', tone: 'error' },
};

const legacyLabels = {
  'Chờ xử lý': 'pending',
  'Đang xử lý': 'processing',
  'Đang xác minh': 'verification',
  'Sẵn sàng ký số': 'digitalSignature',
  'Chờ ký số': 'digitalSignature',
  'Hoàn tất': 'completed',
  'Hoàn thành': 'completed',
  'Không hợp lệ': 'rejected',
  'Bị từ chối': 'rejected',
  invalid: 'rejected', // Existing admin grid's display alias; never written to an API.
};
const unknown = { label: 'Chưa có thông tin trạng thái', tone: 'neutral' };

export const getDocumentStatus = (value) => {
  if (typeof value !== 'string') return unknown;
  const raw = Object.prototype.hasOwnProperty.call(legacyLabels, value) ? legacyLabels[value] : value;
  return Object.prototype.hasOwnProperty.call(DOCUMENT_STATES, raw) ? DOCUMENT_STATES[raw] : unknown;
};

export const getDocumentFilterLabel = (value) => {
  if (value === 'Tất cả') return value;
  const status = getDocumentStatus(value);
  return status.detail ? `${status.label} · Xác minh` : status.label;
};

export const matchesDocumentStatusSearch = (value, query) =>
  getDocumentFilterLabel(value).toLocaleLowerCase('vi-VN').includes(query.toLocaleLowerCase('vi-VN'));
