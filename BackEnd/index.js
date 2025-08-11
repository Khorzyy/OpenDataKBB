import express from 'express';
import mongoose from 'mongoose';
import tableRoutes from './controllers/tableRoutes.js';
import dataRoutes from './controllers/dataRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './config/upload.js';
import catalogRoutes from './controllers/catalogRoutes.js';

dotenv.config(); // membaca env file

const app = express(); // Pindahkan ke sini!
app.use(cors());
app.use(express.json());

const mongodbConnect = process.env.MONGOURI; // untuk mengambil data yang ada di file env

mongoose.connect(mongodbConnect)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('Connection error:', err));

// Register routes setelah app terdefinisi
app.use('/api/catalog', catalogRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/data', dataRoutes);
app.use('/tables', uploadRoutes);
app.use('/uploads', express.static('uploads')); // untuk akses file

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`server is listening on port ${port}`));
