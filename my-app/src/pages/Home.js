import { useState } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import Footer from '../components/Footer';
import Sejarah from '../components/Sejarah';
import GetAllData from '../components/AllData';
import VisiMisi from '../components/visimisi';
import logoKBB from '../assets/logo-kbb.jpeg';
import '../styles/Home.css';
import Header from '../components/Header'

function Home() {
  const [activeTab, setActiveTab] = useState('dataset');

  return (
    
    <div className="zoom-wrapper">
      
      <main className="home-main bg-light py-3">
       
        <Container fluid className="p-0">
          
          {/* 🌈 Hero Section */}
          <Card className="welcome-card border-0 mb-4 shadow-sm rounded-3">
            <Card.Body>
              <Row className="align-items-center g-4 px-3 py-2">
                
                {/* Teks Selamat Datang */}
                <Col xs={12} md={8} className="text-center text-md-start">
                  <h2 className="fw-bold fs-3 mb-2">
                    SELAMAT DATANG!
                  </h2>
                  <p className="small mb-0">
                    Akses berbagai data statistik Kabupaten Bandung Barat dengan mudah, cepat, dan interaktif.
                  </p>
                </Col>

                {/* Logo KBB */}
                <Col xs={12} md={4} className="text-center">
                  <div
                    style={{
                      width: '130px',
                      height: '130px',
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={logoKBB}
                      alt="Logo KBB"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        aspectRatio: '1 / 1',
                        filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.2))',
                      }}
                    />
                  </div>
                </Col>

              </Row>
            </Card.Body>
          </Card>

          {/* 🟢 Tabs */}
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="mb-3 custom-tabs px-3"
          >
            <Nav.Item>
              <Nav.Link eventKey="dataset">Dataset</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sejarah">Sejarah</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="visiMisi">Visi Misi</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* 🔄 Tab Content */}
          <div className="tab-content-wrapper px-3">
            {activeTab === 'dataset' && <GetAllData />}
            {activeTab === 'sejarah' && <Sejarah />}
            {activeTab === 'visiMisi' && <VisiMisi />}
          </div>

        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
