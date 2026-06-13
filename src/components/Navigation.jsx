import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar className="navbar-custom py-3" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-uppercase fw-bold">
          Pokédex <strong className="ms-2">/ Primera Generación</strong>
        </Navbar.Brand>
        <div className="text-muted" style={{ fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
          151 / 151
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigation;
