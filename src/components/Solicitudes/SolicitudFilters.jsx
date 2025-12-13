const SolicitudFilters = ({ filters, setFilters, userRole }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Filtro por estado */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={filters.estado}
            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_revision">En Revisión</option>
            <option value="info_solicitada">Info Solicitada</option>
            <option value="visita_agendada">Visita Agendada</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        {/* Búsqueda (solo para admin) */}
        {userRole === 'admin' && (
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nombre, email o mascota..."
              value={filters.busqueda || ''}
              onChange={(e) => setFilters({ ...filters, busqueda: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        )}

        {/* Botón limpiar filtros */}
        <div className="flex items-end">
          <button
            onClick={() => setFilters({ estado: 'todas', busqueda: '' })}
            className="px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
          >
            <i className="fi fi-sr-refresh mr-2"></i>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitudFilters;
