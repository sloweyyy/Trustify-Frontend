import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import PublicPage from './PublicPage';
const ProductPage = ({ title, intro, sections, office = false }) => <PublicPage {...{ title, intro }} actions={<Button variant="contained" href={office ? '/signin' : '/services'}>{office ? 'Đăng nhập tài khoản được cấp' : 'Xem dịch vụ công chứng'}</Button>}>
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>{sections.map(([heading, text]) => <Paper key={heading} variant="outlined" sx={{ p: 3 }}><Typography component="h2" variant="h6">{heading}</Typography><Typography color="text.secondary" sx={{ mt: 2 }}>{text}</Typography></Paper>)}</Box>
  <Paper variant="outlined" sx={{ p: 3, mt: 4 }}><Typography component="h2" variant="h6">Theo dõi hướng dẫn theo từng hồ sơ</Typography><Typography color="text.secondary" sx={{ my: 2 }}>Phạm vi xử lý phụ thuộc loại giấy tờ và yêu cầu của công chứng viên. Bản ghi blockchain khi được cấp dùng để đối chiếu thông tin; mạng hiện tại là Solana devnet thử nghiệm.</Typography><Button variant="outlined" href="/user-guide">Xem hướng dẫn sử dụng</Button></Paper>
</PublicPage>;
export default ProductPage;
