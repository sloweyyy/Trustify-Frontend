import React, { useId, useMemo, useState } from 'react';
import { Badge, Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined';
import AvatarIcon from '../static/AvatarIcon';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';
import NotarizationSessionDetailsModal from './NotarizationSessionDetailsModal';

const SessionCard = React.memo(({ session }) => {
  const [openModal, setOpenModal] = useState(false);
  const id = useId();
  const remaining = useMemo(() => {
    const duration = new Date(session.endDate) - new Date();
    if (!Number.isFinite(duration)) return { label: 'Chưa có thời gian kết thúc', tone: 'neutral' };
    if (duration <= 0) return { label: 'Đã kết thúc', tone: 'neutral' };
    const seconds = Math.floor(duration / 1000);
    const days = Math.floor(seconds / 86400), hours = Math.floor((seconds % 86400) / 3600), minutes = Math.floor((seconds % 3600) / 60);
    return { label: `Còn ${days > 0 ? `${days} ngày ${hours} giờ` : hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`}`, tone: days >= 5 ? 'success' : days >= 2 ? 'warning' : 'error' };
  }, [session.endDate]);
  const participants = session.users || [];
  const memberLabels = { pending: 'Chờ tham gia', accepted: 'Đã tham gia', rejected: 'Từ chối tham gia' };
  return (
    <Card component="li" sx={{ minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => setOpenModal(true)} aria-label={`Xem phiên ${session.sessionName}`} aria-describedby={`${id}-summary`} sx={{ p: { xs: 2, sm: 3 }, height: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
        <Stack id={`${id}-summary`} spacing={2} sx={{ width: '100%', minWidth: 0 }}>
          <Box><Typography component="h2" variant="h6" sx={{ overflowWrap: 'anywhere' }}>{session.sessionName}</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5, overflowWrap: 'anywhere' }}>Người tạo: {session.creator.name}</Typography></Box>
          <Box>{session.status?.status === 'unknown' ? <StatusChip label="Chưa gửi xử lý" /> : <DocumentStatusChip status={session.status?.status} />}</Box>
          <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 1 }}>
            <Typography component="dt" color="text.secondary">Lĩnh vực công chứng</Typography><Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{session.notaryField.name}</Typography>
            <Typography component="dt" color="text.secondary">Dịch vụ công chứng</Typography><Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{session.notaryService.name}</Typography>
          </Box>
          <Box><Typography color="text.secondary" sx={{ mb: 1 }}>Người tham gia</Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center"><Box aria-hidden="true"><AvatarIcon email={session.creator.email || '?'} /></Box>
                <Box sx={{ minWidth: 0 }}><Typography sx={{ overflowWrap: 'anywhere' }}>{session.creator.name || session.creator.email}</Typography><Typography color="text.secondary">Người tạo</Typography></Box>
              </Stack>
              {participants.map((member, index) => <Stack key={member._id || member.email || index} direction="row" spacing={1} alignItems="center">
                <Badge aria-hidden="true" variant="dot" color={member.status === 'pending' ? 'warning' : member.status === 'accepted' ? 'success' : member.status === 'rejected' ? 'error' : 'default'}>
                  <AvatarIcon email={member.email || '?'} />
                </Badge>
                <Box sx={{ minWidth: 0 }}><Typography sx={{ overflowWrap: 'anywhere' }}>{member.name || member.email || 'Người tham gia'}</Typography>
                  <Typography color="text.secondary">{memberLabels[member.status] || 'Chưa có thông tin tham gia'}</Typography></Box>
              </Stack>)}
            </Stack>
          </Box>
          <Box><StatusChip label={remaining.label} tone={remaining.tone} icon={<ScheduleOutlined />} /></Box>
          <Typography color="primary.main" sx={{ fontWeight: 600 }}>Xem phiên công chứng</Typography>
        </Stack>
      </CardActionArea>
      <NotarizationSessionDetailsModal open={openModal} onClose={() => setOpenModal(false)} session={session} />
    </Card>
  );
});
export default SessionCard;
