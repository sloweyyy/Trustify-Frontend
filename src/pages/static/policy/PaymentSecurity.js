import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { dark, gray, primary, white } from '../../../config/theme/themePrimitives';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';

const PaymentSecurity = () => {
  const securityFeatures = [
    {
      icon: <LockIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Mã hóa SSL 256-bit',
      description:
        'Tất cả thông tin thanh toán được mã hóa bằng công nghệ SSL 256-bit, tiêu chuẩn bảo mật hàng đầu trong ngành tài chính.',
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Xác thực hai lớp',
      description:
        'Hệ thống xác thực hai lớp (2FA) được áp dụng cho tất cả các giao dịch để đảm bảo chỉ bạn mới có thể tiến hành thanh toán.',
    },
    {
      icon: <VerifiedUserIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Tuân thủ tiêu chuẩn PCI DSS',
      description:
        'Chúng tôi tuân thủ nghiêm ngặt tiêu chuẩn bảo mật dữ liệu ngành thẻ thanh toán (PCI DSS) để bảo vệ thông tin của bạn.',
    },
    {
      icon: <CreditCardIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Theo dõi giao dịch thời gian thực',
      description: 'Hệ thống giám sát liên tục phát hiện và ngăn chặn các giao dịch bất thường, bảo vệ bạn khỏi gian lận.',
    },
  ];

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 10,
          backgroundColor: primary[50],
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '50vw',
            height: '50vw',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(200px)',
            background: `linear-gradient(180deg, ${primary[50]} 0%, ${primary[50]} 30%, ${primary[100]} 100%)`,
            zIndex: 0,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 4 }}>
          <Typography variant="h6" color={primary[500]} gutterBottom>
            CHÍNH SÁCH
          </Typography>
          <Typography variant="h2" fontWeight="bold" color={dark[500]} gutterBottom>
            Bảo mật thanh toán
          </Typography>
          <Typography variant="subtitle1" color={dark[500]} sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Bảo vệ thông tin và giao dịch thanh toán của khách hàng với các biện pháp bảo mật hàng đầu
          </Typography>
          <PaymentsIcon sx={{ fontSize: 60, color: primary[300], mb: 2 }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Tại hệ thống công chứng trực tuyến của chúng tôi, bảo mật thông tin thanh toán của khách hàng luôn là ưu tiên
            hàng đầu. Chúng tôi cam kết áp dụng các biện pháp bảo mật tốt nhất để đảm bảo mọi giao dịch của bạn đều được bảo
            vệ an toàn.
          </Typography>

          <Box sx={{ py: 3, mb: 6, backgroundColor: primary[50], borderRadius: 2, p: 4 }}>
            <Typography variant="h5" fontWeight="bold" color={dark[500]} gutterBottom textAlign="center">
              Các tính năng bảo mật hàng đầu
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {securityFeatures.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="flex-start">
                      <Box mr={2} mt={0.5}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1">{feature.description}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                Phương thức thanh toán an toàn
              </Typography>
              <Typography variant="body1" paragraph>
                Chúng tôi cung cấp nhiều phương thức thanh toán an toàn, bao gồm thẻ tín dụng/ghi nợ quốc tế, thẻ ATM nội
                địa, ví điện tử, và chuyển khoản ngân hàng. Tất cả các phương thức thanh toán đều được bảo vệ bởi các công
                nghệ bảo mật tiên tiến.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                Quy trình xử lý thanh toán
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                Quy trình thanh toán của chúng tôi được thiết kế để đảm bảo tính bảo mật cao nhất:
              </Typography>
              <Box component="ol" sx={{ pl: 3 }}>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Bảo mật nhập liệu:</strong> Thông tin thanh toán của bạn được nhập trên trang web có bảo mật SSL.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Xác thực thông tin:</strong> Hệ thống xác minh thông tin thanh toán thông qua nhiều lớp kiểm tra.
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>Xử lý bảo mật:</strong> Giao dịch được xử lý thông qua các cổng thanh toán đáng tin cậy và được
                  chứng nhận.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ my: 5, py: 4, borderTop: `1px solid ${gray[200]}`, borderBottom: `1px solid ${gray[200]}` }}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                  Lưu trữ thông tin thanh toán
                </Typography>
                <Typography variant="body1">
                  Chúng tôi không lưu trữ thông tin thẻ tín dụng hay thông tin thanh toán nhạy cảm trên hệ thống của mình.
                  Thay vào đó, chúng tôi sử dụng các đối tác thanh toán được chứng nhận và tuân thủ các tiêu chuẩn bảo mật
                  quốc tế để xử lý thanh toán của bạn.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                  Bảo vệ khỏi gian lận
                </Typography>
                <Typography variant="body1">
                  Hệ thống của chúng tôi được trang bị công nghệ phát hiện gian lận tiên tiến, giúp phát hiện và ngăn chặn
                  các hoạt động đáng ngờ. Chúng tôi liên tục theo dõi tất cả các giao dịch và cập nhật các biện pháp bảo mật
                  để ứng phó với các mối đe dọa mới.
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              Cam kết hoàn tiền
            </Typography>
            <Typography variant="body1">
              Trong trường hợp phát sinh thanh toán không được ủy quyền hoặc xảy ra lỗi trong quá trình thanh toán, chúng tôi
              cam kết hoàn trả đầy đủ số tiền theo quy định của pháp luật và chính sách của công ty.
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: gray[50], p: 4, borderRadius: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              Liên hệ hỗ trợ
            </Typography>
            <Typography variant="body1">
              Nếu bạn phát hiện bất kỳ vấn đề nào liên quan đến thanh toán hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi
              ngay qua:
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Email:</strong> sloweycontact@gmail.com
              </Typography>
              <Typography variant="body1">
                <strong>Hotline:</strong> +84 909 090 909
              </Typography>
              <Typography variant="body1">
                <strong>Địa chỉ:</strong> Dĩ An, Bình Dương
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentSecurity;
