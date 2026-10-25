import React from 'react';
import PaymentResultCard from './PaymentResultCard';

const PaymentSuccess = ({
  title = 'Đã nhận kết quả thanh toán',
  message = 'Bạn đã trở về Trustify từ trang thanh toán với thông báo giao dịch thành công.',
  subMessage = 'Bạn có thể xem trạng thái khoản thanh toán trong Lịch sử hồ sơ công chứng. Nếu thông tin chưa cập nhật, vui lòng kiểm tra lại sau ít phút.',
  redirectPath = '/',
  buttonText = 'Về trang chủ',
}) => (
  <PaymentResultCard success title={title} message={message} subMessage={subMessage} redirectPath={redirectPath} buttonText={buttonText} />
);

export default PaymentSuccess;
