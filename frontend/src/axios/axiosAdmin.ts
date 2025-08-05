// src/api/axiosConfig.js

import axios from 'axios';
import { toast } from 'react-toastify'; 

const axiosAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/admin`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAdmin.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 3. Response interceptor: global hata yönetimi
axiosAdmin.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          toast.error('Geçersiz istek.');
          break;
        case 401:
          toast.error('Oturumunuz sonlandı. Lütfen tekrar giriş yapın.');
          // logout();
          break;
        case 403:
          toast.error('Bu işleme yetkiniz yok.');
          break;
        case 500:
          toast.error('Sunucuda bir hata oluştu.');
          break;
      }
    } else {
      // response yoksa (network hatası vb.)
      toast.error('Sunucuya bağlanılamıyor.');
    }
    return Promise.reject(error);
  }
);

export default axiosAdmin;
