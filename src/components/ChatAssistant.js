import React, { useId, useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { ChatBubbleOutlineRounded } from '@mui/icons-material';
import Chatbox from './Chatbox';
const ChatAssistant = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const dialogId = useId();
  return <>
    <Tooltip title="Mở trợ lý hướng dẫn"><Fab variant="extended" color="primary" aria-label="Mở trợ lý hướng dẫn" aria-haspopup="dialog" aria-expanded={showChatbox} aria-controls={showChatbox ? dialogId : undefined} onClick={() => setShowChatbox(true)} sx={{ position: 'fixed', right: { xs: 12, sm: 24 }, bottom: { xs: 'calc(80px + env(safe-area-inset-bottom))', sm: 24 }, minHeight: 48, gap: 1, zIndex: (theme) => theme.zIndex.speedDial }}><ChatBubbleOutlineRounded />Trợ lý</Fab></Tooltip>
    {showChatbox && <Chatbox showChatbox={showChatbox} setShowChatbox={setShowChatbox} dialogId={dialogId} />}
  </>;
};
export default ChatAssistant;
