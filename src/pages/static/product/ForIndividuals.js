import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { dark, primary, white, gray } from '../../../config/theme/themePrimitives';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const ForIndividuals = () => {
  const benefits = [
    {
      icon: <SpeedIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Tiết kiệm thời gian',
      description: 'Không cần đến văn phòng công chứng, thực hiện mọi thủ tục từ nhà hoặc bất cứ đâu, 24/7.',
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'An toàn và bảo mật',
      description: 'Công nghệ mã hóa đầu cuối và xác thực danh tính mạnh mẽ đảm bảo thông tin của bạn luôn được bảo vệ.',
    },
    {
      icon: <VerifiedUserIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Giá trị pháp lý đầy đủ',
      description: 'Văn bản công chứng trực tuyến có đầy đủ giá trị pháp lý như công chứng truyền thống.',
    },
    {
      icon: <SupportAgentIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Hỗ trợ cá nhân hóa',
      description: 'Đội ngũ chuyên viên tư vấn hỗ trợ bạn trong suốt quá trình công chứng.',
    },
  ];

  const commonDocuments = [
    'Hợp đồng mua bán, cho thuê nhà đất',
    'Di chúc, văn bản thừa kế',
    'Hợp đồng tặng cho tài sản',
    'Văn bản ủy quyền',
    'Hợp đồng vay mượn',
    'Hợp đồng góp vốn',
    'Dịch thuật công chứng',
    'Sao y bản chính',
    'Xác nhận chữ ký',
    'Chứng thực bản sao',
  ];

  const steps = [
    {
      title: 'Đăng ký và xác thực',
      description: 'Tạo tài khoản và xác thực danh tính bằng CCCD/CMND hoặc hộ chiếu của bạn.',
    },
    {
      title: 'Chọn dịch vụ công chứng',
      description: 'Lựa chọn loại văn bản cần công chứng và cung cấp thông tin cần thiết.',
    },
    {
      title: 'Tải tài liệu lên',
      description: 'Tải lên văn bản cần công chứng và các giấy tờ liên quan.',
    },
    {
      title: 'Đặt lịch hẹn',
      description: 'Chọn thời gian phù hợp cho phiên công chứng trực tuyến với công chứng viên.',
    },
    {
      title: 'Tham gia phiên công chứng',
      description: 'Kết nối video với công chứng viên, xác minh danh tính và hoàn tất thủ tục.',
    },
    {
      title: 'Nhận văn bản công chứng',
      description: 'Nhận bản điện tử ngay lập tức và bản gốc được gửi đến địa chỉ của bạn.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
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
            DỊCH VỤ
          </Typography>
          <Typography variant="h2" fontWeight="bold" color={dark[500]} gutterBottom>
            Dịch vụ công chứng trực tuyến cho cá nhân
          </Typography>
          <Typography variant="subtitle1" color={dark[500]} sx={{ maxWidth: 800, mx: 'auto', mb: 5 }}>
            Giải pháp công chứng hiện đại, an toàn và tiện lợi cho mọi nhu cầu cá nhân
          </Typography>
          <PersonIcon sx={{ fontSize: 60, color: primary[300], mb: 4 }} />
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Bắt đầu ngay
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, backgroundColor: white[50] }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h6" color={primary[500]} gutterBottom>
              LỢI ÍCH
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={dark[500]} gutterBottom>
              Lợi ích khi sử dụng dịch vụ
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
              Dịch vụ công chứng trực tuyến của chúng tôi mang đến nhiều lợi ích vượt trội so với phương thức truyền thống
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 4,
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
                    <Box mr={2}>{benefit.icon}</Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1">{benefit.description}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Common Documents Section */}
      <Box sx={{ py: 8, backgroundColor: gray[50] }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h6" color={primary[500]} gutterBottom>
              DỊCH VỤ
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={dark[500]} gutterBottom>
              Văn bản công chứng phổ biến
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
              Chúng tôi cung cấp dịch vụ công chứng cho nhiều loại văn bản thường dùng trong đời sống cá nhân
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {commonDocuments.map((document, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: primary[50],
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <DescriptionIcon sx={{ color: primary[500], mr: 2 }} />
                  <Typography variant="body1" fontWeight="500">
                    {document}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, backgroundColor: white[50] }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h6" color={primary[500]} gutterBottom>
              QUY TRÌNH
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={dark[500]} gutterBottom>
              Quy trình thực hiện
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
              Quy trình công chứng trực tuyến đơn giản, nhanh chóng và dễ dàng thực hiện
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor: primary[500],
                      color: white[50],
                      width: 40,
                      height: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box pl={5}>
                    <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body2">{step.description}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h6" color={primary[500]} gutterBottom>
              GIẢI ĐÁP
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={dark[500]} gutterBottom>
              Câu hỏi thường gặp
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
              Giải đáp các thắc mắc phổ biến về dịch vụ công chứng trực tuyến của chúng tôi
            </Typography>
          </Box>

          <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
            <List>
              <ListItem sx={{ mb: 3, display: 'block' }}>
                <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                  Văn bản công chứng trực tuyến có giá trị pháp lý không?
                </Typography>
                <Typography variant="body1">
                  Có, văn bản công chứng trực tuyến có đầy đủ giá trị pháp lý như văn bản công chứng truyền thống, được thực
                  hiện theo quy định của Luật Công chứng và các văn bản pháp luật liên quan.
                </Typography>
              </ListItem>
              <ListItem sx={{ mb: 3, display: 'block' }}>
                <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                  Tôi cần chuẩn bị những gì để công chứng trực tuyến?
                </Typography>
                <Typography variant="body1">
                  Bạn cần chuẩn bị CCCD/CMND hoặc hộ chiếu còn hiệu lực, văn bản cần công chứng, và các giấy tờ liên quan
                  khác tùy theo loại công chứng. Ngoài ra, bạn cần có thiết bị có camera (máy tính, điện thoại) và kết nối
                  internet ổn định.
                </Typography>
              </ListItem>
              <ListItem sx={{ mb: 3, display: 'block' }}>
                <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                  Thời gian hoàn thành công chứng là bao lâu?
                </Typography>
                <Typography variant="body1">
                  Thời gian hoàn thành tùy thuộc vào loại văn bản, thông thường từ 30 phút đến 24 giờ làm việc. Đối với các
                  trường hợp phức tạp hơn có thể kéo dài hơn. Chúng tôi cũng cung cấp dịch vụ công chứng khẩn nếu bạn cần
                  gấp.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'block' }}>
                <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                  Làm thế nào để nhận bản gốc văn bản công chứng?
                </Typography>
                <Typography variant="body1">
                  Sau khi hoàn tất quy trình công chứng trực tuyến, bạn sẽ nhận được bản điện tử ngay lập tức. Bản gốc sẽ
                  được gửi đến địa chỉ của bạn thông qua dịch vụ chuyển phát do bạn lựa chọn, thường trong vòng 1-3 ngày làm
                  việc.
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, backgroundColor: primary[50] }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 2,
              backgroundColor: 'transparent',
              backgroundImage: `linear-gradient(135deg, ${primary[25]} 0%, ${primary[50]} 100%)`,
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '30vw',
                height: '30vw',
                top: '10%',
                right: '-10%',
                borderRadius: '50%',
                filter: 'blur(80px)',
                background: `linear-gradient(180deg, ${primary[50]} 0%, ${primary[100]} 100%)`,
                opacity: 0.6,
                zIndex: 0,
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" fontWeight="bold" color={dark[500]} gutterBottom>
                Sẵn sàng bắt đầu?
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
                Hãy trải nghiệm dịch vụ công chứng trực tuyến hiện đại, an toàn và tiện lợi ngay hôm nay. Chúng tôi cam kết
                mang đến cho bạn trải nghiệm tốt nhất với quy trình đơn giản và hỗ trợ tận tình.
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mr: 2,
                    py: 1.5,
                    px: 4,
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Tạo tài khoản
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Tìm hiểu thêm
                </Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
                <AccessTimeIcon sx={{ color: primary[500], mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={dark[400]}>
                  Hoàn thành công chứng trong vòng 24 giờ
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ForIndividuals;
