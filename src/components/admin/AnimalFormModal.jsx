import { useState, useEffect } from 'react';
import axios from '../../services/axiosInstance';


const initialForm = {
  nombre: '',
  especie: 'Perro',
  raza: '',
  edad_anos: '',
  edad_meses: '',
  tamanio: 'Mediano',
  genero: 'Macho',
  descripcion: '',
  estado_salud: '',
  vacunas: false,
  esterilizado: false,
  imagen_url: '',
  estado_adopcion: 'Disponible',
  fecha_ingreso: ''
};

const AnimalFormModal = ({ open, onClose, onSaved, animal }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (animal) {
      setForm({
        nombre: animal.nombre || '',
        especie: animal.especie || 'Perro',
        raza: animal.raza || '',
        edad_anos: animal.edad_anos ?? '',
        edad_meses: animal.edad_meses ?? '',
        tamanio: animal.tamanio || 'Mediano',
        genero: animal.genero || 'Macho',
        descripcion: animal.descripcion || '',
        estado_salud: animal.estado_salud || '',
        vacunas: !!animal.vacunas,
        esterilizado: !!animal.esterilizado,
        imagen_url: animal.imagen_url || '',
        estado_adopcion: animal.estado_adopcion || 'Disponible',
        fecha_ingreso: animal.fecha_ingreso || ''
      });
    } else {
      setForm(initialForm);
    }
    setError(null);
  }, [animal, open]);

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
    setError(null);
    setLoading(true);
    try {
      const payload = {
        ...form,
        edad_anos: form.edad_anos === '' ? null : Number(form.edad_anos),
        edad_meses: form.edad_meses === '' ? null : Number(form.edad_meses)
      };

      if (animal) {
        await axios.put(`/animales/${animal.id_animal}`, payload);
      } else {
        await axios.post('/animales', payload);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error('Error guardando animal', err);
      setError(err.response?.data?.error || 'Error al guardar el animal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">
            {animal ? 'Editar animal' : 'Agregar animal'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fi fi-sr-cross-small text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
              {error}
            </div>
          )}

          {/* Nombre + especie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Especie *
              </label>
              <select
                name="especie"
                value={form.especie}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          {/* Raza + género + tamaño */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Raza
              </label>
              <input
                type="text"
                name="raza"
                value={form.raza}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Género *
              </label>
              <select
                name="genero"
                value={form.genero}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Tamaño *
              </label>
              <select
                name="tamanio"
                value={form.tamanio}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          {/* Edad */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Edad (años)
              </label>
              <input
                type="number"
                name="edad_anos"
                value={form.edad_anos}
                onChange={handleChange}
                min="0"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Edad (meses)
              </label>
              <input
                type="number"
                name="edad_meses"
                value={form.edad_meses}
                onChange={handleChange}
                min="0"
                max="11"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Fecha de ingreso *
              </label>
              <input
                type="date"
                name="fecha_ingreso"
                value={form.fecha_ingreso}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Estado de adopción
              </label>
              <select
                name="estado_adopcion"
                value={form.estado_adopcion}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Disponible">Disponible</option>
                <option value="En proceso">En proceso</option>
                <option value="Adoptado">Adoptado</option>
              </select>
            </div>
          </div>

          {/* Descripción y salud */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Estado de salud
              </label>
              <textarea
                name="estado_salud"
                value={form.estado_salud}
                onChange={handleChange}
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Checkboxes + imagen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  name="vacunas"
                  checked={form.vacunas}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                Vacunas al día
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  name="esterilizado"
                  checked={form.esterilizado}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                Esterilizado
              </label>
            </div>
            <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Imagen
                </label>

                {/* URL manual */}
                <input
                    type="text"
                    name="imagen_url"
                    value={form.imagen_url}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="URL de imagen (opcional si subes archivo)"
                />

                {/* Subir archivo */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    setError(null);
                    try {
                        const formData = new FormData();
                        formData.append('imagen', file);

                        const res = await axios.post('/uploads/animal-image', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                        });

                        setForm((prev) => ({
                        ...prev,
                        imagen_url: res.data.url
                        }));
                    } catch (err) {
                        console.error('Error subiendo imagen', err);
                        setError('Error al subir la imagen');
                    } finally {
                        setUploading(false);
                    }
                    }}
                    className="block w-full text-xs text-slate-600
                            file:mr-2 file:py-1.5 file:px-3
                            file:rounded-md file:border-0
                            file:text-xs file:font-medium
                            file:bg-orange-50 file:text-orange-600
                            hover:file:bg-orange-100"
                />

                {uploading && (
                    <p className="mt-1 text-[11px] text-slate-500">
                    Subiendo imagen...
                    </p>
                )}

                {form.imagen_url && (
                    <div className="mt-2">
                    <p className="text-[11px] text-slate-500 mb-1">Vista previa:</p>
                    <img
                        src={form.imagen_url}
                        alt="Vista previa"
                        className="w-24 h-24 object-cover rounded-lg border border-slate-200"
                    />
                    </div>
                )}
                </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : animal ? 'Guardar cambios' : 'Crear animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalFormModal;
