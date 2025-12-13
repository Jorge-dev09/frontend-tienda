import { useState, useEffect } from 'react';
import solicitudAPI from '../../services/solicitudAPI';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const response = await solicitudAPI.getEstadisticas();
      setStats(response.data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const getPendientes = () => {
    const pendiente = stats?.por_estado?.find(e => e.estado === 'pendiente');
    return pendiente ? pendiente.total : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Solicitudes Pendientes */}
      <StatCard
        icon="fi fi-sr-pending"
        title="Pendientes"
        value={getPendientes()}
        bgColor="bg-amber-50"
        textColor="text-amber-600"
        iconBg="bg-amber-100"
      />

      {/* Solicitudes esta semana */}
      <StatCard
        icon="fi fi-sr-calendar-lines"
        title="Esta Semana"
        value={stats?.solicitudes_semana || 0}
        bgColor="bg-blue-50"
        textColor="text-blue-600"
        iconBg="bg-blue-100"
      />

      {/* Tasa de aprobación */}
      <StatCard
        icon="fi fi-ss-check-circle"
        title="Tasa de Aprobación"
        value={`${stats?.tasa_aprobacion || 0}%`}
        bgColor="bg-emerald-50"
        textColor="text-emerald-600"
        iconBg="bg-emerald-100"
      />

      {/* Tiempo promedio */}
      <StatCard
        icon="fi fi-sr-time-check"
        title="Tiempo Promedio"
        value={`${stats?.tiempo_promedio_dias || 0} días`}
        bgColor="bg-purple-50"
        textColor="text-purple-600"
        iconBg="bg-purple-100"
      />
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor, textColor, iconBg }) => (
  <div className={`${bgColor} rounded-lg p-6 border border-gray-100`}>
    <div className="flex items-center justify-between mb-3">
      <div className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
        {/* Aquí va el icono */}
        <i className={icon}></i>
      </div>
    </div>
    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
  </div>
);


export default Dashboard;
