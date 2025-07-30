import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import {
  Container,
  Card,
  Button,
  Table,
  Alert,
  Spinner,
} from 'react-bootstrap';
import './TableDataView.css'; // untuk styling tombol mengambang

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [tableInfo, setTableInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataRes, infoRes] = await Promise.all([
          API.get(`/data/${id}`),
          API.get(`/tables/${id}`),
        ]);
        setTableData(dataRes.data);
        setTableInfo(infoRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Gagal memuat data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tables/${id}/download`
      );

      if (!response.ok) {
        throw new Error('Gagal mengunduh file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `${tableInfo.name || 'tabel'}_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert('Gagal mengunduh file');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4">
      {/* Tombol Kembali mengambang */}
      <Button
        variant="secondary"
        onClick={handleBack}
        className="floating-back-btn"
      >
        ← Kembali
      </Button>

      <Card className="mb-3 shadow">
        <Card.Body>
          <Card.Title className="h4">
            {tableInfo.name || 'Nama Tabel Tidak Ditemukan'}
          </Card.Title>
        </Card.Body>
      </Card>

      <div className="mb-3">
        <h5>Deskripsi:</h5>
        <p>{tableInfo.description || '-'}</p>
      </div>

      <div className="mb-4">
        <Button variant="primary" onClick={handleDownload} className="me-2">
          Download Excel
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Memuat data...</p>
        </div>
      ) : tableData.length === 0 ? (
        <Alert variant="warning">Tidak ada data.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {Object.keys(tableData[0].data).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => (
              <tr key={i}>
                {Object.values(item.data).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DetailPage;
