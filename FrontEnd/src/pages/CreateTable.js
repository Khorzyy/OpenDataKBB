import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
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
        const updated = [...fields];
        updated[i] = val;
        setFields(updated);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (json.length > 0) {
                const headers = json[0];
                setFields(headers.map(h => h.toString()));
            }
        };

        reader.readAsBinaryString(file);
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

                <label className="upload-label">
                    Atau Upload Excel (untuk otomatis isi field):
                </label>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="input-file"
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
