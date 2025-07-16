import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import './CreateTable.css';

const CreateTable = () => {
    const [name, setName] = useState('');
    const [fields, setFields] = useState(['']);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/tables', { name, fields });
        navigate('/');
    };

    const addField = () => setFields([...fields, '']);
    const updateField = (i, val) => {
        const newFields = [...fields];
        newFields[i] = val;
        setFields(newFields);
    };

    return (
        <div className="create-container">
            <h2 className="form-title">Buat Tabel Baru</h2>
            <form onSubmit={handleSubmit} className="create-form">
                <input
                    className="input-field"
                    placeholder="Nama Tabel"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <h4 className="field-label">Fields:</h4>
                {fields.map((field, i) => (
                    <input
                        key={i}
                        className="input-field"
                        placeholder={`Field ${i + 1}`}
                        value={field}
                        onChange={e => updateField(i, e.target.value)}
                        required
                    />
                ))}

                <button type="button" className="btn-secondary" onClick={addField}>
                    + Tambah Field
                </button>
                <br />
                <button type="submit" className="btn-primary">
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default CreateTable;
