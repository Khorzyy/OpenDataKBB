import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Alert,
  Badge,
  Card,
  Form,
  Table,
  Pagination,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllFiles } from '../api/api';
import {
  FaDatabase,
  FaPlusCircle,
  FaClipboardList,
  FaSearch,
  FaEdit,
  FaTrash,
  FaFileExcel,
  FaCalendarAlt,
  FaFolderOpen,
  FaInfoCircle,
} from 'react-icons/fa';

const truncateText = (text, limit = 60) =>
  text && text.length > limit ? `${text.slice(0, limit)}...` : text;

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const navigate = useNavigate();

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

  // Table-responsive

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat search
  }, [searchTerm, data]);

  const handleAddData = () => navigate('/admin/tambah');
  const handleEdit = (id) => {
  navigate(`/admin/EditFile/${id}`);
};

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      console.log('Deleted ID:', id);
      fetchData();
    }
  };

 const renderPagination = () => {
  const paginationItems = [];
  const maxVisible = 5;
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  paginationItems.push(
    <Pagination.First key="first" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />,
    <Pagination.Prev key="prev" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} />,
    <Pagination.Item key={1} active={currentPage === 1} onClick={() => setCurrentPage(1)}>
      1
    </Pagination.Item>
  );

  if (startPage > 2) {
    paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
  }

  for (let number = startPage; number <= endPage; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (endPage < totalPages - 1) {
    paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
  }

  if (totalPages > 1) {
    paginationItems.push(
      <Pagination.Item
        key={totalPages}
        active={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  paginationItems.push(
    <Pagination.Next
      key="next"
      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      disabled={currentPage === totalPages}
    />,
    <Pagination.Last
      key="last"
      onClick={() => setCurrentPage(totalPages)}
      disabled={currentPage === totalPages}
    />
  );

  return <Pagination className="justify-content-center my-4">{paginationItems}</Pagination>;
};


  return (
    <main
      className="py-5 min-vh-100"
      style={{ background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)' }}
    >
      <Container>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="fw-bold mb-0">
              <FaClipboardList className="mb-1 me-2 text-primary" />
              Admin Dashboard
            </h2>
            <small className="text-muted">Kelola data aplikasi secara efisien dan cepat</small>
          </Col>
        </Row>

        {/* Search */}
        <Row className="mb-4">
          <Col md={6}>
            <div className="d-flex shadow-sm bg-white rounded-pill overflow-hidden">
              <span className="d-flex align-items-center px-3 text-muted">
                <FaSearch />
              </span>
              <Form.Control
                type="text"
                placeholder="Cari data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0"
              />
            </div>
          </Col>
        </Row>

        {/* Statistik */}
        {!loading && (
          <Row className="mb-4 g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm rounded-4 bg-white h-100">
                <Card.Body className="text-center">
                  <FaDatabase size={36} className="text-info mb-2" />
                  <h5 className="fw-bold">Total Data</h5>
                  <Badge bg="info" pill className="px-3 py-1 fs-6">
                    {data.length}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm rounded-4 bg-white h-100">
                <Card.Body className="text-center">
                  <FaPlusCircle size={34} className="text-success mb-2" />
                  <h5 className="fw-bold">Tambah Data Baru</h5>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleAddData}
                    className="rounded-pill mt-2 px-4"
                  >
                    + Tambah
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="info" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : filteredData.length === 0 ? (
          <Alert variant="warning" className="text-center">
            Tidak ada data yang cocok.
          </Alert>
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded-4 overflow-hidden">
              <Table bordered hover responsive className="align-middle mb-0 bg-white table-striped">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">ID</th>
                    <th>Nama</th>
                    <th>Tahun</th>
                    <th>Deskripsi</th>
                    <th>Sumber</th>
                    <th>Info</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="text-center text-muted">
                        <td className="text-center text-muted">{item.id}</td>

                      </td>
                      <td>
                        <FaFileExcel className="me-2 text-success" />
                        {item.nama}
                      </td>
                      <td>
                        <FaCalendarAlt className="me-2 text-muted" />
                        {item.tahun}
                      </td>
                      <td>{truncateText(item.deskripsi)}</td>
                      <td>
                        <FaFolderOpen className="me-2 text-muted" />
                        {item.sumber}
                      </td>
                      <td>
                        <FaInfoCircle className="me-2 text-muted" />
                        {item.format} / {item.ukuran}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="rounded-pill"
                            onClick={() => handleEdit(item.id)}
                          >
                            <FaEdit /> Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-pill"
                            onClick={() => handleDelete(item.id)}
                          >
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
