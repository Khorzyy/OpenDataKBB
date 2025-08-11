import { useEffect, useState } from 'react';
import {
  Container,
  Spinner,
  Button,
  Row,
  Col,
  Alert,
  Form,
} from 'react-bootstrap';
import { getAllFiles } from '../api/api';
import { FaDatabase, FaFilter, FaListOl } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DataCard from './DataCard';
import '../styles/AllData.css';

function Search({ searchTerm, setSearchTerm }) {
  return (
    <Form
      className="d-flex mb-4 justify-content-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Control
        type="search"
        placeholder=" Cari data statistik..."
        className="me-2 shadow-sm rounded-pill px-3 search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ maxWidth: '300px', fontSize: '0.9rem' }}
      />
      <Button variant="success" size="sm" className="rounded-pill px-3 shadow-sm">
        Cari
      </Button>
    </Form>
  );
}

function getShortText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + '...';
}

function getPageNumbers(totalPages, currentPage) {
  const pages = [];
  const delta = 2;

  if (currentPage > delta + 2) {
    pages.push(1, '...');
  } else {
    for (let i = 1; i < currentPage; i++) pages.push(i);
  }

  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage < totalPages - delta - 1) {
    pages.push('...', totalPages);
  } else {
    for (let i = currentPage + 1; i <= totalPages; i++) pages.push(i);
  }

  return [...new Set(pages)];
}

function AllDataCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 10;

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

 useEffect(() => {
  const fetchData = async () => {
    try {
     const files = await getAllFiles();
setData(files); // langsung pakai hasil dari API

    } catch (error) {
      console.error("Gagal ambil data:", error);
      setData([]);
    } finally {
      setLoading(false);
      AOS.init({ duration: 500, once: true });
    }
  };
  fetchData();
  setCurrentPage(1);
}, [searchTerm]);



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
  <main className="all-data-page">
    <div className="animated-bg"></div>

    <h2 
  className="section-title text-center my-4" 
  data-aos="fade-down"
>
  Semua Data Statistik
</h2>


    <div className="glass-container" data-aos="zoom-in">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {!loading && (
        <Row className="mb-3 text-center">
          <Col xs={4}>
            <small><FaDatabase /> {data.length} Total</small>
          </Col>
          <Col xs={4}>
            <small><FaFilter /> {filteredData.length} Hasil</small>
          </Col>
          <Col xs={4}>
            <small><FaListOl /> {currentPage}/{totalPages || 1}</small>
          </Col>
        </Row>
      )}

      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="light" size="sm" />
        </div>
      )}

      {!loading && currentItems.length === 0 && (
        <Alert variant="warning" className="text-center small">
          Tidak ada data ditemukan untuk <strong>"{searchTerm}"</strong>.
        </Alert>
      )}

      <Row xs={1} md={2} className="g-3">
        {!loading &&
          currentItems.map((item) => (
            <Col key={item.id}>
              <DataCard
                id={item.id}
                title={item.nama}
                description={getShortText(item.deskripsi, 80)}
              />
            </Col>
          ))}
      </Row>

      {!loading && filteredData.length > itemsPerPage && (
        <Row className="mt-3">
          <Col className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
            <Button
              size="sm"
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ←
            </Button>

            {getPageNumbers(totalPages, currentPage).map((page, idx) =>
              page === '...' ? (
                <span key={idx} className="px-2">...</span>
              ) : (
                <Button
                  key={page}
                  size="sm"
                  className="pagination-btn"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              size="sm"
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              →
            </Button>
          </Col>
        </Row>
      )}
    </div>
  </main>
);

}

export default AllDataCard;
