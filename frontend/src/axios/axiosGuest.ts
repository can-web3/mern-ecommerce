// src/api/axiosConfig.js

import axios from 'axios';
import { toast } from 'react-toastify'; // isterseniz toast ile bildirim

// 1. Axios instance oluştur
const axiosGuest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosGuest.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 3. Response interceptor: global hata yönetimi
axiosGuest.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          toast.error('Geçersiz istek.');
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

export default axiosGuest;
