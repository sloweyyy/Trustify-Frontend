import React, { useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AvatarIcon from '../static/AvatarIcon';
import DetailProcessingSessionModal from './DetailProcessingSessionModal';
import DetailReadyToSignSessionModal from './DetailReadyToSignSessionModal';
import { GestureRounded } from '@mui/icons-material';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';

const NotarySessionCard = ({ session }) => {
  const [remainingTimeTone, setRemainingTimeTone] = useState('neutral');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [openProcessingModal, setOpenProcessingModal] = useState(false);
  const [openReadyToSignModal, setOpenReadyToSignModal] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const endDate = new Date(session.sessionId.endDate);
      const now = new Date();
      const durationRemaining = endDate - now;

      if (durationRemaining > 0) {
        const totalSecondsRemaining = Math.floor(durationRemaining / 1000);
        const daysRemaining = Math.floor(totalSecondsRemaining / (60 * 60 * 24));
        const hoursRemaining = Math.floor((totalSecondsRemaining % (60 * 60 * 24)) / (60 * 60));
        const minutesRemaining = Math.floor((totalSecondsRemaining % (60 * 60)) / 60);

        const timeStrings = [];
        if (daysRemaining > 0) {
          timeStrings.push(`${daysRemaining} ngày ${hoursRemaining} giờ`);
        } else {
          if (hoursRemaining > 0) {
            timeStrings.push(`${hoursRemaining} giờ ${minutesRemaining} phút`);
          } else {
            timeStrings.push(`${minutesRemaining} phút`);
          }
        }

        if (daysRemaining >= 5) {
          setRemainingTimeTone('success');
        } else if (daysRemaining >= 2) {
          setRemainingTimeTone('warning');
        } else {
          setRemainingTimeTone('error');
        }

        setTimeRemaining('Còn ' + timeStrings.join(' '));
      } else {
        setRemainingTimeTone('neutral');
        setTimeRemaining('Đã kết thúc');
      }
    };

    calculateTimeRemaining();
  }, [session]);

  return (
    <>
      <Card
        sx={{
          flexBasis: {
            xs: '100%',
            sm: 'calc(70% - 24px)',
            md: 'calc(50% - 24px)',
          },
          minWidth: 0,
          overflowWrap: 'anywhere',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardActionArea
          aria-label={`Xem chi tiết phiên ${session.sessionId.sessionName}`}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexGrow: 1,
            p: 2,
            backgroundColor: 'background.paper',
            boxShadow: 'none',
            borderRadius: 1,
            border: 1,
            borderColor: 'divider',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
          onClick={() => (session.status === 'processing' ? setOpenProcessingModal(true) : setOpenReadyToSignModal(true))}
        >
          <Box width={'100%'}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingX: 0,
                alignItems: 'flex-start',
                paddingTop: 0,
              }}
            >
              <Box>
                <Typography component="h3" sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
                  {session.sessionId.sessionName}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'text.secondary' }}>
                  tạo bởi {session.sessionId.createdBy.name}
                </Typography>
              </Box>
              {session.status === 'readyToSign' ? <StatusChip label="Chờ ký số" tone="signature" /> : <DocumentStatusChip status={session.status} />}
            </CardContent>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 400 }}>Lĩnh vực:</Typography>
              <Box
                sx={{ px: 1, py: 0.5, backgroundColor: 'action.hover', borderRadius: 1, alignItems: 'center', display: 'flex' }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'text.secondary' }}>
                  {session.sessionId.notaryField.name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 400 }}>Dịch vụ:</Typography>
              <Box
                sx={{ px: 1, py: 0.5, backgroundColor: 'action.hover', borderRadius: 1, display: 'flex', alignItems: 'center' }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'text.secondary' }}>
                  {session.sessionId.notaryService.name}
                </Typography>
              </Box>
            </Box>

            {/* Signature indicator */}
            {session.status === 'readyToSign' &&
              (session.approvalStatus?.creator?.signatureImage ||
                session.approvalStatus?.users?.some((user) => user.signatureImage)) && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                  <GestureRounded
                    sx={{
                      color: 'info.main',
                      fontSize: 16,
                      verticalAlign: 'middle',
                    }}
                  />
                  <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'info.main' }}>
                    Có chữ ký từ người tham gia
                  </Typography>
                </Box>
              )}

            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mt={2}>
              <AvatarIcon email={session.sessionId.createdBy.email} />
              {session.sessionId.users.map((user, index) => (
                <AvatarIcon key={index} email={user.email} />
              ))}
            </Box>

            <Box
              sx={(theme) => ({
                alignSelf: 'flex-start',
                backgroundColor: theme.trustify.status[remainingTimeTone]?.bg || theme.trustify.surface.subtle,
                color: theme.trustify.status[remainingTimeTone]?.fg || theme.palette.text.secondary,
                gap: 1,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                mt: 2,
                width: 'fit-content',
              })}
            >
              <ScheduleIcon sx={{ width: 12, height: 12 }} />
              <Typography sx={{ fontSize: 16, fontWeight: 400 }}>{timeRemaining}</Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
      {session.status === 'processing' ? (
        <DetailProcessingSessionModal
          open={openProcessingModal}
          onClose={() => setOpenProcessingModal(false)}
          session={session}
        />
      ) : (
        <DetailReadyToSignSessionModal
          open={openReadyToSignModal}
          onClose={() => setOpenReadyToSignModal(false)}
          session={session}
        />
      )}
    </>
  );
};

export default NotarySessionCard;
