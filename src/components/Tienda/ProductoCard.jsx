// 🎨 Propuesta de rediseño: look más limpio, consistente y "shop-like"
// Cambios clave:
// - Cards con imagen protagonista (más alta)
// - Precio destacado, stock como badge
// - Botón ancho tipo CTA
// - Menos texto pequeño, más jerarquía visual
// - Drawer más espacioso y claro

// ============================
// src/components/Tienda/ProductoCard.jsx
// ============================
const ProductoCard = ({ producto, onAddToCart }) => {
  const precio = Number(producto.precio) || 0;
  const sinStock = producto.stock <= 0;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="relative h-24 overflow-hidden">
       <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />


        {/* Stock */}
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] font-semibold shadow ${
            sinStock
              ? 'bg-red-500 text-white'
              : 'bg-emerald-500 text-white'
          }`}
        >
          {sinStock ? 'Agotado' : `${producto.stock} disponibles`}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
          {producto.nombre}
        </h3>

        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
          {producto.descripcion}
        </p>

        {/* Precio + botón */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900">
              ${precio.toFixed(2)}
            </span>
          </div>

          <button
            disabled={sinStock}
            onClick={() => onAddToCart(producto.id_producto)}
            className={`w-full rounded-full py-2 text-xs font-semibold transition-all active:scale-95 ${
              sinStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600 shadow'
            }`}
          >
            <i className="fi fi-sr-shopping-cart text-[11px] mr-1" />
            {sinStock ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;



