import { Container, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light text-dark"
      style={{
        height: "88vh",
        width: "100vw",
        background: "linear-gradient(135deg, #dc3545, #ff6b6b)",
      }}
    >
      <Helmet>
        <title>404 | Halaman Tidak Ditemukan</title>
      </Helmet>

      <Container className="text-center">
        <h1 className="display-3 fw-bold text-white mb-3">404</h1>
        <h4 className="text-white-50 mb-4">Halaman Tidak Ditemukan</h4>
        <p className="text-white mb-4">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Button
          variant="light"
          className="fw-semibold px-4 py-2 shadow-sm"
          onClick={() => navigate("/")}
        >
          Kembali ke Beranda
        </Button>
      </Container>
    </div>
  );
}

export default NotFound;
