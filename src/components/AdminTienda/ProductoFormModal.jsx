// src/components/AdminTienda/ProductoFormModal.jsx
import { useEffect, useState } from 'react';
import adminTiendaAPI from '../../services/adminTiendaAPI';

const categorias = ['Alimento', 'Accesorios', 'Juguetes', 'Higiene', 'Salud', 'Otro'];
const especies = ['Todas', 'Perro', 'Gato', 'Otro'];

const ProductoFormModal = ({ open, onClose, producto, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Alimento',
    especie_destino: 'Todas',
    precio: '',
    stock: '',
    imagen_url: '',
    activo: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        categoria: producto.categoria || 'Alimento',
        especie_destino: producto.especie_destino || 'Todas',
        precio: producto.precio,
        stock: producto.stock,
        imagen_url: producto.imagen_url || '',
        activo: !!producto.activo
      });
    } else {
      setForm({
        nombre: '',
        descripcion: '',
        categoria: 'Alimento',
        especie_destino: 'Todas',
        precio: '',
        stock: '',
        imagen_url: '',
        activo: true
      });
    }
  }, [producto, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (producto) {
        await adminTiendaAPI.updateProducto(producto.id_producto, form);
      } else {
        await adminTiendaAPI.createProducto(form);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error('Error guardando producto:', error);
      alert('Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            {producto ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <i className="fi fi-rr-cross-small text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Nombre
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
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Categoría
              </label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Especie destino
              </label>
              <select
                name="especie_destino"
                value={form.especie_destino}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
              >
                {especies.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Stock
              </label>
              <input
                type="number"
                min="0"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              URL de imagen
            </label>
            <input
              name="imagen_url"
              value={form.imagen_url}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400"
            />
            {form.imagen_url && (
              <img
                src={form.imagen_url}
                alt="preview"
                className="mt-2 w-24 h-24 rounded-lg object-cover border border-slate-100"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <label className="inline-flex items-center gap-2 text-[11px] text-slate-600">
              <input
                type="checkbox"
                name="activo"
                checked={form.activo}
                onChange={handleChange}
                className="w-3 h-3 rounded border-slate-300 text-orange-500 focus:ring-orange-400/60"
              />
              Producto activo en tienda
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 active:scale-95 transition disabled:bg-slate-200 disabled:text-slate-400"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoFormModal;
