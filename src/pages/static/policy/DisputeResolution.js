import React from 'react';
import { Container, Typography, Box, Paper, Divider, Grid } from '@mui/material';
import { dark, gray, primary } from '../../../config/theme/themePrimitives';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GavelIcon from '@mui/icons-material/Gavel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const DisputeResolution = () => {
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
            Cơ chế giải quyết khiếu nại
          </Typography>
          <Typography variant="subtitle1" color={dark[500]} sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Quy trình xử lý và giải quyết khiếu nại một cách công bằng, minh bạch và hiệu quả
          </Typography>
          <SupportAgentIcon sx={{ fontSize: 60, color: primary[300], mb: 2 }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Chúng tôi cam kết cung cấp dịch vụ công chứng trực tuyến chất lượng cao và đáp ứng các yêu cầu của khách hàng.
            Tuy nhiên, chúng tôi hiểu rằng đôi khi có thể phát sinh những vấn đề cần được giải quyết. Cơ chế giải quyết khiếu
            nại này được thiết lập nhằm đảm bảo mọi phản ánh, khiếu nại của khách hàng đều được xử lý một cách công bằng,
            minh bạch và hiệu quả.
          </Typography>

          <Box sx={{ backgroundColor: primary[50], borderRadius: 2, p: 4, mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              I. Phạm vi tiếp nhận khiếu nại
            </Typography>
            <Typography variant="body1" paragraph>
              Chúng tôi tiếp nhận và giải quyết các khiếu nại liên quan đến:
            </Typography>
            <Grid container spacing={3}>
              {[
                'Chất lượng dịch vụ công chứng trực tuyến',
                'Thái độ phục vụ của nhân viên, công chứng viên',
                'Vấn đề về thanh toán, phí dịch vụ',
                'Bảo mật thông tin, quyền riêng tư',
                'Tính chính xác của văn bản công chứng',
                'Các vấn đề kỹ thuật trên nền tảng',
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      p: 2,
                      borderRadius: 1,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <FactCheckIcon sx={{ color: primary[500], mr: 1 }} />
                    <Typography variant="body1">{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4} sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                II. Cách thức gửi khiếu nại
              </Typography>
              <Typography variant="body1" paragraph>
                Khách hàng có thể gửi khiếu nại thông qua các kênh sau:
              </Typography>
              <Box component="ol" sx={{ pl: 3 }}>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Trực tuyến:</strong> Sử dụng biểu mẫu khiếu nại trên trang web hoặc trong tài khoản cá nhân
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Email:</strong> Gửi thông tin khiếu nại đến địa chỉ: khieunai@congchung.vn
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Hotline:</strong> Gọi đến số điện thoại hỗ trợ: +84 909 090 909
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>Văn bản:</strong> Gửi văn bản khiếu nại đến trụ sở chính: Dĩ An, Bình Dương
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: gray[50], p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]}>
                  Thông tin cần cung cấp khi khiếu nại
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  Khi gửi khiếu nại, vui lòng cung cấp đầy đủ các thông tin sau để quá trình xử lý được nhanh chóng và hiệu
                  quả:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1">
                    Họ tên và thông tin liên hệ
                  </Typography>
                  <Typography component="li" variant="body1">
                    Mã hồ sơ công chứng (nếu có)
                  </Typography>
                  <Typography component="li" variant="body1">
                    Mô tả chi tiết về vấn đề gặp phải
                  </Typography>
                  <Typography component="li" variant="body1">
                    Thời gian xảy ra sự việc
                  </Typography>
                  <Typography component="li" variant="body1">
                    Tài liệu liên quan (ảnh chụp màn hình, văn bản, v.v.)
                  </Typography>
                  <Typography component="li" variant="body1">
                    Đề xuất phương án giải quyết (nếu có)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              III. Quy trình xử lý khiếu nại
            </Typography>
            <Box sx={{ position: 'relative', pl: 2, borderLeft: `3px solid ${primary[300]}` }}>
              <Box component="ol" sx={{ pl: 3 }}>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Tiếp nhận và xác nhận:</strong> Trong vòng 24 giờ kể từ khi nhận được khiếu nại, chúng tôi sẽ gửi
                  thông báo xác nhận đã tiếp nhận và cung cấp mã số theo dõi khiếu nại.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Phân loại và chuyển xử lý:</strong> Khiếu nại sẽ được phân loại và chuyển đến bộ phận hoặc nhân sự
                  có thẩm quyền giải quyết.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Điều tra và đánh giá:</strong> Chúng tôi sẽ tiến hành điều tra, thu thập thông tin, và đánh giá
                  khiếu nại một cách khách quan, công bằng.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Đề xuất phương án giải quyết:</strong> Dựa trên kết quả điều tra, chúng tôi sẽ đề xuất phương án
                  giải quyết phù hợp.
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>Thực hiện giải quyết:</strong> Tiến hành các biện pháp giải quyết đã thống nhất với khách hàng.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={4} sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50], height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 30, color: primary[500], mr: 2 }} />
                  <Typography variant="h5" fontWeight="bold" color={dark[500]}>
                    IV. Thời gian xử lý khiếu nại
                  </Typography>
                </Box>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Khiếu nại thông thường:</strong> Sẽ được giải quyết trong vòng 3-5 ngày làm việc.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Khiếu nại phức tạp:</strong> Có thể kéo dài đến 15 ngày làm việc, tùy thuộc vào tính chất và mức
                    độ phức tạp của vấn đề.
                  </Typography>
                  <Typography component="li" variant="body1">
                    <strong>Gia hạn thời gian:</strong> Trường hợp cần thêm thời gian để xử lý, chúng tôi sẽ thông báo và
                    giải thích lý do cho khách hàng, đồng thời đề xuất thời hạn giải quyết mới.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50], height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GavelIcon sx={{ fontSize: 30, color: primary[500], mr: 2 }} />
                  <Typography variant="h5" fontWeight="bold" color={dark[500]}>
                    V. Biện pháp khắc phục
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Tùy theo tính chất và mức độ của vấn đề, chúng tôi có thể áp dụng một hoặc nhiều biện pháp khắc phục sau:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1">
                    Xin lỗi và giải thích
                  </Typography>
                  <Typography component="li" variant="body1">
                    Điều chỉnh, sửa chữa lỗi trong văn bản công chứng
                  </Typography>
                  <Typography component="li" variant="body1">
                    Hoàn trả phí dịch vụ (một phần hoặc toàn bộ)
                  </Typography>
                  <Typography component="li" variant="body1">
                    Cung cấp dịch vụ bổ sung miễn phí
                  </Typography>
                  <Typography component="li" variant="body1">
                    Cải thiện quy trình, nâng cao chất lượng dịch vụ
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              VI. Giải quyết tranh chấp
            </Typography>
            <Typography variant="body1" paragraph>
              Trong trường hợp khách hàng không đồng ý với phương án giải quyết khiếu nại, các bên có thể thỏa thuận lựa chọn
              một trong các phương thức giải quyết tranh chấp sau:
            </Typography>
            <Grid container spacing={2}>
              {[
                { title: 'Thương lượng trực tiếp', desc: 'Đại diện hai bên gặp mặt để trao đổi và tìm ra giải pháp chung.' },
                { title: 'Hòa giải', desc: 'Sử dụng bên thứ ba làm trung gian hòa giải.' },
                {
                  title: 'Trọng tài thương mại',
                  desc: 'Tranh chấp được giải quyết thông qua trọng tài theo quy định của pháp luật.',
                },
                { title: 'Tòa án', desc: 'Khởi kiện ra tòa án có thẩm quyền theo quy định pháp luật Việt Nam.' },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1">{item.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ backgroundColor: gray[50], p: 4, borderRadius: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              VII. Liên hệ
            </Typography>
            <Typography variant="body1" paragraph>
              Bộ phận Chăm sóc Khách hàng
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Email:</strong> khieunai@congchung.vn
              </Typography>
              <Typography variant="body1">
                <strong>Hotline:</strong> +84 909 090 909
              </Typography>
              <Typography variant="body1">
                <strong>Địa chỉ:</strong> Dĩ An, Bình Dương
              </Typography>
              <Typography variant="body1">
                <strong>Thời gian làm việc:</strong> Thứ Hai - Thứ Sáu (8:00 - 17:00), trừ các ngày lễ theo quy định
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DisputeResolution;
