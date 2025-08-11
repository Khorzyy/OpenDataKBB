// tableRouter.js
import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import Table from '../models/Table.js';
import Data from '../models/Data.js';
import mongoose from 'mongoose';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const router = express.Router();

/* -------------------------
   📌 Multer Disk Storage
--------------------------*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error('Hanya file Excel yang diperbolehkan!'));
    }
    cb(null, true);
  }
});

/* -------------------------
   📌 GET: Semua metadata
--------------------------*/
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -------------------------
   📌 GET: Metadata by ID
--------------------------*/
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID tidak valid' });

  const table = await Table.findById(id);
  if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });

  res.json(table);
});

/* -------------------------
   📌 POST: Upload Excel + simpan metadata
--------------------------*/
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File tidak ditemukan' });

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const table = new Table({
      name: req.body.name || req.file.originalname,
      description: req.body.description || '',
      kategori: req.body.kategori,
      tahun: req.body.tahun,
      sumber: req.body.sumber,
      format: path.extname(req.file.originalname).replace('.', ''),
      ukuran: `${(req.file.size / 1024).toFixed(2)} KB`,
      url: `/uploads/${req.file.filename}`,
      originalFile: req.file.originalname
    });

    const savedTable = await table.save();

    res.status(201).json({ 
      message: 'File & metadata disimpan', 
      table: savedTable, 
      preview: jsonData 
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memproses file', error: err.message });
  }
});

/* -------------------------
   📌 PUT: Update metadata
--------------------------*/
router.put('/:id', async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTable) return res.status(404).json({ error: 'Data tidak ditemukan' });

    res.json({ message: 'Data berhasil diperbarui', updated: updatedTable });
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui data', detail: err.message });
  }
});

/* -------------------------
   📌 DELETE: Hapus file + metadata + data terkait
--------------------------*/
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID tidak valid' });

  try {
    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });

    if (table.url) {
      const filePath = path.join(process.cwd(), table.url.replace(/^\//, ''));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Table.findByIdAndDelete(id);
    await Data.deleteMany({ tableId: id });

    res.json({ message: 'Tabel, file & data terkait berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus data', detail: err.message });
  }
});

/* -------------------------
   📌 POST: Simpan isi data ke collection `Data`
--------------------------*/
router.post('/data/:id', async (req, res) => {
  const { id } = req.params;
  const dataArray = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID tidak valid' });

  try {
    await Data.deleteMany({ tableId: id });
    const dataWithTableId = dataArray.map(item => ({ ...item, tableId: id }));
    const result = await Data.insertMany(dataWithTableId);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menyimpan data', detail: err.message });
  }
});

/* -------------------------
   📌 GET: Ambil isi data berdasarkan ID tabel
--------------------------*/
router.get('/data/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID tidak valid' });

  try {
    const data = await Data.find({ tableId: id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data', detail: err.message });
  }
});

/* -------------------------
   📌 GET: Download file original
--------------------------*/
router.get('/:id/file', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID tidak valid' });

  try {
    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });

    const filePath = path.join(process.cwd(), table.url.replace(/^\//, ''));
    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: 'File fisik tidak ditemukan' });

    res.download(filePath, table.originalFile || 'file.xlsx');
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengunduh file', detail: err.message });
  }
});

/* -------------------------
   📌 GET: Download data (hasil DB) sebagai Excel
--------------------------*/
router.get('/:id/download', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID tidak valid' });

  try {
    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });

    const data = await Data.find({ tableId: id });
    if (!data.length) return res.status(404).json({ error: 'Data tidak ditemukan' });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const headers = Object.keys(data[0]._doc)
      .filter(key => !['_id', '__v', 'tableId'].includes(key));
    worksheet.columns = headers.map(key => ({
      header: key.toUpperCase(),
      key: key,
      style: { font: { bold: true } }
    }));

    data.forEach(item => {
      const rowData = {};
      headers.forEach(h => rowData[h] = item[h] || '');
      worksheet.addRow(rowData);
    });

    worksheet.eachRow({ includeEmpty: false }, row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

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
    res.status(500).json({ error: 'Gagal mengekspor data', detail: err.message });
  }
});

export default router;
