import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Paper, TextField, Typography } from '@mui/material';
import Guide from '../../components/services/Guide';
import PublicPage from '../../components/public/PublicPage';
import { EmptyState, ErrorState, LoadingState } from '../../components/shared/PageFeedback';
import NotarizationService from '../../services/notarization.service';
const Services = () => {
  const [error, setError] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const fetchServiceList = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await NotarizationService.getAllNotarizationService();
      const data = response.map((item) => ({
        title: item.name,
        description: item.description,
      }));
      setFilteredData(data);
      setServices(data);
    } catch (error) {
      setError(true);
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

  return <>
    <PublicPage title="Dịch vụ công chứng" intro="Tìm dịch vụ phù hợp và xem mô tả trước khi chuẩn bị hồ sơ. Phạm vi xử lý và yêu cầu giấy tờ được hướng dẫn trong biểu mẫu.">
      <Autocomplete freeSolo disabled={loading} options={services.map((option) => option.title)} onInputChange={(event, value) => handleSearch(value)} renderInput={(params) => <TextField {...params} label="Tìm dịch vụ công chứng" placeholder="Nhập tên dịch vụ" />} sx={{ maxWidth: 640, mb: 4 }} />
      {loading || searchLoading ? <LoadingState label="Đang tải dịch vụ…" /> : error ? <ErrorState title="Chưa thể tải danh sách dịch vụ" onRetry={fetchServiceList} /> : !filteredData.length ? <EmptyState title="Chưa có dịch vụ phù hợp" description="Bạn thử từ khóa khác hoặc quay lại sau." /> : <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>{filteredData.slice(0, visibleCount).map((service, index) => <Paper component="article" variant="outlined" key={index} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, overflowWrap: 'anywhere' }}><Typography component="h2" variant="h6">{service.title}</Typography><Typography color="text.secondary" sx={{ my: 2, whiteSpace: 'pre-line' }}>{service.description || 'Chọn dịch vụ trong biểu mẫu để xem yêu cầu giấy tờ.'}</Typography><Button variant="outlined" href="/signin" sx={{ mt: 'auto' }}>Tạo hồ sơ</Button></Paper>)}</Box>}
      {filteredData.length > visibleCount && <Box sx={{ textAlign: 'center', mt: 3 }}><Button variant="outlined" onClick={loadMore}>Xem thêm dịch vụ</Button></Box>}
    </PublicPage>
    <Guide />
  </>;
};
export default Services;
