import axios from 'axios';

const API_URL = 'https://backend-tienda-production-2cd7.up.railway.app/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// ENDPOINTS PARA USUARIOS
// ============================================



const solicitudAPI = {
  // Obtener mis solicitudes
  getMisSolicitudes: (estado = 'todas') =>
    api.get('/solicitudes/mis-solicitudes', {
      params: { estado }
    }),

  // Enviar nueva solicitud
  crearSolicitud: (payload) => {
    return api.post('/solicitudes', payload);
  },


  // Obtener detalle de mi solicitud
  getDetalleSolicitud: (idSolicitud) => {
    return api.get(`/solicitudes/mis-solicitudes/${idSolicitud}`);
  },

  // Cancelar solicitud
  cancelarSolicitud: (idSolicitud) => {
    return api.put(`/solicitudes/${idSolicitud}/cancelar`);
  },

  // Agregar mensaje
  agregarMensaje: (idSolicitud, mensaje) => {
    return api.post(`/solicitudes/${idSolicitud}/mensajes`, { mensaje });
  },

  // ============================================
  // ENDPOINTS PARA ADMINISTRADORES
  // ============================================

  // Obtener todas las solicitudes (admin)
  getTodasSolicitudes: (filtros = {}) => {
    return api.get('/solicitudes/admin/todas', { params: filtros });
  },

  // Obtener detalle completo (admin)
  getDetalleSolicitudAdmin: (idSolicitud) => {
    return api.get(`/solicitudes/admin/${idSolicitud}`);
  },

  // Cambiar estado (admin)
  cambiarEstado: (idSolicitud, estado, notas = '', razonRechazo = '') => {
    return api.put(`/solicitudes/admin/${idSolicitud}/estado`, {
      estado,
      notas,
      razon_rechazo: razonRechazo
    });
  },

  // Obtener estadísticas (admin)
  getEstadisticas: () => {
    return api.get('/solicitudes/admin/estadisticas');
  },

  // Agregar mensaje/nota interna (admin)
  agregarNotaInterna: (idSolicitud, mensaje) => {
    return api.post(`/solicitudes/${idSolicitud}/mensajes`, {
      mensaje,
      es_interno: true
    });
  }
};

export default solicitudAPI;
