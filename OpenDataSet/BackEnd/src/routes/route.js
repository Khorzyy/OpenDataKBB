import express from 'express';
import {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData
} from '../controllers/yourController.js'; // ganti dengan path yang benar

const router = express.Router();

/**
 * @swagger
 * /api/route:
 *   get:
 *     summary: Ambil semua data
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data
 */
router.get("/", getAllData);

/**
 * @swagger
 * /api/route/{id}:
 *   get:
 *     summary: Ambil data berdasarkan ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID data
 *     responses:
 *       200:
 *         description: Berhasil mengambil data
 *       404:
 *         description: Data tidak ditemukan
 */
router.get("/:id", getDataById);

/**
 * @swagger
 * /api/route:
 *   post:
 *     summary: Buat data baru
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *     responses:
 *       201:
 *         description: Data berhasil dibuat
 */
router.post("/", createData);

/**
 * @swagger
 * /api/route/{id}:
 *   put:
 *     summary: Update data berdasarkan ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data berhasil diupdate
 *       404:
 *         description: Data tidak ditemukan
 */
router.put("/:id", updateData);

/**
 * @swagger
 * /api/route/{id}:
 *   delete:
 *     summary: Hapus data berdasarkan ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID data
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 */
router.delete("/:id", deleteData);

export default router;
