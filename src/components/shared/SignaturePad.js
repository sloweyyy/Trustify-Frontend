import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onSave, loading = false, id: suppliedId }) => {
  const generatedId = useId();
  const id = suppliedId || `${generatedId}-signature`;
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const drawingRef = useRef(false);
  const layoutRef = useRef({ width: 0, height: 240, ratio: 0 });
  const strokesRef = useRef({ groups: [], width: 1, height: 240 });
  const resizeRef = useRef(() => {});
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    const resize = () => {
      const pad = canvasRef.current;
      if (!pad || !frameRef.current || drawingRef.current) return;
      const width = Math.max(1, Math.floor(frameRef.current.clientWidth));
      const height = 240;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const previous = layoutRef.current;
      if (previous.width === width && previous.ratio === ratio) return;
      const canvas = pad.getCanvas();
      // Keep CSS coordinates fixed during an active stroke; a queued resize
      // is replayed by onEnd instead of stretching the drawing surface.
      canvas.style.width = `${width}px`;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
      const original = strokesRef.current;
      const scale = Math.min(width / original.width, height / original.height);
      // Replay vector strokes instead of stretching a bitmap. Keep the original
      // coordinates until another stroke is drawn, so shrinking is reversible.
      pad.fromData(original.groups.map((group) => group.map((point) => ({ ...point, x: point.x * scale, y: point.y * scale }))));
      layoutRef.current = { width, height, ratio };
    };
    resizeRef.current = resize;
    resize();
    const observer = new ResizeObserver(resize);
    try { observer.observe(frameRef.current, { box: 'device-pixel-content-box' }); }
    catch { observer.observe(frameRef.current); }
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', resize);
    let resolution;
    const watchResolution = () => {
      resolution?.removeEventListener('change', onResolutionChange);
      resolution = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      resolution.addEventListener('change', onResolutionChange);
    };
    const onResolutionChange = () => { resize(); watchResolution(); };
    watchResolution();
    // Some display/emulation changes update DPR without a resize/media event.
    // Only compare the number here; replay strokes only when it changes.
    const ratioCheck = window.setInterval(() => {
      if (layoutRef.current.ratio !== Math.max(window.devicePixelRatio || 1, 1)) resize();
    }, 500);
    return () => {
      window.clearInterval(ratioCheck);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', resize);
      resolution?.removeEventListener('change', onResolutionChange);
    };
  }, []);

  const rememberStrokes = () => {
    drawingRef.current = false;
    const { width, height } = layoutRef.current;
    strokesRef.current = { groups: canvasRef.current.toData(), width, height };
    setError('');
    resizeRef.current();
  };
  const clear = () => {
    canvasRef.current.clear();
    strokesRef.current = { groups: [], width: layoutRef.current.width, height: 240 };
    setError('');
  };
  const save = () => {
    if (loading) return;
    if (canvasRef.current.isEmpty()) { setError('Bạn chưa vẽ chữ ký. Vui lòng ký trong khung bên dưới.'); return; }
    canvasRef.current.getTrimmedCanvas().toBlob((blob) => {
      if (blob) onSave(blob);
      else setError('Chưa thể tạo ảnh chữ ký. Vui lòng thử lại.');
    });
  };

  return (
    <Stack component="section" spacing={2} aria-labelledby={id} sx={{ minWidth: 0 }}>
      <Typography component="h3" variant="subtitle1" tabIndex={-1} id={id}>Vẽ chữ ký</Typography>
      <Typography color="text.secondary" id={`${id}-help`}>Ký trong khung bên dưới. Bạn có thể xóa và ký lại trước khi lưu.</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box ref={frameRef} sx={{ width: '100%', minWidth: 0, bgcolor: '#FFFFFF', border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden', boxSizing: 'border-box' }}>
        <SignatureCanvas ref={canvasRef} penColor="#000000" throttle={0} clearOnResize={false}
          onBegin={() => { drawingRef.current = true; }} onEnd={rememberStrokes}
          canvasProps={{ width: 1, height: 1, role: 'img', 'aria-label': 'Khung vẽ chữ ký bằng chuột hoặc cảm ứng', 'aria-describedby': `${id}-help`, style: { display: 'block', width: '100%', height: 240, touchAction: 'none' } }} />
      </Box>
      <Typography color="text.secondary">Việc vẽ chữ ký cần chuột hoặc màn hình cảm ứng.</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button variant="outlined" disabled={loading} onClick={clear}>Xóa và ký lại</Button>
        <Button variant="contained" disabled={loading} onClick={save} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}>
          {loading ? 'Đang lưu chữ ký…' : 'Lưu chữ ký'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignaturePad;
