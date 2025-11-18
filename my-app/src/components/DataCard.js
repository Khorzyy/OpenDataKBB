// components/DataCard.js
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDatabase } from 'react-icons/fa';
import '../styles/DataCard.css';

function DataCard({ id, name, tahun, sumber, kategori }) {
  return (
    <Card className="data-card-custom shadow-sm">
      <div className="d-flex align-items-start gap-3 p-3">

        {/* ICON BULAT */}
        <div className="data-icon-wrapper">
          <FaDatabase size={20} />
        </div>

        {/* KONTEN */}
        <div className="flex-grow-1">
          <h5 className="fw-semibold mb-1 text-dark fs-6">{name}</h5>
          <div className="metadata small mb-3">
            <span className='me-2'>
              <strong>Kategori:</strong> {kategori || '-'}
            </span>
            <span >
              <strong>Tahun:</strong> {tahun || '-'}
            </span>
            <br />
            <span>
              <strong>Sumber:</strong> {sumber || '-'}
            </span>
          </div>

          {/* BUTTON */}
          <Link to={`/detail/${id}`}>
            <Button size="sm" className="detail-btn">
              Lihat Detail
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default DataCard;
