// routes/upload.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import Table from '../models/Table.js';

const router = express.Router();

// Setup penyimpanan
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const {
      name,
      description,
      kategori,
      tahun,
      sumber,
      format,
      ukuran,
    } = req.body;

    const table = new Table({
      name,
      description,
      kategori,
      tahun,
      sumber,
      format,
      ukuran,
      fields: [], // nanti bisa diisi kalau kamu parsing lagi,
      originalFile: req.file.filename,
      url: `/uploads/${req.file.filename}`, // untuk akses
    });

    await table.save();
    res.status(200).json({ message: 'Berhasil upload file & simpan data.', table });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal upload file.' });
  }
});

export default router;
