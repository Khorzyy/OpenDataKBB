import express from 'express';
import mongoose from 'mongoose';
import tableRoutes from './controllers/tableRoutes.js';
import dataRoutes from './controllers/dataRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // membaca env file

const app = express();
app.use(cors());
app.use(express.json());

const mongodbConnect = process.env.MONGOURI || 'mongodb+srv://user:pw@cluster0.urtlvai.mongodb.net/DataSet?retryWrites=true&w=majority&appName=Cluster0'; // untuk mengambil data yang ada di file env

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('Connection error:', err));

app.use('/api/tables', tableRoutes);
app.use('/api/data', dataRoutes);

const port = process.env.PORT || 5000

app.listen(port, '0.0.0.0', () => console.log(`server is listening on port ${port}`));
