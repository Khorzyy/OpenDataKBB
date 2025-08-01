import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tableRoutes from './controllers/tableRoutes.js';
import dataRoutes from './controllers/dataRoutes.js';
import uploadRoutes from './config/upload.js';
import authRoutes from './routes/auth.js';
import { verifyToken } from './middleware/authMiddleware.js'; // ✅ Import middleware

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Koneksi ke database
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('Connection error:', err));

// Route publik
app.use('/api/admin', authRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/data', dataRoutes);
app.use('/tables', uploadRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/api/admin/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Selamat datang admin: ${req.admin.email}` });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`server is listening on port ${port}`));
