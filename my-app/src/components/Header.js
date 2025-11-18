// components/Header.js
import {
  Container, Nav, Row, Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom'; // optional jika pakai routing
import '../styles/Home.css';
import logo from '../assets/KBB.png'; // pastikan path-nya sesuai

function Header({ activeTab, setActiveTab }) {
  return (
    <header expand="md" className="custom-header shadow-sm">
      <Container>
        <Row className="align-items-center">

          {/* Logo */}
          <Col xs={12} md={6} className="d-flex align-items-center gap-3">
            <Nav>
              <Link to='/logo'>
                <img src={logo} alt="Logo KBB" className="logo-img" />
              </Link>
              <Link to="/" className="d-flex align-items-center text-decoration-none">
                <h2 className="mb-0 fw-bold brand-text">OpenDataKBB</h2>
              </Link>
            </Nav>
          </Col>

          {/* Navigation */}
          <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center">
            <Nav className="gap-4">
              <Link to="/" className='nav-link'>Beranda</Link>
              <Link to="/dataSet" className='nav-link'>DataSet</Link>
              <Link to="/Sejarah" className='nav-link'>Sejarah</Link>
              <Link to="/VisiMisi" className='nav-link'>VisiMisi</Link>
            </Nav>
          </Col>

        </Row>
      </Container>
    </header>
  );
}

export default Header;
