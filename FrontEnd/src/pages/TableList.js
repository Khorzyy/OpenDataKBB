import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import './TableList.css';

const TableList = () => {
    const [tables, setTables] = useState([]);

    const fetchTables = async () => {
        const res = await API.get('/tables');
        setTables(res.data);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus tabel ini beserta semua datanya?')) {
            await API.delete(`/tables/${id}`);
            fetchTables(); // Refresh setelah delete
        }
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>
            <p><strong>Total Tabel:</strong> {tables.length}</p>
            <div className="action-buttons">
                <Link className="btn-primary" to="/create">+ Buat Tabel Manual</Link>
                <Link className="btn-secondary" to="/upload-excel">⬆️ Upload Excel + Buat Tabel</Link>
            </div>

            <ul className="table-list">
                {tables.map(t => (
                    <li key={t._id} className="table-item">
                        <b>{t.name}</b><br />
                        <Link to={`/form/${t._id}`}>📝 Isi Data</Link> |
                        <Link to={`/data/${t._id}`}>📄 Lihat Data</Link> |
                        <button className="btn-delete" onClick={() => handleDelete(t._id)}>🗑️ Hapus</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableList;
