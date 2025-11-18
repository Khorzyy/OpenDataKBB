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
import '../pages/TableDataView.css';
import { Helmet } from 'react-helmet';

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [tableInfo, setTableInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

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

            if (!response.ok) throw new Error('Gagal mengunduh file');

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
        navigate('/admin/dashboard');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Membuat pagination dinamis dengan ...
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
        <Container className="mt-4">
            <Helmet>
                <title>{tableInfo.name || 'Admin | Detail Tabel'}</title>
            </Helmet>
            <Button
                variant="secondary"
                onClick={handleBack}
                className="floating-back-btn"
            >
                ← Kembali
            </Button>

            <Card className="mb-3 shadow-sm border-start border-4 border-primary bg-light-subtle">
                <Card.Body>
                    <Card.Title className="h4 mb-3 text-primary fw-semibold">
                        📊 {tableInfo.name || 'Nama Tabel Tidak Ditemukan'}
                    </Card.Title>

                    <div className="row text-muted small">
                        {tableInfo.tahun && (
                            <div className="col-md-4 mb-2">
                                <strong>📅 Tahun:</strong> {tableInfo.tahun}
                            </div>
                        )}
                        {tableInfo.kategori && (
                            <div className="col-md-4 mb-2">
                                <strong>🏷️ Kategori:</strong> {tableInfo.kategori}
                            </div>
                        )}
                        {tableInfo.sumber && (
                            <div className="col-md-4 mb-2">
                                <strong>📚 Sumber:</strong> {tableInfo.sumber}
                            </div>
                        )}
                    </div>
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
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                {Object.keys(tableData[0].data).map((key, index) => (
                                    <th key={index}>{key}</th>
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-3">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(1)}>
                                            «
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                            &lt;
                                        </button>
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
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                            &gt;
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                                            »
                                        </button>
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