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

import { fetchData } from '../api/api';
import DataCard from '../components/DataCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaDatabase, FaFilter, FaListOl } from 'react-icons/fa';
import '../styles/Home.css';

// 🔍 Komponen Pencarian
function Search({ searchTerm, setSearchTerm }) {
  return (
    <Form className="d-flex mb-4 justify-content-center" onSubmit={(e) => e.preventDefault()}>
      <Form.Control
        type="search"
        placeholder="Cari data..."
        className="me-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="primary">Cari</Button>
    </Form>
  );
}

// 📄 Komponen Utama Home
function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 6;

  useEffect(() => {
      fetchData().then((res) => {
          setData(res);
          setLoading(false);
          AOS.init({ duration: 800, once: true }); 
    });
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="home-main">
        <Container>

          {/* 🖼 Hero Section */}
          <div className="hero-section">
            <div className="hero-overlay text-center">
              <h1 className="display-5 fw-bold text-light">Open Data Kabupaten Bandung Barat</h1>
              <p className="text-light">Temukan data statistik publik terbaru dari berbagai sektor.</p>
              <hr className="hero-divider" />
            </div>
          </div>

          {/* 🔍 Search */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* 🔢 Info Panel */}
          {!loading && (
            <Row className="mb-4 text-center">
              <Col md={4}>
                <FaDatabase size={24} className="text-success mb-2" />
                <p><strong>Total Data:</strong> <Badge bg="success">{data.length}</Badge></p>
              </Col>
              <Col md={4}>
                <FaFilter size={24} className="text-primary mb-2" />
                <p><strong>Hasil Pencarian:</strong> <Badge bg="primary">{filteredData.length}</Badge></p>
              </Col>
              <Col md={4}>
                <FaListOl size={24} className="text-secondary mb-2" />
                <p><strong>Halaman:</strong> {currentPage} / {totalPages}</p>
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
                <Col key={item.id}>
                  <div className="animate__animated animate__fadeInUp">
                    <DataCard
                      id={item.id}
                      title={item.nama}
                      description={item.deskripsi}
                    />
                  </div>
                </Col>
              ))}
          </Row>

          {/* 🔁 Pagination */}
          {!loading && filteredData.length > itemsPerPage && (
            <Row className="mt-4">
              <Col className="d-flex justify-content-between align-items-center">
                <Button
  className="pagination-buttons"
  variant="outline-secondary"
  onClick={handlePrev}
  disabled={currentPage === 1}
>
  ← Sebelumnya
</Button>

                <span className="text-muted">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <Button
                  variant="outline-secondary"
                  onClick={handleNext}
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
