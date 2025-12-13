import AnimalFormModal from '../../components/admin/AnimalFormModal';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../services/axiosInstance';

const AdminAnimalesPage = () => {
  const { isAdmin } = useAuth();
  const [animales, setAnimales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  const fetchAnimales = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/animales');
      setAnimales(res.data);
    } catch (err) {
      console.error('Error cargando animales', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchAnimales();
  }, [isAdmin]);

  const handleEliminar = async (id_animal) => {
    if (!window.confirm('¿Seguro que deseas eliminar este animal?')) return;
    try {
      await axios.delete(`/animales/${id_animal}`);
      fetchAnimales();
    } catch (err) {
      console.error('Error eliminando animal', err);
      alert('No se pudo eliminar el animal');
    }
  };

  const handleAgregar = () => {
    setEditingAnimal(null);
    setModalOpen(true);
  };

  const handleEditar = (animal) => {
    setEditingAnimal(animal);
    setModalOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-gray-600">
        No tienes permisos de administrador.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Gestión de Animales
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Administra las mascotas disponibles para adopción.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAgregar}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
          >
            + Agregar animal
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
          {loading ? (
            <p className="p-4 text-sm text-slate-500">Cargando animales...</p>
          ) : animales.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">No hay animales registrados.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">ID</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Nombre</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Especie</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Tamaño</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Estado</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {animales.map((a) => (
                  <tr key={a.id_animal} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2 align-top">#{a.id_animal}</td>
                    <td className="px-4 py-2 align-top">{a.nombre}</td>
                    <td className="px-4 py-2 align-top">{a.especie}</td>
                    <td className="px-4 py-2 align-top">{a.tamanio}</td>
                    <td className="px-4 py-2 align-top">{a.estado_adopcion}</td>
                    <td className="px-4 py-2 align-top space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditar(a)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEliminar(a.id_animal)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AnimalFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchAnimales}
        animal={editingAnimal}
      />
    </div>
  );
};

export default AdminAnimalesPage;
