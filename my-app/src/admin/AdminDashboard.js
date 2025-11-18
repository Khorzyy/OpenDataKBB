import { useEffect, useState } from 'react';
import {
  Container, Row, Col, Spinner, Button, Alert, Badge, Card, Form, Table, Pagination
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllFiles, deleteFile } from '../api/api';
import {
  FaDatabase, FaPlusCircle, FaClipboardList, FaSearch,
  FaEdit, FaTrash, FaFileExcel, FaCalendarAlt, FaFolderOpen, FaInfoCircle, FaSignOutAlt
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const truncateText = (text, limit = 60) =>
  text && text.length > limit ? `${text.slice(0, limit)}...` : text;

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda belum login!');
      navigate('/admin/LoginAdmin');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllFiles();
      setData(res);
      setFilteredData(res);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const handleAddData = () => navigate('/admin/tambah');
  const handleEdit = (id) => navigate(`/admin/EditFile/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        const result = await deleteFile(id);
        if (result?.message === 'Tabel dan data berhasil dihapus') {
          alert('Data berhasil dihapus.');
          setData(prev => prev.filter(item => item._id !== id));
          setFilteredData(prev => prev.filter(item => item._id !== id));
        } else {
          alert('Gagal menghapus data.');
        }
      } catch (error) {
        alert('Terjadi kesalahan saat menghapus data!');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/LoginAdmin');
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} />
        {items}
        <Pagination.Next onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    );
  };

  return (
    <main
      className="py-5 min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #eef2f3, #d9e4f5)',
      }}
    >
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <Container>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="fw-bold mb-0 text-primary">
              <FaClipboardList className="mb-1 me-2" />
              Dashboard Admin
            </h2>
            <small className="text-muted">Kelola seluruh data Excel Anda dengan mudah</small>
          </Col>
          <Col className="text-end">
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              className="rounded-pill shadow-sm px-3"
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </Col>
        </Row>

        {/* Search + Add */}
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <div className="d-flex bg-white shadow-sm rounded-pill overflow-hidden">
              <span className="d-flex align-items-center px-3 text-muted">
                <FaSearch />
              </span>
              <Form.Control
                type="text"
                placeholder="Cari data tabel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0"
              />
            </div>
          </Col>
          <Col md={6} className="text-end">
            <Button
              variant="success"
              className="rounded-pill px-4 shadow-sm"
              onClick={handleAddData}
            >
              <FaPlusCircle className="me-2" />
              Tambah Data Baru
            </Button>
          </Col>
        </Row>

        {/* Stats */}
        {!loading && (
          <Row className="mb-4 g-4">
            <Col md={12}>
              <Card className="border-0 shadow-sm rounded-4 bg-gradient bg-white">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaDatabase size={36} className="text-info me-3" />
                    <div>
                      <h5 className="fw-bold mb-0">Total Tabel Tersimpan</h5>
                      <Badge bg="info" pill className="fs-6 mt-1">
                        {data.length}
                      </Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : filteredData.length === 0 ? (
          <Alert variant="warning" className="text-center">
            Tidak ada data yang cocok dengan pencarian.
          </Alert>
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded-4 overflow-hidden">
              <Table bordered hover responsive className="align-middle mb-0 bg-white table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Nama</th>
                    <th>Tahun</th>
                    <th>Deskripsi</th>
                    <th>Kategori</th>
                    <th>Sumber</th>
                    <th>Info</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item._id}>
                      <td><FaFileExcel className="me-2 text-success" />{item.name}</td>
                      <td><FaCalendarAlt className="me-2 text-muted" />{item.tahun}</td>
                      <td>{truncateText(item.description)}</td>
                      <td><FaFolderOpen className="me-2 text-muted" />{item.kategori}</td>
                      <td>{item.sumber}</td>
                      <td><FaInfoCircle className="me-2 text-muted" />{item.format} / {item.ukuran}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button variant="outline-info" size="sm" className="rounded-pill" onClick={() => navigate(`/admin/view/${item._id}`)}>
                            <FaClipboardList /> Lihat
                          </Button>
                          <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => handleEdit(item._id)}>
                            <FaEdit /> Edit
                          </Button>
                          <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => handleDelete(item._id)}>
                            <FaTrash /> Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {renderPagination()}
          </>
        )}
      </Container>
    </main>
  );
}

export default AdminDashboard;