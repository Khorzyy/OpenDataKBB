import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo-kbb.jpeg"; // pastikan ganti sesuai nama file logo
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="bg-light border-top py-4 mt-5">
      <Container>
        <Row className="align-items-start">
          {/* Logo & Alamat */}
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <img
                src={logo}
                alt="Logo KBB"
                style={{ width: "50px", height: "auto", marginRight: "10px" }}
              />
              <div>
                <h6 className="fw-bold m-0">KABUPATEN BANDUNG BARAT</h6>
              </div>
            </div>
            <div className="text-muted small">
              <FaMapMarkerAlt className="me-1" />
              Komplek Pemda Kabupaten Bandung Barat <br />
              Jl. Raya Padalarang-Cisarua Km.2 Ngamprah
            </div>
          </Col>

          {/* Navigasi */}
          <Col md={5} className="mb-4 mb-md-0">
            <Row>
              <Col xs={6} sm={4}>
                <ul className="list-unstyled small">
                  <li>About</li>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Contact</li>
                </ul>
              </Col>
              <Col xs={6} sm={4}>
                <ul className="list-unstyled small">
                  <li>Documentation</li>
                  <li>FAQ</li>
                  <li>Support</li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Sosial Media */}
          <Col md={3} className="text-md-end">
            <ul className="list-unstyled small">
              <li><FaXTwitter className="me-1" /> X (Twitter)</li>
              <li><FaLinkedin className="me-1" /> Linkedin</li>
              <li><FaYoutube className="me-1" /> YouTube</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
