import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import tableRoutes from './controllers/tableRoutes.js';
import dataRoutes from './controllers/dataRoutes.js';
import uploadRoutes from './config/upload.js';
import authRoutes from './routes/auth.js';
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('Connection error:', err));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Open Data KBB API',
      version: '1.0.0',
      description: 'Dokumentasi API Open Data Kabupaten Bandung Barat',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: [
    `${tableRoutes}`,
    `${dataRoutes}`,
    `${authRoutes}`,
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Enable Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(swaggerSpec);

// Static file
app.use('/uploads', express.static('uploads'));

// Public Routes
app.use('/api/admin', authRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/data', dataRoutes);
app.use('/tables', uploadRoutes); // upload menggunakan form-data

// Protected Route
app.get('/api/admin/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Selamat datang admin: ${req.admin.email}` });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () =>
  console.log(`Server is running on http://localhost:${port}`)
);