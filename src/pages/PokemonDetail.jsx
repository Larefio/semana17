import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function PokemonDetail() {
  const { name } = useParams();

  return (
    <Container className="text-center">
      <h2>Detalles del Pokémon: {name}</h2>
      <p>Pronto veremos la información de este Pokémon aquí.</p>
      <Link to="/" className="btn btn-secondary mt-3">Volver al inicio</Link>
    </Container>
  );
}

export default PokemonDetail;
