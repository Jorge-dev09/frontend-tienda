// frontend/src/components/Solicitudes/SolicitudesList.jsx
import StatusBadge from './StatusBadge';

const SolicitudesList = ({ solicitudes, onVerDetalles, userRole, onCambiarEstado }) => {
  const formatFecha = (fecha) => {
    const now = new Date();
    const solicitudFecha = new Date(fecha);
    const diffDias = Math.floor((now - solicitudFecha) / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return 'Hoy';
    if (diffDias === 1) return 'Ayer';
    if (diffDias < 7) return `Hace ${diffDias} días`;
    return solicitudFecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (userRole === 'admin') {
    // Vista de Tabla para Admin
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adoptante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mascota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id_solicitud} className="hover:bg-gray-50 transition">
                  {/* Adoptante */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {solicitud.nombre_usuario?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {solicitud.nombre_completo_usuario}
                        </div>
                        <div className="text-sm text-gray-500">
                          {solicitud.email_usuario}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Mascota */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={solicitud.foto_animal || 'https://via.placeholder.com/40'}
                        alt={solicitud.nombre_animal}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {solicitud.nombre_animal}
                        </div>
                        <div className="text-sm text-gray-500">
                          {solicitud.raza_animal || solicitud.especie}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Fecha */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFecha(solicitud.fecha_solicitud)}
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge estado={solicitud.estado} />
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => onVerDetalles(solicitud)}
                      className="text-blue-600 hover:text-blue-900 transition"
                      title="Ver detalles"
                    >
                      <i className="fi fi-sr-eye text-lg"></i>
                    </button>
                    {solicitud.estado === 'pendiente' && (
                      <>
                        <button
                          onClick={() => onCambiarEstado(solicitud.id_solicitud, 'aprobada')}
                          className="text-emerald-600 hover:text-emerald-900 transition"
                          title="Aprobar"
                        >
                          <i className="fi fi-sr-check-circle text-lg"></i>
                        </button>
                        <button
                          onClick={() =>
                            onCambiarEstado(solicitud.id_solicitud, 'rechazada', true)
                          }
                          className="text-red-600 hover:text-red-900 transition"
                          title="Rechazar"
                        >
                          <i className="fi fi-sr-cross-circle text-lg"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Vista de Tarjetas para Usuario
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {solicitudes.map((solicitud) => (
        <div
          key={solicitud.id_solicitud}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Imagen */}
          <div className="relative h-48">
            <img
              src={solicitud.foto_animal || 'https://via.placeholder.com/400x300'}
              alt={solicitud.nombre_animal}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <StatusBadge estado={solicitud.estado} />
            </div>
          </div>

          {/* Contenido */}
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {solicitud.nombre_animal}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {solicitud.raza_animal || solicitud.especie} • {solicitud.edad_animal}
            </p>

            <div className="text-sm text-gray-500 mb-4 space-y-1">
              <p className="flex items-center gap-2">
                <i className="fi fi-sr-calendar text-orange-500"></i>
                {formatFecha(solicitud.fecha_solicitud)}
              </p>
              {solicitud.nombre_refugio && (
                <p className="flex items-center gap-2">
                  <i className="fi fi-sr-house-building text-orange-500"></i>
                  {solicitud.nombre_refugio}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onVerDetalles(solicitud)}
                className="flex-1 bg-orange-500 text-white py-2.5 px-4 rounded-lg hover:bg-orange-600 transition font-medium text-sm"
              >
                Ver detalles
              </button>

              {/* Opcional: botón cancelar aquí también, si quieres acción directa */}
              {solicitud.estado === 'enviada' || solicitud.estado === 'pendiente' ? (
                <button
                  onClick={() => onCambiarEstado(solicitud.id_solicitud, 'cancelar')}
                  className="text-xs text-red-600 hover:text-red-700 px-3 py-2"
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolicitudesList;
