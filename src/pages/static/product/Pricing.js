import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import PublicPage from '../../../components/public/PublicPage';
const Pricing = () => <PublicPage title="Thông tin phí dịch vụ" intro="Phân biệt phí từng hồ sơ, phí tài liệu và giải pháp cho văn phòng công chứng. Trang này chưa có bảng phí được xác nhận để công bố.">
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>{[
    ['Phí hồ sơ công chứng', 'Chi phí phụ thuộc dịch vụ và hồ sơ được xử lý. Bạn kiểm tra số tiền, mã hồ sơ và thông tin giao dịch trước khi thanh toán.'],
    ['Phí tài liệu', 'Nếu sử dụng chức năng mua thêm tài liệu trong ví tài liệu, bạn xem số lượng và tổng tiền được hiển thị tại đó.'],
    ['Dành cho văn phòng công chứng', 'Liên hệ để xác nhận phạm vi sử dụng và mức phí phù hợp. Không có đăng ký hoặc thanh toán gói dịch vụ trên trang này.'],
  ].map(([title, text]) => <Paper key={title} variant="outlined" sx={{ p: 3 }}><Typography component="h2" variant="h6">{title}</Typography><Typography color="text.secondary" sx={{ mt: 2 }}>{text}</Typography></Paper>)}</Box>
  <Paper variant="outlined" sx={{ p: 3, mt: 4 }}><Typography component="h2" variant="h6">Liên hệ tư vấn</Typography><Typography color="text.secondary" sx={{ my: 2 }}>Bạn có thể gửi nhu cầu qua địa chỉ liên hệ đang được công bố trên Trustify.</Typography><Button href="mailto:sloweycontact@gmail.com" variant="contained">Gửi email tư vấn</Button><Button href="/services" variant="text" sx={{ ml: { sm: 2 }, mt: { xs: 1, sm: 0 } }}>Xem dịch vụ</Button></Paper>
</PublicPage>;
export default Pricing;
