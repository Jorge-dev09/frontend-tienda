// src/components/Toast.jsx
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-emerald-500 border-emerald-600',
    error: 'bg-red-500 border-red-600',
    warning: 'bg-amber-500 border-amber-600',
    info: 'bg-blue-500 border-blue-600'
  };

  const icons = {
    success: 'fi-sr-check-circle',
    error: 'fi-sr-cross-circle',
    warning: 'fi-sr-exclamation',
    info: 'fi-sr-info'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className={`${typeStyles[type]} text-white rounded-xl shadow-lg border-2 p-4 max-w-sm flex items-center gap-3`}>
        <i className={`${icons[type]} text-2xl`}></i>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors"
        >
          <i className="fi fi-sr-cross text-sm"></i>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
