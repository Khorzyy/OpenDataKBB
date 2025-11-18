// src/pages/CreateAccount.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');

            const response = await axios.post(
                'http://localhost:5000/api/admin/register',
                { email, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccessMsg(response.data.message);
            setErrorMsg('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Gagal membuat akun admin.');
            setSuccessMsg('');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Helmet>
                <title>Admin | Buat Akun</title>
            </Helmet>
            <Card style={{ width: '400px', padding: '20px' }}>
                <h3 className="text-center mb-4">Buat Akun Admin Baru</h3>
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="w-100" variant="primary">
                        Daftar Admin
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

export default CreateAccount;
