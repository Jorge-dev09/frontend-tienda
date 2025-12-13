import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import Timeline from './Timeline';
import solicitudAPI from '../../services/solicitudAPI';

const AdminSolicitudModal = ({ solicitud, onClose, onCambiarEstado, onRefresh }) => {
  const [detalles, setDetalles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [showActions, setShowActions] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [notas, setNotas] = useState('');
  const [razonRechazo, setRazonRechazo] = useState('');

  useEffect(() => {
    const cargarDetalles = async () => {
      try {
        const response = await solicitudAPI.getDetalleSolicitudAdmin(solicitud.id_solicitud);
        setDetalles(response.data);
      } catch (error) {
        console.error('Error al cargar detalles:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDetalles();
  }, [solicitud.id_solicitud]);

  const handleAccion = async () => {
    if (!actionType) return;

    try {
      await onCambiarEstado(solicitud.id_solicitud, actionType, notas, razonRechazo);
      setShowActions(false);
      setNotas('');
      setRazonRechazo('');
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado de la solicitud');
    }
  };

  const abrirAccion = (tipo) => {
    setActionType(tipo);
    setShowActions(true);
    setNotas('');
    setRazonRechazo('');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'info', label: 'Información', icon: 'fi-sr-user' },
    { id: 'hogar', label: 'Hogar', icon: 'fi-sr-home' },
    { id: 'experiencia', label: 'Experiencia', icon: 'fi-sr-paw' },
    { id: 'historial', label: 'Historial', icon: 'fi-sr-time-past' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Revisión de Solicitud
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              ID: {solicitud.id_solicitud}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <i className="fi fi-sr-cross-small text-2xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info superior: Usuario y Mascota */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Adoptante */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-lg p-5 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fi fi-sr-user text-orange-600"></i>
                Adoptante
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-900">
                  {detalles.solicitud.nombre_usuario} {detalles.solicitud.apellido_usuario}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <i className="fi fi-sr-envelope"></i>
                  {detalles.solicitud.email_usuario}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <i className="fi fi-sr-phone-call"></i>
                  {detalles.solicitud.telefono_usuario || 'No proporcionado'}
                </p>
                {detalles.solicitud.direccion_usuario && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <i className="fi fi-sr-marker"></i>
                    {detalles.solicitud.direccion_usuario}
                  </p>
                )}
              </div>
            </div>

            {/* Mascota */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fi fi-sr-paw text-blue-600"></i>
                Mascota Solicitada
              </h3>
              <div className="flex gap-4">
                <img
                  src={detalles.solicitud.imagen_url || 'https://via.placeholder.com/80'}
                  alt={detalles.solicitud.nombre}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-gray-900 text-lg">
                    {detalles.solicitud.nombre}
                  </p>
                  <p className="text-gray-700">{detalles.solicitud.especie}</p>
                  <p className="text-gray-700">{detalles.solicitud.raza}</p>
                  <p className="text-gray-700">
                    {detalles.solicitud.edad_anos} años {detalles.solicitud.edad_meses > 0 && `${detalles.solicitud.edad_meses} meses`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estado actual */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Estado actual:</p>
              <StatusBadge estado={detalles.solicitud.estado} />
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Fecha de solicitud:</p>
              <p className="font-medium text-gray-900">
                {new Date(detalles.solicitud.fecha_solicitud).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>

          {/* Tabs de información */}
          <div>
            <div className="border-b border-gray-200">
              <nav className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <i className={`fi ${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-6">
              {/* Tab: Información del Adoptante */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg mb-4">
                    Información Personal
                  </h4>
                  
                  <InfoItem 
                    label="Nombre completo" 
                    value={`${detalles.solicitud.nombre_usuario} ${detalles.solicitud.apellido_usuario}`} 
                  />
                  <InfoItem 
                    label="Email" 
                    value={detalles.solicitud.email_usuario} 
                  />
                  <InfoItem 
                    label="Teléfono" 
                    value={detalles.solicitud.telefono_usuario || 'No proporcionado'} 
                  />
                  {detalles.solicitud.fecha_nacimiento && (
                    <InfoItem 
                      label="Fecha de nacimiento" 
                      value={new Date(detalles.solicitud.fecha_nacimiento).toLocaleDateString('es-MX')} 
                    />
                  )}
                  <InfoItem 
                    label="Motivo de adopción" 
                    value={detalles.solicitud.motivo_adopcion} 
                    multiline 
                  />
                  <InfoItem 
                    label="Experiencia con mascotas" 
                    value={detalles.solicitud.experiencia_mascotas || 'No especificado'} 
                    multiline 
                  />
                </div>
              )}

              {/* Tab: Información del Hogar */}
              {activeTab === 'hogar' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg mb-4">
                    Información del Hogar
                  </h4>
                  
                  <InfoItem 
                    label="Tipo de vivienda" 
                    value={detalles.solicitud.tipo_vivienda || detalles.solicitud.vivienda_tipo} 
                  />
                  <InfoItem 
                    label="¿Tiene patio?" 
                    value={detalles.solicitud.tiene_patio ? 'Sí' : 'No'} 
                  />
                  <InfoItem 
                    label="¿Es propietario?" 
                    value={detalles.solicitud.es_propietario ? 'Sí' : 'No'} 
                  />
                  {detalles.solicitud.tamano_hogar && (
                    <InfoItem 
                      label="Tamaño del hogar" 
                      value={`${detalles.solicitud.tamano_hogar} m²`} 
                    />
                  )}
                  {detalles.solicitud.numero_personas && (
                    <InfoItem 
                      label="Número de personas en el hogar" 
                      value={detalles.solicitud.numero_personas} 
                    />
                  )}
                  <InfoItem 
                    label="¿Tiene niños?" 
                    value={detalles.solicitud.tiene_ninos ? 'Sí' : 'No'} 
                  />
                  {detalles.solicitud.edades_ninos && (
                    <InfoItem 
                      label="Edades de los niños" 
                      value={detalles.solicitud.edades_ninos} 
                    />
                  )}
                  <InfoItem 
                    label="¿Tiene otras mascotas?" 
                    value={detalles.solicitud.otros_animales ? 'Sí' : 'No'} 
                  />
                  {detalles.solicitud.descripcion_otros_animales && (
                    <InfoItem 
                      label="Descripción de otras mascotas" 
                      value={detalles.solicitud.descripcion_otros_animales} 
                      multiline 
                    />
                  )}
                </div>
              )}

              {/* Tab: Experiencia */}
              {activeTab === 'experiencia' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg mb-4">
                    Experiencia con Mascotas
                  </h4>
                  
                  <InfoItem 
                    label="¿Ha tenido mascotas antes?" 
                    value={detalles.solicitud.experiencia_mascotas_previas ? 'Sí' : 'No'} 
                  />
                  {detalles.solicitud.detalles_mascotas_previas && (
                    <InfoItem 
                      label="Detalles de mascotas anteriores" 
                      value={detalles.solicitud.detalles_mascotas_previas} 
                      multiline 
                    />
                  )}
                  {detalles.solicitud.anos_con_mascotas && (
                    <InfoItem 
                      label="Años con mascotas" 
                      value={`${detalles.solicitud.anos_con_mascotas} años`} 
                    />
                  )}
                  {detalles.solicitud.por_que_adoptar && (
                    <InfoItem 
                      label="¿Por qué quiere adoptar?" 
                      value={detalles.solicitud.por_que_adoptar} 
                      multiline 
                    />
                  )}
                  {detalles.solicitud.plan_cuidado && (
                    <InfoItem 
                      label="Plan de cuidado" 
                      value={detalles.solicitud.plan_cuidado} 
                      multiline 
                    />
                  )}
                  {detalles.solicitud.presupuesto_mensual && (
                    <InfoItem 
                      label="Presupuesto mensual" 
                      value={`$${detalles.solicitud.presupuesto_mensual}`} 
                    />
                  )}
                  {detalles.solicitud.horas_sola_por_dia && (
                    <InfoItem 
                      label="Horas que estará sola la mascota" 
                      value={`${detalles.solicitud.horas_sola_por_dia} horas/día`} 
                    />
                  )}
                </div>
              )}

              {/* Tab: Historial */}
              {activeTab === 'historial' && (
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-4">
                    Historial de Estados
                  </h4>
                  {detalles.historial && detalles.historial.length > 0 ? (
                    <Timeline historial={detalles.historial} />
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No hay historial disponible
                    </p>
                  )}

                  {/* Mensajes */}
                  {detalles.mensajes && detalles.mensajes.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        <i className="fi fi-sr-messages mr-2"></i>
                        Mensajes
                      </h4>
                      <div className="space-y-3">
                        {detalles.mensajes.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`rounded-lg p-3 ${
                              msg.es_interno 
                                ? 'bg-yellow-50 border border-yellow-200' 
                                : 'bg-gray-50'
                            }`}
                          >
                            {msg.es_interno && (
                              <span className="inline-block px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded mb-2">
                                Nota Interna
                              </span>
                            )}
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
                </div>
              )}
            </div>
          </div>

          {/* Comentarios actuales del admin */}
          {detalles.solicitud.comentarios_admin && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                <i className="fi fi-sr-comment-alt mr-2"></i>
                Comentarios Admin
              </h4>
              <p className="text-blue-700 text-sm">{detalles.solicitud.comentarios_admin}</p>
            </div>
          )}

          {/* Razón de rechazo si existe */}
          {detalles.solicitud.razon_rechazo && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">
                <i className="fi fi-sr-info mr-2"></i>
                Razón del Rechazo
              </h4>
              <p className="text-red-700 text-sm">{detalles.solicitud.razon_rechazo}</p>
            </div>
          )}

          {/* Acciones de Admin */}
          {!showActions ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t">
              <button
                onClick={() => abrirAccion('aprobada')}
                className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                <i className="fi fi-sr-check-circle"></i>
                Aprobar
              </button>
              
              <button
                onClick={() => abrirAccion('rechazada')}
                className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition font-medium"
              >
                <i className="fi fi-sr-cross-circle"></i>
                Rechazar
              </button>
              
              <button
                onClick={() => abrirAccion('en_revision')}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition font-medium"
              >
                <i className="fi fi-sr-search"></i>
                En Revisión
              </button>
              
              <button
                onClick={() => abrirAccion('info_solicitada')}
                className="flex items-center justify-center gap-2 bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition font-medium"
              >
                <i className="fi fi-sr-interrogation"></i>
                Solicitar Info
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-4">
                Confirmar Acción: {actionType}
              </h4>
              
              {actionType === 'rechazada' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razón del rechazo *
                  </label>
                  <textarea
                    value={razonRechazo}
                    onChange={(e) => setRazonRechazo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows="3"
                    placeholder="Explica por qué se rechaza la solicitud..."
                    required
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas adicionales
                </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                  placeholder="Agrega comentarios o notas (opcional)..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAccion}
                  disabled={actionType === 'rechazada' && !razonRechazo.trim()}
                  className="flex-1 bg-orange-500 text-white py-2.5 px-4 rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    setShowActions(false);
                    setActionType(null);
                    setNotas('');
                    setRazonRechazo('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para mostrar información
const InfoItem = ({ label, value, multiline = false }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200">
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    {multiline ? (
      <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
    ) : (
      <p className="text-gray-900 font-medium">{value}</p>
    )}
  </div>
);

export default AdminSolicitudModal;
