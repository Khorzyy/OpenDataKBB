import { Card, Badge } from 'react-bootstrap';
import { FileEarmarkExcelFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function DataCard({ id, name, description, tahun, sumber }) {
  const navigate = useNavigate();

  return (
    <Card
      className="mb-4 shadow-sm border-0"
      onClick={() => navigate(`/detail/${id}`)}
      style={{
        cursor: 'pointer',
        backgroundColor: '#3b3f47',
        color: '#fff',
        borderRadius: '12px',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <FileEarmarkExcelFill className="me-2 text-success" size={26} />
          <Card.Title className="mb-0">{name}</Card.Title>
        </div>

        <Card.Text style={{ fontSize: '0.95rem' }}>
          {description}
        </Card.Text>

        <div className="d-flex justify-content-between mt-3">
          <Badge bg="light" text="dark">{tahun}</Badge>
          <Badge bg="light" text="dark">{sumber}</Badge>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DataCard;