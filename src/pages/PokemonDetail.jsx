import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Card, ProgressBar } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

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

const statTranslations = {
  hp: 'Vida',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Atq. Especial',
  'special-defense': 'Def. Especial',
  speed: 'Velocidad'
};

const statColors = {
  hp: '#ef5350',
  attack: '#ffa726',
  defense: '#ffee58',
  'special-attack': '#42a5f5',
  'special-defense': '#66bb6a',
  speed: '#ab47bc'
};

const statLabels = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD'
};

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(async (data) => {
        const abilitiesWithTranslations = await Promise.all(
          data.abilities.map(async (a) => {
            try {
              const res = await fetch(a.ability.url);
              const abilityData = await res.json();
              const spanishName = abilityData.names.find(n => n.language.name === 'es');
              return {
                ...a,
                spanishName: spanishName ? spanishName.name : a.ability.name
              };
            } catch (e) {
              return { ...a, spanishName: a.ability.name };
            }
          })
        );
        data.abilities = abilitiesWithTranslations;
        setPokemon(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <Container className="text-center mt-5 pt-5">
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  if (!pokemon) return <Container className="text-center mt-5"><h4>Pokémon no encontrado</h4></Container>;

  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <Link to="/" className="btn btn-outline-danger mb-4 d-inline-flex align-items-center rounded-pill px-4 fw-bold">
        <IoMdArrowBack className="me-2" /> Volver a la Pokédex
      </Link>

      <Card className="border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <Row className="g-0">
          <Col md={5} className="d-flex align-items-center justify-content-center p-5" style={{ backgroundColor: '#f8f9fa' }}>
            <img 
              src={imageUrl} 
              alt={pokemon.name} 
              className="img-fluid" 
              style={{ maxHeight: '350px', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))' }} 
            />
          </Col>
          
          <Col md={7}>
            <Card.Body className="p-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="text-capitalize fw-bold mb-0" style={{ fontSize: '2.5rem', color: '#333' }}>
                  {pokemon.name}
                </h1>
                <span className="fs-4 text-muted fw-bold">{formattedId}</span>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4">
                {pokemon.types.map((t) => (
                  <span 
                    key={t.type.name} 
                    className="type-badge text-uppercase fs-6 px-3 py-2"
                    style={{ backgroundColor: typeColors[t.type.name] || '#777' }}
                  >
                    {typeTranslations[t.type.name] || t.type.name}
                  </span>
                ))}
              </div>

              <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: '#ef5350' }}>Estadísticas Base</h5>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-3">
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem', fontWeight: '700', color: '#666' }}>
                    <span className="text-uppercase">{statLabels[stat.stat.name] || stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div style={{ backgroundColor: '#e9ecef', height: '5px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        backgroundColor: statColors[stat.stat.name] || '#ef5350', 
                        height: '100%', 
                        width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` 
                      }} 
                    />
                  </div>
                </div>
              ))}

              <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2" style={{ color: '#ef5350' }}>Información General</h5>
              <Row className="g-3 mb-4">
                <Col xs={6}>
                  <div className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Altura</div>
                  <div className="fw-bold" style={{ color: '#333' }}>{(pokemon.height / 10).toFixed(1)} m</div>
                </Col>
                <Col xs={6}>
                  <div className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Peso</div>
                  <div className="fw-bold" style={{ color: '#333' }}>{(pokemon.weight / 10).toFixed(1)} kg</div>
                </Col>
                <Col xs={6}>
                  <div className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Exp. Base</div>
                  <div className="fw-bold" style={{ color: '#333' }}>{pokemon.base_experience}</div>
                </Col>
                <Col xs={6}>
                  <div className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Tipo Principal</div>
                  <div className="text-uppercase fw-bold" style={{ color: typeColors[pokemon.types[0].type.name] || '#333' }}>
                    {typeTranslations[pokemon.types[0].type.name] || pokemon.types[0].type.name}
                  </div>
                </Col>
              </Row>

              <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2" style={{ color: '#ef5350' }}>Habilidades</h5>
              <div className="d-flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span 
                    key={ability.ability.name} 
                    className="border px-4 py-2 rounded-pill text-capitalize fw-bold shadow-sm" 
                    style={{ fontSize: '0.9rem', backgroundColor: '#fff0f0', color: '#ef5350', borderColor: '#ffcdd2' }}
                  >
                    {ability.spanishName ? ability.spanishName : ability.ability.name.replace('-', ' ')}
                    {ability.is_hidden && <span className="ms-1 fw-normal" style={{ fontSize: '0.8rem', opacity: 0.8 }}>(Oculta)</span>}
                  </span>
                ))}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default PokemonDetail;
