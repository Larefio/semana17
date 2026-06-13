import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import PokemonCard from '../components/PokemonCard';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=24')
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 fw-bold">Listado de Pokémon</h2>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {pokemons.map((pokemon, index) => (
            <Col key={index}>
              <PokemonCard pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
