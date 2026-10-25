import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import UserWalletService from '../../services/userwallet.service'
import { toast } from 'react-toastify'

const PurchaseModal = ({ open, onClose, document }) => {
    const titleId = React.useId();
    const [amount, setAmount] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const handleInput = (e) => {
        const { value } = e.target;
        if (value < 0) {
            e.target.value = '';
        }
    };

    const handleWheel = (e) => {
        e.target.blur();
    };

    const handlePurchase = async () => {
        setLoading(true);
        const response = await UserWalletService.purchaseNft(document._id, amount);
        setLoading(false);

        if (response.status === 200) {
            toast.success('Mua tài liệu thành công');
            onClose();
        } else {
            toast.error('Mua tài liệu thất bại');
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby={titleId}>
            <DialogTitle component="div" id={`${titleId}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Typography component="h2" variant="h5" id={titleId} sx={{ flex: 1 }}>Mua thêm tài liệu</Typography>
                <IconButton aria-label="Đóng mua thêm tài liệu" onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ mb: 3 }}>
                    <Typography color="text.secondary">Tài liệu</Typography>
                    <Typography sx={{ overflowWrap: 'anywhere', mt: 0.5 }}>{document.filename?.replace(/^\d+-/, '') || 'Tài liệu chưa có tên'}</Typography>
                </Box>
                <TextField label="Số lượng mua thêm" type="number" fullWidth value={amount}
                    onChange={(e) => setAmount(e.target.value)} onInput={handleInput} onWheel={handleWheel}
                    disabled={loading} placeholder="Nhập số lượng" helperText="Chọn số lượng tài liệu bạn muốn mua thêm." />
            </DialogContent>
            <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, ml: '0 !important' } }}>
                <Button variant="outlined" onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handlePurchase} disabled={loading} aria-busy={loading}>
                    {loading ? 'Đang xử lý...' : 'Mua tài liệu'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PurchaseModal
