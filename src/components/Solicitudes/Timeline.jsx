const Timeline = ({ historial }) => {
  if (!historial || historial.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No hay historial disponible
      </div>
    );
  }

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {historial.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          {/* Línea y punto */}
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full ${
              index === historial.length - 1 
                ? 'bg-orange-500' 
                : 'bg-gray-300'
            }`} />
            {index < historial.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 mt-1" />
            )}
          </div>

          {/* Contenido */}
          <div className="flex-1 pb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">
                {item.estado_nuevo}
              </span>
              <span className="text-xs text-gray-500">
                {formatearFecha(item.fecha_cambio)}
              </span>
            </div>
            
            {item.nombre_usuario && (
              <p className="text-sm text-gray-600">
                Por: {item.nombre_usuario}
              </p>
            )}
            
            {item.notas && (
              <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                {item.notas}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
