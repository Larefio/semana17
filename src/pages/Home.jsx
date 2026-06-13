import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import PokemonCard from '../components/PokemonCard';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setFilteredPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = pokemons.filter((p) => p.name.toLowerCase().includes(term));
    setFilteredPokemons(filtered);
  };

  return (
    <Container className="my-5">
      <div className="position-relative mb-5 mx-auto" style={{ maxWidth: '100%' }}>
        <FiSearch className="search-icon fs-5" />
        <Form.Control
          type="text"
          placeholder="Buscar por nombre..."
          className="search-input py-3"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {filteredPokemons.map((pokemon) => (
            <Col key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
