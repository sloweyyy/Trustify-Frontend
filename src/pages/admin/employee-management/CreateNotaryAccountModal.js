import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useId } from 'react';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';
const CreateNotaryAccountModal = ({ open, onClose }) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const titleId = useId();
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleCreateAccount = async () => {
        const user = {
            name,
            email,
            password,
            role: 'notary',
        }
        const response = await UserService.createUserAccount(user)
        if (response.status === 201) {
            onClose();
            toast.success('Tạo tài khoản thành công')
        } else {
            toast.error('Tạo tài khoản thất bại')
        }
    }

    return <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="sm" aria-labelledby={titleId}>
      <DialogTitle id={titleId}>Tạo tài khoản công chứng viên</DialogTitle>
      <DialogContent dividers><Box sx={{ display: 'grid', gap: 3, py: 1 }}>
        <TextField fullWidth label="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
        <TextField fullWidth label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
      </Box></DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& > .MuiButton-root': { width: { xs: '100%', sm: 'auto' } } }}><Button variant="text" onClick={onClose}>Hủy</Button><Button variant="contained" onClick={handleCreateAccount}>Tạo tài khoản</Button></DialogActions>
    </Dialog>;
};
export default CreateNotaryAccountModal;
