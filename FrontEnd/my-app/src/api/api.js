// src/api/api.js
import axios from 'axios';

// Base API atau api awal sebelum di tammbahkan pakai /tables atau /data/:id(untuk id table yang dipilih)
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// GET: Semua tabel (metadata file)
export const getAllFiles = async () => {
  const response = await API.get('/tables');
  return response.data;
};

// GET: Data detail dari tabel tertentu
export const getFileById = async (id) => {
  try {
    const response = await API.get(`/data/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file by ID:', error);
    return null;
  }
};

// PUT: Update metadata file
export const updateFile = async (id, updatedData) => {
  const response = await API.put(`/tables/${id}`, {
    name: updatedData.name,
    tahun: updatedData.tahun,
    description: updatedData.description,
    sumber: updatedData.sumber,
  });
  return response.data;
};

// DELETE: Menghapus data/tabel yang dipilih
export const deleteFile = async (id, deleteData) => {
  try {
    const response = await API.delete(`/tables/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error Deleted File by ID`, error);
    return null;
  }
}

// GET: Isi data dari tabel
export const getTableDataById = async (id) => {
  try {
    const response = await axios.get(`/api/data/${id}`);
    return response.data.data; // langsung ambil array-nya
  } catch (error) {
    console.error('Gagal mengambil isi data tabel:', error);
    return [];
  }
};


export default API;