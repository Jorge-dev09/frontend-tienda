// src/services/axiosInstance.js
import axios from 'axios';


const instance = axios.create({baseURL: 'http://localhost:3000/api'});

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
