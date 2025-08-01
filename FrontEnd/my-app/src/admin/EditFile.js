import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { getAllFiles, updateFile } from '../api/api'; // pastikan getAllFiles dan updateFile valid
import { FaEdit } from 'react-icons/fa';

function EditFile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        tahun: '',
        description: '',
        kategori: '',
        sumber: '',
        format: '',
        ukuran: '',
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // ✅ fungsi bantu: ambil file berdasarkan ID
    const getFileById = async (fileId) => {
        try {
            const allFiles = await getAllFiles();
            const file = allFiles.find((item) => String(item._id) === String(fileId));
            if (!file) {
                throw new Error('Data tidak ditemukan');
            }
            return file;
        } catch (err) {
            console.error('Gagal mengambil file:', err);
            throw err;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const file = await getFileById(id);
                setFormData(file);
            } catch (err) {
                setError('Gagal mengambil data.', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            await updateFile(id, formData);
            setSuccess('Data berhasil diperbarui.');
            setTimeout(() => navigate('/admin/dashboard'), 1500);
        } catch (err) {
            setError('Gagal menyimpan perubahan.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="py-5 min-vh-100" style={{ background: '#f5f7fa' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="p-4 shadow-sm border-0 rounded-4 bg-white">
                            <h3 className="fw-bold mb-4">
                                <FaEdit className="me-2 text-primary" />
                                Edit Data
                            </h3>

                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" variant="info" />
                                </div>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Tahun</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="tahun"
                                            value={formData.tahun}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Deskripsi</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Kategori</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="kategori"
                                            value={formData.kategori}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Sumber</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="sumber"
                                            value={formData.sumber}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Row>
                                        < Col md='6'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Format</Form.Label>
                                                <div className="form-control-plaintext">{formData.format || '-'}</div>
                                            </Form.Group>

                                        </Col>
                                        < Col md='6'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ukuran</Form.Label>
                                                <div className="form-control-plaintext">{formData.ukuran || '-'}</div>
                                            </Form.Group>
                                        </Col>

                                    </Row>


                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {success && <Alert variant="success">{success}</Alert>}

                                    <div className="d-flex justify-content-between">
                                        <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
                                            Kembali
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={saving}>
                                            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default EditFile;