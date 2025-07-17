import express from 'express';
import Table from '../models/Table.js';
import TableData from '../models/TableData.js';

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

router.get('/:id', async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });
  res.json(table);
});


export default router;
