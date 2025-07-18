import axios from 'axios';

// BASE URL - ubah sesuai kebutuhan (localhost, production, dll)
const BASE_URL = 'http://localhost:3000/data/files.json';

/**
 * Ambil semua file dari backend.
 */
export const getAllFiles = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
    throw error;
  }
};

/**
 * Ambil satu file berdasarkan ID.
 * @param {number|string} id 
 */
export const getFileById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil file ID ${id}:`, error);
    throw error;
  }
};

/**
 * Hapus file berdasarkan ID.
 * @param {number|string} id 
 */
export const deleteFile = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Gagal menghapus file ID ${id}:`, error);
    throw error;
  }
};

/**
 * Perbarui file berdasarkan ID.
 * @param {number|string} id 
 * @param {object} data 
 */
export const updateFile = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Gagal memperbarui file ID ${id}:`, error);
    throw error;
  }
};
