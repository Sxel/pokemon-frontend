// PokemonDetail.js

import { useEffect, useState } from 'react';

const PokemonDetail = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pokemon/${pokemon.name}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error.message);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const { name, height, weight, types, abilities } = details;

  return (
    <div>
      <h2>{name}</h2>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>Types: {types.join(', ')}</p>
      <p>Abilities: {abilities.join(', ')}</p>
    </div>
  );
};

export default PokemonDetail;
