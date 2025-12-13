// src/components/Modal.jsx
export default function CardModal({ isOpen, onClose, title, children, type = 'info' }) {
  if (!isOpen) return null;

  const typeStyles = {
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const iconStyles = {
    success: 'fi-sr-check-circle text-emerald-600',
    error: 'fi-sr-cross-circle text-red-600',
    warning: 'fi-sr-exclamation text-amber-600',
    info: 'fi-sr-info text-blue-600'
  };

  return (
    <>
      {/* Overlay con animación */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className={`px-6 py-4 border-b-2 rounded-t-2xl ${typeStyles[type]}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <i className={`${iconStyles[type]} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6">
            {children}
          </div>

          {/* Footer con botón de cerrar */}
          <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
