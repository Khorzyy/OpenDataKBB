import express from 'express';
import mongoose from 'mongoose';
import tableRoutes from './routes/tableRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/DataSet');

app.use('/api/tables', tableRoutes);
app.use('/api/data', dataRoutes);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server is listening on port ${port}`));
