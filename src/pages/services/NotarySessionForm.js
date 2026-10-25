import React, { useEffect, useState, useMemo, useId } from 'react';
import { Box, Typography, TextField, IconButton, Button, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import FieldLabel from '../../components/shared/FieldLabel';
import DateTimePickerSection from '../../components/shared/DateTimeFields';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import AvatarWithCloseButton from '../../components/static/AvatarWithCloseButton';
import NotarizationService from '../../services/notarization.service';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const CustomAutocomplete = ({ id, options, value, onChange, placeholder, loading, fetchOptions, isSubmitting }) => (
  <Autocomplete
    id={id}
    loading={loading}
    openText="Mở danh sách" closeText="Đóng danh sách" clearText="Xóa lựa chọn"
    options={options}
    getOptionLabel={(option) => option.name}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        inputProps={{ ...params.inputProps, readOnly: true }}
        sx={{
          mt: 1,
          backgroundColor: 'background.default',
          borderRadius: 1,
          '& .MuiInputBase-input': {
            fontSize: '1rem',
          },
        }}
        placeholder={placeholder}
      />
    )}
    renderOption={(props, option) => (
      <li
        {...props}
        key={option.id}
        style={{
          fontSize: '1rem',
          fontWeight: 400,
        }}
      >
        {option.name}
      </li>
    )}
    value={value}
    onOpen={fetchOptions}
    disabled={isSubmitting}
    loadingText={<Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.secondary' }}>Đang tải...</Typography>}
    noOptionsText={
      <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.secondary' }}>Không tìm thấy kết quả</Typography>
    }
  />
);

const GuestSection = ({
  id,
  value,
  options,
  handleInputChange,
  handleAddGuest,
  users,
  handleRemoveGuest,
  loading,
  isSubmitting,
}) => (
  <Box sx={{ mb: 2 }}>
    <FieldLabel htmlFor={id} label="Thêm khách mời" disabled={isSubmitting}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 1,
        backgroundColor: 'background.default',
        borderRadius: 1,
      }}
    >
      {/* Guest Autocomplete */}
      <Autocomplete
        id={id}
        openText="Mở danh sách" closeText="Đóng danh sách" clearText="Xóa lựa chọn"
        value={value}
        loading={loading}
        options={options}
        getOptionLabel={(option) => option?.email || option}
        onInputChange={handleInputChange}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Nhập email khách mời"
            sx={{
              flexGrow: 1,
              '& .MuiInputBase-input': { fontSize: '1rem' },
            }}
            onKeyDown={(event) => event.key === 'Enter' && handleAddGuest()}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            key={typeof option === 'string' ? option : option.id}
            style={{ fontSize: '1rem', fontWeight: 400 }}
          >
            {typeof option === 'string' ? option : option.email}
          </li>
        )}
        disabled={isSubmitting}
        loadingText={<Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.secondary' }}>Đang tải...</Typography>}
        noOptionsText={
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.secondary' }}>Không tìm thấy kết quả</Typography>
        }
      />

      <Button
        size="small"
        variant="outlined"
        onClick={handleAddGuest}
        sx={{ fontSize: '1rem', textTransform: 'none', mr: 1 }}
        disabled={isSubmitting}
      >
        Thêm
      </Button>
    </Box>

    </FieldLabel>

    {/* Added Guests */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
      {users.map((guest, index) => (
        <AvatarWithCloseButton key={index} email={guest.email} onRemove={() => handleRemoveGuest(guest.email)} />
      ))}
    </Box>
  </Box>
);

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-input': {
    fontSize: '1rem',
  },
}));

