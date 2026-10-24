import axios from 'axios';
import { API_BASE_URL } from '../services/config';
import Cookies from 'js-cookie';
import AuthService from '../services/auth.service';

const axiosConfig = axios.create({
  baseURL: API_BASE_URL,
});

// axiosConfig.defaults.timeout = 1000 * 60 * 10;

// axiosConfig.defaults.withCredentials = true;

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshTokenPromise = null;

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // if (error.response?.status === 401) {
    //   const refreshToken = Cookies.get('refreshToken');
    //   await AuthService.logout(refreshToken).then(() => {
    //     window.location.href = '/signin';
    //   });
    // }

    // if (error.response?.status !== 410) {
    //   toast.error(error.response?.data?.message || error?.message);
    // }

    const originalRequest = error.config;
    const isRefreshCall = originalRequest && originalRequest.url && originalRequest.url.includes('/auth/refresh-tokens');
    const refreshToken = Cookies.get('refreshToken');
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshCall &&
      refreshToken
    ) {
      originalRequest._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = AuthService.refreshAccessToken(refreshToken)
          .then((response) => {
            const newAccessToken = response.data.access.token;
            Cookies.set('accessToken', newAccessToken);
            Cookies.set('refreshToken', response.data.refresh.token);
            return newAccessToken;
          })
          .catch((refreshError) => {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            throw refreshError;
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosConfig(originalRequest);
      });
    }

    return Promise.reject(error);
  },
);

export default axiosConfig;
