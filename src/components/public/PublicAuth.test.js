import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import SignInCard from '../../pages/signin/SignInCard';
import SignUpCard from '../../pages/signup/SignUpCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../stores/actions/authAction';
import AuthService from '../../services/auth.service';
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: jest.fn() }));
jest.mock('react-router-dom', () => ({ useNavigate: jest.fn() }));
jest.mock('../../stores/actions/authAction', () => ({ userLogin: jest.fn() }));
jest.mock('../../services/auth.service', () => ({ register: jest.fn(), forgotPassword: jest.fn(), signInWithGoogle: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
test('semantic sign-in submit preserves single Redux login payload and success destination', async () => {
  const navigate = jest.fn(), dispatch = jest.fn(() => ({ unwrap: () => Promise.resolve({ id: 'QA' }) }));
  useNavigate.mockReturnValue(navigate); useDispatch.mockReturnValue(dispatch); useSelector.mockImplementation((selector) => selector({ auth: { loading: false } })); userLogin.mockReturnValue({ type: 'auth/login-fixture' });
  render(<SignInCard />, { wrapper }); fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'qa@example.com' } }); fireEvent.change(screen.getByLabelText('Mật khẩu'), { target: { value: 'local-fixture' } });
  fireEvent.submit(screen.getByRole('form', { name: 'Biểu mẫu đăng nhập' })); await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  expect(userLogin).toHaveBeenCalledTimes(1); expect(userLogin).toHaveBeenCalledWith({ email: 'qa@example.com', password: 'local-fixture' }); expect(dispatch).toHaveBeenCalledTimes(1); expect(screen.getByRole('link', { name: 'Quên mật khẩu?' })).toHaveAttribute('href', '/forgot-password');
});
test('sign-up preserves name/email/password arguments and original sign-in redirect', async () => {
  const navigate = jest.fn(); useNavigate.mockReturnValue(navigate); AuthService.register.mockResolvedValue(undefined);
  render(<SignUpCard />, { wrapper }); for (const [label, value] of [['Họ và tên', 'Nguyễn Thị Mỹ'], ['Email', 'qa@example.com'], ['Mật khẩu', 'local-fixture']]) fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fireEvent.submit(screen.getByRole('form', { name: 'Biểu mẫu đăng ký' })); await waitFor(() => expect(navigate).toHaveBeenCalledWith('/signin/')); expect(AuthService.register).toHaveBeenCalledWith('Nguyễn Thị Mỹ', 'qa@example.com', 'local-fixture');
});
