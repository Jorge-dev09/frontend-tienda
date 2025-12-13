import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import userAPI from '../services/userAPI';

export default function SettingsModal({ isOpen, onClose }) {
  const { user, settings, setSettings } = useAuth();

  const [formData, setFormData] = useState({
    keepSignedIn: localStorage.getItem('newlife_keep_signed_in') === 'true',
    tema: 'claro', // 'claro' | 'oscuro' | 'sistema'
    notifSolicitudesPropias: true,
    notifSolicitudesEnviadas: true,
    notifMarketing: false,
  });

  const [reportOpen, setReportOpen] = useState(false);
  const [reportData, setReportData] = useState({
    tipo: '',
    mensaje: '',
  });

  // Cargar ajustes cuando se abre el modal
useEffect(() => {
  if (!isOpen) return;

  const loadSettings = async () => {
    try {
      // Si ya hay settings en el contexto, úsalos directamente
      if (settings) {
        setFormData({
          keepSignedIn: localStorage.getItem('newlife_keep_signed_in') === 'true',
          tema: settings.tema || 'claro',
          notifSolicitudesPropias: !!settings.notif_solicitudes_propias,
          notifSolicitudesEnviadas: !!settings.notif_solicitudes_enviadas,
          notifMarketing: !!settings.notif_marketing,
        });
        return;
      }

      // Si no hay settings en contexto, tráelos del backend una sola vez
      const res = await userAPI.getSettings();
      const current = res.data;
      setSettings(current);
      setFormData({
        keepSignedIn: localStorage.getItem('newlife_keep_signed_in') === 'true',
        tema: current.tema || 'claro',
        notifSolicitudesPropias: !!current.notif_solicitudes_propias,
        notifSolicitudesEnviadas: !!current.notif_solicitudes_enviadas,
        notifMarketing: !!current.notif_marketing,
      });
    } catch (err) {
      console.error('Error cargando ajustes', err);
      // En caso de error, deja los valores por defecto de formData
    }
  };

  loadSettings();
}, [isOpen, settings, setSettings]);


  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tema: formData.tema,
      notifSolicitudesPropias: formData.notifSolicitudesPropias,
      notifSolicitudesEnviadas: formData.notifSolicitudesEnviadas,
      notifMarketing: formData.notifMarketing,
    };

    localStorage.setItem('newlife_keep_signed_in', formData.keepSignedIn ? 'true' : 'false');

    try {
      await userAPI.updateSettings(payload);
      setSettings((prev) => ({
        ...(prev || {}),
        tema: payload.tema,
        notif_solicitudes_propias: payload.notifSolicitudesPropias ? 1 : 0,
        notif_solicitudes_enviadas: payload.notifSolicitudesEnviadas ? 1 : 0,
        notif_marketing: payload.notifMarketing ? 1 : 0,
      }));
      onClose();
    } catch (err) {
      console.error('Error actualizando ajustes', err);
    }
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReportSubmit = () => {
    // TODO: enviar reporte al backend o servicio de soporte
    setReportOpen(false);
    setReportData({ tipo: '', mensaje: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configuración" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Intro */}
        <p className="text-xs text-gray-500">
          Personaliza tu experiencia en NewLife. Estos ajustes se aplican a tu cuenta en este dispositivo.
        </p>

        {/* Cuenta */}
        <section className="space-y-3 bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <i className="fi fi-sr-user-pen" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Cuenta</h3>
              <p className="text-[11px] text-gray-500">
                Información general de tu cuenta en NewLife.
              </p>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-600 bg-white border border-gray-100 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">
              Email de inicio de sesión
            </p>
            <p className="mb-1">{user?.email}</p>
            <p className="text-[11px] text-gray-500">
              Este email se usa para iniciar sesión y recuperar tu contraseña.
            </p>
          </div>

          {/* Toggle mantener sesión */}
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-700">
              <p className="font-medium">Mantener sesión iniciada</p>
              <p className="text-[11px] text-gray-500">
                No cerrar sesión automáticamente en este dispositivo.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="keepSignedIn"
                checked={formData.keepSignedIn}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div
                className="
                  w-10 h-5 bg-gray-200 rounded-full peer
                  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300
                  peer-checked:bg-orange-500
                  transition-colors
                "
              ></div>
              <div
                className="
                  absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow
                  transition-transform peer-checked:translate-x-5
                "
              ></div>
            </label>
          </div>
        </section>

        {/* Apariencia */}
        <section className="space-y-3 bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <i className="fi fi-sr-palette" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Apariencia</h3>
              <p className="text-[11px] text-gray-500">
                Elige el tema de la interfaz en este dispositivo.
              </p>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-700">
            <label
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer
                transition-all
                ${
                  formData.tema === 'claro'
                    ? 'border-gray-500 bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <input
                type="radio"
                name="tema"
                value="claro"
                checked={formData.tema === 'claro'}
                onChange={handleChange}
                className="hidden"
              />
              <i className="fi fi-sr-sun text-gray-500 text-xl" />
              <span>Claro</span>
            </label>

            <label
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer
                transition-all
                ${
                  formData.tema === 'oscuro'
                    ? 'border-gray-500 bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <input
                type="radio"
                name="tema"
                value="oscuro"
                checked={formData.tema === 'oscuro'}
                onChange={handleChange}
                className="hidden"
              />
              <i className="fi fi-sr-moon-stars text-gray-700 text-xl" />
              <span>Oscuro</span>
            </label>

            <label
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer
                transition-all
                ${
                  formData.tema === 'sistema'
                    ? 'border-gray-500 bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <input
                type="radio"
                name="tema"
                value="sistema"
                checked={formData.tema === 'sistema'}
                onChange={handleChange}
                className="hidden"
              />
              <i className="fi fi-sr-laptop-mobile text-gray-600 text-xl" />
              <span>Sistema</span>
            </label>
          </div>
        </section>

        {/* Notificaciones */}
        <section className="space-y-3 bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <i className="fi fi-sr-bell text-base" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Notificaciones</h3>
              <p className="text-[11px] text-gray-500">
                Decide qué avisos quieres recibir sobre adopciones y novedades.
              </p>
            </div>
          </div>

          <div className="mt-2 space-y-3 text-xs text-gray-700">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="font-medium">Solicitudes sobre mis publicaciones</p>
                <p className="text-[11px] text-gray-500">
                  Avisos cuando alguien aplica para adoptar o recibir una mascota tuya.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifSolicitudesPropias"
                  checked={formData.notifSolicitudesPropias}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div
                  className="
                    w-10 h-5 bg-gray-200 rounded-full peer
                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300
                    peer-checked:bg-orange-500
                    transition-colors
                  "
                ></div>
                <div
                  className="
                    absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow
                    transition-transform peer-checked:translate-x-5
                  "
                ></div>
              </label>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="font-medium">Actualizaciones de solicitudes que envié</p>
                <p className="text-[11px] text-gray-500">
                  Recibe avisos cuando cambie el estado de tus solicitudes de adopción.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifSolicitudesEnviadas"
                  checked={formData.notifSolicitudesEnviadas}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div
                  className="
                    w-10 h-5 bg-gray-200 rounded-full peer
                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300
                    peer-checked:bg-orange-500
                    transition-colors
                  "
                ></div>
                <div
                  className="
                    absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow
                    transition-transform peer-checked:translate-x-5
                  "
                ></div>
              </label>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="font-medium">Noticias y novedades de NewLife</p>
                <p className="text-[11px] text-gray-500">
                  Consejos de cuidado, campañas y actualizaciones importantes.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifMarketing"
                  checked={formData.notifMarketing}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div
                  className="
                    w-10 h-5 bg-gray-200 rounded-full peer
                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300
                    peer-checked:bg-orange-500
                    transition-colors
                  "
                ></div>
                <div
                  className="
                    absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow
                    transition-transform peer-checked:translate-x-5
                  "
                ></div>
              </label>
            </div>
          </div>
        </section>

        {/* Soporte y contacto */}
        <section className="space-y-4 bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <i className="fi fi-sr-life-ring text-base" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Soporte y contacto</h3>
              <p className="text-[11px] text-gray-500">
                ¿Tienes un problema con una adopción o con tu cuenta? Envíanos un reporte o contáctanos directamente.
              </p>
            </div>
          </div>

          {/* Botón para abrir/cerrar el formulario de reporte */}
          <button
            type="button"
            onClick={() => setReportOpen((v) => !v)}
            className="
              w-full flex items-center justify-between mt-2 px-3 py-2.5
              rounded-xl border text-xs
              border-orange-200 bg-white
              hover:border-orange-400 hover:bg-orange-50
              text-orange-700 font-medium
              transition-all
            "
          >
            <span className="flex items-center gap-2">
              <i className="fi fi-sr-flag text-sm" />
              {reportOpen ? 'Ocultar formulario de reporte' : 'Enviar un reporte a NewLife'}
            </span>
            <i
              className={`
                fi fi-sr-angle-small-down text-sm transition-transform
                ${reportOpen ? 'rotate-180' : ''}
              `}
            />
          </button>

          {/* Panel colapsable con animación */}
          <div
            className={`
              origin-top transition-all duration-300
              ${reportOpen ? 'opacity-100 scale-y-100 max-h-[500px] mt-2' : 'opacity-0 scale-y-95 max-h-0 pointer-events-none'}
            `}
          >
            <div className="space-y-3 bg-white border border-orange-100 rounded-xl p-3 text-xs text-gray-700 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <i className="fi fi-sr-info text-orange-500 text-sm" />
                </div>
                <p className="text-[11px] text-gray-500">
                  Describe con detalle el problema. Nuestro equipo de soporte revisará tu reporte y se pondrá en contacto contigo si es necesario.
                </p>
              </div>

              {/* Tipo de reporte */}
              <div className="relative">
                <select
                  name="tipo"
                  value={reportData.tipo}
                  onChange={handleReportChange}
                  className="
                    w-full px-3 py-2.5 rounded-lg border-2
                    text-xs bg-gray-50
                    border-slate-300 focus:border-orange-500
                    focus:outline-none
                  "
                >
                  <option value="">Selecciona el tipo de reporte</option>
                  <option value="problema_adopcion">Problema con una adopción</option>
                  <option value="usuario">Reporte de usuario o publicación</option>
                  <option value="tecnico">Error técnico en la app</option>
                  <option value="sugerencia">Sugerencia / mejora</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="relative">
                <textarea
                  name="mensaje"
                  value={reportData.mensaje}
                  onChange={handleReportChange}
                  rows={4}
                  placeholder=" "
                  className="
                    w-full px-3 py-2.5 rounded-lg border-2
                    text-xs bg-gray-50
                    border-slate-300 focus:border-orange-500
                    focus:outline-none peer resize-none
                  "
                />
                <label
                  className="
                    absolute left-3 -top-2 bg-gray-50 px-2 text-slate-500 font-medium text-[11px]
                    transition-all duration-200
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-[11px]
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-gray-50
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-[11px]
                    cursor-text
                  "
                >
                  Describe tu reporte
                </label>
              </div>

              {/* Botones del reporte */}
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setReportOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleReportSubmit}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-[11px] font-semibold hover:bg-orange-600 shadow-sm"
                >
                  Enviar reporte
                </button>
              </div>
            </div>
          </div>

          {/* Iconos de contacto */}
          <div className="pt-1">
            <p className="text-[11px] text-gray-500 mb-1">
              También puedes contactarnos directamente:
            </p>

            <ul className="flex justify-center flex-wrap gap-3 mt-2">
              {/* WhatsApp */}
              <li className="group relative">
                <a
                  href="https://wa.me/7713529124"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    relative flex items-center justify-center
                    w-11 h-11 rounded-2xl bg-white text-gray-600
                    shadow-sm border border-gray-100
                    overflow-hidden transition-all duration-300
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      absolute inset-x-0 bottom-0 h-0
                      bg-emerald-500
                      transition-all duration-300
                      group-hover:h-full
                    "
                  />
                  <i
                    className="
                      fa-brands fa-whatsapp
                      relative z-10 text-xl
                      group-hover:text-white
                    "
                  />
                </a>
                <div
                  className="
                    pointer-events-none
                    absolute left-1/2 -top-8 -translate-x-1/2
                    rounded-full bg-emerald-500 px-2.5 py-1
                    text-[11px] text-white
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200
                    shadow-md
                  "
                >
                  WhatsApp
                </div>
              </li>

              {/* Teléfono */}
              <li className="group relative">
                <a
                  href="tel:+527713529124"
                  className="
                    relative flex items-center justify-center
                    w-11 h-11 rounded-2xl bg-white text-gray-600
                    shadow-sm border border-gray-100
                    overflow-hidden transition-all duration-300
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      absolute inset-x-0 bottom-0 h-0
                      bg-orange-500
                      transition-all duration-300
                      group-hover:h-full
                    "
                  />
                  <i
                    className="
                      fi fi-rr-phone-call
                      relative z-10 text-xl
                      group-hover:text-white
                    "
                  />
                </a>
                <div
                  className="
                    pointer-events-none
                    absolute left-1/2 -top-8 -translate-x-1/2
                    rounded-full bg-orange-500 px-2.5 py-1
                    text-[11px] text-white
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200
                    shadow-md
                  "
                >
                  Teléfono
                </div>
              </li>

              {/* Instagram */}
              <li className="group relative">
                <a
                  href="https://instagram.com/NewLife"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    relative flex items-center justify-center
                    w-11 h-11 rounded-2xl bg-white text-gray-600
                    shadow-sm border border-gray-100
                    overflow-hidden transition-all duration-300
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      absolute inset-x-0 bottom-0 h-0
                      bg-linear-to-tr from-fuchsia-500 via-rose-500 to-amber-400
                      transition-all duration-300
                      group-hover:h-full
                    "
                  />
                  <i
                    className="
                      fa-brands fa-instagram
                      relative z-10 text-xl
                      group-hover:text-white
                    "
                  />
                </a>
                <div
                  className="
                    pointer-events-none
                    absolute left-1/2 -top-8 -translate-x-1/2
                    rounded-full bg-rose-500 px-2.5 py-1
                    text-[11px] text-white
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200
                    shadow-md
                  "
                >
                  Instagram
                </div>
              </li>

              {/* X / Twitter */}
              <li className="group relative">
                <a
                  href="https://x.com/NewLife"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    relative flex items-center justify-center
                    w-11 h-11 rounded-2xl bg-white text-gray-600
                    shadow-sm border border-gray-100
                    overflow-hidden transition-all duration-300
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      absolute inset-x-0 bottom-0 h-0
                      bg-black
                      transition-all duration-300
                      group-hover:h-full
                    "
                  />
                  <i
                    className="
                      fa-brands fa-x-twitter
                      relative z-10 text-xl
                      group-hover:text-white
                    "
                  />
                </a>
                <div
                  className="
                    pointer-events-none
                    absolute left-1/2 -top-8 -translate-x-1/2
                    rounded-full bg-black px-2.5 py-1
                    text-[11px] text-white
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200
                    shadow-md
                  "
                >
                  X
                </div>
              </li>

              {/* Correo */}
              <li className="group relative">
                <a
                  href="mailto:NewLifeSoporte@gmail.com"
                  className="
                    relative flex items-center justify-center
                    w-11 h-11 rounded-2xl bg-white text-gray-600
                    shadow-sm border border-gray-100
                    overflow-hidden transition-all duration-300
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      absolute inset-x-0 bottom-0 h-0
                      bg-sky-500
                      transition-all duration-300
                      group-hover:h-full
                    "
                  />
                  <i
                    className="
                      fa-regular fa-envelope
                      relative z-10 text-xl
                      group-hover:text-white
                    "
                  />
                </a>
                <div
                  className="
                    pointer-events-none
                    absolute left-1/2 -top-8 -translate-x-1/2
                    rounded-full bg-sky-500 px-2.5 py-1
                    text-[11px] text-white
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200
                    shadow-md
                  "
                >
                  Email
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Botones inferiores */}
        <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancelar
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
