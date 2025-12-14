import { useEffect, useState } from 'react';
import adminTiendaAPI from '../../services/adminTiendaAPI';
import ProductoFormModal from '../../components/AdminTienda/ProductoFormModal';

const AdminTiendaPage = () => {
  const [productos, setProductos] = useState([]);
  const [filters, setFilters] = useState({
    categoria: 'Todos',
    activo: '1',
    q: '',
    stockBajo: false
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.categoria !== 'Todos') params.categoria = filters.categoria;
      if (filters.activo !== 'todos') params.activo = filters.activo;
      if (filters.q) params.q = filters.q;
      if (filters.stockBajo) params.stock_bajo = 1;

      const res = await adminTiendaAPI.getProductos(params);
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [filters]);

  const handleNew = () => {
    setEditingProducto(null);
    setModalOpen(true);
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setModalOpen(true);
  };

  const handleToggleActivo = async (producto) => {
    try {
      await adminTiendaAPI.toggleProducto(producto.id_producto, !producto.activo);
      fetchProductos();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tienda · Inventario</h1>
            <p className="text-xs text-slate-500">
              Administra productos, precios y stock de la tienda.
            </p>
          </div>
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 active:scale-95 transition"
          >
            <i className="fi fi-sr-plus text-[11px]" />
            Nuevo producto
          </button>
        </div>

        {/* Filtros simples arriba de la tabla */}
        {/* ... (puedes hacer algo muy parecido al navbar de usuario pero más compacto) */}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Producto</th>
                <th className="px-4 py-2 text-left">Categoría</th>
                <th className="px-4 py-2 text-right">Precio</th>
                <th className="px-4 py-2 text-right">Stock</th>
                <th className="px-4 py-2 text-center">Estado</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
                    Cargando productos...
                  </td>
                </tr>
              ) : productos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
                    No hay productos con estos filtros.
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id_producto} className="border-t border-slate-100 hover:bg-slate-50/60">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={p.imagen_url}
                          alt={p.nombre}
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium text-slate-900 truncate">{p.nombre}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[180px]">
                            {p.descripcion}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-slate-600">{p.categoria}</td>
                    <td className="px-4 py-2 text-right text-slate-900 font-semibold">
                      ${Number(p.precio).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span
                        className={`inline-flex items-center justify-end gap-1 ${
                          p.stock <= 5 ? 'text-red-500' : 'text-slate-700'
                        }`}
                      >
                        {p.stock}
                        {p.stock <= 5 && (
                          <span className="text-[9px] bg-red-50 text-red-500 px-1 rounded">
                            Bajo
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          p.activo
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {p.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fi fi-rr-edit text-[13px]" />
                      </button>
                      <button
                        onClick={() => handleToggleActivo(p)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <i className="fi fi-rr-power text-[13px]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ProductoFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          producto={editingProducto}
          onSaved={fetchProductos}
        />
      </div>
    </div>
  );
};

export default AdminTiendaPage;
