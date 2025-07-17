// components/DataCard.js
import { Card } from 'react-bootstrap';
import { FileEarmarkExcelFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function DataCard({ id, title, description }) {
  const navigate = useNavigate();

  return (
    <Card
      className="mb-4 shadow-sm border-0"
      onClick={() => navigate(`/detail/${id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <FileEarmarkExcelFill className="me-2 text-success" size={24} />
          <Card.Title className="mb-0">{title}</Card.Title>
        </div>
        <Card.Text className="text-muted">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DataCard;
