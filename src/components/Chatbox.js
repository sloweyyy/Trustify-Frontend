import React, { useState, useEffect, useRef, useId } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CloseRounded, SendRounded } from '@mui/icons-material';
import { sendMessageToGemini } from '../services/chat.service';
import ReactMarkdown from 'react-markdown';
const suggestions = ['Tôi tạo hồ sơ thế nào?', 'Tôi xem tiến độ hồ sơ ở đâu?', 'Bản ghi tài liệu là gì?'];
const Chatbox = ({ showChatbox, setShowChatbox, dialogId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onLoading, setOnLoading] = useState(false);
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const [error, setError] = useState(false);
  const [viewport, setViewport] = useState(null);
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef(null);
  const title = useId();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSubmit = async () => {
    if (onLoading || newMessage.trim() === '') return;
    const userMessage = newMessage.trim();
    setNewMessage('');
    setOnLoading(true);
    setShowWaitingMessage(true);
    setError(false);
    setMessages((previous) => error && previous.at(-1)?.type === 'user' && previous.at(-1)?.content === userMessage ? previous : [...previous, { type: 'user', content: userMessage }]);
    try {
      const geminiResponse = await sendMessageToGemini(userMessage);
      if (typeof geminiResponse !== 'string' || !geminiResponse.trim()) throw new Error('Empty assistant response');
      setMessages((previous) => [...previous, { type: 'bot', content: geminiResponse }]);
    } catch (error) {
      setError(true);
      setNewMessage(userMessage);
    } finally {
      setShowWaitingMessage(false);
      setOnLoading(false);
    }
  };
  const handleClose = () => {
    setShowChatbox(false);
  };
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    endOfMessagesRef.current?.scrollIntoView?.({ behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, showWaitingMessage]);
  useEffect(() => {
    const visual = window.visualViewport;
    if (!mobile || !showChatbox || !visual) return;
    const update = () => setViewport({ height: visual.height, top: visual.offsetTop });
    update(); visual.addEventListener('resize', update); visual.addEventListener('scroll', update);
    return () => { visual.removeEventListener('resize', update); visual.removeEventListener('scroll', update); };
  }, [mobile, showChatbox]);
  return <Dialog open={showChatbox} onClose={handleClose} fullScreen={mobile} maxWidth={false} aria-labelledby={title} data-testid="chatbox-container" PaperProps={{ id: dialogId, sx: mobile ? { m: 0, height: viewport?.height || '100dvh', maxHeight: viewport?.height || '100dvh', top: viewport?.top || 0, position: 'fixed', width: '100%' } : { position: 'fixed', right: 24, bottom: 24, m: 0, width: 360, height: 600, maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100dvh - 48px)' } }}>
    <DialogTitle id={`${title}-header`} sx={{ pr: 8 }}><Box component="span" id={title}>Trợ lý hướng dẫn</Box><IconButton aria-label="Đóng trợ lý" onClick={handleClose} data-testid="close-button" sx={{ position: 'absolute', right: 12, top: 12 }}><CloseRounded /></IconButton></DialogTitle>
    <DialogContent dividers sx={{ minHeight: 0, p: 2 }}>
      <Typography color="text.secondary" sx={{ mb: 2 }}>Bạn cần hướng dẫn về bước nào? Thông tin hướng dẫn không thay thế ý kiến của công chứng viên.</Typography>
      {!messages.length && <Box sx={{ display: 'grid', gap: 1, mb: 2 }}>{suggestions.map((question) => <Button variant="outlined" key={question} sx={{ justifyContent: 'flex-start', textAlign: 'left' }} onClick={() => { setNewMessage(question); inputRef.current?.focus(); }}>{question}</Button>)}</Box>}
      <Box role="log" aria-live="polite" aria-relevant="additions text" aria-label="Cuộc trò chuyện" data-testid="messages-container" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.map((message, index) => <Box key={index} sx={{ border: 1, borderColor: 'divider', bgcolor: message.type === 'user' ? 'action.hover' : 'background.paper', p: 1.5, borderRadius: 1, width: '95%', alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start', overflowWrap: 'anywhere' }}>
          <Typography fontWeight={600} sx={{ mb: 1 }}>{message.type === 'user' ? 'Bạn' : 'Trợ lý'}</Typography>
          <Box sx={{ fontSize: '1rem', lineHeight: 1.7, '& p': { m: 0, mb: 1 }, '& pre': { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }, '& code': { fontSize: 'inherit' }, '& ul,& ol': { pl: 3 }, '& img': { maxWidth: '100%' } }}><ReactMarkdown components={{ a: ({ href, children }) => <Link href={href} target="_blank" rel="noopener noreferrer">{children}</Link> }}>{message.content}</ReactMarkdown></Box>
        </Box>)}
        {showWaitingMessage && <Typography role="status" color="text.secondary">Trợ lý đang trả lời…</Typography>}
        <div ref={endOfMessagesRef} />
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>Chưa nhận được trả lời. Câu hỏi đã được điền lại bên dưới để bạn thử gửi lại.</Alert>}
    </DialogContent>
    <DialogActions sx={{ display: 'block', p: 2, pb: mobile ? 'max(16px, env(safe-area-inset-bottom))' : 2 }}>
      <Box component="form" aria-label="Gửi câu hỏi cho trợ lý" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }} sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
        <TextField fullWidth multiline maxRows={4} inputRef={inputRef} label="Câu hỏi của bạn" placeholder="Nhập tin nhắn..." value={newMessage} onChange={handleInputChange} disabled={onLoading} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); handleSubmit(); } }} />
        <Button type="submit" variant="contained" aria-label="Gửi câu hỏi" disabled={onLoading || newMessage.trim() === ''} data-testid="send-button" sx={{ minWidth: 64 }}><SendRounded /></Button>
      </Box><Typography color="text.secondary" sx={{ mt: 1 }}>Chỉ hỏi về cách sử dụng; không gửi mật khẩu hoặc giấy tờ cá nhân.</Typography>
    </DialogActions>
  </Dialog>;
};
export default Chatbox;
