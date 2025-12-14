// src/services/axiosInstance.js
import axios from 'axios';


const instance = axios.create({baseURL: 'https://backend-tienda-production-2cd7.up.railway.app/api'});

// Añadir token automáticamente si existe
instance.interceptors.request.use((config) => {
  // Por ahora, solo desde localStorage (ajusta la clave si usas otra)
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
