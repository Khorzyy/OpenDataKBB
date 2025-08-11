// controllers/catalogRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_URL = 'https://catalog.data.gov/api/3/action/package_search?q=environment';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching catalog data:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data dari Catalog Data API' });
  }
});

export default router;
