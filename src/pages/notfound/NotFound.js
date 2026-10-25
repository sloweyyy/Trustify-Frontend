import React, { useTransition } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PublicPage from '../../components/public/PublicPage';
const NotFound = () => {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        startTransition(() => {
            navigate("/");
        });
    };

    return <PublicPage title="Không tìm thấy trang" intro="Liên kết có thể đã thay đổi hoặc không còn tồn tại."><Typography color="text.secondary" sx={{ mb: 3 }}>Bạn có thể trở về trang chủ để tiếp tục.</Typography><Button variant="contained" onClick={handleNavigateHome} disabled={isPending}>{isPending ? 'Đang chuyển trang…' : 'Trở về trang chủ'}</Button></PublicPage>;
};
export default NotFound;
