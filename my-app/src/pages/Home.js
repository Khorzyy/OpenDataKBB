import { useEffect, useState } from 'react';
import {
  Container,
  Spinner,
  Button,
  Row,
  Col,
  Alert,
  Badge,
  Form,
} from 'react-bootstrap';
import { getAllFiles } from '../api/api';

import DataCard from '../components/DataCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaDatabase, FaFilter, FaListOl } from 'react-icons/fa';
import '../styles/Home.css';

// 🔍 Komponen Pencarian
// ... [imports tetap sama]

function Search({ searchTerm, setSearchTerm }) {
  return (
    <Form
      className="d-flex mb-5 justify-content-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Control
        type="search"
        placeholder="🔍 Cari data statistik..."
        className="me-2 shadow-sm rounded-pill px-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="success" className="rounded-pill px-4 shadow-sm">
        Cari
      </Button>
    </Form>
  );
}

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    getAllFiles().then((res) => {
      setData(res);
      setLoading(false);
      AOS.init({ duration: 800, once: true });
    });
    setCurrentPage(1);
  }, [searchTerm]);


  const filteredData = data.filter((item) =>
    (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.deskripsi || '').toLowerCase().includes(searchTerm.toLowerCase())
  );


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="home-main bg-light py-5">
        <Container>
          {/* 🖼 Hero */}
          <div className="hero-section mb-5 p-5 text-white text-center rounded shadow" style={{ background: '#28a745' }}>
            <h1 className="display-5 fw-bold mb-2">Open Data Kabupaten Bandung Barat</h1>
            <p className="mb-0">Temukan data publik terkini dari berbagai sektor pemerintahan.</p>
          </div>

          {/* 🔍 Search */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* 🔢 Info Panel */}
          {!loading && (
            <Row className="mb-4 text-center">
              <Col md={4}>
                <div className="bg-white shadow-sm rounded p-3">
                  <FaDatabase size={24} className="text-success mb-2" />
                  <p><strong>Total Data:</strong> <Badge bg="success">{data.length}</Badge></p>
                </div>
              </Col>
              <Col md={4}>
                <div className="bg-white shadow-sm rounded p-3">
                  <FaFilter size={24} className="text-primary mb-2" />
                  <p><strong>Hasil Pencarian:</strong> <Badge bg="primary">{filteredData.length}</Badge></p>
                </div>
              </Col>
              <Col md={4}>
                <div className="bg-white shadow-sm rounded p-3">
                  <FaListOl size={24} className="text-secondary mb-2" />
                  <p><strong>Halaman:</strong> {currentPage} / {totalPages}</p>
                </div>
              </Col>
            </Row>
          )}

          {/* ⏳ Loading */}
          {loading && (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {/* ⚠️ Tidak Ditemukan */}
          {!loading && currentItems.length === 0 && (
            <Alert variant="warning" className="text-center">
              Tidak ada data ditemukan untuk kata kunci <strong>"{searchTerm}"</strong>.
            </Alert>
          )}

          {/* 📦 Data Cards */}
          <Row xs={1} md={2} className="g-4">
            {!loading &&
              currentItems.map((item) => (
                <Col key={item._id}>
                  <div className="animate__animated animate__fadeInUp">
                    <DataCard
                      id={item._id} 
                      name={item.name} 
                      description={item.description}
                      tahun={item.tahun}
                      sumber={item.sumber}
                    />
                  </div>
                </Col>
              ))}
          </Row>

          {/* 🔁 Pagination */}
          {!loading && filteredData.length > itemsPerPage && (
            <Row className="mt-4">
              <Col className="d-flex justify-content-center align-items-center gap-3">
                <Button
                  className="rounded-pill px-4"
                  variant="outline-secondary"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Sebelumnya
                </Button>

                <span className="text-muted">Halaman {currentPage} dari {totalPages}</span>

                <Button
                  className="rounded-pill px-4"
                  variant="outline-secondary"
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Berikutnya →
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default Home;