import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  const id = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Card className="h-100 shadow-sm border-0 pokemon-card">
      <Card.Img variant="top" src={imageUrl} alt={pokemon.name} className="p-3" style={{ background: '#f0f0f0' }} />
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-capitalize fs-4 mb-3">{pokemon.name}</Card.Title>
        <Button as={Link} to={`/pokemon/${pokemon.name}`} variant="danger" className="mt-auto rounded-pill px-4">
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
