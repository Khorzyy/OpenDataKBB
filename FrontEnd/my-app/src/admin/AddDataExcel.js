import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';

const AddDataExcel = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [excelData, setExcelData] = useState([]);
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
    if (!file || !name || !kategori || !tahun || !sumber) {
      alert('Harap lengkapi semua informasi dan pilih file Excel.');
      return;
    }

    setIsUploading(true);

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
      const tableId = tableResponse.data._id;

      const dataWithFlatten = excelData.map(row => ({ data: row }));
      await API.post(`/tables/data/${tableId}`, dataWithFlatten);

      alert('Tabel berhasil disimpan!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Upload gagal:', err);
      alert('Gagal menyimpan file dan data.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Tambah Data</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Nama Tabel</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="kategori">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                name="kategori"
                value={form.kategori}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="tahun">
              <Form.Label>Tahun</Form.Label>
              <Form.Control
                type="text"
                name="tahun"
                value={form.tahun}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sumber">
              <Form.Label>Sumber</Form.Label>
              <Form.Control
                type="text"
                name="sumber"
                value={form.sumber}
                onChange={handleInputChange}
                required
                autoComplete="off"
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
            placeholder="Deskripsi (opsional)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="file">
          <Form.Label>Pilih File Excel</Form.Label>
          <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isUploading}>
          {isUploading ? (
            <>
              <Spinner animation="border" size="sm" /> Mengunggah...
            </>
          ) : (
            'Upload dan Simpan'
          )}
        </Button>
      </Form>

      {excelData.length > 0 && (
        <>
          <h4 className="mt-5">Preview Data Excel</h4>
          <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <Table striped bordered hover size="sm">
              <thead>
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
              <Alert variant="info">Menampilkan 10 baris pertama dari {excelData.length} data.</Alert>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default AddDataExcel;
