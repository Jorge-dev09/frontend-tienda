import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import userAPI from '../services/userAPI';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, setUser } = useAuth();

const [formData, setFormData] = useState({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  estado: '',
  codigoPostal: '',
  // adopción
  tipoVivienda: '',
  tienePatio: '',
  hogar: '',
  otrosAnimales: '',
  experienciaMascotas: '',
  tiempoFueraCasa: ''
});

  const [avatarPreview, setAvatarPreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [avatarFile, setAvatarFile] = useState(null);


// eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
useEffect(() => {
  if (!user) return;

  setFormData({
    nombre: user.nombre || '',
    apellido: user.apellido || '',
    email: user.email || '',
    telefono: user.telefono || '',
    direccion: user.direccion || '',
    ciudad: user.ciudad || '',
    estado: user.estado || '',
    codigoPostal: user.codigo_postal || '',
    tipoVivienda: user.tipo_vivienda || '',
    tienePatio: user.tiene_patio || '',
    hogar: user.hogar || '',
    otrosAnimales: user.otros_animales || '',
    experienciaMascotas: user.experiencia_mascotas || '',
    tiempoFueraCasa: user.tiempo_fuera_casa || ''
  });
  setAvatarPreview(user.avatar_url || null);
}, [user, isOpen]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    nombre: formData.nombre,
    apellido: formData.apellido,
    telefono: formData.telefono,
    direccion: formData.direccion,
    ciudad: formData.ciudad,
    estado: formData.estado,
    codigo_postal: formData.codigoPostal,
    avatar_url: avatarPreview || user.avatar_url || null,
    // adopción
    tipo_vivienda: formData.tipoVivienda,
    tiene_patio: formData.tienePatio,
    hogar: formData.hogar,
    otros_animales: formData.otrosAnimales,
    experiencia_mascotas: formData.experienciaMascotas,
    tiempo_fuera_casa: formData.tiempoFueraCasa
  };

  try {
    await userAPI.updateProfile(payload);
    const res = await userAPI.getProfile();
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
    onClose();
  } catch (err) {
    console.error('Error actualizando perfil', err);
  }
};



  if (!user) return null;

  const iniciales =
    (user.nombre?.[0] || 'N') + (user.apellido?.[0] || '');

  const rolLabel = user.es_admin ? 'Administrador' : 'Usuario';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Perfil de usuario" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header con avatar y resumen */}
        <div className="flex items-start gap-4">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-semibold">
                {iniciales.toUpperCase()}
              </div>
            )}

            <label
              className="
                absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200
                flex items-center justify-center text-xs text-gray-500 cursor-pointer
                shadow-sm hover:bg-gray-50
              "
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <i className="fi fi-sr-camera text-sm" />
            </label>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              {user.nombre} {user.apellido}
            </h3>
            <p className="text-xs text-gray-500 mb-1">
              {user.email}
            </p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600">
              {rolLabel}
            </span>
          </div>
        </div>

        {/* Dos columnas: izquierda datos personales + dirección, derecha cuenta + adopción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-4">
          {/* Columna izquierda: Básico + Dirección */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-800">
              Información básica
            </h4>

            {/* Nombre */}
            <div className="relative">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Nombre
              </label>
            </div>

            {/* Apellido */}
            <div className="relative">
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Apellido
              </label>
            </div>

            {/* Teléfono */}
            <div className="relative">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Teléfono
              </label>
            </div>

            <div className="border-t border-gray-100 pt-3" />

            <h4 className="text-sm font-semibold text-gray-800">
              Información de contacto
            </h4>

            {/* Dirección */}
            <div className="relative">
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Dirección
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  placeholder=" "
                  className="
                    w-full px-4 py-3 rounded-lg border-2
                    transition-all duration-200 text-sm bg-white
                    focus:outline-none peer
                    border-slate-300 focus:border-orange-500
                  "
                />
                <label
                  className="
                    absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                    transition-all duration-200
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-white
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-xs
                    cursor-text
                  "
                >
                  Ciudad
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  placeholder=" "
                  className="
                    w-full px-4 py-3 rounded-lg border-2
                    transition-all duration-200 text-sm bg-white
                    focus:outline-none peer
                    border-slate-300 focus:border-orange-500
                  "
                />
                <label
                  className="
                    absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                    transition-all duration-200
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-white
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-xs
                    cursor-text
                  "
                >
                  Estado / Provincia
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  placeholder=" "
                  className="
                    w-full px-4 py-3 rounded-lg border-2
                    transition-all duration-200 text-sm bg-white
                    focus:outline-none peer
                    border-slate-300 focus:border-orange-500
                  "
                />
                <label
                  className="
                    absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                    transition-all duration-200
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-white
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-xs
                    cursor-text
                  "
                >
                  Código postal
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  placeholder=" "
                  className="
                    w-full px-4 py-3 rounded-lg border-2
                    transition-all duration-200 text-sm bg-white
                    focus:outline-none peer
                    border-slate-300 focus:border-orange-500
                  "
                />
                <label
                  className="
                    absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                    transition-all duration-200
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-white
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-xs
                    cursor-text
                  "
                >
                  País
                </label>
              </div>
            </div>
          </div>

          {/* Columna derecha: Cuenta + datos para adopción */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-800">
              Cuenta y seguridad
            </h4>

            {/* Email (solo lectura) */}
            <div className="text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
              <p className="font-semibold text-gray-800 mb-1">
                Email principal
              </p>
              <p className="mb-1">{formData.email}</p>
              <p className="text-[11px] text-gray-500">
                El email se utiliza para iniciar sesión y recuperar tu cuenta.
              </p>
            </div>

            {/* Cambiar contraseña */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-xs text-gray-700">
              <p className="font-semibold text-gray-800 mb-1">
                Seguridad de la cuenta
              </p>
              <p className="mb-2">
                Te recomendamos actualizar tu contraseña periódicamente para mantener tu cuenta segura.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.location.href = '/recuperar-password';
                }}
                className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold"
              >
                <i className="fi fi-sr-key text-sm" />
                <span>Cambiar contraseña</span>
              </button>
            </div>

            <div className="border-t border-gray-100 pt-3" />

            <h4 className="text-sm font-semibold text-gray-800">
              Datos para adopción
            </h4>

            {/* Tipo de vivienda */}
            <div className="relative">
              <select
                name="tipoVivienda"
                value={formData.tipoVivienda}
                onChange={handleChange}
                className="
                  w-full px-4 py-2.5 rounded-lg border-2
                  text-sm bg-white
                  border-slate-300 focus:border-orange-500
                  focus:outline-none
                "
              >
                <option value="">Selecciona una opción</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Patio / jardín */}
            <div className="relative">
              <select
                name="tienePatio"
                value={formData.tienePatio}
                onChange={handleChange}
                className="
                  w-full px-4 py-2.5 rounded-lg border-2
                  text-sm bg-white
                  border-slate-300 focus:border-orange-500
                  focus:outline-none
                "
              >
                <option value="">¿Tienes patio o jardín?</option>
                <option value="si">Sí, con espacio suficiente</option>
                <option value="si_cercado">Sí, y está cercado</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Composición del hogar */}
            <div className="relative">
              <textarea
                name="hogar"
                value={formData.hogar}
                onChange={handleChange}
                rows={2}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer resize-none
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Hogar (adultos, niños, edades)
              </label>
            </div>

            {/* Otros animales */}
            <div className="relative">
              <textarea
                name="otrosAnimales"
                value={formData.otrosAnimales}
                onChange={handleChange}
                rows={2}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer resize-none
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Otros animales en casa
              </label>
            </div>

            {/* Experiencia con mascotas */}
            <div className="relative">
              <textarea
                name="experienciaMascotas"
                value={formData.experienciaMascotas}
                onChange={handleChange}
                rows={2}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer resize-none
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Experiencia previa con mascotas
              </label>
            </div>

            {/* Tiempo fuera de casa */}
            <div className="relative">
              <input
                type="text"
                name="tiempoFueraCasa"
                value={formData.tiempoFueraCasa}
                onChange={handleChange}
                placeholder=" "
                className="
                  w-full px-4 py-3 rounded-lg border-2
                  transition-all duration-200 text-sm bg-white
                  focus:outline-none peer
                  border-slate-300 focus:border-orange-500
                "
              />
              <label
                className="
                  absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-sm
                  peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2
                  peer-focus:bg-white
                  peer-focus:text-orange-600
                  peer-focus:font-semibold
                  peer-focus:text-xs
                  cursor-text
                "
              >
                Tiempo fuera de casa (h/día)
              </label>
            </div>
          </div>
        </div>

        {/* Botones inferiores */}
        <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cerrar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 shadow-sm"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </Modal>
  );
}