const NotarySessionForm = ({ open, setOpen, handleSuccess }) => {
  const fieldId = useId();
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [startDate, setStartDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());

  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);

  const [notarizationFields, setNotarizationFields] = useState([]);
  const [notarizationServices, setNotarizationServices] = useState([]);

  const [notaryField, setNotaryField] = useState(null);
  const [notaryService, setNotaryService] = useState(null);
  const [sessionName, setSessionName] = useState('');
  const [amount, setAmount] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEmails = useMemo(
    () => debounce(async (value) => {
      setLoading(true);
      try {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
          setOptions([]);
          return;
        }

        const response = await UserService.searchUserByEmail(trimmedValue);
        if (response.length === 0) {
          setOptions([]);
          toast.error('Không tìm thấy người dùng.');
        } else {
          setOptions(response);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        setOptions([]);
        toast.error('Không tìm thấy người dùng.');
      } finally {
        setLoading(false);
      }
    }, 1500),
    [],
  );

  const handleInputChange = (event, newValue) => {
    setEmail(newValue);
    fetchEmails(newValue);
  };

  const handleSessionNameChange = (event) => {
    setSessionName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleRemoveGuest = (emailToRemove) => {
    setUsers((prev) => prev.filter((user) => user.email !== emailToRemove));
  };

  const fetchNotarizationField = async () => {
    if (notarizationFields.length > 0) return;
    setLoading(true);
    try {
      const response = await NotarizationService.getAllNotarizationField();
      setNotarizationFields(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotarizationService = async () => {
    if (notaryField && notarizationServices.length === 0) {
      setLoading(true);
      try {
        const response = await NotarizationService.getNotarizationServiceByFieldId(notaryField.id);
        setNotarizationServices(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setNotarizationServices([]);
    setNotaryService(null);
  }, [notaryField]);

  const handleCreateSession = async () => {
    if (!sessionName || !notaryField || !notaryService || !startDate || !startTime) {
      toast.error('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (users.length === 0) {
      toast.error('Vui lòng thêm khách mời.');
      return;
    }

    const session = {
      amount,
      sessionName,
      notaryField,
      notaryService,
      startTime: startTime.format('HH:mm'),
      startDate: startDate.format('YYYY-MM-DD'),
      endTime: endTime.format('HH:mm'),
      endDate: endDate.format('YYYY-MM-DD'),
      users,
    };

    setIsSubmitting(true);

    try {
      const response = await SessionService.createSession(session);
      if (response) {
        toast.success('Tạo phiên công chứng thành công.');
        handleSuccess();
        handleOnClose();
      }
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStartDate(dayjs());
    setStartTime(dayjs());
    setEndDate(null);
    setEndTime(null);
    setEmail('');
    setUsers([]);
    setOptions([]);
    setNotaryField(null);
    setNotaryService(null);
    setSessionName('');
  };

  const handleAddGuest = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = options.find((option) => option.email === email);

    if (!email) {
      toast.error('Vui lòng nhập địa chỉ email.');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Địa chỉ email không hợp lệ.');
      return;
    }

    if (!existingUser) {
      toast.error('Không tìm thấy người dùng.');
      return;
    }

    if (users.find((user) => user.email === email)) {
      toast.error('Người dùng này đã được thêm.');
      return;
    }

    setUsers((prev) => [...prev, { email }]);
    setEmail('');
  };

  const handleOnClose = () => {
    if (isSubmitting) {
      return;
    }
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullScreen={fullScreen} fullWidth maxWidth="md" aria-labelledby={`${fieldId}-title`}>
      <DialogTitle component="div" id={`${fieldId}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography id={`${fieldId}-title`} component="h2" variant="h5">Tạo phiên công chứng</Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary' }}>Điền thông tin phiên, chọn thời gian và thêm người cùng tham gia.</Typography>
        </Box>
        <IconButton aria-label="Đóng tạo phiên công chứng" onClick={handleOnClose} disabled={isSubmitting}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
          {/* Notary Session Name */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0, mb: 2 }}>
              <FieldLabel htmlFor={`${fieldId}-name`} label="Tên phiên công chứng" disabled={isSubmitting}>
              <CustomTextField
                id={`${fieldId}-name`}
                placeholder="Nhập tên phiên công chứng"
                fullWidth
                onChange={handleSessionNameChange}
                disabled={isSubmitting}
              />
              </FieldLabel>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0, mb: 2 }}>
              <FieldLabel htmlFor={`${fieldId}-amount`} label="Số lượng bản sao" disabled={isSubmitting}>
              <CustomTextField
                id={`${fieldId}-amount`}
                placeholder="Nhập số lượng bản sao"
                fullWidth
                onChange={handleAmountChange}
                disabled={isSubmitting}
              />
              </FieldLabel>
            </Box>
          </Box>

          {/* Notary Service and Field */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0, mb: { xs: 2, sm: 0 } }}>
              <FieldLabel htmlFor={`${fieldId}-field`} label="Lĩnh vực công chứng" disabled={isSubmitting}>
              <CustomAutocomplete
                id={`${fieldId}-field`}
                options={notarizationFields}
                value={notaryField}
                onChange={(e, value) => setNotaryField(value)}
                placeholder="Chọn lĩnh vực công chứng"
                loading={loading}
                fetchOptions={fetchNotarizationField}
                isSubmitting={isSubmitting}
              />
              </FieldLabel>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0, mb: { xs: 2, sm: 0 } }}>
              <FieldLabel htmlFor={`${fieldId}-service`} label="Dịch vụ công chứng" disabled={isSubmitting}>
              <CustomAutocomplete
                id={`${fieldId}-service`}
                options={notarizationServices}
                value={notaryService}
                onChange={(e, value) => setNotaryService(value)}
                placeholder="Chọn dịch vụ công chứng"
                loading={loading}
                fetchOptions={fetchNotarizationService}
                isSubmitting={isSubmitting}
              />
              </FieldLabel>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2">Thời gian bắt đầu</Typography>
              <DateTimePickerSection
                startDate={startDate}
                setStartDate={setStartDate}
                startTime={startTime}
                setStartTime={setStartTime}
                isSubmitting={isSubmitting}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2">Thời gian kết thúc</Typography>
              <DateTimePickerSection
                startDate={endDate}
                setStartDate={setEndDate}
                startTime={endTime}
                setStartTime={setEndTime}
                isSubmitting={isSubmitting}
              />
            </Box>
          </Box>

          {/* Duration */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sự kiện này sẽ diễn ra từ {startDate.format('DD/MM/YYYY')} - {startTime.format('HH:mm')} đến{' '}
              {endDate ? endDate.format('DD/MM/YYYY') : '.. / .. / ..'} - {endTime ? endTime.format('HH:mm') : '.. : ..'}
            </Typography>
          </Box>

          {/* Guests */}
          <GuestSection
            id={`${fieldId}-guests`}
            value={email}
            options={options}
            handleInputChange={handleInputChange}
            handleAddGuest={handleAddGuest}
            users={users}
            handleRemoveGuest={handleRemoveGuest}
            loading={loading}
            isSubmitting={isSubmitting}
          />

        </LocalizationProvider>
      </DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, ml: '0 !important' } }}>
        <Button variant="outlined" onClick={handleOnClose} disabled={isSubmitting}>Hủy</Button>
        <Button variant="contained" onClick={handleCreateSession} disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotarySessionForm;
