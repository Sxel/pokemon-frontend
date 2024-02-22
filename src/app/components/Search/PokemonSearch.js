import { useState } from 'react';
import '../../global.css'; // Importa los estilos globales
        
const PokemonSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); // Estado para el tipo de búsqueda, por defecto es 'name'

  const handleSearch = () => {
    onSearch(searchTerm, searchType); // Pasa el término de búsqueda y el tipo al manejador de búsqueda
  };

  return (
    <div className="pokemon-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pokemon-search-input"
        placeholder="Search by name or type"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="pokemon-search-select"
      >
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
      <button onClick={handleSearch} className="pokemon-search-button">
        Search
      </button>
    </div>
  );
};

export default PokemonSearch;
