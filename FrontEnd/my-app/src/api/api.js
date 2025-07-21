import axios from 'axios';

// Ganti dengan IPv4 address aktual, misalnya: http://192.168.1.42:5000
const BASE_URL = 'http://10.42.1.73:5000/public/data/files.json';

/**
 * Ambil semua file dari backend (file statis JSON).
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

export async function getFileById(id) {
  const all = await getAllFiles();
  return all.find((item) => item.id === id);
}


