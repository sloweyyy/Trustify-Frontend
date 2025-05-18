import { Box, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import AssistantIcon from '@mui/icons-material/Assistant';
import PhoneIcon from '@mui/icons-material/Phone';
import Chatbox from './Chatbox';

const ChatAssistant = () => {
  const [showChatbox, setShowChatbox] = useState(false);

  const handleChatboxClick = () => {
    setShowChatbox(true);
  };

  return (
    <>
      <Tooltip
        title="Trợ lý ảo"
        placement="left"
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: 'transparent',
              color: (theme) => theme.palette.primary.main,
              fontSize: '16px',
              fontWeight: 600,
              '& .MuiTooltip-arrow': {
                color: 'transparent',
              },
            },
          },
        }}
        onClick={handleChatboxClick}
      >
        <AssistantIcon
          sx={{
            position: 'fixed',
            width: '3vw',
            height: '3vw',
            bottom: '5%',
            right: '2%',
            color: (theme) => theme.palette.primary.main,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        />
      </Tooltip>

      <Tooltip
        title="Liên hệ tổng đài"
        placement="left"
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: 'transparent',
              color: (theme) => theme.palette.primary.main,
              fontSize: '16px',
              fontWeight: 600,
              '& .MuiTooltip-arrow': {
                color: 'transparent',
              },
            },
          },
        }}
      >
        <PhoneIcon
          sx={{
            position: 'fixed',
            width: '3vw',
            height: '3vw',
            bottom: '12%',
            right: '2%',
            color: (theme) => theme.palette.primary.main,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        />
      </Tooltip>
      {showChatbox && <Chatbox showChatbox={showChatbox} setShowChatbox={setShowChatbox} />}
    </>
  );
};

export default ChatAssistant;
