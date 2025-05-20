import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { dark, primary } from '../../../config/theme/themePrimitives';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Pricing = () => {
  const pricingPlans = [
    {
      title: 'Gói Tiêu chuẩn',
      price: '$800 - $1,200',
      period: '/năm',
      description: 'Dành cho văn phòng công chứng nhỏ và vừa',
      features: [
        'Tính năng công chứng trực tuyến cơ bản',
        'Hỗ trợ AI cơ bản',
        'Số lượng NFT có giới hạn',
        'Hỗ trợ tiêu chuẩn',
        'Tùy chọn thanh toán theo giao dịch',
        'Tối đa 5 tài khoản người dùng',
      ],
      buttonText: 'Đăng ký ngay',
      buttonVariant: 'outlined',
      popular: false,
    },
    {
      title: 'Gói Doanh nghiệp',
      price: '$2,000 - $3,000',
      period: '/năm',
      description: 'Dành cho văn phòng công chứng khối lượng cao',
      features: [
        'Tất cả tính năng cơ bản',
        'Công cụ AI nâng cao',
        'NFT không giới hạn',
        'Hỗ trợ ưu tiên 24/7',
        'Báo cáo toàn diện',
        'Tài khoản người dùng không giới hạn',
        'Xử lý tài liệu ưu tiên',
      ],
      buttonText: 'Đăng ký ngay',
      buttonVariant: 'contained',
      popular: true,
    },
    {
      title: 'Gói Tùy chỉnh',
      price: 'Liên hệ',
      period: 'Tùy chỉnh',
      description: 'Giải pháp tùy chỉnh cho nhu cầu chuyên biệt',
      features: [
        'Tất cả tính năng của gói Doanh nghiệp',
        'Tích hợp API tùy chỉnh',
        'Quản lý tài khoản chuyên biệt',
        'Tùy chọn thương hiệu riêng',
        'Tính năng bảo mật nâng cao',
        'Báo cáo tùy chỉnh',
        'Giải pháp white-label',
        'Đào tạo tại chỗ',
      ],
      buttonText: 'Liên hệ tư vấn',
      buttonVariant: 'outlined',
      popular: false,
    },
  ];

  const additionalFees = [
    {
      service: 'Phí Văn bản cho Người dùng cuối',
      fee: '10.000 VND cho bản đầu tiên',
    },
    {
      service: 'Bản sao Văn bản bổ sung',
      fee: '2.000 VND mỗi bản',
    },
    {
      service: 'Xử lý nhanh',
      fee: '+ 50% phí dịch vụ',
    },
    {
      service: 'Xác thực sinh trắc học nâng cao',
      fee: '50.000 VND/lần',
    },
    {
      service: 'Dịch vụ giao nhận tài liệu',
      fee: '70.000 VND - 150.000 VND (tùy khu vực)',
    },
    {
      service: 'Lưu trữ mở rộng',
      fee: '100.000 VND/năm',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color={dark[500]}>
          Bảng giá cho Văn phòng Công chứng
        </Typography>
        <Typography variant="subtitle1" color={dark[400]} sx={{ maxWidth: 700, mx: 'auto' }}>
          Lựa chọn gói dịch vụ phù hợp cho văn phòng công chứng của bạn. Tất cả các gói đều bao gồm công nghệ xác thực tiên
          tiến và khả năng công chứng đầy đủ pháp lý cho khách hàng của bạn.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="stretch" sx={{ mb: 8 }}>
        {pricingPlans.map((plan, index) => (
          <Grid item key={index} xs={12} md={4}>
            <Paper
              elevation={plan.popular ? 4 : 1}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 2,
                border: plan.popular ? `2px solid ${primary[500]}` : 'none',
              }}
            >
              {plan.popular && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: primary[500],
                    color: 'white',
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  Phổ biến
                </Box>
              )}
              <Typography variant="h5" component="h2" fontWeight="bold" color={dark[500]}>
                {plan.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', my: 2 }}>
                <Typography variant="h3" component="span" fontWeight="bold" color={primary[500]}>
                  {plan.price}
                </Typography>
                <Typography variant="subtitle1" color={dark[400]} sx={{ ml: 1 }}>
                  {plan.period}
                </Typography>
              </Box>
              <Typography variant="body2" color={dark[400]} sx={{ mb: 3 }}>
                {plan.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List sx={{ flexGrow: 1, mb: 3 }}>
                {plan.features.map((feature, idx) => (
                  <ListItem key={idx} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon sx={{ color: primary[500] }} />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button
                fullWidth
                variant={plan.buttonVariant}
                color="primary"
                sx={{
                  py: 1.5,
                  mt: 'auto',
                }}
              >
                {plan.buttonText}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color={dark[500]} textAlign="center">
          Phí Văn bản cho Người dùng cuối
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Các mức phí này áp dụng cho người dùng cuối (khách hàng của văn phòng công chứng) khi truy cập văn bản công chứng.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {additionalFees.map((fee, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={1} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" color={dark[500]}>
                  {fee.service}
                </Typography>
                <Typography variant="h5" color={primary[500]} fontWeight="bold" sx={{ mt: 1 }}>
                  {fee.fee}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper sx={{ mt: 8, p: 4, backgroundColor: primary[50], borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold" color={dark[500]}>
              Cần giải pháp tùy chỉnh?
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Chúng tôi cung cấp các giải pháp tùy chỉnh cho văn phòng công chứng với nhu cầu đặc biệt. Liên hệ với đội ngũ
              tư vấn của chúng tôi để nhận được giải pháp phù hợp nhất với yêu cầu của bạn.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Button variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5 }}>
              Liên hệ tư vấn
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box textAlign="center" mt={8}>
        <Typography variant="body2" color={dark[400]}>
          * Giá chưa bao gồm 10% VAT. Bảng giá có thể thay đổi mà không báo trước.
        </Typography>
        <Typography variant="body2" color={dark[400]} sx={{ mt: 1 }}>
          * Dịch vụ của chúng tôi chỉ khả dụng thông qua các văn phòng công chứng được ủy quyền. Người dùng cuối không thể
          mua trực tiếp.
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing;
