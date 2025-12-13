import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Bienvenido a NewLife
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Dale una nueva vida a un amigo peludo.
      </p>
      {/* Aquí puedes reusar tu diseño anterior de cards si quieres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* ... mismas cards de antes ... */}
      </div>
    </div>
  );
};

export default Home;
