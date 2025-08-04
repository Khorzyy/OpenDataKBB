import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import Table from '../models/Table.js';
import Data from '../models/Data.js';
import mongoose from 'mongoose';
import ExcelJS from 'exceljs';

const router = express.Router();

// Konfigurasi multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ambil semua metadata file
/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Operasi terkait metadata tabel
 */

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Ambil semua metadata tabel
 *     tags: [Table]
 *     responses:
 *       200:
 *         description: Daftar semua metadata tabel
 */
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ambil metadata berdasarkan ID
/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     summary: Ambil metadata tabel berdasarkan ID
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID metadata tabel
 *     responses:
 *       200:
 *         description: Metadata ditemukan
 *       404:
 *         description: Metadata tidak ditemukan
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID tidak valid' });
  }

  const table = await Table.findById(id);
  if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });

  res.json(table);
});

// Upload file Excel dan parsing data
/**
 * @swagger
 * /api/tables/upload:
 *   post:
 *     summary: Upload file Excel dan parsing data
 *     tags: [Table]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Data dari file Excel berhasil diparsing
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memproses file' });
  }
});

// Simpan metadata ke database
/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Simpan metadata tabel ke database
 *     tags: [Table]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               kategori:
 *                 type: string
 *               tahun:
 *                 type: number
 *               sumber:
 *                 type: string
 *               format:
 *                 type: string
 *               ukuran:
 *                 type: string
 *               url:
 *                 type: string
 *               fields:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Metadata berhasil disimpan
 */
router.post('/', async (req, res) => {
  const table = new Table(req.body);
  try {
    const savedTable = await table.save();
    res.status(201).json(savedTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update metadata file
/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Update metadata tabel berdasarkan ID
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID metadata tabel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               kategori:
 *                 type: string
 *               tahun:
 *                 type: number
 *               sumber:
 *                 type: string
 *               description:
 *                 type: string
 *               format:
 *                 type: string
 *               ukuran:
 *                 type: string
 *     responses:
 *       200:
 *         description: Metadata berhasil diperbarui
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    res.json({ message: 'Data berhasil diperbarui', updated: updatedTable });
  } catch (err) {
    console.error('Gagal update metadata:', err);
    res.status(500).json({ error: 'Gagal memperbarui data' });
  }
});

// Hapus tabel
/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Hapus metadata tabel berdasarkan ID
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID metadata tabel
 *     responses:
 *       200:
 *         description: Metadata berhasil dihapus
 */ 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID tidak valid' });
  }

  try {
    // Hapus metadata dari koleksi Table
    const deletedTable = await Table.findByIdAndDelete(id);

    if (!deletedTable) {
      return res.status(404).json({ error: 'Tabel tidak ditemukan' });
    }

    // Hapus data terkait dari koleksi Data
    await Data.deleteMany({ tableId: id });

    res.status(200).json({ message: 'Tabel dan data berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus data:', err);
    res.status(500).json({ error: 'Gagal menghapus data' });
  }
});

// Simpan isi data ke collection Data
/**
 * @swagger
 * /data/{id}:
 *   post:
 *     summary: Menyimpan array data ke dalam tabel berdasarkan ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID tabel target
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               example:
 *                 nama: "John"
 *                 umur: 25
 *                 pekerjaan: "Programmer"
 *     responses:
 *       201:
 *         description: Data berhasil disimpan
 *       400:
 *         description: ID tidak valid
 *       500:
 *         description: Gagal menyimpan data
 */
router.post('/data/:id', async (req, res) => {
  const { id } = req.params;
  const dataArray = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID tidak valid' });
  }

  try {
    await Data.deleteMany({ tableId: id });
    const dataWithTableId = dataArray.map(item => ({ ...item, tableId: id }));
    const result = await Data.insertMany(dataWithTableId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menyimpan data' });
  }
});

// Ambil isi data berdasarkan ID tabel
/**
 * @swagger
 * /data/{id}:
 *   get:
 *     summary: Mengambil semua data berdasarkan ID tabel
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID tabel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: ID tidak valid
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/data/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID tidak valid' });
  }

  try {
    const data = await Data.find({ tableId: id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// unduh Data file excel
/**
 * @swagger
 * /{id}/download:
 *   get:
 *     summary: Mengunduh data dari tabel sebagai file Excel
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID tabel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil mengunduh file Excel
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: ID tidak valid
 *       404:
 *         description: Tabel atau data tidak ditemukan
 *       500:
 *         description: Gagal mengekspor data
 */
router.get('/:id/download', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID tidak valid' });
  }

  try {
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ error: 'Tabel tidak ditemukan' });
    }

    const data = await Data.find({ tableId: id });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Ambil data sebagai array of objects
    const rows = data.map(item => item.data);

    // Ambil semua header dari object pertama
    const headers = Object.keys(rows[0] || {}).map(key => ({
      header: key.toUpperCase(),
      key: key,
      style: { font: { bold: true } }
    }));

    worksheet.columns = headers;

    // Tambahkan data
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Tambahkan border ke semua cell
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Siapkan buffer untuk dikirim
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${table.name || 'table'}_${new Date().toISOString().slice(0, 10)}.xlsx"`
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Gagal mengekspor data:', err);
    res.status(500).json({ error: 'Gagal mengekspor data' });
  }
});


export default router;