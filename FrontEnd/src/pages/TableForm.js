import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ tambahkan useNavigate
import API from '../api/api';
import './TableForm.css';

const TableForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ inisialisasi navigator
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        API.get(`/tables`).then(res => {
            const table = res.data.find(t => t._id === id);
            if (table) setFields(table.fields);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/data/${id}`, formData);
            alert('Data berhasil disimpan!');
            navigate('/'); // ✅ kembali ke halaman utama
        } catch (err) {
            console.error('Gagal menyimpan data:', err);
            alert('Terjadi kesalahan saat menyimpan.');
        }
    };

    return (
        <div className="table-form-container">
            <h2>Isi Data</h2>
            <form onSubmit={handleSubmit}>
                {fields.map((field, i) => (
                    <div key={i}>
                        <label>{field}</label>
                        <input
                            type="text"
                            value={formData[field] || ''}
                            onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                            required
                        />
                    </div>
                ))}
                <button type="submit">Kirim</button>
            </form>
        </div>
    );
};

export default TableForm;
