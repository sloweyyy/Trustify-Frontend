import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import NotaryFeedback from './NotaryFeedback';
import SignaturePad from '../shared/SignaturePad';

// Shared presentation query; retain the existing creator/participant eligibility.
export const canDrawSessionSignature = (signature, output, createdBy, userId) => Boolean(
  output?.length > 0 && signature && signature.users &&
  ((createdBy === userId && !signature.creator.approved) || signature.users.length === 0),
);
const SessionFeedback = ({ signature, output = [], feedback, onSignatureSave, loading, createdBy, signaturePadId }) => {
  const { user } = useSelector((state) => state.user);
  const renderSignature = () => {
    if (output.length > 0 && signature && signature.users) {
      const currentUser = signature.users.find((sigUser) => sigUser._id === user.id);
      if (canDrawSessionSignature(signature, output, createdBy, user.id)) return <SignaturePad id={signaturePadId} onSave={onSignatureSave} loading={loading} />;
      if (currentUser?.signatureImage) return (
        <Box>
          <Typography component="h3" variant="subtitle1" sx={{ mb: 2 }}>Chữ ký của bạn</Typography>
          <Box sx={{ bgcolor: '#FFFFFF', border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
            <Box component="img" src={currentUser.signatureImage} alt="Chữ ký của bạn" sx={{ display: 'block', maxWidth: '100%', maxHeight: 180, objectFit: 'contain' }} />
          </Box>
        </Box>
      );
    }
    return null;
  };
  return <NotaryFeedback output={output} feedback={feedback} signatureContent={renderSignature()} />;
};
export default SessionFeedback;
