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

  return (
    <Card 
      className="h-100 border-0 pokemon-card position-relative rounded-0"
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
            <span key={t.type.name} className="type-badge text-uppercase">
              {t.type.name}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
