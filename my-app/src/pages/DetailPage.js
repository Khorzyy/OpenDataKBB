import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FileEarmarkExcelFill } from 'react-bootstrap-icons';
import Footer from '../components/Footer';
import { getFileById } from '../api/api';
import '../styles/Detail.css';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [excelError, setExcelError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 15;
  const totalPages = Math.ceil(excelData.length / rowsPerPage);
  const currentRows = excelData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Ambil detail file
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const selected = await getFileById(id);
      if (!selected) {
        navigate('/NotFound');
        return;
      }
      if (isMounted) setDetail(selected);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  // Baca isi file Excel pakai Web Worker
  useEffect(() => {
    const fetchFile = async () => {
      if (!detail?.url) return;

      const format = detail.format?.toLowerCase() || '';
      const urlLower = detail.url.toLowerCase();
      const isExcel = urlLower.includes('.xlsx') || urlLower.includes('.xls') || format.includes('excel');
      const isCSV = urlLower.includes('.csv') || format.includes('csv');

      if (!isExcel && !isCSV) return;

      try {
        setLoadingExcel(true);
        setExcelError(null);

        const response = await fetch(detail.url);
        if (!response.ok) throw new Error(`Fetch gagal: ${response.status}`);
        const buffer = await response.arrayBuffer();

        // Jalankan worker
        const worker = new Worker(new URL('../workers/excelWorker.js', import.meta.url));
        worker.postMessage({ buffer, type: isCSV ? 'csv' : 'excel' });

        worker.onmessage = (e) => {
          const { success, data, error } = e.data;
          if (success) {
            setExcelData(data);
          } else {
            setExcelError(error);
          }
          setLoadingExcel(false);
          worker.terminate();
        };
      } catch (error) {
        setExcelError(error.message);
        setLoadingExcel(false);
      }
    };

    fetchFile();
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
      <Container className="py-5 detail-page">
        <div className="animated-bg"></div>
        <div className="floating-shapes"></div>

        {/* Tombol Kembali */}
        <Button
  variant="secondary"
  className="mb-4 custom-btn-outline"
  onClick={() => navigate('/')}
>
  ← Kembali
</Button>

        <Card className="shadow border-0 glass-card text-white">
          <Card.Body>
            {/* Header Dokumen */}
            <div className="d-flex align-items-center mb-3">
              <FileEarmarkExcelFill size={28} className="text-success me-2" />
              <h3 className="mb-0">{detail.nama}</h3>
            </div>
            <p className="text-light">{detail.deskripsi}</p>

            {/* Info File */}
            <ul className="list-unstyled mb-4">
              <li><strong>Kategori:</strong> <Badge bg="info">{detail.kategori}</Badge></li>
              <li><strong>Tahun:</strong> {detail.tahun}</li>
              <li><strong>Sumber:</strong> {detail.sumber}</li>
              <li><strong>Format:</strong> {detail.format}</li>
              <li><strong>Ukuran File:</strong> {detail.ukuran}</li>
            </ul>

            {/* Tombol Unduh */}
            <a href={detail.url} target="_blank" rel="noopener noreferrer">
              <Button variant="success">Unduh File</Button>
            </a>

            {/* Loading Spinner */}
            {loadingExcel && (
              <div className="text-center mt-4">
                <Spinner animation="border" variant="light" />
                <p className="mt-2 text-light">Membaca isi file...</p>
              </div>
            )}

            {/* Tabel Data Excel */}
            {!loadingExcel && excelData.length > 0 && (
              <div className="mt-5">
                <h5 className="mb-3">Isi File Excel:</h5>
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
                      {currentRows.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((val, i) => (
                            <td key={i}>{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Navigasi Halaman */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button
                    variant="outline-light"
                    className="custom-btn-outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    ← Sebelumnya
                  </Button>

                  <span className="text-muted">
                    Halaman {currentPage} dari {totalPages}
                  </span>

                  <Button
                    variant="outline-light"
                    className="custom-btn-outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Selanjutnya →
                  </Button>
                </div>
              </div>
            )}

            {/* Error */}
            {excelError && (
              <p className="mt-3 text-danger">
                ⚠️ Gagal memuat file Excel: {excelError}
              </p>
            )}

            {/* Kosong */}
            {!loadingExcel && excelData.length === 0 && !excelError && (
              <p className="mt-3 text-muted">
                File Excel tidak berisi data yang bisa ditampilkan.
              </p>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
