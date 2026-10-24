// Review harness only; never imported by the app and has no application routes/API calls.
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Stack, Typography, Button, IconButton, TextField, Alert, AlertTitle, Chip, Paper, Card, CardContent, Checkbox, FormControlLabel, MenuItem, Stepper, Step, StepLabel, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, Skeleton, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import createTrustifyTheme from '../../../../src/config/theme/createTrustifyTheme';
import baseline from './baseline-theme.json';
import '../../../../src/index.css';

function Gallery() {
  const [mode, setMode] = useState('light');
  const [open, setOpen] = useState(false);
  const old = new URLSearchParams(window.location.search).has('baseline');
  const theme = useMemo(() => old ? createTheme(baseline) : createTrustifyTheme(mode), [mode, old]);
  window.reviewTheme = theme;
  const panel = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 };
  return <ThemeProvider theme={theme}><CssBaseline /><Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography component="h1" variant="h2">Trustify · {old ? 'Theme trước PR 02' : 'Theme sau PR 02'}</Typography>
    <Typography sx={{ my: 2 }}>Mẫu thành phần MUI thật · Dữ liệu minh họa · Không gọi API</Typography>
    {!old && <Stack direction="row" spacing={2} sx={{ mb: 3 }}><Button onClick={() => setMode('light')}>Nền sáng</Button><Button onClick={() => setMode('dark')}>Nền tối</Button></Stack>}
    <Box sx={panel}>
      <Card><CardContent><Stack spacing={2}><Typography variant="h6">Hành động và vùng chạm</Typography><Stack direction="row" gap={1} flexWrap="wrap"><Button variant="contained">Gửi hồ sơ</Button><Button variant="outlined">Quay lại</Button><Button color="error" variant="contained">Từ chối hồ sơ</Button><Button size="small">Xem hướng dẫn</Button><IconButton aria-label="Đóng mẫu"><CloseIcon /></IconButton></Stack><Button variant="contained" disabled>Chưa đủ thông tin</Button><FormControlLabel control={<Checkbox />} label="Tôi đã kiểm tra thông tin" /><Button onClick={() => setOpen(true)} variant="outlined">Mở hộp thoại</Button></Stack></CardContent></Card>
      <Card><CardContent><Stack spacing={3}><Typography variant="h6">Trường nhập và dấu tiếng Việt</Typography><TextField label="Họ và tên" defaultValue="Nguyễn Thị Mỹ" /><TextField label="Số CMND/CCCD/Hộ chiếu" placeholder="Nhập số giấy tờ" /><TextField error label="Số điện thoại" defaultValue="090" helperText="Bạn kiểm tra lại số điện thoại." /><TextField select label="Trạng thái" defaultValue="pending"><MenuItem value="pending">Chờ xử lý</MenuItem><MenuItem value="completed">Hoàn tất</MenuItem></TextField></Stack></CardContent></Card>
    </Box>
    <Paper sx={{ p: 3, my: 3 }}><Typography variant="h6" sx={{ mb: 2 }}>Thông báo và trạng thái</Typography><Stack spacing={2}>{['info', 'warning', 'success', 'error'].map((severity, i) => <Alert key={severity} severity={severity} action={<Button>Chi tiết</Button>}><AlertTitle>{['Đang xử lý hồ sơ','Chờ thanh toán','Hoàn tất','Chưa tải được hồ sơ'][i]}</AlertTitle>{['Thông tin được cập nhật theo tiến độ hồ sơ.','Số tiền cần thanh toán: 50.000 ₫.','Xem kết quả trong thông tin hồ sơ.','Bạn kiểm tra kết nối rồi thử lại.'][i]}</Alert>)}<Stack direction="row" gap={1} flexWrap="wrap"><Chip label="Chờ xử lý" color="warning" /><Chip label="Đang xử lý" color="info" /><Chip label="Hoàn tất" color="success" /><Chip label="Bị từ chối" color="error" />{!old && <Chip label="Chờ ký số" sx={{ bgcolor: theme.trustify.status.signature.bg, color: theme.trustify.status.signature.fg }} />}</Stack><LinearProgress aria-label="Đang tải dữ liệu minh họa" /><Skeleton width="65%" /></Stack></Paper>
    <Paper sx={{ p: 3, mb: 3 }}><Stepper activeStep={1} alternativeLabel><Step><StepLabel>Chọn loại công chứng</StepLabel></Step><Step><StepLabel>Cung cấp thông tin</StepLabel></Step><Step><StepLabel>Kiểm tra lại yêu cầu</StepLabel></Step></Stepper><Tabs value={0} aria-label="Nhóm hồ sơ"><Tab label="Tất cả" /><Tab label="Chờ xử lý" /></Tabs></Paper>
    <Paper sx={{ p: 2, mb: 3 }}><Typography variant="h6" sx={{ mb: 2 }}>Bảng dữ liệu MUI X và phân trang tiếng Việt</Typography><DataGrid autoHeight rows={[{id:1,name:'Nguyễn Thị Mỹ',service:'Chứng thực bản sao'}]} columns={[{field:'name',headerName:'Người yêu cầu',flex:1,minWidth:130},{field:'service',headerName:'Dịch vụ',flex:1,minWidth:140}]} initialState={{pagination:{paginationModel:{pageSize:5}}}} pageSizeOptions={[5,10]} /></Paper>
    <Paper sx={{ p: 3 }}><Typography variant="h6">Cỡ chữ 14–48px, nét 400/600</Typography>{[14,16,18,20,22,24,28,32,36,48].map(size=><Box key={size} sx={{ my: 2, overflowWrap: 'anywhere' }}><Typography variant="caption">{size}px</Typography><Typography sx={{fontSize:`${size/16}rem`,lineHeight:1.65}}>ắ ầ ẩ ữ ợ ỹ · Hồ sơ công chứng</Typography><Typography sx={{fontSize:`${size/16}rem`,lineHeight:1.65,fontWeight:600}}>ắ ầ ẩ ữ ợ ỹ · Nguyễn Thị Mỹ</Typography></Box>)}</Paper>
    <Dialog open={open} onClose={() => setOpen(false)}><DialogTitle>Kiểm tra lại thông tin</DialogTitle><DialogContent><Typography>Đây là mẫu kiểm tra theme và điều hướng bàn phím. Không gửi hồ sơ.</Typography><TextField autoFocus fullWidth label="Ghi chú" sx={{ mt: 3 }} /></DialogContent><DialogActions><Button onClick={() => setOpen(false)}>Đóng</Button><Button variant="contained" onClick={() => setOpen(false)}>Đã kiểm tra</Button></DialogActions></Dialog>
  </Container></ThemeProvider>;
}
createRoot(document.getElementById('root')).render(<Gallery />);
