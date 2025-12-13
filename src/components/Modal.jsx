// src/components/Modal.jsx
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const sizeClass =
    size === 'lg'
      ? 'max-w-3xl'
      : size === 'sm'
      ? 'max-w-md'
      : 'max-w-xl';

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') onClose();
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        className={`
          relative w-full ${sizeClass} mx-4 bg-white rounded-2xl shadow-2xl border border-gray-100
          max-h-[90vh] flex flex-col
        `}
      >
        {/* Header fijo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <span className="sr-only">Cerrar</span>
            <i className="fi fi-sr-cross-small text-xl" />
          </button>
        </div>

        {/* Contenido con scroll interno */}
        <div className="px-6 py-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
