// src/components/Tienda/ProductoGrid.jsx
import ProductoCard from './ProductoCard';

const ProductoGrid = ({ productos, loading, onAddToCart }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="h-64 bg-slate-100/80 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!productos.length) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm">
        No encontramos productos con esos filtros.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos.map((p) => (
        <ProductoCard key={p.id_producto} producto={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductoGrid;
