import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  CardActions,
  Link,
  Autocomplete,
  Skeleton,
  CircularProgress,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { dark, gray, primary, white } from '../../config/theme/themePrimitives';
import Guide from '../../components/services/Guide';
import NotarizationService from '../../services/notarization.service';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const fetchServiceList = async () => {
    setLoading(true);
    try {
      const response = await NotarizationService.getAllNotarizationService();
      const data = response.map((item) => ({
        title: item.name,
        description: item.description,
      }));
      setFilteredData(data);
      setServices(data);
    } catch (error) {
      console.error('Error fetching service list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchLoading(true);
    const filtered = services.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
    setSearchLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  const benefits = [
    {
      icon: <VerifiedUserIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Công chứng hợp pháp',
      description:
        'Dịch vụ công chứng trực tuyến của chúng tôi tuân thủ đầy đủ quy định pháp luật và có giá trị pháp lý tương đương với công chứng truyền thống.',
    },
    {
      icon: <AccessTimeIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Tiết kiệm thời gian',
      description:
        'Không cần đến văn phòng công chứng, bạn có thể thực hiện mọi thủ tục công chứng từ xa, tiết kiệm thời gian và chi phí đi lại.',
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Bảo mật tuyệt đối',
      description:
        'Hệ thống bảo mật đa lớp đảm bảo thông tin cá nhân và tài liệu của bạn được bảo vệ tối đa, ngăn chặn mọi truy cập trái phép.',
    },
    {
      icon: <DescriptionIcon fontSize="large" sx={{ color: primary[500] }} />,
      title: 'Lưu trữ điện tử',
      description:
        'Tất cả tài liệu công chứng được lưu trữ an toàn trên hệ thống điện tử, dễ dàng truy cập và sử dụng khi cần.',
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
        }}
      >
        <Box height="fit-content" width="fit-content" sx={{ px: 20 }}>
          <Typography
            variant="h2"
            textAlign="center"
            color={dark[500]}
            sx={{
              maxWidth: 900,
              mx: 'auto',
              width: '100%',
              fontWeight: 700,
            }}
            height="fit-content"
            width="fit-content"
          >
            Dịch vụ công chứng
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            color={dark[500]}
            sx={{ mt: 4, width: '100%' }}
            height="fit-content"
            width="fit-content"
          >
            Dịch vụ công chứng của chúng tôi được thiết kế để mang lại sự tiện lợi và an toàn cho các giao dịch của bạn. Với
            đội ngũ chuyên nghiệp và quy trình minh bạch, chúng tôi cam kết giúp bạn hoàn thành các thủ tục công chứng một
            cách nhanh chóng và hiệu quả.
          </Typography>
        </Box>
        <Autocomplete
          disabled={loading}
          sx={{ width: '50%', mt: 4, background: gray[50] }}
          freeSolo
          options={services.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="" placeholder="Tìm kiếm..." />}
          onInputChange={(e, value) => handleSearch(value)}
        />
      </Box>

      {/* Services Section - Moved to the top */}
      <Box sx={{ py: 4, backgroundColor: gray[50] }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="600" color={dark[500]} mb={4}>
            Danh sách dịch vụ công chứng
          </Typography>
          <Typography variant="body1" textAlign="center" color={dark[500]} mb={6} sx={{ maxWidth: 800, mx: 'auto' }}>
            Chúng tôi cung cấp đa dạng các dịch vụ công chứng đáp ứng mọi nhu cầu từ cá nhân đến doanh nghiệp. Từ công chứng
            hợp đồng, di chúc đến các văn bản pháp lý quan trọng, đều được thực hiện với tiêu chuẩn cao nhất về tính chính
            xác và bảo mật.
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 10,
          background: gray[50],
          justifyContent: 'space-between',
          position: 'relative',
          '&:after': {
            content: '""',
            flexBasis: {
              xs: '100%',
              sm: 'calc(50%)',
              md: 'calc(33.33%)',
            },
            display: 'block',
            visibility: 'hidden',
          },
          '& > *': {
            mx: 1,
          },
        }}
      >
        {loading ? (
          Array.from(new Array(services.length || 6)).map((_, index) => (
            <Box
              key={index}
              sx={{
                flexBasis: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                  md: 'calc(33.33% - 24px)',
                },
                mb: 3,
              }}
            >
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={60} />
                  <Skeleton variant="text" width="90%" height={150} />
                  <Skeleton variant="rectangular" width={'40%'} height={27} />
                </CardContent>
              </Card>
            </Box>
          ))
        ) : searchLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              width: '100%',
            }}
          >
            <CircularProgress size={'4rem'} />
          </Box>
        ) : (
          filteredData.slice(0, visibleCount).map((service, index) => (
            <Box
              key={index}
              sx={{
                flexBasis: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                  md: 'calc(33.33% - 24px)',
                },
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  backgroundColor: white[50],
                  py: 1,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {service.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    underline="none"
                    href="/signin"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 600,
                        px: 1,
                        color: primary[500],
                        position: 'relative',
                        '&:: after': {
                          content: "''",
                          position: 'absolute',
                          width: '0',
                          height: '2px',
                          backgroundColor: primary[500],
                          bottom: -2,
                          left: 0,
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                    >
                      Tạo hồ sơ
                    </Typography>
                  </Link>
                </CardActions>
              </Card>
            </Box>
          ))
        )}
        {/* Load More Button */}
        {filteredData.length > visibleCount && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              width: '100%',
            }}
          >
            <Button color="primary" onClick={loadMore}>
              Xem thêm
            </Button>
          </Box>
        )}
      </Box>

      {/* Benefits Section - Now after services list */}
      <Box sx={{ backgroundColor: white[50], py: 6 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="600" color={dark[500]} mb={6}>
            Lợi ích của dịch vụ công chứng trực tuyến
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2 }}>
                  <CardContent
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                  >
                    <Box mb={2}>{benefit.icon}</Box>
                    <Typography gutterBottom variant="h6" component="h2" fontWeight="600">
                      {benefit.title}
                    </Typography>
                    <Typography>{benefit.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Guide Section - Now at the bottom */}
      <Guide />
    </Box>
  );
};

export default Services;
