import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { dark, gray, primary } from '../../../config/theme/themePrimitives';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const OperatingRegulations = () => {
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
            Quy chế hoạt động
          </Typography>
          <Typography variant="subtitle1" color={dark[500]} sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Các quy định về quyền, nghĩa vụ và quy trình hoạt động của hệ thống công chứng trực tuyến
          </Typography>
          <AccountBalanceIcon sx={{ fontSize: 60, color: primary[300], mb: 2 }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Quy chế này quy định cụ thể về hoạt động của hệ thống công chứng trực tuyến, bao gồm các quy định về quyền và
            nghĩa vụ của các bên tham gia, quy trình hoạt động, và các vấn đề liên quan khác.
          </Typography>

          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FactCheckIcon sx={{ fontSize: 30, color: primary[500], mr: 2 }} />
              <Typography variant="h5" fontWeight="bold" color={dark[500]}>
                I. Nguyên tắc hoạt động
              </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Hệ thống công chứng trực tuyến hoạt động dựa trên các nguyên tắc sau:
            </Typography>

            <Grid container spacing={3}>
              {[
                {
                  title: 'Tính pháp lý',
                  desc: 'Mọi hoạt động công chứng trên hệ thống tuân thủ nghiêm ngặt các quy định của pháp luật Việt Nam về công chứng, giao dịch điện tử, và các lĩnh vực liên quan.',
                },
                {
                  title: 'Bảo mật và an toàn',
                  desc: 'Hệ thống cam kết bảo vệ thông tin cá nhân và dữ liệu của người dùng, áp dụng các biện pháp kỹ thuật và quy trình bảo mật tiên tiến.',
                },
                {
                  title: 'Minh bạch',
                  desc: 'Các quy trình, thủ tục, và chi phí được công khai rõ ràng để người dùng nắm bắt đầy đủ thông tin.',
                },
                {
                  title: 'Trách nhiệm',
                  desc: 'Tất cả các bên tham gia phải tuân thủ quy chế hoạt động và chịu trách nhiệm về các hành động của mình trên hệ thống.',
                },
              ].map((item, index) => (
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
                    <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1">{item.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 5 }} />

          <Grid container spacing={5} sx={{ mb: 6 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ backgroundColor: primary[50], p: 4, borderRadius: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <GroupIcon sx={{ fontSize: 30, color: primary[500], mr: 2 }} />
                  <Typography variant="h5" fontWeight="bold" color={dark[500]}>
                    II. Đối tượng áp dụng
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Quy chế này áp dụng đối với:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Cá nhân, tổ chức sử dụng dịch vụ công chứng trực tuyến.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Công chứng viên, nhân viên, và các bên liên quan trực tiếp tham gia vào quy trình công chứng.
                  </Typography>
                  <Typography component="li" variant="body1">
                    Đơn vị quản lý và vận hành hệ thống công chứng trực tuyến.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 30, color: primary[500], mr: 2 }} />
                <Typography variant="h5" fontWeight="bold" color={dark[500]}>
                  III. Quy trình công chứng trực tuyến
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Hệ thống công chứng trực tuyến thực hiện quy trình như sau:
              </Typography>
              <Box sx={{ pl: 2, borderLeft: `3px solid ${primary[300]}` }}>
                <Box component="ol" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
                    <strong>Đăng ký và xác thực:</strong> Người dùng đăng ký tài khoản, cung cấp thông tin cá nhân và xác
                    thực danh tính thông qua các giấy tờ tùy thân hợp lệ.
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
                    <strong>Yêu cầu công chứng:</strong> Người dùng tạo yêu cầu công chứng, cung cấp thông tin và tài liệu
                    cần thiết.
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
                    <strong>Thẩm định hồ sơ:</strong> Hệ thống và công chứng viên thẩm định tính hợp lệ và pháp lý của hồ sơ
                    được nộp.
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
                    <strong>Phiên công chứng:</strong> Tiến hành phiên công chứng trực tuyến với sự tham gia của các bên liên
                    quan và công chứng viên.
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
                    <strong>Ký kết và xác nhận:</strong> Các bên ký kết văn bản bằng chữ ký điện tử, công chứng viên xác nhận
                    và ký số.
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
                    <strong>Cấp văn bản công chứng:</strong> Hệ thống cấp văn bản công chứng điện tử và/hoặc bản cứng theo
                    yêu cầu.
                  </Typography>
                  <Typography component="li" variant="body1">
                    <strong>Lưu trữ hồ sơ:</strong> Hệ thống lưu trữ hồ sơ công chứng theo quy định của pháp luật.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ backgroundColor: gray[50], p: 4, borderRadius: 2, mb: 6 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              IV. Quyền và nghĩa vụ của người dùng
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]}>
                  1. Quyền của người dùng
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Được cung cấp thông tin đầy đủ, chính xác về quy trình, thủ tục và chi phí công chứng.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Được bảo mật thông tin cá nhân và nội dung văn bản công chứng theo quy định pháp luật.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Được cấp văn bản công chứng hợp pháp và có giá trị pháp lý sau khi hoàn tất quy trình.
                  </Typography>
                  <Typography component="li" variant="body1">
                    Được tiếp cận và truy xuất hồ sơ công chứng của mình trong phạm vi quy định.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color={dark[500]}>
                  2. Nghĩa vụ của người dùng
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Cung cấp thông tin trung thực, chính xác và đầy đủ theo yêu cầu của quy trình công chứng.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Tuân thủ các hướng dẫn, quy định và thủ tục do hệ thống đưa ra.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Không sử dụng hệ thống cho các mục đích bất hợp pháp hoặc vi phạm pháp luật.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Thanh toán đầy đủ và đúng hạn các khoản phí dịch vụ theo quy định.
                  </Typography>
                  <Typography component="li" variant="body1">
                    Bảo mật thông tin đăng nhập và chịu trách nhiệm về các hoạt động từ tài khoản của mình.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
              V. Trách nhiệm của đơn vị vận hành
            </Typography>
            <Grid container spacing={3}>
              {[
                'Đảm bảo hệ thống hoạt động ổn định, an toàn và tuân thủ các quy định pháp luật liên quan.',
                'Cung cấp dịch vụ công chứng chất lượng, chính xác và đúng thời hạn theo cam kết.',
                'Bảo mật thông tin người dùng và nội dung văn bản công chứng theo quy định.',
                'Xử lý và phản hồi kịp thời các yêu cầu, khiếu nại từ người dùng.',
                'Cập nhật và nâng cấp hệ thống để đảm bảo tính bảo mật và hiệu quả.',
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: primary[50],
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: primary[500],
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        mt: 0.5,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="body1">{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 5 }} />

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                VI. Xử lý vi phạm
              </Typography>
              <Typography variant="body1">
                Tùy theo mức độ vi phạm, đơn vị vận hành có quyền áp dụng các biện pháp từ nhắc nhở, cảnh báo, tạm khóa tài
                khoản đến đình chỉ vĩnh viễn quyền sử dụng dịch vụ. Các hành vi vi phạm nghiêm trọng có thể bị xử lý theo quy
                định của pháp luật, bao gồm việc chuyển hồ sơ cho cơ quan có thẩm quyền để điều tra, xử lý.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color={dark[500]}>
                VII. Điều khoản sửa đổi và bổ sung
              </Typography>
              <Typography variant="body1">
                Quy chế này có thể được sửa đổi, bổ sung định kỳ để phù hợp với sự thay đổi của pháp luật và nhu cầu vận hành
                thực tế. Mọi sửa đổi, bổ sung sẽ được thông báo công khai trên hệ thống và có hiệu lực từ thời điểm được công
                bố, trừ khi có quy định khác.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default OperatingRegulations;
