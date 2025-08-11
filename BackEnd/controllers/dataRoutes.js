import express from 'express';
import TableData from '../models/TableData.js';
import Table from '../models/Table.js'

const router = express.Router();

// Simpan data ke tabel tertentu
router.post('/:tableId', async (req, res) => {
  try {
    const entry = new TableData({
      tableId: req.params.tableId,
      data: req.body
    });
    await entry.save();
    res.status(200).json({ 
      message: 'data terkait berhasil ditambahkan.',
      data: entry
    });
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

// mengupdate berdasarkan tableId dan objectId dan mengupdate salah satu data
router.put('/:tableId/:id', async (req, res) => {
  try{
    const updated = await TableData.findByIdAndUpdate(
      req.params.id,
      { data: req.body },
      { new: true }
    );

    if(!updated) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    res.status(200).json({ message: 'data terkait berhasil diupdate.', updated });
  } catch (err){
    console.error(`Gagal mengupdate data:`, err);
    res.status(500).json({ error: `Gagal mengupdate data` })
  }
});

// menghapus data yang ada di dalam tabel sesuai dengan data yang akan dihapus
router.delete('/:tableId/:id' , async (req, res) => {
  try{
    const deleted = await TableData.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(404).json({ error: `Data tidak ditemukan `});
    }

    res.status(200).json({ message: 'data terkait berhasil dihapus.' });
  } catch (err){
    console.error(`Gagal menghapus data:`, err);
    res.status(500).json({ error: `Gagal menghapus data`})
  }
})

// mengambil data yang specifik
router.get('/:tableId/:id', async (req, res) => {
  try {
    const entries = await TableData.findOne({ tableId: req.params.tableId, _id: req.params.id });
    res.json(entries);
  } catch (err) {
    console.error('Gagal mengambil data:', err);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});
export default router;