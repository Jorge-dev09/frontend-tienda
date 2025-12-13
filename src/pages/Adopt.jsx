// src/pages/AdoptPage.jsx
import { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';
import PetAdoptModal from '../components/PetAdoptModal';
import axios from '../services/axiosInstance';

export default function AdoptPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    especie: '',
    tamanio: '',
    edad_anos: '',
    raza: '',
    genero: '',
  });
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/animales', { params: filters });
        console.log('Animales recibidos:', res.data);
        setPets(res.data);
      } catch (err) {
        console.error('Error cargando mascotas', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      especie: '',
      tamanio: '',
      edad_anos: '',
      raza: '',
      genero: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      {/* Header + filtros */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Adoptar
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Encuentra a tu nuevo compañero. Filtra por especie, tamaño, edad y ubicación.
            </p>
          </div>
        </div>

        {/* Barra de filtros */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3 md:p-4 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Especie */}
            <div className="relative">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Especie
              </label>
              <select
                name="especie"
                value={filters.especie}
                onChange={handleFilterChange}
                className="w-full px-2.5 py-2 rounded-lg border text-xs border-slate-300 focus:border-orange-500 focus:outline-none bg-slate-50"
              >
                <option value="">Todas</option>
                <option value="Perro">Perros</option>
                <option value="Gato">Gatos</option>
                <option value="Otro">Otros</option>
              </select>
            </div>

            {/* Tamaño */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Tamaño
              </label>
              <select
                name="tamanio"
                value={filters.tamanio}
                onChange={handleFilterChange}
                className="w-full px-2.5 py-2 rounded-lg border text-xs border-slate-300 focus:border-orange-500 focus:outline-none bg-slate-50"
              >
                <option value="">Cualquiera</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            {/* Edad */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Edad
              </label>
              <select
                name="edad_anos"
                value={filters.edad_anos}
                onChange={handleFilterChange}
                className="w-full px-2.5 py-2 rounded-lg border text-xs border-slate-300 focus:border-orange-500 focus:outline-none bg-slate-50"
              >
                <option value="">Todas</option>
                <option value="0">Cachorro (0-1 año)</option>
                <option value="1">1-3 años</option>
                <option value="4">4-7 años</option>
                <option value="8">Senior (8+ años)</option>
              </select>
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Sexo
              </label>
              <select
                name="genero"
                value={filters.genero}
                onChange={handleFilterChange}
                className="w-full px-2.5 py-2 rounded-lg border text-xs border-slate-300 focus:border-orange-500 focus:outline-none bg-slate-50"
              >
                <option value="">Cualquiera</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              type="button"
              onClick={clearFilters}
              className="text-[11px] text-slate-500 hover:text-slate-700 underline-offset-2 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Grid de mascotas */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-xs text-slate-500">
            Cargando mascotas...
          </p>
        ) : pets.length === 0 ? (
          <p className="text-center text-xs text-slate-500">
            No encontramos mascotas con esos filtros. Prueba cambiando la búsqueda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
              <PetCard 
                key={pet.id_animal} 
                pet={pet} 
                onClick={() => setSelectedPet(pet)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de adopción */}
      {selectedPet && (
        <PetAdoptModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </div>
  );
}
