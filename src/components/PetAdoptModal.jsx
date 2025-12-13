import { useState } from 'react';
import solicitudAPI from '../services/solicitudAPI';
import { useAuth } from '../context/AuthContext';

const PetAdoptModal = ({ pet, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [motivo, setMotivo] = useState('');
  const [viviendaTipo, setViviendaTipo] = useState('Casa');
  const [tienePatio, setTienePatio] = useState(false);
  const [otrosAnimales, setOtrosAnimales] = useState(false);
  const [descripcionOtros, setDescripcionOtros] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleEnviar = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!isAuthenticated) {
      setError('Debes iniciar sesión para enviar una solicitud.');
      return;
    }

    if (!motivo.trim()) {
      setError('Por favor, explica por qué quieres adoptar.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id_animal: pet.id_animal,
        motivo_adopcion: motivo,
        experiencia_mascotas: experiencia,
        vivienda_tipo: viviendaTipo,
        tiene_patio: tienePatio,
        otros_animales: otrosAnimales,
        descripcion_otros_animales: otrosAnimales ? descripcionOtros : ''
      };

      await solicitudAPI.crearSolicitud(payload);
      setMensaje('Solicitud enviada correctamente. Puedes verla en la sección "Solicitudes".');
    } catch (err) {
      console.error('Error enviando solicitud', err);
      setError(err.response?.data?.error || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black-4 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">
            Adoptar a {pet.nombre}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fi fi-sr-cross-small text-2xl" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-4">
          {/* Info mascota */}
          <div className="flex gap-3">
            <img
              src={pet.imagen_url || '/placeholder-pet.jpg'}
              alt={pet.nombre}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{pet.nombre}</p>
              <p>{pet.especie} • {pet.tamanio} • {pet.genero}</p>
              <p>{pet.edad_anos} años{pet.edad_meses ? ` ${pet.edad_meses} meses` : ''}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {mensaje && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-2 rounded-lg">
              {mensaje}
            </div>
          )}

          <form onSubmit={handleEnviar} className="space-y-3 text-sm">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                ¿Por qué quieres adoptar a {pet.nombre}? *
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Cuéntanos sobre ti, tu familia y por qué esta mascota es ideal para ti."
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Tipo de vivienda *
              </label>
              <select
                value={viviendaTipo}
                onChange={(e) => setViviendaTipo(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={tienePatio}
                  onChange={(e) => setTienePatio(e.target.checked)}
                  className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                Tengo patio / jardín
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={otrosAnimales}
                  onChange={(e) => setOtrosAnimales(e.target.checked)}
                  className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                Tengo otras mascotas
              </label>
            </div>

            {otrosAnimales && (
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Describe a tus otras mascotas
                </label>
                <textarea
                  value={descripcionOtros}
                  onChange={(e) => setDescripcionOtros(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Especie, edad, temperamento..."
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Experiencia con mascotas
              </label>
              <textarea
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                rows={2}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="¿Has tenido mascotas antes? ¿Qué tipo de cuidados has dado?"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition"
              >
                Cerrar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar solicitud'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetAdoptModal;
