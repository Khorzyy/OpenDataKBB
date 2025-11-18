import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginAdmin.css';
import { Helmet } from 'react-helmet';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      const { token } = res.data;

      // save token to localStorage 
      const expiryTime = Date.now() + 30 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', expiryTime);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal login, periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Admin | Login</title>
      </Helmet>

      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card p-4">
          <Card.Body>
            <h2 className="text-center mb-4 login-title">🔒 Admin Login</h2>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-pill px-3"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-pill px-3"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100 rounded-pill fw-bold shadow-sm"
              >
                {loading ? 'Memproses...' : 'Masuk Admin'}
              </Button>
            </Form>

            <p className="text-center mt-4 small text-muted">
              © {new Date().getFullYear()} Admin Panel — All Rights Reserved
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginAdmin;
