import express from 'express';
import TableData from '../models/TableData.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Table Data
 *   description: API untuk manajemen data dalam tabel
 */

/**
 * @swagger
 * /api/data/{tableId}:
 *   post:
 *     summary: Simpan data ke tabel tertentu
 *     tags: [Table Data]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID tabel target
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nama: "John Doe"
 *               umur: 30
 *     responses:
 *       200:
 *         description: Data berhasil ditambahkan
 *       500:
 *         description: Gagal menyimpan data
 */
router.post('/:tableId', async (req, res) => {
  try {
    const entry = new TableData({
      tableId: req.params.tableId,
      data: req.body
    });
    await entry.save();
    res.status(200).json({ message: 'data terkait berhasil ditambahkan.', data: entry });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menyimpan data' });
  }
});

/**
 * @swagger
 * /api/data/{tableId}:
 *   get:
 *     summary: Ambil semua data berdasarkan tableId
 *     tags: [Table Data]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID tabel
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/:tableId', async (req, res) => {
  try {
    const entries = await TableData.find({ tableId: req.params.tableId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

/**
 * @swagger
 * /api/data/{tableId}/{id}:
 *   put:
 *     summary: Update data berdasarkan tableId dan objectId
 *     tags: [Table Data]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nama: "John Updated"
 *               umur: 31
 *     responses:
 *       200:
 *         description: Data berhasil diupdate
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Gagal mengupdate data
 */
router.put('/:tableId/:id', async (req, res) => {
  try {
    const updated = await TableData.findByIdAndUpdate(
      req.params.id,
      { data: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    res.status(200).json({ message: 'data terkait berhasil diupdate.', updated });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengupdate data' });
  }
});

/**
 * @swagger
 * /api/data/{tableId}/{id}:
 *   delete:
 *     summary: Hapus data berdasarkan ID
 *     tags: [Table Data]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Gagal menghapus data
 */
router.delete('/:tableId/:id', async (req, res) => {
  try {
    const deleted = await TableData.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    res.status(200).json({ message: 'data terkait berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus data' });
  }
});

/**
 * @swagger
 * /api/data/{tableId}/{id}:
 *   get:
 *     summary: Ambil data spesifik berdasarkan tableId dan ID
 *     tags: [Table Data]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/:tableId/:id', async (req, res) => {
  try {
    const entry = await TableData.findOne({ tableId: req.params.tableId, _id: req.params.id });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

export default router;