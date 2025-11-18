// src/pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import {
  Container,
  Card,
  Button,
  Table,
  Spinner,
  Badge,
  Alert
} from 'react-bootstrap';
import './TableDataView.css';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaCalendar, FaTag, FaBook, FaDownload } from 'react-icons/fa';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [tableInfo, setTableInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

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

  useEffect(() => {
    document.title = tableInfo.name || 'Loading...';
  }, [tableInfo]);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tables/${id}/download`
      );
      if (!response.ok) throw new Error('Gagal mengunduh file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tableInfo.name || 'tabel'}_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert('Gagal mengunduh file');
    }
  };

  const handleBack = () => navigate('/dataset');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages - 1) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <Container className="py-4">
      <Helmet>
        <title>{tableInfo.name}</title>
      </Helmet>

      <Button
        variant="outline-secondary"
        onClick={handleBack}
        className="mb-3"
      >
        <FaArrowLeft className="me-1" /> Kembali
      </Button>

      <Card className="mb-4 shadow-sm border-start border-4 border-primary">
        <Card.Body>
          <h3 className="fw-bold text-primary mb-3">📊 {tableInfo.name}</h3>
          <div className="d-flex flex-wrap gap-3 text-muted mb-3">
            {tableInfo.tahun && (
              <Badge bg="info">
                <FaCalendar className="me-1" /> {tableInfo.tahun}
              </Badge>
            )}
            {tableInfo.kategori && (
              <Badge bg="success">
                <FaTag className="me-1" /> {tableInfo.kategori}
              </Badge>
            )}
            {tableInfo.sumber && (
              <Badge bg="warning" text="dark">
                <FaBook className="me-1" /> {tableInfo.sumber}
              </Badge>
            )}
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>
            {tableInfo.description || '-'}
          </p>
          <Button variant="primary" onClick={handleDownload}>
            <FaDownload className="me-1" /> Download Excel
          </Button>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p>Memuat data...</p>
        </div>
      ) : tableData.length === 0 ? (
        <Alert variant="warning">Tidak ada data.</Alert>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded mb-4">
            <Table striped bordered hover responsive>
              <thead className="table-primary">
                <tr>
                  {Object.keys(tableData[0].data).map((key, i) => (
                    <th key={i}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, i) => (
                  <tr key={i}>
                    {Object.values(item.data).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>«</button>
                  </li>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                  </li>

                  {getPageNumbers().map((num, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === num ? 'active' : ''} ${num === '...' ? 'disabled' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => typeof num === 'number' && handlePageChange(num)}
                      >
                        {num}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>»</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default DetailPage;