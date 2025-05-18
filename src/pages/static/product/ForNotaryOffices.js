import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Divider, Card, CardContent } from '@mui/material';
import { dark, primary, white } from '../../../config/theme/themePrimitives';
import BusinessIcon from '@mui/icons-material/Business';
import SpeedIcon from '@mui/icons-material/Speed';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SecurityIcon from '@mui/icons-material/Security';
import LayersIcon from '@mui/icons-material/Layers';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportIcon from '@mui/icons-material/Support';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const ForNotaryOffices = () => {
  const benefits = [
    {
      icon: <SpeedIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Tăng hiệu suất làm việc',
      description:
        'Tự động hóa các quy trình thủ công, giúp văn phòng công chứng xử lý nhiều hồ sơ hơn trong thời gian ngắn hơn.',
    },
    {
      icon: <PeopleAltIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Mở rộng phạm vi khách hàng',
      description: 'Tiếp cận khách hàng trên toàn quốc thông qua nền tảng trực tuyến, không bị giới hạn bởi vị trí địa lý.',
    },
    {
      icon: <LayersIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Quản lý hồ sơ hiệu quả',
      description:
        'Hệ thống lưu trữ và tổ chức tất cả hồ sơ công chứng một cách có hệ thống, dễ dàng tìm kiếm và truy xuất.',
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Bảo mật thông tin tối đa',
      description: 'Công nghệ mã hóa tiên tiến đảm bảo an toàn cho dữ liệu khách hàng và văn bản công chứng.',
    },
    {
      icon: <AssessmentIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Báo cáo và phân tích',
      description: 'Công cụ báo cáo chi tiết giúp theo dõi hiệu suất, doanh thu và xu hướng công chứng.',
    },
    {
      icon: <PaymentsIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Thanh toán linh hoạt',
      description: 'Hệ thống thanh toán tích hợp với nhiều phương thức, tự động hóa quá trình thu phí và đối soát.',
    },
  ];

  const features = [
    {
      title: 'Nền tảng quản lý văn phòng toàn diện',
      description:
        'Giải pháp số hóa toàn bộ hoạt động văn phòng công chứng từ tiếp nhận hồ sơ, soạn thảo văn bản, đến lưu trữ và quản lý.',
      points: [
        'Quản lý hồ sơ công chứng từ đầu đến cuối',
        'Lịch làm việc và phân công công chứng viên',
        'Quản lý khách hàng và lịch sử giao dịch',
        'Tự động hóa quy trình nghiệp vụ (workflow)',
        'Báo cáo và thống kê đa chiều',
      ],
    },
    {
      title: 'Công nghệ công chứng trực tuyến',
      description:
        'Cung cấp công nghệ xác thực danh tính và ký số tiên tiến, cho phép thực hiện công chứng từ xa một cách an toàn và hợp pháp.',
      points: [
        'Xác thực danh tính bằng sinh trắc học',
        'Chữ ký điện tử được chứng thực',
        'Công nghệ Blockchain đảm bảo tính toàn vẹn',
        'Video call tích hợp cho phiên công chứng trực tuyến',
        'Kiểm tra chống gian lận tự động',
      ],
    },
    {
      title: 'Tích hợp API linh hoạt',
      description:
        'Dễ dàng tích hợp với hệ thống hiện có của văn phòng công chứng và các dịch vụ bên ngoài để mở rộng khả năng.',
      points: [
        'API đầy đủ tài liệu và dễ sử dụng',
        'Tích hợp với phần mềm kế toán, CRM',
        'Kết nối với cơ sở dữ liệu công chứng quốc gia',
        'Tích hợp với các cổng thanh toán',
        'Webhook thông báo thời gian thực',
      ],
    },
  ];

  const packages = [
    {
      title: 'Gói Cơ bản',
      price: '5.000.000đ',
      period: '/tháng',
      features: [
        'Tối đa 5 người dùng',
        'Quản lý hồ sơ cơ bản',
        'Tối đa 200 hồ sơ/tháng',
        'Hỗ trợ kỹ thuật trong giờ hành chính',
        'Lưu trữ dữ liệu 1 năm',
        '5GB dung lượng lưu trữ',
      ],
    },
    {
      title: 'Gói Doanh nghiệp',
      price: '12.000.000đ',
      period: '/tháng',
      features: [
        'Không giới hạn người dùng',
        'Đầy đủ tính năng quản lý văn phòng',
        'Tối đa 1.000 hồ sơ/tháng',
        'Hỗ trợ kỹ thuật 24/7',
        'Lưu trữ dữ liệu vĩnh viễn',
        'Tích hợp API cơ bản',
        '30GB dung lượng lưu trữ',
        'Chuyên viên hỗ trợ riêng',
      ],
    },
    {
      title: 'Gói Tùy chỉnh',
      price: 'Liên hệ',
      period: '',
      features: [
        'Tùy chỉnh theo nhu cầu riêng',
        'Không giới hạn hồ sơ và dung lượng',
        'Tích hợp API nâng cao',
        'Tùy chỉnh quy trình nghiệp vụ',
        'White-label (thương hiệu riêng)',
        'Triển khai tại chỗ hoặc đám mây',
        'Hỗ trợ kỹ thuật ưu tiên 24/7',
        'Đào tạo chuyên sâu tại văn phòng',
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" color={dark[500]} gutterBottom>
          Giải pháp số hóa cho Văn phòng Công chứng
        </Typography>
        <Typography variant="h6" color={dark[400]} sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          Nâng cao hiệu suất và mở rộng dịch vụ của văn phòng công chứng với giải pháp công nghệ toàn diện
        </Typography>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mr: 3,
              py: 1.5,
              px: 4,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: 16,
            }}
          >
            Yêu cầu demo
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: 16,
            }}
          >
            Tải tài liệu
          </Button>
        </Box>
      </Box>

      {/* Introduction Section */}
      <Box sx={{ mb: 10 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: primary[50] }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" component="h2" fontWeight="bold" color={dark[500]} gutterBottom>
                  Giải pháp chuyển đổi số toàn diện
                </Typography>
                <Typography variant="body1" paragraph>
                  Hệ thống của chúng tôi được thiết kế đặc biệt cho văn phòng công chứng, giúp số hóa toàn bộ quy trình từ
                  tiếp nhận, soạn thảo, lưu trữ đến quản lý hồ sơ công chứng.
                </Typography>
                <Typography variant="body1" paragraph>
                  Với giải pháp của chúng tôi, văn phòng công chứng có thể mở rộng dịch vụ ra môi trường trực tuyến, tăng khả
                  năng tiếp cận khách hàng và nâng cao hiệu quả hoạt động.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <BusinessIcon sx={{ fontSize: 250, color: primary[200] }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" color={dark[500]} textAlign="center" gutterBottom>
          Lợi ích cho Văn phòng Công chứng
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
          Nâng cao hiệu quả hoạt động, tối ưu quy trình và mở rộng dịch vụ với giải pháp công nghệ hiện đại
        </Typography>

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={1} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                  <Box mb={2}>{benefit.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" color={dark[500]} gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2">{benefit.description}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" color={dark[500]} textAlign="center" gutterBottom>
          Tính năng chính
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
          Khám phá các tính năng mạnh mẽ được thiết kế đặc biệt cho văn phòng công chứng
        </Typography>

        {features.map((feature, index) => (
          <Box key={index} mb={4}>
            <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                  <Typography variant="h5" fontWeight="bold" color={dark[500]} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {feature.description}
                  </Typography>
                  <IntegrationInstructionsIcon
                    sx={{ fontSize: 120, color: primary[200], display: { xs: 'none', md: 'block' } }}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Paper elevation={0} sx={{ p: 3, backgroundColor: primary[50], borderRadius: 2 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {feature.points.map((point, idx) => (
                        <Typography component="li" variant="body1" key={idx} sx={{ mb: 1 }}>
                          {point}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Pricing Section */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" color={dark[500]} textAlign="center" gutterBottom>
          Gói dịch vụ
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
          Chọn gói dịch vụ phù hợp với quy mô và nhu cầu của văn phòng công chứng
        </Typography>

        <Grid container spacing={4}>
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={index === 1 ? 3 : 1}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  border: index === 1 ? `2px solid ${primary[500]}` : 'none',
                  position: 'relative',
                }}
              >
                {index === 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: primary[500],
                      color: 'white',
                      py: 0.5,
                      px: 2,
                      borderRadius: 1,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                  >
                    Phổ biến
                  </Box>
                )}
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold" color={dark[500]} gutterBottom>
                    {pkg.title}
                  </Typography>
                  <Box display="flex" alignItems="baseline" justifyContent="center" my={2}>
                    <Typography variant="h4" fontWeight="bold" color={primary[500]}>
                      {pkg.price}
                    </Typography>
                    <Typography variant="subtitle1" color={dark[400]}>
                      {pkg.period}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                  {pkg.features.map((feature, idx) => (
                    <Typography component="li" variant="body2" key={idx} sx={{ mb: 1 }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button fullWidth variant={index === 1 ? 'contained' : 'outlined'} color="primary" sx={{ mt: 2 }}>
                  {index === 2 ? 'Liên hệ tư vấn' : 'Dùng thử miễn phí'}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Partner Section */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" color={dark[500]} textAlign="center" gutterBottom>
          Đối tác của chúng tôi
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
          Hàng trăm văn phòng công chứng trên toàn quốc đã tin tưởng và sử dụng giải pháp của chúng tôi
        </Typography>

        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper
                elevation={1}
                sx={{
                  height: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color={dark[400]}>
                  Logo đối tác {index + 1}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Support Section */}
      <Box sx={{ mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: primary[50],
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box display="flex" justifyContent="center">
                <SupportIcon sx={{ fontSize: 120, color: primary[500] }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" fontWeight="bold" color={dark[500]} gutterBottom>
                Hỗ trợ triển khai toàn diện
              </Typography>
              <Typography variant="body1" paragraph>
                Chúng tôi cung cấp dịch vụ triển khai và hỗ trợ toàn diện, từ tư vấn, cài đặt, cấu hình đến đào tạo và vận
                hành. Đội ngũ chuyên gia của chúng tôi sẽ đồng hành cùng văn phòng công chứng của bạn trong suốt quá trình
                chuyển đổi số.
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 3,
                  textTransform: 'none',
                  fontSize: 16,
                }}
              >
                Liên hệ tư vấn
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForNotaryOffices;
