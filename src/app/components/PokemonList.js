"use client";
import { useEffect, useState } from 'react';
import PokemonDetail from './PokemonDetail'; // Importa el componente PokemonDetail
import Modal from './Modal'; // Importa el componente Modal
import '../global.css';
import PokemonSearch from './Search/PokemonSearch';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
  const [originalPokemons, setOriginalPokemons] = useState([]); // Estado para almacenar los pokemones originales antes de la búsqueda
  const [searchError, setSearchError] = useState(null); // Estado para el mensaje de error de búsqueda

  const getPokemons = async () => {
    try {
      const response = await fetch('http://localhost:3000/pokemon');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setPokemons(data);
      setOriginalPokemons(data); // Almacena los pokemones originales
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  // Manejador de clic para la tarjeta de Pokémon
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true); // Abre el modal al hacer clic en la tarjeta
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Manejador de búsqueda
  const handleSearch = async (searchTerm, searchType) => {
    try {
      let endpoint = '';
      if (searchType === 'name') {
        endpoint = `http://localhost:3000/search?name=${searchTerm}`;
      } else if (searchType === 'type') {
        endpoint = `http://localhost:3000/search?type=${searchTerm}`;
      }
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to search');
      }
      const data = await response.json();
      if (data.length === 0) {
        setSearchError(`No se encontraron resultados para "${searchTerm}"`);
      } else {
        setSearchError(null);
        setPokemons(data);
      }
    } catch (error) {
      console.error('Error searching pokemons:', error.message);
    }
  };

  // Manejador para volver a todos los pokemones originales
  const handleBackToAllPokemons = () => {
    setSearchError(null);
    setPokemons(originalPokemons);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PokemonSearch onSearch={handleSearch} />
        {searchError && (
          <p className="text-red-500">{searchError}</p>
        )}
        {originalPokemons.length !== pokemons.length && (
          <button onClick={handleBackToAllPokemons} className="pokemon-search-button">
            Back to All Pokemons
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} onClick={() => handlePokemonClick(pokemon)}>
            <Pokemon pokemon={pokemon} />
          </div>
        ))}
        {isModalOpen && selectedPokemon && (
          <Modal onClose={handleCloseModal}>
            <PokemonDetail pokemon={selectedPokemon} />
          </Modal>
        )}
      </div>
    </div>
  );
};

const Pokemon = ({ pokemon }) => {
  const { name, types, imageUrl } = pokemon;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer">
      <h2 className="text-2xl font-semibold text-center mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{name}</h2>
      <ul className="flex justify-center mb-4">
        {types.map((type) => (
          <li key={type} className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-1">
            {type}
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <img src={imageUrl} alt={name} className="max-w-xs h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default PokemonList;
