// components/DataCard.js
import { Card, Badge, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/document.jpg'; // ✅ Import gambar default
import '../styles/DataCard.css'
function DataCard({ id, title, description, image }) {
  const navigate = useNavigate();

  return (
    <Card
      className="mb-4 border-0 shadow-sm data-card h-100"
      onClick={() => navigate(`/detail/${id}`)}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
      }}
    >
     <Card.Body className="glass-card">
  <Row className="g-3 align-items-center">
  {/* Kolom Gambar */}
  <Col xs={4} md={3} className="d-flex">
    <div
      style={{
        width: '100%',
        maxWidth: '120px',   // ✅ Batas ukuran biar konsisten
        aspectRatio: '1 / 1', // ✅ Selalu kotak
        borderRadius: '10px',
        overflow: 'hidden',
        flexShrink: 0
      }}
    >
      <Image
        src={image || defaultImage}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  </Col>

  {/* Kolom Teks */}
  <Col xs={8} md={9} className="d-flex flex-column justify-content-center">
    <div className="d-flex justify-content-between align-items-start">
      <Card.Title className="mb-0 text-truncate">{title}</Card.Title>
      <Badge bg="light" text="success" pill>
        Lihat Detail
      </Badge>
    </div>
    <Card.Text className="text-muted small mt-2">
      {description}
    </Card.Text>
  </Col>
</Row>


</Card.Body>

    </Card>
  );
}

export default DataCard;
