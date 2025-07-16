import express from 'express';
import Table from '../models/Table.js';
import TableData from '../models/TableData.js'; // ✅ ini yang tadi error karena belum ada

const router = express.Router();

router.post('/', async (req, res) => {
  const table = new Table(req.body);
  await table.save();
  res.json(table);
});

router.get('/', async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus tabel
    await Table.findByIdAndDelete(id);

    // Hapus semua data yang terkait dengan tabel tersebut
    await TableData.deleteMany({ tableId: id });

    res.status(200).json({ message: 'Tabel dan data terkait berhasil dihapus.' });
  } catch (err) {
    console.error('Gagal menghapus:', err);
    res.status(500).json({ error: 'Gagal menghapus tabel.' });
  }
});

export default router;
