// src/pages/admin/AdminDashboardPage.jsx
import Dashboard from '../../components/Solicitudes/Dashboard';
import { useAuth } from '../../context/AuthContext';

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-gray-600">
        No tienes permisos de administrador.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Panel de Administración
        </h1>
        <p className="text-slate-600 text-sm mb-6">
          Bienvenido, {user?.nombre}. Aquí puedes ver el estado general del sistema.
        </p>

        {/* Métricas de solicitudes */}
        <Dashboard />

        {/* Placeholder para otras métricas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-2">
              Animales registrados
            </h2>
            <p className="text-xs text-slate-500">
              Más adelante aquí puedes mostrar conteos por especie, estado de adopción, etc.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-2">
              Actividad de la tienda
            </h2>
            <p className="text-xs text-slate-500">
              Aquí irán métricas básicas de productos y donaciones cuando implementes la tienda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
