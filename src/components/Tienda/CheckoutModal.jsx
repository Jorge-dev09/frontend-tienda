// src/components/Tienda/CheckoutModal.jsx
import { useState } from 'react';

const CheckoutModal = ({ open, onClose, subtotal, onConfirm, loading }) => {
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'tarjeta'
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Finalizar compra
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <i className="fi fi-rr-cross-small text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
            {/* Datos de envío */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Nombre completo
                </label>
                <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                />
                </div>
                <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Ciudad
                </label>
                <input
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                />
                </div>
            </div>

            <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Dirección completa
                </label>
                <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Código postal
                </label>
                <input
                    name="codigoPostal"
                    value={form.codigoPostal}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                />
                </div>
                <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Método de pago (simulado)
                </label>
                <select
                    name="metodoPago"
                    value={form.metodoPago}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                >
                    <option value="tarjeta">Tarjeta de crédito</option>
                    <option value="debito">Tarjeta de débito</option>
                    <option value="paypal">PayPal (simulado)</option>
                </select>
                </div>
            </div>

            {/* Datos de tarjeta (simulados, no se envían a ningún gateway real) */}
            <div className="mt-2 border-t border-slate-100 pt-3 space-y-3">
                <p className="text-[11px] font-semibold text-slate-600">
                Datos de la tarjeta (simulados)
                </p>

                <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Número de tarjeta
                </label>
                <input
                    name="numeroTarjeta"
                    value={form.numeroTarjeta}
                    onChange={handleChange}
                    required
                    maxLength={19}
                    placeholder="4111 1111 1111 1111"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Nombre en la tarjeta
                    </label>
                    <input
                    name="nombreTarjeta"
                    value={form.nombreTarjeta}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Expiración (MM/AA)
                    </label>
                    <input
                    name="expiracion"
                    value={form.expiracion}
                    onChange={handleChange}
                    required
                    placeholder="12/28"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    CVV
                    </label>
                    <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    placeholder="123"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
                    />
                </div>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="text-xs text-slate-500">
                Total a pagar
                <div className="text-lg font-semibold text-slate-900">
                    ${Number(subtotal || 0).toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-400">
                    El pago se simula solo para fines de demostración.
                </p>
                </div>
                <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 active:scale-95 transition disabled:bg-slate-200 disabled:text-slate-400"
                >
                {loading ? 'Procesando...' : 'Confirmar pago'}
                </button>
            </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
