import React from 'react';
import PaymentResultCard from './PaymentResultCard';

const PaymentCancel = ({
  title = 'Chưa xác nhận được thanh toán',
  message = 'Luồng thanh toán đã kết thúc hoặc chưa cung cấp đủ thông tin kết quả.',
  subMessage = 'Vui lòng kiểm tra khoản chờ thanh toán trong Lịch sử hồ sơ công chứng trước khi thử lại. Nếu tài khoản đã bị trừ tiền, hãy liên hệ hỗ trợ để được kiểm tra.',
  redirectPath = '/',
  backButtonText = 'Về trang chủ',
}) => (
  <PaymentResultCard title={title} message={message} subMessage={subMessage} redirectPath={redirectPath} buttonText={backButtonText} />
);

export default PaymentCancel;
