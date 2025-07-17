import axios from 'axios';

export const getAllFiles = async () => {
  const response = await axios.get('/data/files.json'); // axios dipakai di sini
  return response.data;
};

export const getFileById = async (id) => {
  const files = await getAllFiles();
  return files.find((item) => item.id === parseInt(id));
};
