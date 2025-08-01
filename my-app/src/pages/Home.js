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
  const [activeTab, setActiveTab] = useState('dataset'); // dataset | sejarah | visimisi
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

      <main className="home-main bg-light py-5">
        <Container>
          {/* 🖼 Hero */}
          <div className="hero-section mb-5 p-5 text-white text-center rounded shadow" style={{ background: '#28a745' }}>
            <h1 className="display-5 fw-bold mb-2">Open Data Kabupaten Bandung Barat</h1>
            <p className="mb-0">Temukan data publik terkini dari berbagai sektor pemerintahan.</p>
          </div>

          {/* 🔍 Search */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Tab Switcher */}
          <Row className="mb-4 justify-content-center">
            <Col xs="auto">
              <Button
                variant={activeTab === 'dataset' ? 'success' : 'outline-success'}
                className="rounded-pill px-4 shadow-sm"
                onClick={() => setActiveTab('dataset')}
              >
                DataSet
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant={activeTab === 'sejarah' ? 'primary' : 'outline-primary'}
                className="rounded-pill px-4 shadow-sm"
                onClick={() => setActiveTab('sejarah')}
              >
                Sejarah
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant={activeTab === 'visimisi' ? 'secondary' : 'outline-secondary'}
                className="rounded-pill px-4 shadow-sm"
                onClick={() => setActiveTab('visimisi')}
              >
                Visi Misi
              </Button>
            </Col>
          </Row>

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

          {/* 🔄 Tab Content in Dark Card */}
          <div
            className="p-4 rounded shadow mb-4"
            style={{ backgroundColor: '#2c2f36', color: '#fff' }}
          >
            <h4 className="mb-3 text-center">
              {activeTab === 'dataset' && '📊 Data Statistik'}
              {activeTab === 'sejarah' && '📜 Sejarah Singkat'}
              {activeTab === 'visimisi' && '🎯 Visi Dan Misi'}
            </h4>

            {activeTab === 'dataset' && (
              <Row xs={1} md={2} className="g-4">
                {currentItems.map((item) => (
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
            )}

            {activeTab === 'sejarah' && (
              <div className="container py-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">🏛️ Sejarah Kabupaten Bandung Barat</h2>
                </div>
                <div className="fs-5" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'justify' }}>
                  <p>
                    Kabupaten Bandung Barat (KBB) adalah salah satu daerah otonom di Provinsi Jawa Barat, Indonesia,
                    yang resmi dibentuk pada tanggal <strong>2 Januari 2007</strong> berdasarkan Undang-Undang Nomor 12 Tahun 2007.
                    Pembentukan kabupaten ini merupakan hasil pemekaran dari Kabupaten Bandung induk, dengan tujuan untuk meningkatkan
                    efisiensi pelayanan publik, pemerataan pembangunan, dan percepatan kesejahteraan masyarakat di wilayah barat Kabupaten Bandung.
                  </p>

                  <p>
                    KBB mencakup wilayah strategis di bagian barat Provinsi Jawa Barat yang berbatasan langsung dengan Kota Bandung, Kota Cimahi,
                    Kabupaten Cianjur, Kabupaten Purwakarta, dan Kabupaten Subang. Ibukota Kabupaten Bandung Barat ditetapkan di <strong>Ngamprah</strong>.
                    Pemilihan Ngamprah sebagai pusat pemerintahan didasarkan pada pertimbangan geografis dan kesiapan infrastruktur.
                  </p>

                  <p>
                    Sejak terbentuk, Kabupaten Bandung Barat terus berkembang pesat, baik dalam aspek ekonomi, sosial, pendidikan, maupun infrastruktur.
                    Wilayah ini dikenal memiliki potensi besar di sektor pariwisata seperti Lembang, sektor pertanian di daerah selatan, dan kawasan industri
                    di wilayah timur.
                  </p>

                  <p>
                    Pemerintahan Kabupaten Bandung Barat menjalankan berbagai program pembangunan yang berorientasi pada peningkatan kualitas hidup
                    masyarakat, transparansi pemerintahan, serta inovasi digital termasuk peluncuran platform <strong>Open Data KBB</strong> sebagai bagian
                    dari komitmen terhadap keterbukaan informasi publik.
                  </p>

                  <p>
                    Hingga saat ini, Kabupaten Bandung Barat terus melakukan pembenahan dalam tata kelola pemerintahan, peningkatan pelayanan publik,
                    serta penguatan partisipasi masyarakat dalam pembangunan berkelanjutan demi mewujudkan visi sebagai kabupaten yang <strong>maju,
                      mandiri, dan berdaya saing</strong>.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'visimisi' && (
              <div className="container py-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">🎯 Visi</h2>
                  <p className="fst-italic fs-5 mt-3">
                    "Menjadi pusat data terbuka Kabupaten Bandung Barat yang informatif, akurat, dan mudah diakses untuk mendukung tata kelola pemerintahan yang transparan dan partisipatif."
                  </p>
                </div>

                <div className="text-center mb-4">
                  <h2 className="fw-bold">🛠️ Misi</h2>
                </div>
                <ol className="fs-5 mx-auto" style={{ maxWidth: '800px' }}>
                  <li className="mb-3">
                    Meningkatkan keterbukaan informasi publik melalui penyediaan data sektoral yang valid dan terstruktur.
                  </li>
                  <li className="mb-3">
                    Mendorong partisipasi masyarakat, akademisi, dan pelaku usaha dalam pemanfaatan data untuk inovasi dan pembangunan daerah.
                  </li>
                  <li className="mb-3">
                    Memperkuat koordinasi antar perangkat daerah dalam pengumpulan, pengelolaan, dan publikasi data.
                  </li>
                  <li className="mb-3">
                    Menyediakan platform digital yang mudah diakses dan user-friendly sebagai pusat layanan data terbuka.
                  </li>
                  <li className="mb-3">
                    Menjaga akurasi dan keterkinian data melalui mekanisme verifikasi dan pembaruan berkala.
                  </li>
                </ol>
              </div>
            )}

            {/* ✅ Pagination now inside card */}
            {activeTab === 'dataset' && totalPages > 1 && (
              <Row className="mt-4">
                <Col className="d-flex justify-content-center flex-wrap gap-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </Button>

                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </Button>

                  {(() => {
                    const buttons = [];
                    const maxVisible = 5;
                    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                    let end = Math.min(totalPages, start + maxVisible - 1);

                    if (end - start < maxVisible - 1) {
                      start = Math.max(1, end - maxVisible + 1);
                    }

                    if (start > 1) {
                      buttons.push(<Button key="start-ellipsis" variant="dark" disabled>…</Button>);
                    }

                    for (let i = start; i <= end; i++) {
                      buttons.push(
                        <Button
                          key={i}
                          variant={i === currentPage ? 'success' : 'outline-light'}
                          size="sm"
                          className="rounded-pill"
                          onClick={() => setCurrentPage(i)}
                        >
                          {i}
                        </Button>
                      );
                    }

                    if (end < totalPages) {
                      buttons.push(<Button key="end-ellipsis" variant="dark" disabled>…</Button>);
                    }

                    return buttons;
                  })()}

                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </Button>

                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}

export default Home;