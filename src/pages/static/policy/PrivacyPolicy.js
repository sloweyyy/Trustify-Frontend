import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { dark, gray, primary } from '../../../config/theme/themePrimitives';
import SecurityIcon from '@mui/icons-material/Security';

const PrivacyPolicy = () => {
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
            Chính sách bảo mật
          </Typography>
          <Typography variant="subtitle1" color={dark[500]} sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn thông qua các biện pháp bảo mật tiên tiến.
          </Typography>
          <SecurityIcon sx={{ fontSize: 60, color: primary[300], mb: 2 }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này mô tả cách chúng tôi
            thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn khi sử dụng dịch vụ công chứng trực tuyến của
            chúng tôi.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
            Thông tin chúng tôi thu thập
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Chúng tôi thu thập các thông tin cá nhân mà bạn cung cấp trực tiếp cho chúng tôi khi đăng ký tài khoản, sử dụng
            dịch vụ của chúng tôi hoặc liên hệ với bộ phận hỗ trợ khách hàng. Những thông tin này có thể bao gồm:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>
              Thông tin cá nhân: Họ tên, địa chỉ email, số điện thoại, địa chỉ, ngày sinh
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Thông tin xác thực: Số CMND/CCCD, hộ chiếu, ảnh chân dung
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Dữ liệu giao dịch: Thông tin về các dịch vụ công chứng bạn sử dụng và các tài liệu liên quan
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Dữ liệu kỹ thuật: Địa chỉ IP, loại thiết bị, trình duyệt web, thời gian truy cập
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ my: 5 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50], height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                  Mục đích sử dụng thông tin
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Chúng tôi sử dụng thông tin của bạn để:
                </Typography>
                <Box component="ul" sx={{ pl: 4 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Cung cấp, duy trì và nâng cao chất lượng dịch vụ công chứng trực tuyến
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Xác minh danh tính để đảm bảo tính pháp lý của các văn bản công chứng
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Liên lạc với bạn về tài khoản, dịch vụ hoặc các vấn đề liên quan
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Phân tích và cải thiện hệ thống, phát hiện và ngăn chặn gian lận
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Tuân thủ các nghĩa vụ pháp lý và yêu cầu quản lý
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50], height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                  Bảo mật thông tin
                </Typography>
                <Typography variant="body1" paragraph>
                  Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn
                  khỏi mất mát, truy cập trái phép, tiết lộ, thay đổi hoặc phá hủy. Các biện pháp này bao gồm mã hóa dữ liệu,
                  hạn chế truy cập, và quy trình kiểm soát nội bộ nghiêm ngặt.
                </Typography>
                <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]} sx={{ mt: 3 }}>
                  Thời gian lưu trữ
                </Typography>
                <Typography variant="body1" paragraph>
                  Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để thực hiện các mục đích được nêu
                  trong chính sách này, trừ khi pháp luật yêu cầu hoặc cho phép thời gian lưu trữ lâu hơn.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
            Quyền của bạn
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Bạn có các quyền sau đối với thông tin cá nhân của mình:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>
              Quyền truy cập và nhận bản sao thông tin cá nhân của bạn
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Quyền yêu cầu sửa đổi thông tin không chính xác
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Quyền yêu cầu xóa thông tin trong một số trường hợp
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Quyền hạn chế hoặc phản đối việc xử lý thông tin của bạn
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Quyền khiếu nại với cơ quan bảo vệ dữ liệu có thẩm quyền
            </Typography>
          </Box>

          <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
            Thay đổi chính sách bảo mật
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Chúng tôi có thể cập nhật chính sách bảo mật này định kỳ để phản ánh những thay đổi trong hoạt động của chúng tôi
            hoặc để tuân thủ các yêu cầu pháp lý. Chúng tôi sẽ thông báo cho bạn về những thay đổi quan trọng bằng cách đăng
            thông báo trên trang web hoặc gửi email trực tiếp cho bạn.
          </Typography>

          <Box sx={{ backgroundColor: gray[50], p: 4, borderRadius: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              Liên hệ với chúng tôi
            </Typography>
            <Typography variant="body1">
              Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về chính sách bảo mật của chúng tôi hoặc cách chúng tôi xử lý
              thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi qua:
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

export default PrivacyPolicy;
