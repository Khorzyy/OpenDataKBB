import express from 'express';
import TableData from '../models/TableData.js'; // ✅ Fix error

const router = express.Router();

// Simpan data ke tabel tertentu
router.post('/:tableId', async (req, res) => {
  try {
    const entry = new TableData({
      tableId: req.params.tableId,
      data: req.body
    });
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error('Gagal menyimpan data:', err);
    res.status(500).json({ error: 'Gagal menyimpan data' });
  }
});

// Ambil semua data berdasarkan tableId
router.get('/:tableId', async (req, res) => {
  try {
    const entries = await TableData.find({ tableId: req.params.tableId });
    res.json(entries);
  } catch (err) {
    console.error('Gagal mengambil data:', err);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

export default router;
