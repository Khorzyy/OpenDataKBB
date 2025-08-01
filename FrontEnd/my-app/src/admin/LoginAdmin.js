import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginAdmin.css'; // ⬅️ custom styling

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      const { token } = res.data;

      localStorage.setItem('token', token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal login');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Card className="login-card">
          <Card.Body>
            <h2 className="text-center mb-4 login-title">🔒 Admin Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="akun@gmail.com"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-pill px-3"
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 rounded-pill fw-bold">
                Masuk Admin
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default LoginAdmin;