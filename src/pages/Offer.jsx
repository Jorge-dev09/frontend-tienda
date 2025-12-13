// src/pages/OfrecerPage.jsx
import { useState } from 'react';
import api from '../services/axiosInstance';
import { useAuth } from '../context/AuthContext';

const initialState = {
  // Animal
  nombre: '',
  especie: 'Perro',
  raza: '',
  edadanos: '',
  edadmeses: '',
  tamanio: 'Mediano',
  genero: 'Macho',
  descripcion: '',
  estadosalud: '',
  vacunas: false,
  esterilizado: false,
  imagenurl: '',
  // Contexto adopción
  motivoadopcion: '',
  experienciamascotas: '',
  viviendatipo: 'Casa',
  tienepatio: false,
  otrosanimales: false,
  descripcionotrosanimales: ''
};

export default function OfrecerPage() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);


  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-600">
          Debes iniciar sesión para ofrecer una mascota en adopción.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      const payload = {
        // map a nombres con guion bajo
        nombre: form.nombre,
        especie: form.especie,
        raza: form.raza,
        edad_anos: form.edadanos ? Number(form.edadanos) : null,
        edad_meses: form.edadmeses ? Number(form.edadmeses) : null,
        tamanio: form.tamanio,
        genero: form.genero,
        descripcion: form.descripcion,
        estado_salud: form.estadosalud,
        vacunas: form.vacunas,
        esterilizado: form.esterilizado,
        imagen_url: form.imagenurl, // luego lo conectarás al uploader
        motivo_adopcion: form.motivoadopcion,
        experiencia_mascotas: form.experienciamascotas,
        vivienda_tipo: form.viviendatipo,
        tiene_patio: form.tienepatio,
        otros_animales: form.otrosanimales,
        descripcion_otros_animales: form.descripcionotrosanimales
      };

      await api.post('/ofrecer', payload);

      setMensaje('Tu solicitud para dar en adopción fue enviada. Un administrador la revisará pronto.');
      setForm(initialState);
    } catch (err) {
      console.error('Error enviando solicitud de ofrecer', err);
      setMensaje('Ocurrió un error al enviar tu solicitud. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));

  try {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('imagen', file); // nombre igual que en upload.single('imagen')

    const res = await api.post('/uploads/animal-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // asumiendo que backend responde { url: 'http://...' }
    setForm((prev) => ({
      ...prev,
      imagenurl: res.data.url
    }));
  } catch (error) {
    console.error('Error subiendo imagen', error);
    setMensaje('No se pudo subir la imagen. Intenta otra vez.');
  } finally {
    setUploadingImage(false);
  }
};


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Ofrece una mascota en adopción
        </h1>
        <p className="text-sm text-gray-600">
          Completa la información de tu mascota y el contexto de su adopción. Esta información ayudará
          a encontrar el mejor hogar posible.
        </p>
      </div>

      {mensaje && (
        <div className="mb-4 px-4 py-2 rounded-lg text-sm bg-orange-50 text-orange-700 border border-orange-100">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección 1: Datos de la mascota */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Información de la mascota
          </h2>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Foto de la mascota
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Previsualización"
                  className="w-24 h-24 rounded-lg object-cover border"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400 border">
                  Sin imagen
                </div>
              )}

              <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {uploadingImage ? 'Subiendo...' : 'Seleccionar imagen'}
              </label>
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              Formatos permitidos: JPG, PNG. Tamaño máximo recomendable 2MB.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Nombre de la mascota
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
                required
              />
            </div>

            {/* Especie */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Especie
              </label>
              <select
                name="especie"
                value={form.especie}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
              >
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Raza */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Raza (o mezcla)
              </label>
              <input
                type="text"
                name="raza"
                value={form.raza}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
              />
            </div>

            {/* Tamaño */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tamaño
              </label>
              <select
                name="tamanio"
                value={form.tamanio}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
              >
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            {/* Edad */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Edad (años)
                </label>
                <input
                  type="number"
                  name="edadanos"
                  min="0"
                  value={form.edadanos}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Edad (meses)
                </label>
                <input
                  type="number"
                  name="edadmeses"
                  min="0"
                  max="11"
                  value={form.edadmeses}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Género */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Género
              </label>
              <select
                name="genero"
                value={form.genero}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            {/* Salud */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Estado de salud
              </label>
              <textarea
                name="estadosalud"
                value={form.estadosalud}
                onChange={handleChange}
                rows={2}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500 resize-none"
                placeholder="Vacunas, enfermedades conocidas, tratamientos, etc."
              />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Descripción y personalidad
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500 resize-none"
                placeholder="Cuéntanos cómo es su carácter, qué le gusta, con qué tipo de familia se llevaría bien..."
              />
            </div>
          </div>

          {/* Vacunas / esterilizado */}
          <div className="mt-4 flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                name="vacunas"
                checked={form.vacunas}
                onChange={handleChange}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500/70"
              />
              Vacunas al día
            </label>
            <label className="inline-flex items-center gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                name="esterilizado"
                checked={form.esterilizado}
                onChange={handleChange}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500/70"
              />
              Esterilizado
            </label>
          </div>
        </section>

        {/* Sección 2: Motivo y contexto */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Motivo y contexto de adopción
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                ¿Por qué quieres darla en adopción?
              </label>
              <textarea
                name="motivoadopcion"
                value={form.motivoadopcion}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Experiencia con mascotas
              </label>
              <textarea
                name="experienciamascotas"
                value={form.experienciamascotas}
                onChange={handleChange}
                rows={2}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500 resize-none"
                placeholder="Cuánto tiempo has tenido mascotas, qué tipo, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tipo de vivienda
                </label>
                <select
                  name="viviendatipo"
                  value={form.viviendatipo}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500"
                >
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="tienepatio"
                  type="checkbox"
                  name="tienepatio"
                  checked={form.tienepatio}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500/70"
                />
                <label
                  htmlFor="tienepatio"
                  className="text-xs font-medium text-gray-700"
                >
                  ¿Tu vivienda tiene patio / área exterior?
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="otrosanimales"
                  type="checkbox"
                  name="otrosanimales"
                  checked={form.otrosanimales}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500/70"
                />
                <label
                  htmlFor="otrosanimales"
                  className="text-xs font-medium text-gray-700"
                >
                  ¿Hay otros animales en casa?
                </label>
              </div>
            </div>

            {form.otrosanimales && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Describe los otros animales en casa
                </label>
                <textarea
                  name="descripcionotrosanimales"
                  value={form.descripcionotrosanimales}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500 resize-none"
                />
              </div>
            )}
          </div>
        </section>

        {/* Botón enviar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}
