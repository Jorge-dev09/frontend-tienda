// frontend/src/pages/SolicitudesPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import solicitudAPI from '../services/solicitudAPI';
import Dashboard from '../components/Solicitudes/Dashboard';
import SolicitudFilters from '../components/Solicitudes/SolicitudFilters';
import SolicitudesList from '../components/Solicitudes/SolicitudesList';
import SolicitudModal from '../components/Solicitudes/SolicitudModal';
import AdminSolicitudModal from '../components/Solicitudes/AdminSolicitudModal';

const SolicitudesPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, isAdmin } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    estado: 'todas',
    busqueda: '',
    tipo: 'todas' // 'todas' | 'adoptar' | 'ofrecer' (para admin)
  });

  useEffect(() => {
    fetchSolicitudes();
  }, [filters, isAdmin]);

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      let response;
      if (isAdmin) {
        // pasa todos los filtros, incluido tipo
        response = await solicitudAPI.getTodasSolicitudes(filters);
      } else {
        response = await solicitudAPI.getMisSolicitudes(filters.estado);
      }
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalles = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  };

  const handleCancelarSolicitud = async (idSolicitud) => {
    try {
      await solicitudAPI.cancelarSolicitud(idSolicitud);
      fetchSolicitudes();
      return true;
    } catch (error) {
      console.error('Error al cancelar solicitud:', error);
      throw error;
    }
  };

  const handleCambiarEstado = async (idSolicitud, nuevoEstado, requiresReason = false) => {
    if (requiresReason) {
      const solicitud = solicitudes.find((s) => s.id_solicitud === idSolicitud);
      setSelectedSolicitud(solicitud);
      setShowModal(true);
      return;
    }

    try {
      await solicitudAPI.cambiarEstado(idSolicitud, nuevoEstado);
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado de la solicitud');
    }
  };

  const handleCambiarEstadoCompleto = async (idSolicitud, nuevoEstado, notas = '', razonRechazo = '') => {
    try {
      await solicitudAPI.cambiarEstado(idSolicitud, nuevoEstado, notas, razonRechazo);
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  // separar por tipo para el usuario
  const solicitudesAdoptar = solicitudes.filter((s) => s.tipo_solicitud === 'adoptar');
  const solicitudesOfrecer = solicitudes.filter((s) => s.tipo_solicitud === 'ofrecer');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isAdmin ? '📋 Gestión de Solicitudes' : '🐾 Mis Solicitudes de Adopción'}
          </h1>
          <p className="text-gray-600">
            {isAdmin
              ? 'Revisa y gestiona todas las solicitudes de adopción'
              : 'Revisa el estado de tus solicitudes de adopción'}
          </p>
        </div>

        {/* Dashboard para Admin */}
        {isAdmin && <Dashboard />}

        {/* Filtros */}
        <SolicitudFilters
          filters={filters}
          setFilters={setFilters}
          userRole={isAdmin ? 'admin' : 'usuario'}
        />

        {/* Lista de Solicitudes */}
        {solicitudes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {filters.estado !== 'todas' || filters.busqueda
                ? 'No se encontraron solicitudes'
                : 'Aún no hay solicitudes'}
            </h3>
            <p className="text-gray-500 mb-6">
              {isAdmin
                ? 'No hay solicitudes que coincidan con los filtros'
                : 'Explora nuestras mascotas disponibles y envía tu primera solicitud'}
            </p>
            {!isAdmin && (
              <button
                onClick={() => (window.location.href = '/adoptar')}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-medium inline-flex items-center gap-2"
              >
                <i className="fi fi-sr-paw"></i>
                Explorar mascotas
              </button>
            )}
          </div>
        ) : isAdmin ? (
          // ADMIN: una sola lista con filtro de tipo vía backend
          <SolicitudesList
            solicitudes={solicitudes}
            onVerDetalles={handleVerDetalles}
            userRole="admin"
            onCambiarEstado={handleCambiarEstado}
          />
        ) : (
          // USUARIO: separar adoptar / ofrecer
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-3">
                Solicitudes para adoptar
              </h2>
              {solicitudesAdoptar.length === 0 ? (
                <p className="text-xs text-gray-500">
                  Aún no has enviado solicitudes para adoptar.
                </p>
              ) : (
                <SolicitudesList
                  solicitudes={solicitudesAdoptar}
                  onVerDetalles={handleVerDetalles}
                  userRole="usuario"
                  onCambiarEstado={handleCambiarEstado}
                />
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">
                Solicitudes para dar en adopción
              </h2>
              {solicitudesOfrecer.length === 0 ? (
                <p className="text-xs text-gray-500">
                  Aún no has ofrecido mascotas en adopción.
                </p>
              ) : (
                <SolicitudesList
                  solicitudes={solicitudesOfrecer}
                  onVerDetalles={handleVerDetalles}
                  userRole="usuario"
                  onCambiarEstado={handleCambiarEstado}
                />
              )}
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedSolicitud && (
          isAdmin ? (
            <AdminSolicitudModal
              solicitud={selectedSolicitud}
              onClose={() => setShowModal(false)}
              onCambiarEstado={handleCambiarEstadoCompleto}
              onRefresh={fetchSolicitudes}
            />
          ) : (
            <SolicitudModal
              solicitud={selectedSolicitud}
              onClose={() => setShowModal(false)}
              onCancelar={handleCancelarSolicitud}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SolicitudesPage;
