import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FileEarmarkExcelFill } from 'react-bootstrap-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as XLSX from 'xlsx';
import { getFileById } from '../api/api';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [excelError, setExcelError] = useState(null);

  // Ambil detail berdasarkan ID
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const selected = await getFileById(id);
      if (!selected) {
        navigate('/not-found');
        return;
      }
      if (isMounted) setDetail(selected);
    };
    fetchData();
    return () => { isMounted = false; };
  }, [id, navigate]);

  // Baca isi file Excel
  useEffect(() => {
    const fetchExcel = async () => {
      try {
        if (!detail?.url?.endsWith('.xlsx')) return;

        setLoadingExcel(true);
        setExcelError(null);

        const response = await fetch(detail.url);

        if (!response.ok) {
          throw new Error(`Fetch gagal: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        setExcelData(jsonData);
      } catch (error) {
        setExcelError(error.message);
        console.error('Excel Error:', error);
      } finally {
        setLoadingExcel(false);
      }
    };

    if (detail?.url) {
      fetchExcel();
    }
  }, [detail]);

  if (!detail) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-5">
        <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
          ← Kembali
        </Button>

        <Card className="shadow border-0">
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <FileEarmarkExcelFill size={28} className="text-success me-2" />
              <h3 className="mb-0">{detail.nama}</h3>
            </div>

            <p className="text-muted">{detail.deskripsi}</p>

            <ul className="list-unstyled mb-4">
              <li><strong>Kategori:</strong> <Badge bg="info">{detail.kategori}</Badge></li>
              <li><strong>Tahun:</strong> {detail.tahun}</li>
              <li><strong>Sumber:</strong> {detail.sumber}</li>
              <li><strong>Format:</strong> {detail.format}</li>
              <li><strong>Ukuran File:</strong> {detail.ukuran}</li>
            </ul>

            <a href={detail.url} target="_blank" rel="noopener noreferrer">
              <Button variant="success">📥 Unduh File</Button>
            </a>

            {/* Loading Spinner */}
            {loadingExcel && (
              <div className="text-center mt-4">
                <Spinner animation="border" variant="secondary" />
                <p className="mt-2 text-muted">Membaca isi file Excel...</p>
              </div>
            )}

            {/* Tabel Data */}
            {!loadingExcel && excelData.length > 0 && (
              <div className="mt-4">
                <h5>Isi File Excel:</h5>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="table-light">
                      <tr>
                        {Object.keys(excelData[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((val, i) => (
                            <td key={i}>{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Error Excel */}
            {excelError && (
              <p className="mt-3 text-danger">⚠️ Gagal memuat file Excel: {excelError}</p>
            )}

            {/* Fallback jika kosong */}
            {!loadingExcel && excelData.length === 0 && !excelError && (
              <p className="mt-3 text-muted">📂 File Excel tidak berisi data yang bisa ditampilkan.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
