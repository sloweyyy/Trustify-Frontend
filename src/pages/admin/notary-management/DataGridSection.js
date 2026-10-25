import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
const DataGridSection = ({ title, children, loading, error, onRetry }) => <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}><Typography component="h2" variant="h6" sx={{ mb: 2 }}>{title}</Typography>{loading ? <LoadingState label={`Đang tải ${title.toLocaleLowerCase('vi-VN')}…`} /> : error ? <ErrorState title="Chưa thể tải danh sách" onRetry={onRetry} /> : children}</Paper>;
export default DataGridSection;
