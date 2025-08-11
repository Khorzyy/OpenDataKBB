import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert,
} from 'react-bootstrap';
import * as XLSX from 'xlsx';

function AddDataExcel() {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.xlsx')) {
      setError('Hanya file Excel (.xlsx) yang diperbolehkan.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      setError('');
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    if (!fileName || !description) {
      setError('Nama file dan deskripsi wajib diisi.');
      return;
    }

    if (excelData.length === 0) {
      setError('Tidak ada data Excel yang dibaca.');
      return;
    }

    const payload = {
      nama: fileName,
      deskripsi: description,
      data: excelData,
    };

    console.log('Data yang akan dikirim:', payload);
    alert('Data berhasil diunggah (dummy)');

    setFileName('');
    setDescription('');
    setExcelData([]);
    setError('');
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-4"> Tambah Data via Excel</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Nama File</Form.Label>
          <Form.Control
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Unggah File Excel (.xlsx)</Form.Label>
          <Form.Control
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
          />
        </Form.Group>

        {excelData.length > 0 && (
          <>
            <h6 className="mt-4">📄 Preview Data Excel:</h6>
            <div className="table-responsive mb-3">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Button variant="success" onClick={handleSubmit}>
              Simpan Data
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}

export default AddDataExcel;
