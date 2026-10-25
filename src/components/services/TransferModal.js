import { Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Autocomplete, TextField, Button } from '@mui/material';
import React, { useState, useMemo, useId } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import UserWalletService from '../../services/userwallet.service';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
const EmailTextField = ({ value, options, handleInputChange, loading, disabled }) => (
  <Autocomplete freeSolo value={value} loading={loading} options={options} disabled={disabled}
    getOptionLabel={(option) => option?.email || option} onInputChange={handleInputChange}
    openText="Mở danh sách" closeText="Đóng danh sách" clearText="Xóa lựa chọn"
    renderInput={(params) => <TextField {...params} label="Email người nhận" placeholder="Nhập email người nhận" helperText="Tìm và chọn email người nhận trong hệ thống." />}
    loadingText="Đang tìm kiếm…" noOptionsText="Không tìm thấy người nhận"
    renderOption={(props, option) => <li {...props} key={typeof option === 'string' ? option : option.id}>{typeof option === 'string' ? option : option.email}</li>} />
);

const TransferModal = ({ open, onClose, document }) => {
  const titleId = useId();
  const [email, setEmail] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [sending, setSending] = useState(false);
  const disabled = !email || !amount;

  const handleInputChange = (event, newValue) => {
    setEmail(newValue);
    fetchEmails(newValue);
  };

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
        } else {
          setOptions(response);
        }
      } catch (error) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 1500),
    [],
  );

  const handleTransferNft = async () => {
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

    try {
      setSending(true);
      const response = await UserWalletService.transferNft(document.mintAddress, email, amount);
      if (response.status === 200) {
        toast.success('Chuyển tài liệu thành công.');
        onClose();
      } else {
        toast.error('Chuyển tài liệu thất bại.');
      }
      setSending(false);
    } catch (error) {
      console.error('Error transferring NFT:', error);
      toast.error('Chuyển tài liệu thất bại.');
      setSending(false);
    }
  };

  const handleInput = (e) => {
    const { value } = e.target;
    if (value < 0) {
      e.target.value = '';
    }
  };

  const handleWheel = (e) => {
    e.target.blur();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby={titleId}>
      <DialogTitle component="div" id={`${titleId}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Typography component="h2" variant="h5" id={titleId} sx={{ flex: 1 }}>Chia sẻ tài liệu</Typography>
        <IconButton aria-label="Đóng chia sẻ tài liệu" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography color="text.secondary">Tài liệu</Typography>
          <Typography sx={{ mt: 0.5, overflowWrap: 'anywhere' }}>{document.filename?.replace(/^\d+-/, '') || 'Tài liệu chưa có tên'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <EmailTextField value={email} options={options} handleInputChange={handleInputChange} loading={loading} disabled={sending} />
          <TextField label="Số lượng chia sẻ" type="number" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)}
            onInput={handleInput} onWheel={handleWheel} disabled={sending} placeholder="Nhập số lượng" />
        </Box>
      </DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, ml: '0 !important' } }}>
        <Button variant="outlined" onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleTransferNft} disabled={disabled || sending} aria-busy={sending}>
          {sending ? 'Đang chia sẻ…' : 'Chia sẻ'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferModal;
