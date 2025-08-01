// components/Header.js
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // optional jika pakai routing
import '../styles/Home.css';
import logo from '../assets/KBB.png'; // pastikan path-nya sesuai

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="custom-header shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Logo KBB" className="logo-img" />
          <h2 className="mb-0 fw-bold brand-text">OpenDataKBB</h2>
        </div>

        <Nav className="gap-4 nav-links">
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
