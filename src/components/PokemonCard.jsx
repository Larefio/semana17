import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(pokemon.url)
      .then(res => res.json())
      .then(data => setDetails(data));
  }, [pokemon.url]);

  if (!details) return null;

  const formattedId = `#${details.id.toString().padStart(3, '0')}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`;

  const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD',
  };

  const typeTranslations = {
    normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
    grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
    ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
    rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
    steel: 'Acero', fairy: 'Hada',
  };

  return (
    <Card 
      className="h-100 pokemon-card position-relative"
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
    >
      <div className="pokemon-id">{formattedId}</div>
      <div className="text-center pt-5 pb-3 px-3">
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          alt={pokemon.name} 
          style={{ width: '130px', height: '130px', objectFit: 'contain' }} 
        />
      </div>
      <Card.Body className="d-flex flex-column align-items-center pt-0 pb-4">
        <Card.Title className="text-capitalize fs-5 mb-3 fw-bold">{pokemon.name}</Card.Title>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          {details.types.map((t) => (
            <span 
              key={t.type.name} 
              className="type-badge text-uppercase"
              style={{ backgroundColor: typeColors[t.type.name] || '#777' }}
            >
              {typeTranslations[t.type.name] || t.type.name}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
