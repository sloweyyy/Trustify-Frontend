import React, { useId } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
const questions = [
  ['Tôi cần chuẩn bị gì trước khi gửi hồ sơ?', 'Bạn xem danh sách dịch vụ, chọn dịch vụ phù hợp và chuẩn bị giấy tờ theo yêu cầu trong biểu mẫu tạo hồ sơ. Tài liệu cần rõ nét và đủ trang.'],
  ['Tôi xem tiến độ hồ sơ ở đâu?', 'Sau khi đăng nhập, mở Lịch sử công chứng. Bạn cũng có thể nhập mã hồ sơ trên trang Tra cứu để xem thông tin được cung cấp.'],
  ['Khi nào tôi cần thanh toán hoặc ký số?', 'Bạn theo dõi trạng thái và hướng dẫn trong hồ sơ. Thực hiện thanh toán hoặc ký số khi ứng dụng hiển thị yêu cầu tương ứng.'],
  ['Bản ghi blockchain có phải là con dấu công chứng không?', 'Bản ghi blockchain (NFT) là mã đối chiếu gắn với tài liệu. Bản ghi không thay thế việc xem xét hồ sơ hoặc xác nhận của người có thẩm quyền. Phiên bản hiện tại sử dụng mạng thử nghiệm Solana devnet.'],
  ['Mọi hồ sơ có thể hoàn tất từ xa không?', 'Phạm vi xử lý phụ thuộc loại hồ sơ và yêu cầu của công chứng viên. Bạn theo dõi hướng dẫn cụ thể trong hồ sơ, không mặc định mọi thủ tục đều hoàn tất từ xa.'],
];
const FAQSection = () => {
  const id = useId();
  return <Container component="section" maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}><Typography component="h2" variant="h4" fontWeight={600} sx={{ mb: 3 }}>Câu hỏi thường gặp</Typography>{questions.map(([question, answer], index) => <Accordion key={question}><AccordionSummary id={`${id}-${index}-header`} aria-controls={`${id}-${index}-content`} expandIcon={<ExpandMoreRounded />}><Typography component="h3" variant="body1" fontWeight={600}>{question}</Typography></AccordionSummary><AccordionDetails><Typography color="text.secondary">{answer}</Typography></AccordionDetails></Accordion>)}</Container>;
};
export default FAQSection;
