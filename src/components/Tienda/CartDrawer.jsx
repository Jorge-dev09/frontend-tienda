// src/components/Tienda/CartDrawer.jsx
const CartDrawer = ({
  open,
  onClose,
  carrito,
  loading,
  onUpdateItem,
  onRemoveItem,
    onCheckout
}) => {
  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-200 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Tu carrito
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <i className="fi fi-rr-cross-small text-lg" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {loading ? (
            <p className="text-xs text-slate-500">Cargando carrito...</p>
          ) : !carrito.items || carrito.items.length === 0 ? (
            <p className="text-xs text-slate-400">
              Aún no tienes productos en tu carrito.
            </p>
          ) : (
            carrito.items.map((item) => (
              <div
                key={item.id_carrito}
                className="flex items-center gap-3 bg-slate-50 rounded-xl p-2"
              >
                <img
                  src={item.imagen_url}
                  alt={item.nombre}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {item.nombre}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {item.categoria}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-slate-900">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          item.cantidad > 1 &&
                          onUpdateItem(item.id_carrito, item.cantidad - 1)
                        }
                        className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-[11px] text-slate-700">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateItem(item.id_carrito, item.cantidad + 1)
                        }
                        className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id_carrito)}
                  className="text-slate-300 hover:text-red-500 transition"
                >
                  <i className="fi fi-rr-trash text-xs" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-100 px  -4 py-3 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">Subtotal</span>
            <span className="text-sm font-semibold text-slate-900">
              ${(carrito.subtotal || 0).toFixed(2)}
            </span>
          </div>
        <button
        disabled={!carrito.items || carrito.items.length === 0}
        onClick={onCheckout}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 text-white text-xs font-semibold py-2 shadow-sm hover:bg-orange-600 active:scale-95 transition disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
        <i className="fi fi-sr-credit-card text-[11px]" />
        Proceder al pago
        </button>

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
