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
import heroBg from "../assets/kbb-vector.png";
import DataCard from '../components/DataCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaDatabase, FaFilter, FaListOl } from 'react-icons/fa';
import '../styles/Home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dataset');
  const itemsPerPage = 4;

  useEffect(() => {
    getAllFiles().then((res) => {
      setData(res);
      setLoading(false);
      AOS.init({ duration: 800, once: true });
    });
  }, []);

  const filteredData = data.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    return (
      (item.name || '').toLowerCase().includes(term) ||
      (item.description || '').toLowerCase().includes(term)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem;
  const currentItems = filteredData.slice(indexOfLastItem || undefined);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // === (5) DATA TERBARU ===
  const latestData = data.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Home - OpenDataKBB</title>
      </Helmet>

      {/* HERO */}
      <div
        className="hero-section mb-5 text-white rounded shadow d-flex align-items-center home-bg-pattern"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "70vh",
          padding: "5rem 2rem",
        }}
      >
        <div data-aos="fade-up">
          <h1 className="display-4 fw-bold mb-3">Open Data Kabupaten Bandung Barat</h1>
          <p className="fs-5 mb-0">
            Temukan data terbuka yang diproduksi oleh Pemerintah Kabupaten Bandung Barat
          </p>
        </div>
      </div>

      <main className="home-main bg-light py-5 home-bg-pattern">
        <Container>

          {/* (3) SECTION MENGAPA OPEN DATA */}
          <section className="mb-5" data-aos="fade-up">
            <h3 className="fw-bold text-center mb-3 text-primary">Kenapa Open Data Penting?</h3>
            <p className="text-center text-muted mb-4">
              Open Data membantu meningkatkan transparansi, memperkuat partisipasi publik, dan mendukung inovasi berbasis data.
            </p>

            <Row className="text-center">
              <Col md={4} data-aos="zoom-in">
                <div className="p-4 bg-white rounded shadow-sm border-start border-4 border-primary">
                  <h5 className="fw-bold">Transparansi</h5>
                  <p className="text-muted small">Memberikan akses data yang jelas kepada publik.</p>
                </div>
              </Col>

              <Col md={4} data-aos="zoom-in" data-aos-delay="150">
                <div className="p-4 bg-white rounded shadow-sm border-start border-4 border-success">
                  <h5 className="fw-bold">Inovasi</h5>
                  <p className="text-muted small">Mendorong pengembangan aplikasi berbasis data.</p>
                </div>
              </Col>

              <Col md={4} data-aos="zoom-in" data-aos-delay="300">
                <div className="p-4 bg-white rounded shadow-sm border-start border-4 border-warning">
                  <h5 className="fw-bold">Efisiensi</h5>
                  <p className="text-muted small">Mempermudah analisis dan pengambilan keputusan.</p>
                </div>
              </Col>
            </Row>
          </section>

          {/* Divider */}
          <hr className="section-divider my-5" />

          {/* (5) DATA TERBARU */}
          {!loading && (
            <section className="mb-5" data-aos="fade-up">
              <h3 className="fw-bold text-center text-success mb-4">Data Terbaru</h3>
              {/* INFO PANEL */}
              {!loading && (
                <Row className="mb-5 text-center">
                  <Col md={4}>
                    <div className="bg-white shadow-sm rounded p-4 border-start border-4 border-success">
                      <FaDatabase size={26} className="text-success mb-2" />
                      <p className="m-0">
                        <strong>Total Data:</strong>{' '}
                        <Badge bg="success">{data.length}</Badge>
                      </p>
                    </div>
                  </Col>
                </Row>
              )}

              <Row xs={1} md={3} className="g-4">
                {latestData.map((item) => (
                  <Col key={item._id}>
                    <div data-aos="zoom-in">
                      <DataCard
                        id={item._id}
                        name={item.name}
                        kategori={item.kategori}
                        tahun={item.tahun}
                        sumber={item.sumber}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* Divider */}
          <hr className="section-divider my-5" />

          {/* LOADING */}
          {loading && (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {/* (8) SECTION TENTANG PLATFORM */}
          <section className="mb-5" data-aos="fade-up">
            <h3 className="fw-bold text-center mb-3 text-primary">
              Tentang OpenDataKBB
            </h3>
            <p className="text-center text-muted mb-4">
              Platform ini berfungsi sebagai pusat data terbuka Kabupaten Bandung Barat
              untuk membantu masyarakat, peneliti, dan pengambil keputusan.
            </p>

            <Row className="text-center">
              <Col md={4} data-aos="zoom-in">
                <div className="p-4 bg-white rounded shadow-sm">
                  <h5 className="fw-bold">Akses Publik</h5>
                  <p className="text-muted small">
                    Data dapat diunduh siapa saja tanpa batasan.
                  </p>
                </div>
              </Col>

              <Col md={4} data-aos="zoom-in" data-aos-delay="150">
                <div className="p-4 bg-white rounded shadow-sm">
                  <h5 className="fw-bold">Data Terverifikasi</h5>
                  <p className="text-muted small">
                    Data bersumber dari dinas resmi Kabupaten Bandung Barat.
                  </p>
                </div>
              </Col>

              <Col md={4} data-aos="zoom-in" data-aos-delay="300">
                <div className="p-4 bg-white rounded shadow-sm">
                  <h5 className="fw-bold">Update Berkala</h5>
                  <p className="text-muted small">
                    Dataset rutin diperbarui sesuai ketersediaan data.
                  </p>
                </div>
              </Col>
            </Row>
          </section>

          {/* Divider */}
          <hr className="section-divider my-5" />

          {/* (9) SECTION CTA AJAKAN */}
          <section className="text-center mb-5" data-aos="fade-up">
            <h3 className="fw-bold mb-3 text-success">
              Ayo Gunakan Data untuk Membangun KBB!
            </h3>
            <p className="text-muted mb-4">
              Data bukan hanya angka—tetapi alat untuk menciptakan kebijakan yang lebih baik.
            </p>

            <Link to="/dataset">
              <Button variant="success" className="px-4 py-2 rounded-pill shadow">
                Jelajahi Semua Data
              </Button>
            </Link>
          </section>

          {/* Divider */}
          <hr className="section-divider my-5" />

          {/* (10) SECTION HUBUNGI KAMI */}
          <section className="text-center mb-5" data-aos="fade-up">
            <h3 className="fw-bold text-primary mb-3">Hubungi Kami</h3>
            <p className="text-muted">
              Jika Anda memiliki pertanyaan atau butuh data tambahan, silakan hubungi kami.
            </p>

            <p className="fw-bold mt-3 mb-1">Email: <span className='text-muted'>statistikominfo@gmail.com</span></p>
            <p className="fw-bold mb-1">Alamat: <span className='text-muted'>Gedung B lt.2, Des.Mekarsari, Kec.Ngamprah, Kabupaten Bandung Barat, Jawa Barat 40552</span></p>
          </section>
        </Container>
      </main>
    </>
  );
}

export default Home;
