import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { dark, gray, primary } from '../../../config/theme/themePrimitives';
import GavelIcon from '@mui/icons-material/Gavel';

const TermsOfService = () => {
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
            Điều khoản sử dụng
          </Typography>
          <Typography variant="subtitle1" color={dark[500]} sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Các quy định và điều khoản khi sử dụng dịch vụ công chứng trực tuyến của chúng tôi
          </Typography>
          <GavelIcon sx={{ fontSize: 60, color: primary[300], mb: 2 }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Xin chào mừng đến với hệ thống công chứng trực tuyến của chúng tôi. Bằng việc truy cập và sử dụng dịch vụ, bạn
            đồng ý tuân thủ và chấp nhận các điều khoản và điều kiện sau đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
          </Typography>

          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50], height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                  1. Giới thiệu dịch vụ
                </Typography>
                <Typography variant="body1">
                  Hệ thống công chứng trực tuyến cung cấp dịch vụ công chứng điện tử và các dịch vụ liên quan thông qua nền
                  tảng trực tuyến. Dịch vụ này cho phép người dùng tạo, ký kết, và công chứng các văn bản pháp lý thông qua
                  quy trình trực tuyến, được thực hiện bởi các công chứng viên được cấp phép theo quy định của pháp luật Việt
                  Nam.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50], height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                  2. Đăng ký và tài khoản
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Để sử dụng dịch vụ công chứng trực tuyến:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Bạn phải đăng ký tài khoản bằng thông tin chính xác, đầy đủ và cập nhật.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu.
                  </Typography>
                  <Typography component="li" variant="body1">
                    Bạn phải ít nhất 18 tuổi hoặc đủ tuổi theo quy định pháp luật.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              3. Quy trình công chứng
            </Typography>
            <Typography variant="body1" paragraph>
              Dịch vụ công chứng trực tuyến tuân thủ chặt chẽ quy định của pháp luật Việt Nam. Quá trình công chứng yêu cầu
              xác minh danh tính, kiểm tra tính pháp lý của văn bản, và sự tham gia của công chứng viên được cấp phép. Bạn
              đồng ý cung cấp các thông tin và tài liệu cần thiết để hoàn thành quy trình công chứng hợp pháp.
            </Typography>
          </Box>

          <Box sx={{ mb: 5, backgroundColor: gray[50], p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              4. Trách nhiệm của người dùng
            </Typography>
            <Typography variant="body1" paragraph>
              Khi sử dụng dịch vụ, bạn đồng ý:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1" paragraph>
                Cung cấp thông tin chính xác, đầy đủ và không gian lận trong quá trình sử dụng dịch vụ.
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Không sử dụng dịch vụ cho mục đích bất hợp pháp hoặc gian lận.
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Không xâm phạm quyền sở hữu trí tuệ hoặc quyền riêng tư của người khác.
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Tuân thủ tất cả các luật và quy định hiện hành liên quan đến việc sử dụng dịch vụ.
              </Typography>
              <Typography component="li" variant="body1">
                Bảo vệ và không chia sẻ thông tin đăng nhập tài khoản với người khác.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 5 }} />

          <Grid container spacing={4} sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                5. Phí dịch vụ và thanh toán
              </Typography>
              <Typography variant="body1">
                Việc sử dụng dịch vụ công chứng trực tuyến có thể phát sinh phí theo quy định. Biểu phí dịch vụ được công bố
                công khai trên trang web của chúng tôi. Bạn đồng ý thanh toán đầy đủ và đúng hạn các khoản phí cho dịch vụ
                bạn sử dụng. Chúng tôi có thể thay đổi biểu phí sau khi thông báo trước ít nhất 30 ngày.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                6. Quyền sở hữu trí tuệ
              </Typography>
              <Typography variant="body1">
                Tất cả nội dung, thiết kế, giao diện, mã nguồn và tài liệu liên quan đến dịch vụ đều thuộc quyền sở hữu của
                chúng tôi hoặc đối tác cấp phép. Bạn không được sao chép, phân phối, sửa đổi, hiển thị công khai, thực hiện
                công khai, tái xuất bản, tải xuống, lưu trữ hoặc truyền bất kỳ nội dung nào trên nền tảng mà không có sự cho
                phép trước bằng văn bản từ chúng tôi.
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              7. Giới hạn trách nhiệm
            </Typography>
            <Typography variant="body1">
              Trong phạm vi tối đa được pháp luật cho phép, chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại gián
              tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt nào, bao gồm mất lợi nhuận, dữ liệu, hoặc cơ hội kinh
              doanh, phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ. Trách nhiệm của chúng tôi sẽ không vượt quá số
              tiền bạn đã thanh toán cho dịch vụ trong vòng 12 tháng trước khi phát sinh khiếu nại.
            </Typography>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              8. Chấm dứt dịch vụ
            </Typography>
            <Typography variant="body1">
              Chúng tôi có quyền tạm ngừng hoặc chấm dứt quyền truy cập của bạn vào dịch vụ nếu bạn vi phạm các điều khoản
              này. Bạn cũng có thể chấm dứt tài khoản của mình bất cứ lúc nào. Sau khi chấm dứt, quyền sử dụng dịch vụ của
              bạn sẽ ngay lập tức kết thúc, nhưng các điều khoản vẫn tiếp tục áp dụng khi thích hợp.
            </Typography>
          </Box>

          <Box sx={{ mb: 5, backgroundColor: primary[50], p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              9. Thay đổi điều khoản
            </Typography>
            <Typography variant="body1">
              Chúng tôi có thể sửa đổi các điều khoản này tại bất kỳ thời điểm nào bằng cách cập nhật trang này. Các thay đổi
              sẽ có hiệu lực ngay sau khi đăng tải, trừ khi có quy định khác. Việc tiếp tục sử dụng dịch vụ sau khi các thay
              đổi được đăng tải đồng nghĩa với việc bạn chấp nhận các điều khoản đã sửa đổi.
            </Typography>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              10. Luật áp dụng và giải quyết tranh chấp
            </Typography>
            <Typography variant="body1">
              Các điều khoản này được điều chỉnh bởi luật pháp Việt Nam. Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan
              đến việc sử dụng dịch vụ sẽ được giải quyết thông qua thương lượng, hòa giải hoặc trọng tài theo quy định của
              pháp luật Việt Nam.
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: gray[50], p: 4, borderRadius: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              11. Liên hệ
            </Typography>
            <Typography variant="body1">
              Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi qua:
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

export default TermsOfService;
