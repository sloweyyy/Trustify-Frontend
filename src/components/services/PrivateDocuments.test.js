import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import FileMatchCheck from './FileMatchCheck';
import FilePreviewModal from './FilePreviewModal';
import VerificationStatusBox from './VerificationStatusBox';
import NFTService from '../../services/nft.service';
import IPFSService from '../../services/ipfs.service';

jest.mock('../../services/nft.service', () => ({ verifyFile: jest.fn(), getNFTMetadata: jest.fn() }));
jest.mock('../../services/ipfs.service', () => ({ getFileUrlFromMetadata: jest.fn() }));

const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const pdf = new File(['%PDF-1.4'], 'hop-dong.pdf', { type: 'application/pdf' });
const hash = 'a'.repeat(64);

beforeEach(() => jest.resetAllMocks());

const chooseAndCheck = async () => {
  render(<FileMatchCheck mintAddress="MINT-1" />, { wrapper });
  expect(screen.getByRole('button', { name: 'Đối chiếu' })).toBeDisabled();
  fireEvent.change(screen.getByLabelText('Tệp cần đối chiếu'), { target: { files: [pdf] } });
  expect(screen.getByText('hop-dong.pdf')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Đối chiếu' }));
};

test('reports a matching file and sends the mint address with the chosen file', async () => {
  NFTService.verifyFile.mockResolvedValue({ match: true, fileHash: hash, recordedHash: hash });
  await chooseAndCheck();
  expect(await screen.findByText('Tệp khớp với bản ghi công chứng.')).toBeInTheDocument();
  expect(NFTService.verifyFile).toHaveBeenCalledWith('MINT-1', pdf);
});

test('reports a mismatch and a legacy record', async () => {
  NFTService.verifyFile.mockResolvedValueOnce({ match: false });
  await chooseAndCheck();
  expect(await screen.findByText(/Tệp không khớp với bản ghi/)).toBeInTheDocument();

  NFTService.verifyFile.mockResolvedValueOnce({ match: null });
  fireEvent.click(screen.getAllByRole('button', { name: 'Đối chiếu' })[0]);
  expect(await screen.findByText(/được tạo trước khi có tính năng đối chiếu tệp/)).toBeInTheDocument();
});

test('shows the server message when the check fails', async () => {
  NFTService.verifyFile.mockRejectedValue({ response: { data: { message: 'Không tìm thấy bản ghi công chứng cho mã này' } } });
  await chooseAndCheck();
  expect(await screen.findByText('Không tìm thấy bản ghi công chứng cho mã này')).toBeInTheDocument();
});

test('preview uses the signed fileUrl directly without reading NFT metadata', async () => {
  render(
    <FilePreviewModal open onClose={jest.fn()} fileUrl="https://api.example.test/v1/files/outputs/x.pdf?exp=1&sig=s" metadataUrl="https://m.json" filename="x.pdf" />,
    { wrapper }
  );
  const frame = await screen.findByTitle('Tài liệu PDF: x.pdf');
  expect(frame.getAttribute('src')).toMatch(/^https:\/\/api\.example\.test\/v1\/files\/outputs\/x\.pdf\?exp=1&sig=s#/);
  expect(IPFSService.getFileUrlFromMetadata).not.toHaveBeenCalled();
});

test('preview falls back to metadata for older wallet items', async () => {
  IPFSService.getFileUrlFromMetadata.mockResolvedValue('https://example.com/old.png');
  render(<FilePreviewModal open onClose={jest.fn()} metadataUrl="https://example.com/metadata.json" filename="old.png" />, { wrapper });
  expect(await screen.findByAltText('old.png')).toHaveAttribute('src', 'https://example.com/old.png');
  expect(IPFSService.getFileUrlFromMetadata).toHaveBeenCalledWith('https://example.com/metadata.json');
});

test('verification shows the recorded fingerprint for current records', () => {
  const nftData = {
    mintAddress: 'MINT-1',
    offChainMetadata: { name: 'Trustify Notarized Doc', properties: { issuer: 'Trustify', sha256: hash, notarizedAt: '2026-10-26T00:00:00.000Z' } },
    viewLinks: {},
  };
  render(<VerificationStatusBox status={{ found: true }} displayText="MINT-1" nftData={nftData} />, { wrapper });
  expect(screen.getByText('Mã băm SHA-256 của tài liệu')).toBeInTheDocument();
  expect(screen.getByText(hash)).toBeInTheDocument();
  expect(screen.queryByText('Loại tài liệu')).not.toBeInTheDocument();
});
