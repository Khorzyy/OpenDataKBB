// src/pages/DataSet.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button, Form, InputGroup } from 'react-bootstrap';
import { getAllFiles } from '../api/api';
import DataSetCard from '../components/DataSetCard';
import '../styles/DataSet.css';
import { FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function DataSet() {
    const [dataSet, setDataSet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [allData, setAllData] = useState([]);

    const limit = 12; // jumlah card per halaman

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        updatePagination();
    }, [page, search, allData]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getAllFiles();
            setAllData(res);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const updatePagination = () => {
        // filter berdasarkan search
        const filtered = allData.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        setTotalPages(Math.ceil(filtered.length / limit));
        const start = (page - 1) * limit;
        const end = start + limit;
        setDataSet(filtered.slice(start, end));
    };

    const goToPage = (num) => {
        if (num >= 1 && num <= totalPages) {
            setPage(num);
        }
    };

    return (
        <Container className="py-4">
            <Helmet>
                <title>DataSet - OpenDataKBB</title>
            </Helmet>
            <h2 className="fw-bold mb-3 text-center">Daftar Dataset</h2>
            <p className="text-center text-muted mb-4">
                Kumpulan data lengkap yang tersedia pada platform Open Data.
            </p>


            {/* Search */}
            <Form className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Cari dataset..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && setPage(1)}
                    />
                    <Button
                        variant="primary"
                        onClick={() => setPage(1)} // reset page ke 1 saat klik search
                    >
                        <FaSearch />
                    </Button>
                </InputGroup>
            </Form>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading data...</p>
                </div>
            ) : dataSet.length === 0 ? (
                <p className="text-center text-muted">Data tidak ditemukan.</p>
            ) : (
                <Row xs={1} className="g-4">
                    {dataSet.map((item) => (
                        <Col key={item._id}>
                            <DataSetCard
                                id={item._id}
                                name={item.name}
                                kategori={item.kategori}
                                tahun={item.tahun}
                                sumber={item.sumber}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination-container d-flex justify-content-center align-items-center gap-2 mt-4">
                    <Button variant="outline-primary" size="sm" onClick={() => goToPage(page - 1)} disabled={page === 1}>
                        &lt;&lt;
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i}
                            variant={page === i + 1 ? 'primary' : 'outline-primary'}
                            size="sm"
                            onClick={() => goToPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <Button variant="outline-primary" size="sm" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
                        &gt;&gt;
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default DataSet;
