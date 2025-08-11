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

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload file Excel dan simpan metadata ke database
 *     tags:
 *       - Upload
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
 *                 description: File Excel yang akan diunggah
 *               name:
 *                 type: string
 *                 example: Data Penduduk 2024
 *               description:
 *                 type: string
 *                 example: Dataset berisi jumlah penduduk berdasarkan usia dan jenis kelamin
 *               kategori:
 *                 type: string
 *                 example: Kependudukan
 *               tahun:
 *                 type: string
 *                 example: 2024
 *               sumber:
 *                 type: string
 *                 example: BPS Kabupaten Bandung Barat
 *               format:
 *                 type: string
 *                 example: XLSX
 *               ukuran:
 *                 type: string
 *                 example: 150KB
 *     responses:
 *       200:
 *         description: File berhasil diunggah dan metadata disimpan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Berhasil upload file & simpan data.
 *                 table:
 *                   $ref: '#/components/schemas/Table'
 *       500:
 *         description: Gagal upload file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Gagal upload file.
 */

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
      fields: [], // nanti bisa diisi kalau kamu parsing lagi
      originalFile: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    });

    await table.save();
    res.status(200).json({ message: 'Berhasil upload file & simpan data.', table });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal upload file.' });
  }
});

export default router;
