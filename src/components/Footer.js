import { Box, Container, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { LinkedIn, Facebook, GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const HomeData = [
    { text: 'Chính sách bảo mật', route: '/privacy-policy' },
    { text: 'Bảo mật thanh toán', route: '/payment-security' },
    { text: 'Điều khoản sử dụng', route: '/terms-of-service' },
    { text: 'Hướng dẫn sử dụng', route: '/user-guide' },
    { text: 'Quy chế hoạt động', route: '/operating-regulations' },
    { text: 'Cơ chế giải quyết khiếu nại', route: '/dispute-resolution' },
  ];

  const ProductsData = [
    { text: 'Giá', route: '/pricing' },
    { text: 'Dành cho cá nhân', route: '/for-individuals' },
    { text: 'Dành cho VPCC', route: '/for-notary-offices' },
  ];

  const AboutUsData = [
    'Trụ sở chính: Dĩ An, Bình Dương',
    'Email: sloweycontact@gmail.com',
    'Số điện thoại: +84 909 090 909',
  ];

  const handleNavigate = (route) => {
    if (route) {
      navigate(route);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'primary.main', py: 5, width: '100%' }} data-testid="footer-content">
      <Container>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} spacing={5}>
          <Box flex={1} mb={{ xs: 4, md: 0 }}>
            <Box>
              <img src={require('../assets/images/ASE-light.png')} alt="logo" width={'82px'} height={'96px'} />
              <Typography variant="h4" fontWeight="bold" color="white" mt={3} sx={{ cursor: 'default' }}>
                Hiện đại bậc nhất.
              </Typography>
              <Typography variant="body1" color="white" mt={3} sx={{ cursor: 'default' }}>
                Kết nối với chúng tôi:
              </Typography>
              <IconButton
                sx={{
                  color: 'white',
                  padding: 0,
                  mr: 2,
                  mt: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                size="large"
                onClick={() => window.open('https://www.facebook.com/slowey.ipynb', '_blank')}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  padding: 0,
                  mr: 2,
                  mt: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                size="large"
                onClick={() => window.open('https://github.com/sloweyyy', '_blank')}
              >
                <GitHub />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  padding: 0,
                  mr: 2,
                  mt: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                size="large"
                onClick={() => window.open('https://www.linkedin.com/in/sloweyne/', '_blank')}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
          <Box flex={2}>
            <Box display="flex" justifyContent="space-between">
              <Box flex={1}>
                <Typography variant="h6" fontWeight="bold" color="white" sx={{ cursor: 'default' }}>
                  Trang chủ
                </Typography>
                <List sx={{ width: 'fit-content' }}>
                  {HomeData.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ width: 'fit-content' }}>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          color: 'white',
                          cursor: 'pointer',
                          display: 'inline-block',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '0',
                            height: '2px',
                            bottom: '-2px',
                            left: '0',
                            backgroundColor: 'white',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                          width: 'fit-content',
                        }}
                        onClick={() => handleNavigate(item.route)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight="bold" color="white" sx={{ cursor: 'default' }}>
                  Sản phẩm
                </Typography>
                <List sx={{ width: 'fit-content' }}>
                  {ProductsData.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ width: 'fit-content' }}>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          color: 'white',
                          cursor: 'pointer',
                          display: 'inline-block',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '0',
                            height: '2px',
                            bottom: '-2px',
                            left: '0',
                            backgroundColor: 'white',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                          width: 'fit-content',
                        }}
                        onClick={() => handleNavigate(item.route)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight="bold" color="white" sx={{ cursor: 'default' }}>
                  Về chúng tôi
                </Typography>
                <List>
                  {AboutUsData.map((text, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          color: 'white',
                        }}
                        sx={{ cursor: 'default' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
