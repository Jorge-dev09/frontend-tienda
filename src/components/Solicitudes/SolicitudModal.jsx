import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import Timeline from './Timeline';
import solicitudAPI from '../../services/solicitudAPI';

const SolicitudModal = ({ solicitud, onClose, onCancelar }) => {
  const [detalles, setDetalles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelar, setShowCancelar] = useState(false);

  useEffect(() => {
    const cargarDetalles = async () => {
      try {
        const response = await solicitudAPI.getDetalleSolicitud(solicitud.id_solicitud);
        setDetalles(response.data);
      } catch (error) {
        console.error('Error al cargar detalles:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDetalles();
  }, [solicitud.id_solicitud]);

  const handleCancelar = async () => {
    try {
      await onCancelar(solicitud.id_solicitud);
      setShowCancelar(false);
      onClose();
    } catch (error) {
      console.error('Error al cancelar:', error);
    }
  };

  const puedeCancel = ['pendiente', 'en_revision', 'info_solicitada'].includes(solicitud.estado);

  return (
    <div className="fixed inset-0 bg-black-4 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Detalle de Solicitud
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <i className="fi fi-sr-cross-small text-2xl"></i>
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Estado y Mascota */}
            <div className="flex items-start gap-4">
              <img
                src={detalles.solicitud.imagen_url || 'https://via.placeholder.com/150'}
                alt={detalles.solicitud.nombre}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {detalles.solicitud.nombre}
                </h3>
                <p className="text-gray-600 mb-3">
                  {detalles.solicitud.raza} • {detalles.solicitud.edad_anos} años
                </p>
                <StatusBadge estado={detalles.solicitud.estado} />
              </div>
            </div>

            {/* Información de la solicitud */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                <i className="fi fi-sr-document mr-2"></i>
                Tu Solicitud
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Motivo de adopción:</span>
                  <p className="text-gray-600 mt-1">{detalles.solicitud.motivo_adopcion}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Tipo de vivienda:</span>
                  <p className="text-gray-600 mt-1">{detalles.solicitud.vivienda_tipo}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">¿Tiene patio?</span>
                  <p className="text-gray-600 mt-1">
                    {detalles.solicitud.tiene_patio ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
            </div>

            {/* Razón de rechazo si aplica */}
            {detalles.solicitud.estado === 'rechazada' && detalles.solicitud.razon_rechazo && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">
                  <i className="fi fi-sr-info mr-2"></i>
                  Razón del Rechazo
                </h4>
                <p className="text-red-700 text-sm">{detalles.solicitud.razon_rechazo}</p>
              </div>
            )}

            {/* Comentarios del admin */}
            {detalles.solicitud.comentarios_admin && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  <i className="fi fi-sr-comment-alt mr-2"></i>
                  Comentarios
                </h4>
                <p className="text-blue-700 text-sm">{detalles.solicitud.comentarios_admin}</p>
              </div>
            )}

            {/* Timeline de historial */}
            {detalles.historial && detalles.historial.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  <i className="fi fi-sr-time-past mr-2"></i>
                  Historial de Estados
                </h4>
                <Timeline historial={detalles.historial} />
              </div>
            )}

            {/* Mensajes */}
            {detalles.mensajes && detalles.mensajes.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  <i className="fi fi-sr-messages mr-2"></i>
                  Mensajes
                </h4>
                <div className="space-y-3">
                  {detalles.mensajes.map((msg) => (
                    <div key={msg.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {msg.nombre_remitente}
                      </p>
                      <p className="text-sm text-gray-700">{msg.mensaje}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.fecha_creacion).toLocaleString('es-MX')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t">
              {puedeCancel && !showCancelar && (
                <button
                  onClick={() => setShowCancelar(true)}
                  className="flex-1 bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Cancelar Solicitud
                </button>
              )}
              
              {showCancelar && (
                <>
                  <button
                    onClick={handleCancelar}
                    className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Confirmar Cancelación
                  </button>
                  <button
                    onClick={() => setShowCancelar(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    No Cancelar
                  </button>
                </>
              )}

              {!showCancelar && (
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudModal;
