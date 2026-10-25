import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
export const guideSteps = [
  ['Chuẩn bị giấy tờ', 'Xem dịch vụ phù hợp và chuẩn bị tài liệu rõ nét, đầy đủ các trang.'],
  ['Gửi hồ sơ', 'Đăng nhập, điền thông tin và tải tài liệu theo hướng dẫn trong biểu mẫu.'],
  ['Theo dõi xử lý', 'Mở lịch sử hồ sơ để xem trạng thái, nội dung cần bổ sung và yêu cầu ký số hoặc thanh toán khi có.'],
  ['Xem kết quả', 'Kiểm tra kết quả xử lý. Tài liệu được cấp sẽ xuất hiện trong ví tài liệu khi có.'],
];
const Guide = () => <Container maxWidth="lg" component="section" sx={{ py: { xs: 4, md: 6 } }}><Typography component="h2" variant="h4" fontWeight={600}>Thực hiện từng bước</Typography><Box component="ol" sx={{ p: 0, m: 0, mt: 3, listStyle: 'none', display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>{guideSteps.map(([title, text], index) => <Paper component="li" variant="outlined" key={title} sx={{ p: 2 }}><Typography color="primary.main" fontWeight={600}>Bước {index + 1}</Typography><Typography component="h3" variant="h6" sx={{ my: 1 }}>{title}</Typography><Typography color="text.secondary">{text}</Typography></Paper>)}</Box></Container>;
export default Guide;
