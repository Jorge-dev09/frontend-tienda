import axios from 'axios';

// Configura la URL base de tu backend Node.js
// Ajusta el puerto según el que uses (ejemplo: 3000, 5000, 8080, etc.)
const API_BASE_URL = 'http://localhost:3000/api'; // ← CAMBIA EL PUERTO SEGÚN TU SERVER

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// API DE AUTENTICACIÓN
// ============================================
export const authAPI = {
  // Registro de usuario
  register: (userData) => api.post('/auth/registro', userData),
  
login: ({ email, password }) =>
  api.post('/auth/login', { email, password }),

loginAdmin: ({ email, password }) =>
  api.post('/auth/login-admin', { email, password }),

recuperarPassword: (email) => api.post('/auth/recuperar-password', { email }),
verificarCodigo: (email, codigo) => api.post('/auth/verificar-codigo', { email, codigo}),
cambiarPassword: (email, nuevaPassword) =>
    api.post('/auth/cambiar-password', { email, nuevaPassword }),


  // Obtener usuario actual (requiere token)
  getCurrentUser: () => api.get('/auth/me'),
  
  // Logout (limpia token localmente)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  }
};




// ============================================
// API DE ANIMALES
// ============================================
export const animalAPI = {
  getAll: (params) => api.get('/animales', { params }),
  getById: (id) => api.get(`/animales/${id}`),
  create: (data) => api.post('/animales', data),
  update: (id, data) => api.put(`/animales/${id}`, data),
  delete: (id) => api.delete(`/animales/${id}`),
};

// ============================================
// API DE PRODUCTOS
// ============================================
export const productoAPI = {
  getAll: (params) => api.get('/productos', { params }),
  getById: (id) => api.get(`/productos/${id}`),
  create: (data) => api.post('/productos', data),
  update: (id, data) => api.put(`/productos/${id}`, data),
  delete: (id) => api.delete(`/productos/${id}`),
};

// ============================================
// API DE SOLICITUDES DE ADOPCIÓN
// ============================================
export const solicitudAPI = {
  getAll: (params) => api.get('/solicitudes', { params }),
  getMisSolicitudes: () => api.get('/solicitudes/mis-solicitudes'),
  getById: (id) => api.get(`/solicitudes/${id}`),
  create: (data) => api.post('/solicitudes', data),
  update: (id, data) => api.put(`/solicitudes/${id}`, data),
  updateStatus: (id, estado) => api.patch(`/solicitudes/${id}/estado`, { estado }),
  delete: (id) => api.delete(`/solicitudes/${id}`),
};

// ============================================
// API DE CARRITO
// ============================================
export const carritoAPI = {
  get: () => api.get('/carrito'),
  add: (idProducto, cantidad) => api.post('/carrito', { id_producto: idProducto, cantidad }),
  update: (itemId, cantidad) => api.put(`/carrito/${itemId}`, { cantidad }),
  remove: (itemId) => api.delete(`/carrito/${itemId}`),
  clear: () => api.delete('/carrito/vaciar'),
};

// ============================================
// API DE USUARIOS (ADMIN)
// ============================================
export const usuarioAPI = {
  getAll: (params) => api.get('/usuarios', { params }),
  getById: (id) => api.get(`/usuarios/${id}`),
  update: (id, data) => api.put(`/usuarios/${id}`, data),
  delete: (id) => api.delete(`/usuarios/${id}`),
  toggleAdmin: (id) => api.patch(`/usuarios/${id}/toggle-admin`),
};

export default api;
