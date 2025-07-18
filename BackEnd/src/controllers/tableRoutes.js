import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Table from '../models/Table.js';
import TableData from '../models/TableData.js';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';

const router = express.Router();

// Setup multer untuk upload Excel file ke folder uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Tambah tabel manual
router.post('/', async (req, res) => {
  const table = new Table(req.body);
  await table.save();
  res.json(table);
});

// Ambil semua tabel
router.get('/', async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
});

// Ambil satu tabel berdasarkan ID
router.get('/:id', async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (!table) return res.status(404).json({ error: 'Tabel tidak ditemukan' });
  res.json(table);
});

// Hapus tabel dan data terkait
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndDelete(id);
    await TableData.deleteMany({ tableId: id });
    res.status(200).json({ message: 'Tabel dan data terkait berhasil dihapus.' });
  } catch (err) {
    console.error('Gagal menghapus:', err);
    res.status(500).json({ error: 'Gagal menghapus tabel.' });
  }
});

// Upload Excel untuk membuat tabel dan data
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.SheetNames[0];

    // Ambil data dan filter baris kosong
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: '' });
    data = data.filter(row => Object.values(row).some(val => val !== ''));

    const { name, description, kategori, tahun, sumber } = req.body;
    const fields = Object.keys(data[0] || {});

    // Informasi tambahan
    const originalFile = req.file.filename;
    const format = path.extname(req.file.originalname).replace('.', '').toUpperCase(); // contoh: XLSX
    const ukuran = (req.file.size / 1024).toFixed(2) + ' KB'; // ukuran dalam KB
    const url = `${req.protocol}://${req.get('host')}/uploads/${originalFile}`; // full URL akses file

    const newTable = new Table({
      name,
      description,
      kategori,
      tahun,
      sumber,
      format,
      ukuran,
      url,
      fields,
      originalFile
    });
    await newTable.save();

    const tableId = newTable._id;

    for (let row of data) {
      await new TableData({ tableId, data: row }).save();
    }

    res.status(201).json({
      message: 'Tabel berhasil dibuat dari file Excel',
      table: newTable
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memproses file Excel.' });
  }
});

// Endpoint untuk download data dengan border
router.get('/:id/download', async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id);
    const data = await TableData.find({ tableId: id });

    if (!table || !data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Header
    worksheet.addRow(table.fields);
    worksheet.getRow(1).font = { bold: true };

    // Data rows
    data.forEach((row) => {
      const rowData = table.fields.map((field) => row.data[field] || '');
      worksheet.addRow(rowData);
    });

    // Tambahkan border ke semua sel
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${table.name || 'data'}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengunduh data Excel' });
  }
});

export default router;