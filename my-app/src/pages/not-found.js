import {
  Container,
  Spinner,
  Button,
  Row,
  Col,
  Alert,
  Badge,
  Form,
} from 'react-bootstrap';

function NotFound() {
  return (
    <div className="custom-div shadow-sm d-flex h-100 w-100 justify-content-center align-items-center bg-danger text-light">
      <p>404 Halaman Tidak Ditemukan</p>
    </div>
  );
}

export default NotFound;
