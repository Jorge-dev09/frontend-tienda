const StatusBadge = ({ estado }) => {
  const estados = {
    enviada: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-300',
      icon: '📤',
      label: 'Enviada'
    },
    pendiente: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      border: 'border-amber-300',
      icon: '⏱️',
      label: 'Pendiente'
    },
    en_revision: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-300',
      icon: '🔍',
      label: 'En Revisión'
    },
    info_solicitada: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-300',
      icon: '❓',
      label: 'Info Solicitada'
    },
    visita_agendada: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
      border: 'border-indigo-300',
      icon: '📅',
      label: 'Visita Agendada'
    },
    aprobada: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      border: 'border-emerald-300',
      icon: '✅',
      label: 'Aprobada'
    },
    rechazada: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-300',
      icon: '❌',
      label: 'Rechazada'
    },
    cancelada: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      icon: '⊗',
      label: 'Cancelada'
    }
  };

  const config = estados[estado] || estados.pendiente;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bg} ${config.text} ${config.border} text-sm font-medium`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
