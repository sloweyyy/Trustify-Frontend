import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import SignaturePad from './SignaturePad';
import NotaryFeedback from '../services/NotaryFeedback';
import HistoryDetailModal from '../modals/HistoryDetailModal';

let mockWidth = 600;
const mockPad = { clear: jest.fn(), isEmpty: jest.fn(), toData: jest.fn(() => []), fromData: jest.fn(), getTrimmedCanvas: jest.fn() };
jest.mock('react-signature-canvas', () => {
  const React = require('react');
  return React.forwardRef(({ canvasProps, onBegin, onEnd }, ref) => {
    const canvas = React.useRef(null);
    React.useImperativeHandle(ref, () => ({ ...mockPad, getCanvas: () => canvas.current }));
    return <canvas {...canvasProps} ref={canvas} onMouseDown={onBegin} onMouseUp={onEnd} />;
  });
});
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const output = [{ filename: 'Bản chứng nhận.pdf', firebaseUrl: 'https://example.com/original-output.pdf' }];
beforeEach(() => {
  mockWidth = 600; jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => mockWidth);
  jest.clearAllMocks(); mockPad.isEmpty.mockReturnValue(true); mockPad.toData.mockReturnValue([]);
  global.ResizeObserver = class { observe() {} disconnect() {} };
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn(), addListener: jest.fn(), removeListener: jest.fn() }));
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ setTransform: jest.fn() });
  Element.prototype.scrollIntoView = jest.fn();
});
afterEach(() => jest.restoreAllMocks());

test('an empty canvas explains the problem without calling the save callback', () => {
  const save = jest.fn(); render(<SignaturePad onSave={save} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Bạn chưa vẽ chữ ký'); expect(save).not.toHaveBeenCalled();
  expect(screen.getByRole('img', { name: 'Khung vẽ chữ ký bằng chuột hoặc cảm ứng' })).toHaveAccessibleDescription(/Ký trong khung/);
});

test('nonempty save passes the same PNG Blob to the existing callback', () => {
  const blob = new Blob(['fixture'], { type: 'image/png' }), save = jest.fn(); mockPad.isEmpty.mockReturnValue(false);
  mockPad.getTrimmedCanvas.mockReturnValue({ toBlob: (callback) => callback(blob) });
  render(<SignaturePad onSave={save} />, { wrapper }); fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký' }));
  expect(save).toHaveBeenCalledWith(blob);
});

test('clear removes strokes and an empty-save error; loading disables both actions', () => {
  const view = render(<SignaturePad onSave={jest.fn()} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký' })); fireEvent.click(screen.getByRole('button', { name: 'Xóa và ký lại' }));
  expect(mockPad.clear).toHaveBeenCalledTimes(1); expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  view.rerender(<SignaturePad onSave={jest.fn()} loading />);
  expect(screen.getByRole('button', { name: 'Xóa và ký lại' })).toBeDisabled(); expect(screen.getByRole('button', { name: 'Đang lưu chữ ký…' })).toBeDisabled();
});

test('a failed PNG conversion is recoverable and does not call the callback', () => {
  const save = jest.fn(); mockPad.isEmpty.mockReturnValue(false); mockPad.getTrimmedCanvas.mockReturnValue({ toBlob: (callback) => callback(null) });
  render(<SignaturePad onSave={save} />, { wrapper }); fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Chưa thể tạo ảnh chữ ký'); expect(save).not.toHaveBeenCalled();
});

test('returned file names and exact open behavior remain unchanged', () => {
  const open = jest.spyOn(window, 'open').mockImplementation(() => null);
  render(<NotaryFeedback output={output} signature={{ approvalStatus: { user: { approved: true } }, signatureImage: 'https://example.com/signature.png' }} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Mở tài liệu Bản chứng nhận.pdf' }));
  expect(open).toHaveBeenCalledWith('https://example.com/original-output.pdf', '_blank');
  expect(screen.getByRole('img', { name: 'Chữ ký của bạn' })).toHaveAttribute('src', 'https://example.com/signature.png');
  expect(screen.queryByRole('button', { name: 'Lưu chữ ký' })).not.toBeInTheDocument();
});

test('missing-file protocol and the original note content remain readable', () => {
  const view = render(<NotaryFeedback output={[]} feedback="Missing documents: identity_doc, original_doc." />, { wrapper });
  expect(screen.getByRole('alert')).toHaveTextContent('Hồ sơ cần bổ sung'); expect(screen.getAllByRole('listitem')).toHaveLength(2);
  view.rerender(<NotaryFeedback output={[]} feedback="Nội dung nguyên văn từ công chứng viên" />);
  expect(screen.getByRole('alert')).toHaveTextContent('Nội dung nguyên văn từ công chứng viên');
  expect(screen.queryByRole('button', { name: 'Lưu chữ ký' })).not.toBeInTheDocument();
});

const showSignatureRecord = (approved) => {
  const data = [{ _id: 'HS-CALLOUT', status: { status: 'digitalSignature' }, output, signature: { approvalStatus: { user: { approved } }, signatureImage: null } }];
  render(<HistoryDetailModal open data={data} notaryId="HS-CALLOUT" handleClose={jest.fn()} />, { wrapper });
};

test('signature shortcut focuses the pad before approval', () => {
  showSignatureRecord(false); fireEvent.click(screen.getByRole('button', { name: 'Ký ngay' }));
  expect(screen.getByRole('heading', { name: 'Vẽ chữ ký' })).toHaveFocus();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'smooth' });
});

test('signature shortcut is absent after approval', () => {
  showSignatureRecord(true); expect(screen.queryByRole('button', { name: 'Ký ngay' })).not.toBeInTheDocument();
});

test('installed v2 point arrays survive shrink/expand without mutating original coordinates', () => {
  const groups = [[{ x: 60, y: 40, time: 1, color: '#000000' }, { x: 300, y: 120, time: 2, color: '#000000' }]];
  mockPad.toData.mockReturnValue(groups); render(<SignaturePad onSave={jest.fn()} />, { wrapper });
  fireEvent.mouseUp(screen.getByRole('img', { name: 'Khung vẽ chữ ký bằng chuột hoặc cảm ứng' }));
  mockWidth = 300; fireEvent.resize(window);
  expect(mockPad.fromData).toHaveBeenLastCalledWith([[{ x: 30, y: 20, time: 1, color: '#000000' }, { x: 150, y: 60, time: 2, color: '#000000' }]]);
  mockWidth = 600; fireEvent.resize(window); expect(mockPad.fromData).toHaveBeenLastCalledWith(groups);
  expect(groups[0][0].x).toBe(60);
});
