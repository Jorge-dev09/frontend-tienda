import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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

const adminTiendaAPI = {
  getProductos: (params = {}) =>
    api.get('/admin/tienda/productos', { params }),
  createProducto: (data) =>
    api.post('/admin/tienda/productos', data),
  updateProducto: (id_producto, data) =>
    api.put(`/admin/tienda/productos/${id_producto}`, data),
  toggleProducto: (id_producto, activo) =>
    api.patch(`/admin/tienda/productos/${id_producto}/estado`, { activo }),
  deleteProducto: (id_producto) =>
    api.delete(`/admin/tienda/productos/${id_producto}`),
  getOrdenes: () =>
    api.get('/admin/tienda/ordenes'),
  getOrdenDetalle: (id_orden) =>
    api.get(`/admin/tienda/ordenes/${id_orden}`)
};

export default adminTiendaAPI;
