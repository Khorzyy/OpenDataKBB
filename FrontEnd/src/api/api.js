import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('/files.json');
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
    return [];
  }
};
