import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import { LinkedIn, Facebook, GitHub } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const policies = [
  ['Chính sách bảo mật', '/privacy-policy'], ['Bảo mật thanh toán', '/payment-security'],
  ['Điều khoản sử dụng', '/terms-of-service'], ['Hướng dẫn sử dụng', '/user-guide'],
  ['Quy chế hoạt động', '/operating-regulations'], ['Cơ chế giải quyết khiếu nại', '/dispute-resolution'],
];
const products = [['Giá', '/pricing'], ['Dành cho cá nhân', '/for-individuals'], ['Dành cho VPCC', '/for-notary-offices']];
const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/slowey.ipynb', icon: <Facebook /> },
  { label: 'GitHub', href: 'https://github.com/sloweyyy', icon: <GitHub /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sloweyne/', icon: <LinkedIn /> },
];
const linkStyle = { color: 'inherit', display: 'inline-flex', alignItems: 'center', minHeight: 44, overflowWrap: 'anywhere', '&:focus-visible': { outlineColor: 'primary.contrastText' } };
const FooterLinks = ({ title, links }) => (
  <Box component="nav" aria-label={title} sx={{ minWidth: 0 }}>
    <Typography component="h2" variant="h6" sx={{ mb: 1 }}>{title}</Typography>
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {links.map(([label, to]) => <Box component="li" key={to}><Link component={RouterLink} to={to} onClick={() => window.scrollTo(0, 0)} underline="hover" sx={linkStyle}>{label}</Link></Box>)}
    </Box>
  </Box>
);

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', py: { xs: 4, md: 6 } }} data-testid="footer-content">
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '1fr 2fr' }, gap: { xs: 4, md: 5 } }}>
        <Box sx={{ minWidth: 0 }}>
          <BrandLogo variant="inverse" width={168} />
          <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.25rem' }}>Hồ sơ rõ ràng. An tâm từng bước.</Typography>
          <Typography sx={{ mt: 2 }}>Kết nối với chúng tôi:</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {social.map(({ label, href, icon }) => <IconButton key={label} component="a" href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label} sx={{ color: 'inherit', '&.Mui-focusVisible': { outlineColor: 'primary.contrastText' } }}>{icon}</IconButton>)}
          </Box>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>
          <FooterLinks title="Thông tin và hướng dẫn" links={policies} />
          <FooterLinks title="Dịch vụ" links={products} />
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 1 }}>Liên hệ</Typography>
            <Typography>Trụ sở chính: Dĩ An, Bình Dương</Typography>
            <Link href="mailto:sloweycontact@gmail.com" sx={linkStyle}>Email: sloweycontact@gmail.com</Link>
            <Link href="tel:+84909090909" sx={linkStyle}>Số điện thoại: +84 909 090 909</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);
export default Footer;
