import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
  Spinner,
  Alert,
  Card,
  ProgressBar,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FaFileExcel, FaUpload, FaTable, FaCheckCircle } from 'react-icons/fa';

const AddDataExcel = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    name: '',
    kategori: '',
    tahun: '',
    sumber: '',
    description: '',
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    const { name, kategori, tahun, sumber, description } = form;
    if (!file || !name || !kategori || !tahun || !sumber || !description) {
      alert('⚠️ Harap lengkapi semua informasi dan pilih file Excel.');
      return;
    }

    setIsUploading(true);
    setProgress(25);

    try {
      const fields = Object.keys(excelData[0] || {});
      const metadata = {
        name,
        kategori,
        tahun,
        sumber,
        description,
        format: file.name.split('.').pop().toUpperCase(),
        ukuran: (file.size / 1024).toFixed(2) + ' KB',
        fields,
      };

      const tableResponse = await API.post('/tables', metadata);
      setProgress(60);

      const tableId = tableResponse.data._id;
      const dataWithFlatten = excelData.map((row) => ({ data: row }));
      await API.post(`/tables/data/${tableId}`, dataWithFlatten);
      setProgress(100);

      alert('✅ Tabel berhasil disimpan!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Upload gagal:', err);
      alert('❌ Gagal menyimpan file dan data.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <Container className="py-4">
      <Helmet>
        <title>Admin | Tambah Data Excel</title>
      </Helmet>
      <Card className="shadow-sm border-0 p-4">
        <div className="d-flex align-items-center mb-4">
          <FaFileExcel size={36} className="text-success me-3" />
          <div>
            <h3 className="mb-0">Tambah Data Excel</h3>
            <small className="text-muted">
              Unggah file Excel untuk membuat tabel baru
            </small>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Nama Tabel</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Data Penduduk 2025"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="kategori">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                  type="text"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Kependudukan"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="tahun">
                <Form.Label>Tahun</Form.Label>
                <Form.Control
                  type="text"
                  name="tahun"
                  value={form.tahun}
                  onChange={handleInputChange}
                  required
                  placeholder="2025 atau 2020 - 2025"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="sumber">
                <Form.Label>Sumber</Form.Label>
                <Form.Control
                  type="text"
                  name="sumber"
                  value={form.sumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Dinas Kependudukan dan Pencatatan Sipil"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Deskripsi Tabel</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleInputChange}
              required
              placeholder="Deskripsi singkat tentang data (opsional)"
              style={{
                minHeight: '300px',
                resize: 'vertical'
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="file">
            <Form.Label>Pilih File Excel</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <FaUpload size={24} className="text-primary" />
              <Form.Control
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                required
              />
            </div>
          </Form.Group>

          {progress > 0 && (
            <ProgressBar
              now={progress}
              label={`${progress}%`}
              animated
              variant={progress === 100 ? 'success' : 'info'}
              className="mb-3"
            />
          )}

          <Button
            variant="success"
            type="submit"
            disabled={isUploading}
            className="rounded-pill px-4"
          >
            {isUploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Mengunggah...
              </>
            ) : (
              <>
                <FaCheckCircle className="me-2" />
                Upload dan Simpan
              </>
            )}
          </Button>
        </Form>
      </Card>

      {excelData.length > 0 && (
        <Card className="mt-5 shadow-sm border-0">
          <Card.Header className="bg-success text-white d-flex align-items-center">
            <FaTable className="me-2" />
            <strong>Preview Data Excel</strong>
          </Card.Header>
          <Card.Body style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <Table striped bordered hover responsive size="sm" className="align-middle">
              <thead className="table-success text-center">
                <tr>
                  {Object.keys(excelData[0]).map((key, idx) => (
                    <th key={idx}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.slice(0, 10).map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            {excelData.length > 10 && (
              <Alert variant="info" className="mt-2 mb-0">
                Menampilkan <strong>10</strong> baris pertama dari{' '}
                <strong>{excelData.length}</strong> data.
              </Alert>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AddDataExcel;
