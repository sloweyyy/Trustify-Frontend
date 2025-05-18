import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Collapse, IconButton, Container } from '@mui/material';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material';
import { black, dark, primary, white } from '../../config/theme/themePrimitives';

const Guide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const guides = [
    {
      description:
        'Đăng ký tài khoản để bắt đầu sử dụng dịch vụ công chứng trực tuyến. Bạn cần cung cấp thông tin cá nhân cơ bản và xác thực danh tính thông qua các giấy tờ tùy thân hợp lệ.',
      details: [
        'Tạo tài khoản bằng email và mật khẩu. Hệ thống sẽ gửi email xác nhận để kích hoạt tài khoản của bạn.',
        'Hoàn thiện hồ sơ cá nhân và tải lên các giấy tờ tùy thân (CCCD/CMND, Hộ chiếu) để xác thực danh tính của bạn trước khi sử dụng dịch vụ.',
      ],
    },
    {
      description:
        'Tạo hồ sơ công chứng bằng cách cung cấp thông tin về văn bản cần công chứng, mục đích công chứng và tải lên các tài liệu liên quan.',
      details: [
        'Chọn loại dịch vụ công chứng phù hợp với nhu cầu của bạn từ danh sách các dịch vụ có sẵn và cung cấp thông tin chi tiết về văn bản cần công chứng.',
        'Tải lên các tài liệu cần công chứng dưới dạng PDF, JPG hoặc các định dạng file phổ biến khác. Hệ thống hỗ trợ kiểm tra tính hợp lệ của tài liệu trước khi xử lý.',
      ],
    },
    {
      description:
        'Đặt lịch hẹn với công chứng viên thông qua hệ thống đặt lịch trực tuyến. Bạn có thể chọn thời gian phù hợp và phương thức gặp mặt (trực tiếp hoặc trực tuyến).',
      details: [
        'Hệ thống hiển thị các khung giờ trống của công chứng viên để bạn có thể chọn thời gian phù hợp nhất. Các buổi hẹn trực tuyến thường được thực hiện qua video call an toàn.',
        'Nhận thông báo xác nhận qua email và SMS về chi tiết buổi hẹn, bao gồm hướng dẫn chuẩn bị và các tài liệu cần thiết.',
      ],
    },
    {
      description:
        'Tham gia phiên công chứng theo lịch hẹn. Công chứng viên sẽ xác minh danh tính, xem xét tài liệu và hoàn tất quy trình công chứng theo quy định pháp luật.',
      details: [
        'Trong phiên công chứng trực tuyến, bạn sẽ được yêu cầu xuất trình giấy tờ tùy thân để xác minh danh tính. Toàn bộ quá trình được ghi lại để đảm bảo tính pháp lý.',
        'Sau khi hoàn tất thủ tục công chứng, bạn sẽ nhận được văn bản công chứng điện tử có chữ ký số của công chứng viên và có thể tải xuống hoặc nhận bản gốc tùy theo yêu cầu.',
      ],
    },
  ];

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % guides.length);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  const toggleExpand = (index) => {
    setCurrentStep(currentStep === index ? -1 : index);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        py: 4,
      }}
    >
      <Box
        flex={1}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 100,
              fontWeight: 600,
            }}
            component="span"
          >
            0{currentStep + 1}
          </Typography>
          <Typography
            sx={{
              fontSize: 50,
              fontWeight: 400,
            }}
            component="span"
          >
            /
          </Typography>

          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 200,
            }}
            component="span"
          >
            0{guides.length}
          </Typography>
        </Box>
        <Typography variant="h6">Cách hoạt động</Typography>
        <Typography variant="body2" mt={1} mr={10}>
          {guides[currentStep]?.description}
        </Typography>
        <Box display="flex" mt={5} gap={2}>
          <IconButton
            onClick={handlePrevStep}
            sx={{
              color: black[900],
              border: 1,
              '&: hover': {
                color: primary[500],
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowBackIosNewRounded fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleNextStep}
            sx={{
              color: black[900],
              border: 1,
              '&: hover': {
                color: primary[500],
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowForwardIosRounded fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box
        flex={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <List>
          {guides.map((guide, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 1,
                p: 2,
                backgroundColor: currentStep === index ? primary[50] : white[50],
              }}
            >
              <ListItem button sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                <IconButton
                  sx={{ cursor: 'pointer', p: 0 }}
                  onClick={() => {
                    toggleExpand(index);
                  }}
                >
                  {currentStep === index ? (
                    <KeyboardArrowRightRounded
                      sx={{
                        color: dark[500],
                        borderRadius: 100,
                        backgroundColor: white[50],
                        p: 1,
                      }}
                      fontSize="large"
                    />
                  ) : (
                    <KeyboardArrowDownRounded
                      sx={{
                        color: dark[500],
                        borderRadius: 100,
                        p: 1,
                      }}
                      fontSize="large"
                    />
                  )}
                </IconButton>

                <ListItemText
                  primary={`Bước ${index + 1}`}
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: dark[500],
                    ml: 2,
                  }}
                  sx={{ cursor: 'default', padding: 0, width: '80%' }}
                />
              </ListItem>

              <Collapse in={currentStep === index}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 2,
                    fontSize: 18,
                    color: dark[500],
                    cursor: 'default',
                  }}
                >
                  {guide.details[0]}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 2,
                    fontSize: 18,
                    color: dark[500],
                    cursor: 'default',
                  }}
                >
                  {guide.details[1]}
                </Typography>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Guide;
