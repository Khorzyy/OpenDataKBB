import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminAuth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi Admin
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login Admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Email atau password salah
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register Admin Baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: newadmin@example.com
 *               password:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       201:
 *         description: Admin berhasil didaftarkan
 *       400:
 *         description: Gagal mendaftarkan admin
 */
router.post('/register', registerAdmin);

export default router;