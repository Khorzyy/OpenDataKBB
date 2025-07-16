// File: src/pages/UploadExcelCreateTable.js

import React from 'react';
import * as XLSX from 'xlsx';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import './UploadExcelCreateTable.css';

const UploadExcelCreateTable = () => {
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (data.length === 0) {
        alert('File kosong.');
        return;
      }

      const fields = Object.keys(data[0]);
      const name = prompt('Masukkan nama tabel:');
      if (!name) return;

      try {
        const res = await API.post('/tables', { name, fields });
        const tableId = res.data._id;

        for (let entry of data) {
          await API.post(`/data/${tableId}`, entry);
        }

        alert('Tabel dan data berhasil dimasukkan!');
        navigate('/');
      } catch (err) {
        console.error('Gagal simpan:', err);
        alert('Terjadi kesalahan saat menyimpan.');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="upload-container">
      <h2>Upload Excel & Buat Tabel Sekaligus</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadExcelCreateTable;
