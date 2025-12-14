// src/services/tiendaAPI.js
import axios from 'axios';

const API_URL = 'https://backend-tienda-production-2cd7.up.railway.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

const tiendaAPI = {
  getProductos: (params = {}) =>
    api.get('/tienda/productos', { params }),

  getCarrito: () =>
    api.get('/tienda/carrito'),

  addToCarrito: (id_producto, cantidad = 1) =>
    api.post('/tienda/carrito/items', { id_producto, cantidad }),

  updateCarritoItem: (id_carrito, cantidad) =>
    api.put(`/tienda/carrito/items/${id_carrito}`, { cantidad }),

  removeCarritoItem: (id_carrito) =>
    api.delete(`/tienda/carrito/items/${id_carrito}`),

  checkout: (payload) =>
    api.post('/tienda/checkout', payload),

  getOrdenes: () =>
    api.get('/tienda/ordenes'),

  getOrdenDetalle: (id_orden) =>
    api.get(`/tienda/ordenes/${id_orden}`)
};

export default tiendaAPI;
