import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import PublicPage from '../../components/public/PublicPage';
import Guide from '../../components/services/Guide';
const UserGuide = () => <><PublicPage title="Hướng dẫn sử dụng" intro="Chuẩn bị giấy tờ, gửi hồ sơ và theo dõi từng bước xử lý trên Trustify." actions={<Button href="/signin" variant="contained">Đăng nhập để bắt đầu</Button>}><Paper variant="outlined" sx={{ p: 3 }}><Typography component="h2" variant="h6">Trước khi gửi hồ sơ</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Bạn cần có tài khoản, thông tin cá nhân chính xác và các tệp giấy tờ rõ nét. Xem yêu cầu trong dịch vụ đã chọn; không gửi mật khẩu hoặc mã đăng nhập qua phần ghi chú.</Typography></Paper></PublicPage><Guide /></>;
export default UserGuide;
